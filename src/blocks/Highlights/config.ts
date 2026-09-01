import type { Block } from "payload";

export const Highlights: Block = {
  slug: "highlights",
  imageURL: '/blocks-preview/highlights.webp',
  imageAltText: 'Highlights block preview',
  interfaceName: "HighlightsBlock",
  fields: [
    {
      name: "label",
      type: "text",
      defaultValue: "News and Informations",
      localized: true,
    },
    {
      name: "limit",
      type: "number",
      defaultValue: 10,
    },
    {
      name: "width",
      type: "select",
      defaultValue: "full",
      options: [
        { label: "Container", value: "container" },
        { label: "Full Width", value: "full" },
      ],
    },
  ],
  labels: {
    plural: "Highlights",
    singular: "Highlight",
  },
};
