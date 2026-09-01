import type { Block } from "payload";

export const BrandMarquee: Block = {
  slug: "brandMarquee",
  imageURL: '/blocks-preview/brandMarquee.webp',
  imageAltText: 'BrandMarquee block preview',
  interfaceName: "BrandMarqueeBlock",
  labels: {
    singular: "Brand Marquee",
    plural: "Brand Marquees",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Trusted By Industry Leaders & Retailers Across India",
    },
    {
      name: "brands",
      type: "array",
      label: "Brands",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          label: "Brand Name",
          admin: {
            description: "Used for accessibility and reference",
          },
        },
        {
          name: "text",
          type: "text",
          label: "Display Text",
          required: true,
        },
      ],
    },
  ],
};
