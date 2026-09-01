import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "Reliance Paints Nepal offers a wide range of decorative and industrial paints. Enhance and protect your surfaces with our premium quality paints.",
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
    },
  ],
  siteName: "Reliance Paints",
  title: "Reliance Paints | Official Website",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
