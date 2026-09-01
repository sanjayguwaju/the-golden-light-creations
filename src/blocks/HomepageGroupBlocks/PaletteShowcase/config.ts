import type { Block } from "payload";

export const PaletteShowcase: Block = {
  slug: "paletteShowcase",
  interfaceName: "PaletteShowcaseBlock",
  imageURL: "/blocks-preview/paletteShowcase.webp",
  labels: {
    singular: "Palette Showcase",
    plural: "Palette Showcases",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label (above heading)",
      defaultValue: "1,500+ Shades",
      localized: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      defaultValue: "To Define Your Space",
      required: true,
      localized: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Section Subheading",
      defaultValue: "Scroll through curated palette groups and find your perfect color story.",
      localized: true,
    },
    {
      name: "palettes",
      type: "array",
      label: "Color Palettes",
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: "name",
          type: "text",
          label: "Palette Name",
          required: true,
        },
        {
          name: "colors",
          type: "array",
          label: "Colors",
          minRows: 2,
          maxRows: 8,
          fields: [
            {
              name: "name",
              type: "text",
              label: "Color Name",
              required: true,
            },
            {
              name: "hex",
              type: "text",
              label: "Hex Code (e.g. #C8724A)",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "moodImages",
      type: "array",
      label: "Mood / Room Images",
      minRows: 0,
      maxRows: 6,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Image",
        },
        {
          name: "caption",
          type: "text",
          label: "Caption",
          defaultValue: "Room Inspiration",
        },
        {
          name: "linkLabel",
          type: "text",
          label: "Link Label",
          defaultValue: "Browse the full collection →",
        },
        {
          name: "linkUrl",
          type: "text",
          label: "Link URL",
          defaultValue: "/colors",
        },
      ],
    },
    {
      name: "viewAllLink",
      type: "group",
      label: "View All Link",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Explore All Palettes",
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
  ],
};
