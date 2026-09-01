import type { Block } from "payload";

export const HeroCarouselBlock: Block = {
  slug: "heroCarouselBlock",
  imageURL: '/blocks-preview/heroCarouselBlock.webp',
  imageAltText: 'HeroCarousel block preview',
  interfaceName: "HeroCarouselBlock",
  fields: [
    {
      name: "slides",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "badgeText",
          type: "text",
          defaultValue: "Premium Collection",
        },
        {
          name: "titlePrefix",
          type: "text",
          required: true,
          defaultValue: "SuperClean Matt",
        },
        {
          name: "titleHighlight",
          type: "text",
          defaultValue: "Pro",
        },
        {
          name: "subtitle",
          type: "text",
          defaultValue: "Premium Quality Paint",
        },
        {
          name: "primaryButtonText",
          type: "text",
          defaultValue: "Explore Range",
        },
        {
          name: "secondaryButtonText",
          type: "text",
          defaultValue: "View Palette",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            description: "Recommended size: 1920x1080 pixels (16:9). Keep the main subject centered so it remains safely visible when cropped on mobile devices.",
          },
        },
        {
          name: "imageCaption",
          type: "text",
          defaultValue: "SUPERCLEAN MATT PRO",
        },
      ],
    },
  ],
  labels: {
    plural: "Hero Carousel Blocks",
    singular: "Hero Carousel Block",
  },
};
