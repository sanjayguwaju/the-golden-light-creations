import type { Block } from "payload";

export const Quote: Block = {
  slug: "quote",
  imageURL: '/blocks-preview/quote.webp',
  imageAltText: 'Quote block preview',
  interfaceName: "QuoteBlock",
  fields: [
    {
      name: "quoteText",
      type: "textarea",
      label: "Quote Text",
      required: true,
    },
    {
      name: "attribution",
      type: "text",
      label: "Attribution (Name / Source)",
    },
    {
      name: "attributionTitle",
      type: "text",
      label: "Attribution Title / Role",
    },
    {
      name: "image",
      type: "upload",
      label: "Attribution Photo",
      relationTo: "media",
    },
    {
      name: "style",
      type: "select",
      label: "Style",
      defaultValue: "default",
      options: [
        { label: "Default", value: "default" },
        { label: "Highlight", value: "highlight" },
        { label: "Minimal", value: "minimal" },
      ],
    },
  ],
  labels: {
    plural: "Quotes",
    singular: "Quote",
  },
};
