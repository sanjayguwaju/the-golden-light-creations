import type { Metadata } from "next";

import type { Media, Page, Post, Config } from "../payload-types";

import { mergeOpenGraph } from "./mergeOpenGraph";
import { getServerSideURL } from "./getURL";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/og-image.png";

  if (image && typeof image === "object" && "url" in image && image.url) {
    url = serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | Reliance Paints"
    : "Reliance Paints | Official Website";

  const description = doc?.meta?.description || "Reliance Paints Nepal offers a wide range of decorative and industrial paints. Enhance and protect your surfaces with our premium quality paints.";

  return {
    description: description,
    openGraph: mergeOpenGraph({
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "123456789",
    },
  };
};
