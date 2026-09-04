import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
    },
  ],
  siteName: "The Golden Light Creations",
  title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
