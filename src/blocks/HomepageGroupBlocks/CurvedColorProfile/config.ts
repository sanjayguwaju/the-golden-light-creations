import type { Block } from "payload";

export const CurvedColorProfile: Block = {
  slug: "curvedColorProfile",
  interfaceName: "CurvedColorProfileBlock",
  imageURL: "/blocks-preview/curvedColorProfile.webp",
  labels: {
    singular: "Curved Color Profile",
    plural: "Curved Color Profiles",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Curved Color Profile for 2026",
      required: true,
      localized: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      localized: true,
    },
    {
      name: "swatches",
      type: "relationship",
      relationTo: "colors",
      hasMany: true,
      label: "Color Swatches",
      minRows: 1,
      maxRows: 12,
    },
    {
      name: "ctaButton",
      type: "group",
      label: "CTA Button",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Shop Now",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          defaultValue: "/colors",
        },
      ],
    },
    {
      name: "backgroundStyle",
      type: "select",
      label: "Background Style",
      defaultValue: "navy",
      options: [
        { label: "Navy (default)", value: "navy" },
        { label: "Dark", value: "dark" },
        { label: "Gold", value: "gold" },
      ],
    },
  ],
};
