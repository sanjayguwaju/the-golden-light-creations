import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Category } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidatePostCategory: CollectionAfterChangeHook<Category> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating post category: ${doc.slug}`);

      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/posts`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/posts");
      revalidatePath("/");

      revalidateTag("categories");
      revalidateTag("posts");
      revalidateTag("posts-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating post category: ${err}`);
    }
  }
  return doc;
};

export const revalidatePostCategoryDelete: CollectionAfterDeleteHook<Category> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/posts`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/posts");
      revalidatePath("/");

      revalidateTag("categories");
      revalidateTag("posts");
      revalidateTag("posts-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted post category: ${err}`);
    }
  }
  return doc;
};
