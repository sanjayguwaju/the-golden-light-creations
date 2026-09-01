import type { Block } from "payload";

export const NewsActivities: Block = {
  slug: "newsActivities",
  imageURL: '/blocks-preview/newsActivities.webp',
  imageAltText: 'NewsActivities block preview',
  interfaceName: "NewsActivitiesBlock",
  fields: [
    {
      name: "isVisibleOnHomepage",
      type: "checkbox",
      label: "Show in Homepage",
      defaultValue: true,
    },
    {
      name: "sectionTitle",
      type: "text",
      localized: true,
      label: "Section Title",
      defaultValue: "News & Activities",
    },
    {
      name: "limit",
      type: "number",
      label: "Number of items to display",
      defaultValue: 5,
      admin: {
        step: 1,
        description: "First item will be featured (large). Rest shown in sidebar.",
      },
    },
    {
      name: "filterByCategory",
      type: "relationship",
      label: "Filter by Category (optional)",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "viewAllLabel",
      type: "text",
      localized: true,
      label: "View All Button Label",
      defaultValue: "View All",
    },
    {
      name: "viewAllUrl",
      type: "text",
      label: "View All URL",
      defaultValue: "/list",
    },
  ],
  labels: {
    plural: "News & Activities Blocks",
    singular: "News & Activities Block",
  },
};
