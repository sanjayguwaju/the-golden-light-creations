import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import localization from "../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

type StudioCollectionSlug = "portfolio" | "films" | "services" | "testimonials";

export const revalidateStudioCollection = (collectionSlug: StudioCollectionSlug): CollectionAfterChangeHook => {
  return ({ req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      try {
        payload.logger.info(`Revalidating studio collection: ${collectionSlug}`);
        for (const loc of LOCALES) {
          revalidatePath(`/${loc}`);
          if (collectionSlug === "testimonials") {
            revalidatePath(`/${loc}/services`);
          } else {
            revalidatePath(`/${loc}/${collectionSlug}`);
          }
        }

        revalidatePath("/");
        if (collectionSlug === "testimonials") {
          revalidatePath("/services");
        } else {
          revalidatePath(`/${collectionSlug}`);
        }

        revalidateTag(collectionSlug);
        revalidateTag("pages");
      } catch (err) {
        payload.logger.error(`Error revalidating ${collectionSlug}: ${err}`);
      }
    }
  };
};

export const revalidateStudioCollectionDelete = (collectionSlug: StudioCollectionSlug): CollectionAfterDeleteHook => {
  return ({ req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      try {
        for (const loc of LOCALES) {
          revalidatePath(`/${loc}`);
          if (collectionSlug === "testimonials") {
            revalidatePath(`/${loc}/services`);
          } else {
            revalidatePath(`/${loc}/${collectionSlug}`);
          }
        }

        revalidatePath("/");
        if (collectionSlug === "testimonials") {
          revalidatePath("/services");
        } else {
          revalidatePath(`/${collectionSlug}`);
        }

        revalidateTag(collectionSlug);
        revalidateTag("pages");
      } catch (err) {
        payload.logger.error(`Error revalidating deleted ${collectionSlug}: ${err}`);
      }
    }
  };
};
