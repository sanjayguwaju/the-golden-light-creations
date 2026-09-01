import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Album } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateAlbum: CollectionAfterChangeHook<Album> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating album: ${doc.slug}`);

      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/album/${doc.slug}`);
        }
        revalidatePath(`/${loc}/albums`);
        revalidatePath(`/${loc}`);

        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/album/${previousDoc.slug}`);
        }
      }

      if (doc.slug) {
        revalidatePath(`/album/${doc.slug}`);
      }
      revalidatePath("/albums");
      revalidatePath("/");

      revalidateTag("albums");
      if (doc.slug) {
        revalidateTag(`albums_${doc.slug}`);
      }
      if (previousDoc?.slug) {
        revalidateTag(`albums_${previousDoc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating album: ${err}`);
    }
  }
  return doc;
};

export const revalidateAlbumDelete: CollectionAfterDeleteHook<Album> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        if (doc?.slug) {
          revalidatePath(`/${loc}/album/${doc.slug}`);
        }
        revalidatePath(`/${loc}/albums`);
        revalidatePath(`/${loc}`);
      }

      if (doc?.slug) {
        revalidatePath(`/album/${doc.slug}`);
      }
      revalidatePath("/albums");
      revalidatePath("/");

      revalidateTag("albums");
      if (doc?.slug) {
        revalidateTag(`albums_${doc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted album: ${err}`);
    }
  }
  return doc;
};
