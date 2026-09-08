import type { Block } from "payload";

export const V5PortfolioBlock: Block = {
  slug: "v5Portfolio",
  interfaceName: "V5PortfolioBlock",
  labels: {
    singular: "[V5 Editorial] Curated Portfolio Grid",
    plural: "[V5 Editorial] Curated Portfolio Grids",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Work",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "A visual portfolio, shaped by light",
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Button Text",
      defaultValue: "Explore Full Portfolio",
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Button Link",
      defaultValue: "/portfolio",
    },
    {
      name: "items",
      type: "array",
      label: "Portfolio Grid Tiles",
      defaultValue: [
        {
          title: "Wedding — Kathmandu",
          imageUrl:
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
          size: "tall",
        },
        {
          title: "Bride Portrait — Pokhara",
          imageUrl:
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85",
          size: "standard",
        },
        {
          title: "Corporate Gala",
          imageUrl:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85",
          size: "standard",
        },
        {
          title: "Fashion Editorial",
          imageUrl:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
          size: "tall",
        },
        {
          title: "Couple Session — Nagarkot",
          imageUrl:
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85",
          size: "standard",
        },
        {
          title: "Concert Coverage",
          imageUrl:
            "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&q=85",
          size: "standard",
        },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Caption / Title",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Media Image",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Fallback Image URL",
        },
        {
          name: "size",
          type: "select",
          label: "Card Size",
          defaultValue: "standard",
          options: [
            { label: "Standard (1x1 row)", value: "standard" },
            { label: "Tall (Spans 2 rows)", value: "tall" },
          ],
        },
        {
          name: "link",
          type: "text",
          label: "Optional Link",
        },
      ],
    },
  ],
};
