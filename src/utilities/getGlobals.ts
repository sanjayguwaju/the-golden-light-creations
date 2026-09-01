import type { Config } from "src/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

type Global = keyof Config["globals"];

async function getGlobal(slug: Global, depth = 0, locale?: string) {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth,
    ...(locale ? { locale: locale as Parameters<typeof payload.findGlobal>[0]["locale"] } : {}),
  });

  return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale?: string) =>
  unstable_cache(async () => getGlobal(slug, depth, locale), [slug, ...(locale ? [locale] : [])], {
    tags: [`global_${slug}`],
  });
