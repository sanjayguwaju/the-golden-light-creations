import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import localization from "../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

type StudioCollectionSlug = "portfolio" | "films" | "services" | "testimonials";

export const revalidateStudioCollection = (collectionSlug: StudioCollectionSlug): CollectionAfterChangeHook => {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      try {
        const itemSlug = (doc as any)?.slug;
        payload.logger.info(`Revalidating studio collection: ${collectionSlug}${itemSlug ? ` (${itemSlug})` : ""}`);

        // 1. Revalidate localized URLs
        for (const loc of LOCALES) {
          revalidatePath(`/${loc}`);
          if (collectionSlug === "testimonials") {
            revalidatePath(`/${loc}/services`);
            revalidatePath(`/${loc}/services`, "page");
          } else {
            revalidatePath(`/${loc}/${collectionSlug}`);
            revalidatePath(`/${loc}/${collectionSlug}`, "page");
            if (itemSlug) {
              revalidatePath(`/${loc}/${collectionSlug}/${itemSlug}`);
              revalidatePath(`/${loc}/${collectionSlug}/${itemSlug}`, "page");
            }
          }
        }

        // 2. Revalidate root URLs (default locale without prefix)
        revalidatePath("/");
        revalidatePath("/", "page");
        if (collectionSlug === "testimonials") {
          revalidatePath("/services");
          revalidatePath("/services", "page");
        } else {
          revalidatePath(`/${collectionSlug}`);
          revalidatePath(`/${collectionSlug}`, "page");
          if (itemSlug) {
            revalidatePath(`/${collectionSlug}/${itemSlug}`);
            revalidatePath(`/${collectionSlug}/${itemSlug}`, "page");
          }
        }

        // 3. Revalidate App Router dynamic parameterized routes
        if (collectionSlug === "testimonials") {
          revalidatePath("/[locale]/services", "page");
        } else {
          revalidatePath(`/[locale]/${collectionSlug}`, "page");
          if (collectionSlug === "services") {
            revalidatePath(`/[locale]/services/[slug]`, "page");
          }
        }
        revalidatePath("/[locale]", "page");

        // 4. Invalidate layout cache across the entire application
        revalidatePath("/", "layout");

        // 5. Invalidate Next.js cache tags
        revalidateTag(collectionSlug);
        if (itemSlug) {
          revalidateTag(`${collectionSlug}_${itemSlug}`);
        }
        revalidateTag("pages");
      } catch (err) {
        payload.logger.error(`Error revalidating ${collectionSlug}: ${err}`);
      }
    }
  };
};

export const revalidateStudioCollectionDelete = (collectionSlug: StudioCollectionSlug): CollectionAfterDeleteHook => {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      try {
        const itemSlug = (doc as any)?.slug;
        for (const loc of LOCALES) {
          revalidatePath(`/${loc}`);
          if (collectionSlug === "testimonials") {
            revalidatePath(`/${loc}/services`);
            revalidatePath(`/${loc}/services`, "page");
          } else {
            revalidatePath(`/${loc}/${collectionSlug}`);
            revalidatePath(`/${loc}/${collectionSlug}`, "page");
            if (itemSlug) {
              revalidatePath(`/${loc}/${collectionSlug}/${itemSlug}`);
              revalidatePath(`/${loc}/${collectionSlug}/${itemSlug}`, "page");
            }
          }
        }

        revalidatePath("/");
        revalidatePath("/", "page");
        if (collectionSlug === "testimonials") {
          revalidatePath("/services");
          revalidatePath("/services", "page");
        } else {
          revalidatePath(`/${collectionSlug}`);
          revalidatePath(`/${collectionSlug}`, "page");
          if (itemSlug) {
            revalidatePath(`/${collectionSlug}/${itemSlug}`);
            revalidatePath(`/${collectionSlug}/${itemSlug}`, "page");
          }
        }

        if (collectionSlug === "testimonials") {
          revalidatePath("/[locale]/services", "page");
        } else {
          revalidatePath(`/[locale]/${collectionSlug}`, "page");
          if (collectionSlug === "services") {
            revalidatePath(`/[locale]/services/[slug]`, "page");
          }
        }
        revalidatePath("/[locale]", "page");
        revalidatePath("/", "layout");

        revalidateTag(collectionSlug);
        if (itemSlug) {
          revalidateTag(`${collectionSlug}_${itemSlug}`);
        }
        revalidateTag("pages");
      } catch (err) {
        payload.logger.error(`Error revalidating deleted ${collectionSlug}: ${err}`);
      }
    }
  };
};
