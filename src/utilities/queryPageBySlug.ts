import configPromise from "@payload-config";
import { getPayload, type TypedLocale } from "payload";
import { draftMode } from "next/headers";
import { cache } from "react";
import type { Page } from "@/payload-types";

export const queryPageBySlug = cache(
  async ({
    slug,
    locale,
  }: {
    slug: string;
    locale: TypedLocale;
  }): Promise<Page | null> => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "pages",
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  }
);
