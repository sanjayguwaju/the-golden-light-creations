import type { Block } from "payload";

export const ColorsToSuit: Block = {
  slug: "colorsToSuit",
  interfaceName: "ColorsToSuitBlock",
  imageURL: "/blocks-preview/colorsToSuit.webp",
  labels: {
    singular: "Colors To Suit",
    plural: "Colors To Suits",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Colors to Suit Your Palette",
      required: true,
    },
    {
      name: "chips",
      type: "array",
      label: "Room Color Swatches",
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: "roomName",
          type: "text",
          label: "Room Name",
          required: true,
        },
        {
          name: "color",
          type: "relationship",
          relationTo: "colors",
          label: "Selected Color",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Room Preview Image",
          required: true,
        },
      ],
    },
  ],
};
