import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Product } from '../../../payload-types'
import localization from '../../../i18n/localization'

const LOCALES = localization.locales.map((l) => l.code)

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating product: ${doc.slug}`)

      // 1. Revalidate all localized single product pages and catalogs
      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/products/${doc.slug}`)
        }
        revalidatePath(`/${loc}/products`)
        revalidatePath(`/${loc}/products/all`)
        revalidatePath(`/${loc}`)

        // If slug changed, revalidate the old slug path too
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/products/${previousDoc.slug}`)
        }
      }

      // 2. Revalidate non-locale prefix paths
      if (doc.slug) {
        revalidatePath(`/products/${doc.slug}`)
      }
      revalidatePath('/products')
      revalidatePath('/products/all')
      revalidatePath('/')

      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidatePath(`/products/${previousDoc.slug}`)
      }

      // 3. Invalidate relevant cache tags
      revalidateTag('products')
      if (doc.slug) {
        revalidateTag(`products_${doc.slug}`)
      }
      if (previousDoc?.slug) {
        revalidateTag(`products_${previousDoc.slug}`)
      }
      revalidateTag('pages-sitemap')
      revalidateTag('product-categories')
      revalidateTag('product-subcategories')
    } catch (err) {
      payload.logger.error(`Error revalidating product: ${err}`)
    }
  }

  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating deleted product: ${doc?.slug}`)

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
        revalidateTag(`products_${doc.slug}`)
      }
      revalidatePath('/products')
      revalidatePath('/products/all')
      revalidatePath('/')

      revalidateTag('products')
      revalidateTag('pages-sitemap')
      revalidateTag('product-categories')
      revalidateTag('product-subcategories')
    } catch (err) {
      payload.logger.error(`Error revalidating deleted product: ${err}`)
    }
  }

  return doc
}
