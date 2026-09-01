import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bucketImages = [
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop', // roller/bucket
  'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop', // paint cans 2
  'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop', // paint brush/bucket
  'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop', // interior paint setup
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop'  // buckets
]

async function seedProductImages(): Promise<void> {
  const payload = await getPayload({ config })

  try {
    payload.logger.info('🌱 Seeding product images...')
    const products = await payload.find({ collection: 'products', limit: 500 })
    
    let index = 0
    for (const prod of products.docs) {
      if (prod.images && prod.images.length > 0) {
        // payload.logger.info(`Product ${prod.title} already has images, skipping.`)
        // continue;
        // The user said "Add product images in all the products". We'll just overwrite or ensure all have at least one.
        // But to be safe and avoid duplicates, we'll overwrite the existing array.
      }
      
      const slug = prod.slug as string
      const url = bucketImages[index % bucketImages.length]
      index++;
      
      payload.logger.info(`Fetching bucket image for product ${slug}...`)
      
      const res = await fetch(url)
      
      if (!res.ok) {
        payload.logger.error(`Failed to fetch image for ${slug} from ${url}: ${res.statusText}`)
        continue;
      }
      
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const tempFilePath = path.join(__dirname, `prod_${slug}.jpg`)
      fs.writeFileSync(tempFilePath, buffer)
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${prod.title} Paint Bucket Image`,
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: `prod_${slug}.jpg`,
          size: buffer.length,
        }
      })
      
      payload.logger.info(`Uploaded media ${media.id}, linking to product...`)
      
      await payload.update({
        collection: 'products',
        id: prod.id,
        data: {
          images: [
            { image: media.id }
          ]
        }
      })
      
      fs.unlinkSync(tempFilePath)
      
      payload.logger.info(`Updated product ${prod.title} successfully!`)
    }
    
    payload.logger.info('✅ Seeded product images!')
    process.exit(0)
  } catch (error) {
    payload.logger.error(error as Error)
    process.exit(1)
  }
}

seedProductImages()
