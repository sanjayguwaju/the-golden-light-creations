import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { NEPAL_GEO, type Province } from '../utilities/nepalGeo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Canonical district to standard province map
const districtToProvince: Record<string, Province> = {}
for (const [prov, dists] of Object.entries(NEPAL_GEO)) {
  for (const d of dists) {
    districtToProvince[d.toLowerCase()] = prov as Province
  }
}

// Special district aliases or typos in CSV data
const districtAliases: Record<string, string> = {
  'nawalparasi west': 'Parasi',
  'sindhupalchowk': 'Sindhupalchok',
  'bapatari': 'Saptari',
  'parasi': 'Parasi',
}

const areaToProvince: Record<string, Province> = {
  'PROVISION-1': 'Koshi',
  'PROVISION-2': 'Madhesh',
  'PROVISION-3': 'Bagmati',
  'PROVISION-4': 'Gandaki',
  'PROVISION-5': 'Lumbini',
  'PROVISION-6': 'Karnali',
  'PROVISION-7': 'Sudurpashchim',
}

function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const rows: string[][] = []
  // Skip line 0 title if it exists
  const startIdx = lines[0].toLowerCase().includes('dealer address details') ? 1 : 0

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const row: string[] = []
    let inQuotes = false
    let token = ''
    for (let j = 0; j < line.length; j++) {
      const c = line[j]
      if (c === '"') {
        inQuotes = !inQuotes
      } else if (c === ',' && !inQuotes) {
        row.push(token.trim().replace(/^"|"$/g, ''))
        token = ''
      } else {
        token += c
      }
    }
    row.push(token.trim().replace(/^"|"$/g, ''))
    rows.push(row)
  }
  return rows
}

export async function seedStores() {
  console.log('🏪 Starting Dealer / Stores Seeder...')

  const csvPath = path.resolve(
    process.cwd(),
    'Dealer address data for Websites - Machine Report Data(ALL).csv'
  )

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at ${csvPath}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const rows = parseCSV(csvContent)

  // Header is row 0: ['S.N.', 'AREA', 'DEALER NAME', 'ADDRESS', 'DISTRICT', 'CONTACT']
  const dataRows = rows.slice(1)
  console.log(`📄 Found ${dataRows.length} dealer records in CSV.`)

  const payload = await getPayload({ config: configPromise })

  // Check existing stores
  const existingStores = await payload.find({
    collection: 'stores',
    limit: 1000,
  })

  console.log(`📊 Found ${existingStores.totalDocs} existing store records in CMS.`)

  // Create a lookup map of existing stores by storeName or dealerCode
  const existingMap = new Map<string, (typeof existingStores.docs)[0]>()
  for (const doc of existingStores.docs) {
    if (doc.dealerCode) {
      existingMap.set(`code:${doc.dealerCode}`, doc)
    }
    if (doc.storeName) {
      existingMap.set(`name:${doc.storeName.toLowerCase().trim()}`, doc)
    }
  }

  let createdCount = 0
  let updatedCount = 0
  let skippedCount = 0

  for (let idx = 0; idx < dataRows.length; idx++) {
    const [sn, area, rawName, rawAddress, rawDistrict, rawContact] = dataRows[idx]

    const storeName = (rawName || '').trim().replace(/\s+/g, ' ')
    if (!storeName) {
      console.warn(`⚠️ Skipping row ${idx + 1}: Empty store name`)
      skippedCount++
      continue
    }

    const dealerCode = (sn || `${idx + 1}`).trim()
    const cleanArea = (area || '').trim()
    const address = (rawAddress || '').trim().replace(/\s+/g, ' ')

    // Resolve canonical district name
    let district = (rawDistrict || '').trim()
    const districtKey = district.toLowerCase()
    if (districtAliases[districtKey]) {
      district = districtAliases[districtKey]
    } else {
      for (const [, dists] of Object.entries(NEPAL_GEO)) {
        const found = dists.find((d) => d.toLowerCase() === districtKey)
        if (found) {
          district = found
          break
        }
      }
    }

    // Resolve standard province
    let province: Province = districtToProvince[district.toLowerCase()]
    if (!province) {
      province = areaToProvince[cleanArea] || 'Bagmati'
    }

    // Clean phone number
    let phone = (rawContact || '').trim()
    if (phone.toLowerCase() === 'no data') {
      phone = ''
    }

    // Determine dealer type
    let dealerType: 'authorized_dealer' | 'tinting_center' | 'studio' | 'showroom' =
      'authorized_dealer'
    const lowerName = storeName.toLowerCase()
    if (lowerName.includes('studio')) {
      dealerType = 'studio'
    } else if (lowerName.includes('showroom')) {
      dealerType = 'showroom'
    } else if (lowerName.includes('color') || lowerName.includes('colour') || lowerName.includes('paints')) {
      dealerType = 'tinting_center'
    }

    // Google Maps Search URL
    const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
      `${storeName}, ${address}, ${district}, Nepal`
    )}`

    const storeData = {
      storeName,
      dealerCode,
      area: cleanArea,
      dealerType,
      province,
      district,
      address,
      phone,
      googleMapsUrl,
      showOnHomepage: false,
    }

    // Check if store already exists
    const existing =
      existingMap.get(`code:${dealerCode}`) ||
      existingMap.get(`name:${storeName.toLowerCase().trim()}`)

    try {
      if (existing) {
        await payload.update({
          collection: 'stores',
          id: existing.id,
          data: storeData,
          context: { disableRevalidate: true },
        })
        updatedCount++
      } else {
        await payload.create({
          collection: 'stores',
          data: storeData,
          context: { disableRevalidate: true },
        })
        createdCount++
      }
    } catch (err: any) {
      console.error(`❌ Error saving dealer ${dealerCode} - ${storeName}:`, err.message || err)
    }

    if ((idx + 1) % 50 === 0 || idx === dataRows.length - 1) {
      console.log(
        `⏳ Processed ${idx + 1}/${dataRows.length} dealers... (Created: ${createdCount}, Updated: ${updatedCount})`
      )
    }
  }

  console.log(`\n🎉 Seeding Complete!`)
  console.log(`   • Total Processed: ${dataRows.length}`)
  console.log(`   • Created: ${createdCount}`)
  console.log(`   • Updated: ${updatedCount}`)
  console.log(`   • Skipped: ${skippedCount}`)

  // Final count
  const finalStores = await payload.find({
    collection: 'stores',
    limit: 10,
  })
  console.log(`📊 Total stores now in database: ${finalStores.totalDocs}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedStores()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error during seeding:', err)
      process.exit(1)
    })
}
