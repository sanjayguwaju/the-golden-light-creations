import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config })
  
  // Get all products
  const products = await payload.find({
    collection: 'products',
    limit: 100,
  })

  if (products.docs.length === 0) {
    console.log('No products found to seed.')
    process.exit(0)
  }

  const productIds = products.docs.map(p => p.id)

  // Get all colors that don't have products
  const colors = await payload.find({
    collection: 'colors',
    limit: 1000,
  })

  console.log(`Found ${colors.docs.length} colors to process.`)
  let updatedCount = 0;

  for (const color of colors.docs) {
    // If it already has products, skip
    if (color.relatedProducts && color.relatedProducts.length > 0) {
      continue;
    }

    // Pick 1-3 random products
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...productIds].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, count)
    
    await payload.update({
      collection: 'colors',
      id: color.id,
      data: {
        relatedProducts: selected,
      }
    })
    updatedCount++;
    console.log(`Updated color ${color.name} with ${selected.length} products.`)
  }

  console.log(`Done! Seeded ${updatedCount} colors with related products.`)
  process.exit(0)
}

seed().catch(console.error)
