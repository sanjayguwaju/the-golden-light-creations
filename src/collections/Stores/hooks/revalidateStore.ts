import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Store } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateStore: CollectionAfterChangeHook<Store> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating store: ${doc.storeName}`);

      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/store-locator`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/store-locator");
      revalidatePath("/");

      revalidateTag("stores");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating store: ${err}`);
    }
  }
  return doc;
};

export const revalidateStoreDelete: CollectionAfterDeleteHook<Store> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/store-locator`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/store-locator");
      revalidatePath("/");

      revalidateTag("stores");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted store: ${err}`);
    }
  }
  return doc;
};
