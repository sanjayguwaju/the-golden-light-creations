import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

// This relies on the "@payload-config" path alias that `create-payload-app`
// sets up automatically (pointing at your payload.config.ts).
// If you don't have that alias, swap the line below for a relative import,
// e.g.: import config from '../payload.config'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Adjust to your project's actual default locale if it isn't "en".
const DEFAULT_LOCALE = 'en'

/* ------------------------------------------------------------------ */
/*  Shape of demo-products.json                                       */
/* ------------------------------------------------------------------ */

type DemoColour = { name: string; hex?: string }

type DemoProduct = {
  ref: string
  title: string
  slug: string
  tagline?: string
  description: string
  keyFeatures?: string[]
  packSizes?: string[]
  coverage?: string
  isPaintable?: boolean
  coverageRate?: number
  pricePerLitre?: number
  applicationMethod?: string
  surfaceCompatibility?: string
  dryingTime?: string
  recommendedPrimer?: string
  basicComposition?: string
  paintFilmProperties?: string
  finish?: string
  appearance?: string
  specificGravity?: string
  viscosity?: string
  scrubResistance?: string
  volumeSolids?: string
  dft?: string
  thinner?: string
  thinningRatio?: string
  durability?: string
  isWarrantyAvailable?: boolean
  warranty?: string
  shelfLife?: string
  sheenLevel?: string
  surfacePreparationNew?: string
  surfacePreparationOld?: string
  availableColours?: DemoColour[]
  relatedProducts?: string[]
  youMayAlsoLike?: string[]
}

type DemoSubcategory = {
  title: string
  slug: string
  description?: string
  products?: DemoProduct[]
}

type DemoCategory = {
  title: string
  slug: string
  description?: string
  subcategories?: DemoSubcategory[]
}

type DemoData = { categories: DemoCategory[] }

/* ------------------------------------------------------------------ */
/*  Lexical rich-text helper (single paragraph)                       */
/* ------------------------------------------------------------------ */

const createRichText = (text: string): any => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
      },
    ],
  },
})

/* ------------------------------------------------------------------ */
/*  Seeder                                                            */
/* ------------------------------------------------------------------ */

async function seedProducts(): Promise<void> {
  const payload = await getPayload({ config })

  try {
    const demoDataPath = path.resolve(__dirname, 'demo-products.json')
    const demoData: DemoData = JSON.parse(fs.readFileSync(demoDataPath, 'utf-8'))

    payload.logger.info('🌱 Seeding products & categories from demo-products.json...')

    // 1. Wipe existing products & categories
    await payload.delete({ collection: 'products', where: { id: { exists: true } } })
    await payload.delete({ collection: 'product-categories', where: { id: { exists: true } } })
    await payload.delete({ collection: 'product-subcategories', where: { id: { exists: true } } })

    const createdProducts: { ref: string; id: string | number }[] = []
    const productRelations: {
      id: string | number
      relatedRefs: string[]
      youMayAlsoLikeRefs: string[]
    }[] = []

    // 2. Walk categories -> subcategories -> products
    for (const l1Cat of demoData.categories) {
      payload.logger.info(`Creating category: ${l1Cat.title}`)
      const l1Doc = await payload.create({
        collection: 'product-categories',
        locale: DEFAULT_LOCALE,
        data: {
          title: l1Cat.title,
          slug: l1Cat.slug,
          description: l1Cat.description ?? '',
        },
      })

      const createProductRecord = async (prod: DemoProduct, subcategoryId?: string) => {
        payload.logger.info(`    Creating product: ${prod.title}`)

        const pDoc = await payload.create({
          collection: 'products',
          locale: DEFAULT_LOCALE,
          data: {
            title: prod.title,
            slug: prod.slug,
            tagline: prod.tagline,
            category: l1Doc.id,
            ...(subcategoryId ? { subcategory: subcategoryId } : {}),
            description: createRichText(prod.description),
            keyFeatures: (prod.keyFeatures ?? []).map((feature) => ({ feature })),
            packSizes: (prod.packSizes ?? []).map((size) => ({ size })),
            coverage: prod.coverage,
            isPaintable: prod.isPaintable ?? true,
            coverageRate: prod.coverageRate ?? 180,
            pricePerLitre: prod.pricePerLitre ?? 550,
            applicationMethod: prod.applicationMethod,
            surfaceCompatibility: prod.surfaceCompatibility,
            dryingTime: prod.dryingTime,
            recommendedPrimer: prod.recommendedPrimer,
            basicComposition: prod.basicComposition,
            paintFilmProperties: prod.paintFilmProperties,
            finish: prod.finish,
            appearance: prod.appearance,
            specificGravity: prod.specificGravity,
            viscosity: prod.viscosity,
            scrubResistance: prod.scrubResistance,
            volumeSolids: prod.volumeSolids,
            dft: prod.dft,
            thinner: prod.thinner,
            thinningRatio: prod.thinningRatio,
            durability: prod.durability,
            isWarrantyAvailable: prod.isWarrantyAvailable ?? false,
            shelfLife: prod.shelfLife,
            sheenLevel: prod.sheenLevel,
            surfacePreparationNew: prod.surfacePreparationNew,
            surfacePreparationOld: prod.surfacePreparationOld,
            availableColours: (prod.availableColours ?? []).map((c) => ({
              name: c.name,
              color: c.hex,
            })),
          },
        })

        createdProducts.push({ ref: prod.ref, id: pDoc.id })
        productRelations.push({
          id: pDoc.id,
          relatedRefs: prod.relatedProducts ?? [],
          youMayAlsoLikeRefs: prod.youMayAlsoLike ?? [],
        })
      }

      // Direct products on category
      for (const prod of (l1Cat as any).products ?? []) {
        await createProductRecord(prod)
      }

      // Products within subcategories
      for (const l2Cat of l1Cat.subcategories ?? []) {
        payload.logger.info(`  Creating subcategory: ${l2Cat.title}`)
        const l2Doc = await payload.create({
          collection: 'product-subcategories',
          locale: DEFAULT_LOCALE,
          data: {
            title: l2Cat.title,
            slug: l2Cat.slug,
            parentCategory: l1Doc.id,
            description: l2Cat.description ?? '',
          },
        })

        for (const prod of l2Cat.products ?? []) {
          await createProductRecord(prod, l2Doc.id)
        }
      }
    }

    // 3. Wire up relatedProducts / youMayAlsoLike now that every product has an ID
    const getProdId = (ref: string) => createdProducts.find((p) => p.ref === ref)?.id

    payload.logger.info('🔗 Linking related products...')
    for (const rel of productRelations) {
      const relatedIds = rel.relatedRefs.map(getProdId).filter(Boolean) as any
      const youMayAlsoLikeIds = rel.youMayAlsoLikeRefs
        .map(getProdId)
        .filter(Boolean) as any

      if (relatedIds.length > 0 || youMayAlsoLikeIds.length > 0) {
        await payload.update({
          collection: 'products',
          id: rel.id,
          locale: DEFAULT_LOCALE,
          data: {
            relatedProducts: relatedIds,
            youMayAlsoLike: youMayAlsoLikeIds,
          },
        })
      }
    }

    payload.logger.info(`✅ Seeded ${createdProducts.length} products across ${demoData.categories.length} categories.`)
    process.exit(0)
  } catch (error) {
    payload.logger.error(error as Error)
    process.exit(1)
  }
}

seedProducts()