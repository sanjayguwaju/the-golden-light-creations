import type { Block } from "payload";

export const HighlightsAndNews: Block = {
  slug: "highlightsAndNews",
  imageURL: '/blocks-preview/highlightsAndNews.webp',
  imageAltText: 'HighlightsAndNews block preview',
  interfaceName: "HighlightsAndNewsBlock",
  fields: [
    {
      name: "highlightsTitle",
      type: "text",
      localized: true,
      label: "Highlights Title",
      defaultValue: "Highlights",
    },
    {
      name: "newsTitle",
      type: "text",
      localized: true,
      label: "News Title",
      defaultValue: "Latest News",
    },
    {
      name: "highlightsLimit",
      type: "number",
      label: "Number of Highlights",
      defaultValue: 6,
    },
    {
      name: "newsLimit",
      type: "number",
      label: "Number of News Items",
      defaultValue: 3,
    },
    {
      name: "filterByCategory",
      type: "relationship",
      label: "Filter by Category (optional)",
      relationTo: "categories",
      hasMany: false,
    },
  ],
};
