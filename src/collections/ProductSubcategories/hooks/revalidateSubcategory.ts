import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { ProductSubcategory } from '../../../payload-types'
import localization from '../../../i18n/localization'

const LOCALES = localization.locales.map((l) => l.code)

export const revalidateSubcategory: CollectionAfterChangeHook<ProductSubcategory> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating subcategory: ${doc.slug}`)

      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/products/${doc.slug}`)
        }
        revalidatePath(`/${loc}/products`)
        revalidatePath(`/${loc}/products/all`)
        revalidatePath(`/${loc}`)

        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/products/${previousDoc.slug}`)
        }
      }

      if (doc.slug) {
        revalidatePath(`/products/${doc.slug}`)
      }
      revalidatePath('/products')
      revalidatePath('/products/all')
      revalidatePath('/')

      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidatePath(`/products/${previousDoc.slug}`)
      }

      revalidateTag('product-subcategories')
      revalidateTag('products')
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating subcategory: ${err}`)
    }
  }

  return doc
}

export const revalidateSubcategoryDelete: CollectionAfterDeleteHook<ProductSubcategory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating deleted subcategory: ${doc?.slug}`)

      for (const loc of LOCALES) {
        if (doc?.slug) {
          revalidatePath(`/${loc}/products/${doc.slug}`)
        }
        revalidatePath(`/${loc}/products`)
        revalidatePath(`/${loc}/products/all`)
        revalidatePath(`/${loc}`)
      }

      if (doc?.slug) {
        revalidatePath(`/products/${doc.slug}`)
      }
      revalidatePath('/products')
      revalidatePath('/products/all')
      revalidatePath('/')

      revalidateTag('product-subcategories')
      revalidateTag('products')
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating deleted subcategory: ${err}`)
    }
  }

  return doc
}
