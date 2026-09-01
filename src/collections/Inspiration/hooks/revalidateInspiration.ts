import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Inspiration } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateInspiration: CollectionAfterChangeHook<Inspiration> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating inspiration`);

      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/inspiration`);
        revalidatePath(`/${loc}/colors`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/inspiration");
      revalidatePath("/colors");
      revalidatePath("/");

      revalidateTag("inspiration");
      revalidateTag("colors");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating inspiration: ${err}`);
    }
  }
  return doc;
};

export const revalidateInspirationDelete: CollectionAfterDeleteHook<Inspiration> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/inspiration`);
        revalidatePath(`/${loc}/colors`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/inspiration");
      revalidatePath("/colors");
      revalidatePath("/");

      revalidateTag("inspiration");
      revalidateTag("colors");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted inspiration: ${err}`);
    }
  }
  return doc;
};
