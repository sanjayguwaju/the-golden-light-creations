import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  imageURL: '/blocks-preview/mediaBlock.webp',
  imageAltText: 'MediaBlock block preview',
  interfaceName: "MediaBlock",
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
