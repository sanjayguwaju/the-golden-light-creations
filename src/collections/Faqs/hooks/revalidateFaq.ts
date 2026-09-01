import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Faq } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateFaq: CollectionAfterChangeHook<Faq> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating FAQ`);

      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/faqs`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/faqs");
      revalidatePath("/");

      revalidateTag("faqs");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating FAQ: ${err}`);
    }
  }
  return doc;
};

export const revalidateFaqDelete: CollectionAfterDeleteHook<Faq> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/faqs`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/faqs");
      revalidatePath("/");

      revalidateTag("faqs");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted FAQ: ${err}`);
    }
  }
  return doc;
};
