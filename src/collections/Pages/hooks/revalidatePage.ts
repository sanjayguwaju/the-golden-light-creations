import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Page } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      const slug = doc.slug;
      payload.logger.info(`Revalidating page: ${slug}`);

      for (const loc of LOCALES) {
        const path = slug === "home" ? `/${loc}` : `/${loc}/${slug}`;
        revalidatePath(path);
        revalidatePath(path, "page");

        if (previousDoc?.slug && previousDoc.slug !== slug) {
          const oldPath = previousDoc.slug === "home" ? `/${loc}` : `/${loc}/${previousDoc.slug}`;
          revalidatePath(oldPath);
          revalidatePath(oldPath, "page");
        }
      }

      const rootPath = slug === "home" ? "/" : `/${slug}`;
      revalidatePath(rootPath);
      revalidatePath(rootPath, "page");
      if (previousDoc?.slug && previousDoc.slug !== slug) {
        const oldRootPath = previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`;
        revalidatePath(oldRootPath);
        revalidatePath(oldRootPath, "page");
      }

      if (slug === "home") {
        revalidatePath("/[locale]", "page");
      } else {
        revalidatePath(`/[locale]/${slug}`, "page");
      }
      revalidatePath("/", "layout");

      revalidateTag("pages-sitemap");
      revalidateTag("pages");
      if (slug) {
        revalidateTag(`pages_${slug}`);
      }
      if (previousDoc?.slug) {
        revalidateTag(`pages_${previousDoc.slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating page: ${err}`);
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      const slug = doc?.slug;
      for (const loc of LOCALES) {
        const path = slug === "home" ? `/${loc}` : `/${loc}/${slug}`;
        revalidatePath(path);
        revalidatePath(path, "page");
      }

      const rootPath = slug === "home" ? "/" : `/${slug}`;
      revalidatePath(rootPath);
      revalidatePath(rootPath, "page");

      if (slug === "home") {
        revalidatePath("/[locale]", "page");
      } else {
        revalidatePath(`/[locale]/${slug}`, "page");
      }
      revalidatePath("/", "layout");

      revalidateTag("pages-sitemap");
      revalidateTag("pages");
      if (slug) {
        revalidateTag(`pages_${slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating deleted page: ${err}`);
    }
  }

  return doc;
};
