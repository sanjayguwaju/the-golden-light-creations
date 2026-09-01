import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { List } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateList: CollectionAfterChangeHook<List> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag("list");
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}`);
        revalidatePath(`/${loc}/notices`);
        if (doc.slug) {
          revalidatePath(`/${loc}/notices/${doc.slug}`);
        }
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/notices/${previousDoc.slug}`);
        }
      }

      revalidatePath("/");
      revalidatePath("/notices");
      if (doc.slug) {
        revalidatePath(`/notices/${doc.slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating notice: ${err}`);
    }
  }
  return doc;
};

export const revalidateListDelete: CollectionAfterDeleteHook<List> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag("list");
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}`);
        revalidatePath(`/${loc}/notices`);
        if (doc?.slug) {
          revalidatePath(`/${loc}/notices/${doc.slug}`);
        }
      }

      revalidatePath("/");
      revalidatePath("/notices");
      if (doc?.slug) {
        revalidatePath(`/notices/${doc.slug}`);
      }
    } catch (err) {
      payload.logger.error(`Error revalidating deleted notice: ${err}`);
    }
  }
  return doc;
};
