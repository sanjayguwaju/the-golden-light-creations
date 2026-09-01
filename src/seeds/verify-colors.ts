import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function verify() {
  const payload = await getPayload({ config: configPromise })

  const totalColors = await payload.count({ collection: 'colors' })
  console.log(`🎨 Total colors in DB: ${totalColors.totalDocs}`)

  const totalProducts = await payload.count({ collection: 'products' })
  console.log(`📦 Total products in DB: ${totalProducts.totalDocs}`)

  const sampleColors = await payload.find({
    collection: 'colors',
    limit: 5,
    depth: 1,
  })

  console.log('\n--- Sample Colors ---')
  for (const c of sampleColors.docs) {
    const prods = (c.relatedProducts || []).map((p: any) => typeof p === 'object' ? p.title : p)
    console.log(`- [${c.colorId}] ${c.name} | Hex: ${c.hexCode} | Family: ${c.colorFamily} | Linked Products (${prods.length}): ${prods.join(', ')}`)
  }

  // Check product Double Defence Plus shades
  const ddProduct = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'double-defense-plus' } },
    limit: 1,
  })

  if (ddProduct.docs[0]) {
    const ddShades = await payload.count({
      collection: 'colors',
      where: { relatedProducts: { contains: ddProduct.docs[0].id } },
    })
    console.log(`\n✓ Double Defense Plus (${ddProduct.docs[0].id}) has ${ddShades.totalDocs} available shades.`)
  }

  // Check product Elega Luxury Emulsion shades
  const elegaProduct = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'elega-luxury-emulsion' } },
    limit: 1,
  })

  if (elegaProduct.docs[0]) {
    const elegaShades = await payload.count({
      collection: 'colors',
      where: { relatedProducts: { contains: elegaProduct.docs[0].id } },
    })
    console.log(`✓ Elega Luxury Emulsion (${elegaProduct.docs[0].id}) has ${elegaShades.totalDocs} available shades.`)
  }

  process.exit(0)
}

verify().catch((err) => {
  console.error(err)
  process.exit(1)
})
