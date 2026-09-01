import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Career } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateCareer: CollectionAfterChangeHook<Career> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating career: ${doc.slug}`);

      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/careers/${doc.slug}`);
        }
        revalidatePath(`/${loc}/careers`);
        revalidatePath(`/${loc}`);

        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/careers/${previousDoc.slug}`);
        }
      }

      if (doc.slug) {
        revalidatePath(`/careers/${doc.slug}`);
      }
      revalidatePath("/careers");
      revalidatePath("/");

      revalidateTag("careers");
      if (doc.slug) {
        revalidateTag(`careers_${doc.slug}`);
      }
      if (previousDoc?.slug) {
        revalidateTag(`careers_${previousDoc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating career: ${err}`);
    }
  }
  return doc;
};

export const revalidateCareerDelete: CollectionAfterDeleteHook<Career> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        if (doc?.slug) {
          revalidatePath(`/${loc}/careers/${doc.slug}`);
        }
        revalidatePath(`/${loc}/careers`);
        revalidatePath(`/${loc}`);
      }

      if (doc?.slug) {
        revalidatePath(`/careers/${doc.slug}`);
      }
      revalidatePath("/careers");
      revalidatePath("/");

      revalidateTag("careers");
      if (doc?.slug) {
        revalidateTag(`careers_${doc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted career: ${err}`);
    }
  }
  return doc;
};
