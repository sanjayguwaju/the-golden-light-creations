import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Post } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      const slug = doc.slug;
      payload.logger.info(`Revalidating post: ${slug}`);

      for (const loc of LOCALES) {
        if (slug) {
          revalidatePath(`/${loc}/posts/${slug}`);
        }
        revalidatePath(`/${loc}/posts`);
        revalidatePath(`/${loc}/posts/page/1`);
        revalidatePath(`/${loc}`);

        if (previousDoc?.slug && previousDoc.slug !== slug) {
          revalidatePath(`/${loc}/posts/${previousDoc.slug}`);
        }
      }

      if (slug) {
        revalidatePath(`/posts/${slug}`);
      }
      revalidatePath("/posts");
      revalidatePath("/");

      if (previousDoc?.slug && previousDoc.slug !== slug) {
        revalidatePath(`/posts/${previousDoc.slug}`);
      }

      revalidateTag("posts-sitemap");
      revalidateTag("posts");
      if (slug) {
        revalidateTag(`posts_${slug}`);
      }
      if (previousDoc?.slug) {
        revalidateTag(`posts_${previousDoc.slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating post: ${err}`);
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      const slug = doc?.slug;
      for (const loc of LOCALES) {
        if (slug) {
          revalidatePath(`/${loc}/posts/${slug}`);
        }
        revalidatePath(`/${loc}/posts`);
        revalidatePath(`/${loc}`);
      }

      if (slug) {
        revalidatePath(`/posts/${slug}`);
      }
      revalidatePath("/posts");
      revalidatePath("/");

      revalidateTag("posts-sitemap");
      revalidateTag("posts");
      if (slug) {
        revalidateTag(`posts_${slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating deleted post: ${err}`);
    }
  }

  return doc;
};
