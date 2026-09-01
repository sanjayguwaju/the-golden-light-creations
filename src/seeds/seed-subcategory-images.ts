import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const unsplashMap: Record<string, string> = {
  'wood-primer-subcategory': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
  'wood-primer-category': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
  'metal-primer-subcategory': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
  'metal-primer-category': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
  'exterior-primer-category': 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop',
  'interior-primer-category': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop',
  'premium-exterior-emulsion': 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop',
  'luxury-emulsion': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop',
  'premium-emulsion': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop',
  'economy-emulsion': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop',
  'washable-distemper': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
  'gloss-enamel': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
  'damp-proofing-solution': 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop'
}

async function seedSubcategoryImages(): Promise<void> {
  const payload = await getPayload({ config })

  try {
    payload.logger.info('🌱 Seeding product subcategory images...')
    const subcategories = await payload.find({ collection: 'product-subcategories', limit: 100 })
    
    for (const subcat of subcategories.docs) {
      if (subcat.image) continue; // Skip if already has an image
      
      const slug = subcat.slug as string
      const url = unsplashMap[slug] || unsplashMap['default']
      
      payload.logger.info(`Fetching image for subcategory ${slug} from ${url}...`)
      
      const res = await fetch(url)
      
      if (!res.ok) {
        payload.logger.error(`Failed to fetch image for ${slug} from ${url}: ${res.statusText}`)
        continue;
      }
      
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const tempFilePath = path.join(__dirname, `subcat_${slug}.jpg`)
      fs.writeFileSync(tempFilePath, buffer)
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${subcat.title} Subcategory Image`,
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: `subcat_${slug}.jpg`,
          size: buffer.length,
        }
      })
      
      payload.logger.info(`Uploaded media ${media.id}, linking to subcategory...`)
      
      await payload.update({
        collection: 'product-subcategories',
        id: subcat.id,
        data: {
          image: media.id,
        }
      })
      
      fs.unlinkSync(tempFilePath)
      
      payload.logger.info(`Updated subcategory ${subcat.title} successfully!`)
    }
    
    payload.logger.info('✅ Seeded subcategory images!')
    process.exit(0)
  } catch (error) {
    payload.logger.error(error as Error)
    process.exit(1)
  }
}

seedSubcategoryImages()
