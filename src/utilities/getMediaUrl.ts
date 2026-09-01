import { getClientSideURL } from "@/utilities/getURL";

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
  media: string | { url?: string | null; filename?: string | null } | null | undefined,
  cacheTag?: string | null,
): string => {
  if (!media) return "";

  let url = "";
  if (typeof media === "string") {
    url = media;
  } else if (typeof media === "object" && media !== null) {
    if (media.url) {
      url = media.url;
    } else if (media.filename) {
      url = `/media/${media.filename}`;
    }
  }

  if (!url) return "";

  let formattedUrl = url;
  try {
    formattedUrl = encodeURI(url).replace(/,/g, "%2C");
  } catch {
    formattedUrl = url;
  }

  if (cacheTag && cacheTag !== "") {
    const encodedTag = encodeURIComponent(cacheTag);
    const separator = formattedUrl.includes("?") ? "&" : "?";
    return `${formattedUrl}${separator}${encodedTag}`;
  }

  return formattedUrl;
};
