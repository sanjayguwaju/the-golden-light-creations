import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { ColorTrend } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateColorTrend: CollectionAfterChangeHook<ColorTrend> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating color trend`);

      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/color-trends`);
        revalidatePath(`/${loc}/colour-trends`);
        revalidatePath(`/${loc}/colors`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/color-trends");
      revalidatePath("/colour-trends");
      revalidatePath("/colors");
      revalidatePath("/");

      revalidateTag("color-trends");
      revalidateTag("colors");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating color trend: ${err}`);
    }
  }
  return doc;
};

export const revalidateColorTrendDelete: CollectionAfterDeleteHook<ColorTrend> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        revalidatePath(`/${loc}/color-trends`);
        revalidatePath(`/${loc}/colour-trends`);
        revalidatePath(`/${loc}/colors`);
        revalidatePath(`/${loc}`);
      }

      revalidatePath("/color-trends");
      revalidatePath("/colour-trends");
      revalidatePath("/colors");
      revalidatePath("/");

      revalidateTag("color-trends");
      revalidateTag("colors");
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted color trend: ${err}`);
    }
  }
  return doc;
};
