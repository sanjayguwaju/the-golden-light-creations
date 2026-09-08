import { getCachedGlobal } from "./getGlobals";
import type { SiteSetting } from "@/payload-types";

/**
 * Fetches cached SiteSettings global tagged with 'global_site-settings'.
 * Automatically revalidated on change in the admin panel.
 */
export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const fetcher = getCachedGlobal("site-settings", 1);
    const settings = (await fetcher()) as SiteSetting | null;
    return settings;
  } catch (error) {
    console.warn("Failed to fetch site settings global:", error);
    return null;
  }
}
