import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { ProductCategory } from '../../../payload-types'
import localization from '../../../i18n/localization'

const LOCALES = localization.locales.map((l) => l.code)

export const revalidateCategory: CollectionAfterChangeHook<ProductCategory> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating category: ${doc.slug}`)

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

      revalidateTag('product-categories')
      revalidateTag('products')
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating category: ${err}`)
    }
  }

  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook<ProductCategory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating deleted category: ${doc?.slug}`)

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

      revalidateTag('product-categories')
      revalidateTag('products')
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating deleted category: ${err}`)
    }
  }

  return doc
}
