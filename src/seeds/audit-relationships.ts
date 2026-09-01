import fs from 'fs'
import dotenv from 'dotenv'

const parsed = dotenv.parse(fs.readFileSync('.env'))
for (const [k, v] of Object.entries(parsed)) {
  process.env[k] = v
}
const vpsLine = fs.readFileSync('.env', 'utf8').split('\n').find((l) => l.includes('200.141.14.52'))
const vpsUrl = vpsLine ? vpsLine.replace(/^#\s*DATABASE_URL\s*=\s*/, '').trim() : ''
const atlasUrl = process.env.DATABASE_URL || ''

async function auditPayload(name: string, url: string) {
  console.log('==================================================')
  console.log(`🔍 AUDITING DATABASE: ${name}`)
  console.log('==================================================')
  process.env.DATABASE_URL = url

  const configPromise = (await import('../payload.config')).default
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config: configPromise })

  const colorsRes = await payload.find({
    collection: 'colors',
    limit: 2000,
    depth: 1,
    overrideAccess: true,
  })

  const productsRes = await payload.find({
    collection: 'products',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  console.log(`Total Colors in DB: ${colorsRes.docs.length}`)
  console.log(`Total Products in DB: ${productsRes.docs.length}`)

  const productMap = new Map<string, string>()
  for (const p of productsRes.docs) {
    productMap.set(String(p.id), p.title || p.slug || String(p.id))
  }

  let zeroRelationships = 0
  let invalidProductIds = 0
  const productUsage = new Map<string, number>()

  for (const c of colorsRes.docs) {
    const rels = c.relatedProducts || []
    if (!Array.isArray(rels) || rels.length === 0) {
      zeroRelationships++
    }
    for (const rel of rels) {
      const pidStr = typeof rel === 'object' ? String((rel as any).id) : String(rel)
      if (!productMap.has(pidStr)) {
        invalidProductIds++
      } else {
        const prodName = productMap.get(pidStr) || pidStr
        productUsage.set(prodName, (productUsage.get(prodName) || 0) + 1)
      }
    }
  }

  console.log('\n--- Relationship Integrity Check ---')
  console.log(`✓ Colors with 0 related products: ${zeroRelationships}`)
  console.log(`✓ Invalid / Broken product IDs: ${invalidProductIds}`)

  console.log('\n--- Verified Product Formulations Available ---')
  const sortedProducts = Array.from(productUsage.entries()).sort((a, b) => b[1] - a[1])
  for (const [pname, count] of sortedProducts) {
    console.log(`• ${pname}: ${count} shades available`)
  }

  // Distribution of relationships count per color
  const relCountDist: Record<number, number> = {}
  for (const c of colorsRes.docs) {
    const len = (c.relatedProducts || []).length
    relCountDist[len] = (relCountDist[len] || 0) + 1
  }
  console.log('\n--- Relationship Distribution ---')
  for (const [relCount, numColors] of Object.entries(relCountDist)) {
    console.log(`• ${numColors} shades are available across ${relCount} paint products`)
  }

  console.log('\n--- Sample Color Documents ---')
  for (const c of colorsRes.docs.slice(0, 5)) {
    const linkedNames = (c.relatedProducts || []).map((rel: any) =>
      typeof rel === 'object' ? (rel as any).title || (rel as any).id : productMap.get(String(rel)) || rel
    )
    console.log(`- [${c.colorId}] ${c.name} (${c.hexCode}) | Family: ${c.colorFamily} | Linked (${linkedNames.length}): ${linkedNames.join(', ')}`)
  }
}

async function run() {
  const isVps = process.argv.includes('--vps')
  if (isVps && vpsUrl) {
    await auditPayload('VPS Production Database (200.141.14.52 / reliancepaints_live)', vpsUrl)
  } else {
    await auditPayload('MongoDB Atlas Database (reliancepaints-live)', atlasUrl)
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
