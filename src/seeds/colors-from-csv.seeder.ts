import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const parsed = dotenv.parse(fs.readFileSync('.env'))
for (const [k, v] of Object.entries(parsed)) {
  process.env[k] = v
}

if (process.argv.includes('--vps') || process.env.TARGET_DB === 'vps') {
  const vpsLine = fs.readFileSync('.env', 'utf8').split('\n').find((l) => l.includes('200.141.14.52'))
  if (vpsLine) {
    const vpsUrl = vpsLine.replace(/^#\s*DATABASE_URL\s*=\s*/, '').trim()
    process.env.DATABASE_URL = vpsUrl
    console.log('🌐 Target Database: VPS Production Server (200.141.14.52 / reliancepaints_live)')
  }
} else {
  console.log('🌐 Target Database: MongoDB Atlas (reliancepaints-live)')
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Mapping from CSV Product Names to Payload Product Slugs (with candidate fallbacks)
const PRODUCT_MAP: Record<string, string[]> = {
  'Double Defence Exterior Emulsion': ['double-defense-plus', 'reliance-double-dfence', 'double-defence-plus'],
  'Elega Interior Emulsion': ['elega-luxury-emulsion'],
  'New Barpimo Interior Emulsion': ['barpimo-acrylic-interior-emulsion'],
  'New Shangrila Exterior Emulsion': ['shangrila-exterior-emulsion'],
  'New Shangrila Interior Emulsion': ['shangrila-interior-emulsion-paint'],
  'New Ultra Protec Exterior Emulsion': ['ultra-protec-exterior-emulsion'],
  'Protec Exterior Emulsion': ['protec-exterior-emulsion-paint'],
  'Reliance Acrylic Washable Distemper': ['reliance-acrylic-washable-distemper'],
  'Shangrila Distemper': ['shangrila-washable-distemper'],
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

type ColorFamily =
  | 'reds'
  | 'blues'
  | 'greens'
  | 'yellows'
  | 'neutrals'
  | 'oranges'
  | 'purples'
  | 'earths'
  | 'darks'
  | 'whites'

function determineColorFamily(r: number, g: number, b: number): { family: ColorFamily; moods: string[] } {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0)
        break
      case gn:
        h = (bn - rn) / d + 2
        break
      case bn:
        h = (rn - gn) / d + 4
        break
    }
    h *= 60
  }

  // Derive Moods based on HSL
  const moods: string[] = []
  if (l > 0.75) moods.push('minimalist')
  if (s > 0.5) moods.push('vibrant', 'energetic')
  if (s < 0.25 && l > 0.4 && l < 0.8) moods.push('calm', 'cozy')
  if (l < 0.35) moods.push('elegant')
  if (moods.length === 0) moods.push('calm')

  // Derive Family
  let family: ColorFamily = 'neutrals'
  if (l >= 0.9) {
    family = 'whites'
  } else if (l <= 0.15) {
    family = 'darks'
  } else if (s <= 0.1) {
    family = 'neutrals'
  } else if (h >= 15 && h < 45 && s < 0.45 && l < 0.6) {
    family = 'earths'
  } else if ((h >= 0 && h < 18) || h >= 345) {
    family = 'reds'
  } else if (h >= 18 && h < 45) {
    family = 'oranges'
  } else if (h >= 45 && h < 70) {
    family = 'yellows'
  } else if (h >= 70 && h < 165) {
    family = 'greens'
  } else if (h >= 165 && h < 260) {
    family = 'blues'
  } else if (h >= 260 && h < 315) {
    family = 'purples'
  } else {
    family = 'reds'
  }

  return { family, moods: moods.slice(0, 3) }
}

async function seedColorsFromCsv() {
  console.log('🚀 Initializing Payload CMS...')
  const configPromise = (await import('../payload.config')).default
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch all existing products from Payload
  console.log('📦 Fetching products from Payload CMS...')
  const productsRes = await payload.find({
    collection: 'products',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  console.log(`Found ${productsRes.docs.length} products in CMS.`)
  const productSlugToId = new Map<string, string | number>()
  for (const p of productsRes.docs) {
    if (p.slug) {
      productSlugToId.set(p.slug, p.id)
    }
  }

  // Build mapping from mapped CSV names to actual product IDs
  const csvProductNameToId = new Map<string, string | number>()
  for (const [csvName, candidateSlugs] of Object.entries(PRODUCT_MAP)) {
    let matchedId: string | number | undefined
    let matchedSlug: string | undefined

    for (const slug of candidateSlugs) {
      const id = productSlugToId.get(slug)
      if (id) {
        matchedId = id
        matchedSlug = slug
        break
      }
    }

    if (matchedId && matchedSlug) {
      csvProductNameToId.set(csvName, matchedId)
      console.log(`✓ Mapped CSV product "${csvName}" -> CMS Product ID ${matchedId} (${matchedSlug})`)
    } else {
      console.warn(`⚠️ Warning: CMS product for "${csvName}" (tried: ${candidateSlugs.join(', ')}) not found in database!`)
    }
  }

  // 2. Clear all existing colors via bulk delete
  console.log('🗑️ Clearing existing colors from the "colors" collection...')
  await payload.delete({
    collection: 'colors',
    where: { id: { exists: true } },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
  console.log('✓ Cleared all old colors.')

  // 3. Read CSV and aggregate shade codes
  console.log('📄 Reading "Gdata for app development - Combined Data.csv"...')
  const csvPath = path.resolve(process.cwd(), 'Gdata for app development - Combined Data.csv')
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at ${csvPath}`)
  }

  const csvRaw = fs.readFileSync(csvPath, 'utf8')
  const lines = csvRaw.split(/\r?\n/).filter((l) => l.trim().length > 0)

  type ShadeEntry = {
    code: string
    r: number
    g: number
    b: number
    hex: string
    productIds: Set<string | number>
  }

  const shadeMap = new Map<string, ShadeEntry>()
  let skippedRows = 0

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(',')
    if (parts.length >= 5) {
      const prodName = parts.slice(0, parts.length - 4).join(',').trim().replace(/^"|"$/g, '')
      const code = parts[parts.length - 4].trim().replace(/^"|"$/g, '')
      const r = parseInt(parts[parts.length - 3], 10)
      const g = parseInt(parts[parts.length - 2], 10)
      const b = parseInt(parts[parts.length - 1], 10)

      if (!code || isNaN(r) || isNaN(g) || isNaN(b)) {
        skippedRows++
        continue
      }

      if (!shadeMap.has(code)) {
        shadeMap.set(code, {
          code,
          r,
          g,
          b,
          hex: rgbToHex(r, g, b),
          productIds: new Set(),
        })
      }

      const prodId = csvProductNameToId.get(prodName)
      if (prodId) {
        shadeMap.get(code)!.productIds.add(prodId)
      }
    } else {
      skippedRows++
    }
  }

  console.log(`Aggregated ${shadeMap.size} unique shade codes (skipped ${skippedRows} invalid rows).`)

  // Prepare color docs for insertion
  const validShades: {
    name: string
    shadeCode: string
    colorId: string
    hexCode: string
    rgb: {
      r: number
      g: number
      b: number
      string: string
    }
    colorFamily: ColorFamily
    moodTags: any
    popularity: number
    relatedProducts: string[]
    description: string
  }[] = []

  for (const [code, item] of shadeMap.entries()) {
    const productIdsArray = Array.from(item.productIds).map(String)
    if (productIdsArray.length === 0) continue

    const { family, moods } = determineColorFamily(item.r, item.g, item.b)
    const name = `Reliance Shade ${code}`
    const popularity = Math.floor(Math.random() * 40) + 60

    validShades.push({
      name,
      shadeCode: code,
      colorId: code,
      hexCode: item.hex,
      rgb: {
        r: item.r,
        g: item.g,
        b: item.b,
        string: `rgb(${item.r}, ${item.g}, ${item.b})`,
      },
      colorFamily: family,
      moodTags: moods,
      popularity,
      relatedProducts: productIdsArray,
      description: `Reliance Paints shade ${code} (${item.hex} / rgb(${item.r}, ${item.g}, ${item.b})). Available in ${productIdsArray.length} product formulations.`,
    })
  }

  console.log(`🎨 Inserting ${validShades.length} valid colors with concurrent batching...`)

  const BATCH_SIZE = 15
  let inserted = 0
  let failed = 0

  for (let i = 0; i < validShades.length; i += BATCH_SIZE) {
    const batch = validShades.slice(i, i + BATCH_SIZE)
    await Promise.all(
      batch.map(async (docData) => {
        let attempts = 0
        let success = false
        while (attempts < 3 && !success) {
          attempts++
          try {
            await payload.create({
              collection: 'colors',
              data: docData as any,
              overrideAccess: true,
              context: { disableRevalidate: true },
            })
            inserted++
            success = true
          } catch (err: any) {
            if (attempts >= 3) {
              failed++
              console.error(`❌ Failed to create color for shade ${docData.colorId} after 3 attempts:`, err?.message || err)
            } else {
              // small wait before retry
              await new Promise((res) => setTimeout(res, 200 * attempts))
            }
          }
        }
      })
    )
    console.log(`[${Math.min(i + BATCH_SIZE, validShades.length)}/${validShades.length}] Progress: ${inserted} created, ${failed} failed...`)
  }

  console.log('====================================================')
  console.log(`🎉 COLOR IMPORT COMPLETE!`)
  console.log(`Total Unique Shades in CSV: ${shadeMap.size}`)
  console.log(`Successfully Created Colors: ${inserted}`)
  console.log(`Failed / Skipped: ${failed}`)
  console.log('====================================================')

  process.exit(0)
}

seedColorsFromCsv().catch((err) => {
  console.error('Fatal error during color import:', err)
  process.exit(1)
})
