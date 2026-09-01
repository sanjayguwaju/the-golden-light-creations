import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Staff } from "../../../payload-types";
import localization from "../../../i18n/localization";

const LOCALES = localization.locales.map((l) => l.code);

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating staff: ${doc.slug}`);

      for (const loc of LOCALES) {
        if (doc.slug) {
          revalidatePath(`/${loc}/staffs/${doc.slug}`);
        }
        revalidatePath(`/${loc}/our-team`);
        revalidatePath(`/${loc}`);

        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePath(`/${loc}/staffs/${previousDoc.slug}`);
        }
      }

      if (doc.slug) {
        revalidatePath(`/staffs/${doc.slug}`);
      }
      revalidatePath("/our-team");
      revalidatePath("/");

      revalidateTag("staffs");
      if (doc.slug) {
        revalidateTag(`staffs_${doc.slug}`);
      }
      if (previousDoc?.slug) {
        revalidateTag(`staffs_${previousDoc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating staff: ${err}`);
    }
  }
  return doc;
};

export const revalidateStaffDelete: CollectionAfterDeleteHook<Staff> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const loc of LOCALES) {
        if (doc?.slug) {
          revalidatePath(`/${loc}/staffs/${doc.slug}`);
        }
        revalidatePath(`/${loc}/our-team`);
        revalidatePath(`/${loc}`);
      }

      if (doc?.slug) {
        revalidatePath(`/staffs/${doc.slug}`);
      }
      revalidatePath("/our-team");
      revalidatePath("/");

      revalidateTag("staffs");
      if (doc?.slug) {
        revalidateTag(`staffs_${doc.slug}`);
      }
      revalidateTag("pages-sitemap");
    } catch (err) {
      payload.logger.error(`Error revalidating deleted staff: ${err}`);
    }
  }
  return doc;
};
