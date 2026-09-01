import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Color } from '../../../payload-types'
import localization from '../../../i18n/localization'

const LOCALES = localization.locales.map((l) => l.code)

export const revalidateColor: CollectionAfterChangeHook<Color> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating color: ${doc.slug}`)

      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/colors/${doc.slug}`)
        }
        revalidatePath(`/${loc}/colors`)
        revalidatePath(`/${loc}/colour-trends`)
        revalidatePath(`/${loc}/color-trends`)
        revalidatePath(`/${loc}`)

        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/colors/${previousDoc.slug}`)
        }
      }

      if (doc.slug) {
        revalidatePath(`/colors/${doc.slug}`)
      }
      revalidatePath('/colors')
      revalidatePath('/colour-trends')
      revalidatePath('/color-trends')
      revalidatePath('/')

      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidatePath(`/colors/${previousDoc.slug}`)
      }

      revalidateTag('colors')
      if (doc.slug) {
        revalidateTag(`colors_${doc.slug}`)
      }
      if (previousDoc?.slug) {
        revalidateTag(`colors_${previousDoc.slug}`)
      }
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating color: ${err}`)
    }
  }

  return doc
}

export const revalidateColorDelete: CollectionAfterDeleteHook<Color> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating deleted color: ${doc?.slug}`)

      for (const loc of LOCALES) {
        if (doc?.slug) {
          revalidatePath(`/${loc}/colors/${doc.slug}`)
        }
        revalidatePath(`/${loc}/colors`)
        revalidatePath(`/${loc}/colour-trends`)
        revalidatePath(`/${loc}/color-trends`)
        revalidatePath(`/${loc}`)
      }

      if (doc?.slug) {
        revalidatePath(`/colors/${doc.slug}`)
        revalidateTag(`colors_${doc.slug}`)
      }
      revalidatePath('/colors')
      revalidatePath('/colour-trends')
      revalidatePath('/color-trends')
      revalidatePath('/')

      revalidateTag('colors')
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error(`Error revalidating deleted color: ${err}`)
    }
  }

  return doc
}
