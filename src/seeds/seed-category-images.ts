import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const unsplashMap: Record<string, string> = {
  'exterior-paints': 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop',
  'interior-paints': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop',
  'distempers': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
  'enamel-paints': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
  'undercoats-and-wall-primers': 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop',
  'undercoats-primers': 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop',
  'metal-primer': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
  'wood-primer': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
  'damp-solution': 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop'
}

async function seedCategoryImages(): Promise<void> {
  const payload = await getPayload({ config })

  try {
    payload.logger.info('🌱 Seeding product category images...')
    const categories = await payload.find({ collection: 'product-categories', limit: 100 })
    
    for (const cat of categories.docs) {
      const slug = cat.slug as string
      const url = unsplashMap[slug] || unsplashMap['default']
      
      payload.logger.info(`Fetching image for ${slug} from ${url}...`)
      
      const res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // We will save to a temporary file, then create media
      const tempFilePath = path.join(__dirname, `${slug}.jpg`)
      fs.writeFileSync(tempFilePath, buffer)
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${cat.title} Category Image`,
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: `${slug}.jpg`,
          size: buffer.length,
        }
      })
      
      payload.logger.info(`Uploaded media ${media.id}, linking to category...`)
      
      await payload.update({
        collection: 'product-categories',
        id: cat.id,
        data: {
          image: media.id,
        }
      })
      
      // Clean up temp file
      fs.unlinkSync(tempFilePath)
      
      payload.logger.info(`Updated category ${cat.title} successfully!`)
    }
    
    payload.logger.info('✅ Seeded category images!')
    process.exit(0)
  } catch (error) {
    payload.logger.error(error as Error)
    process.exit(1)
  }
}

seedCategoryImages()
