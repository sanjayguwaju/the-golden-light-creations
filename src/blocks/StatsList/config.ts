import type { Block } from "payload";

export const StatsList: Block = {
  slug: "statsList",
  imageURL: '/blocks-preview/statsList.webp',
  imageAltText: 'StatsList block preview',
  interfaceName: "StatsListBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
          admin: {
            description: "e.g. 500+, 98%, 24/7",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          admin: {
            description: "e.g. Patients Served, Success Rate",
          },
        },
        {
          name: "description",
          type: "text",
          label: "Short Description",
        },
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
  ],
  labels: {
    plural: "Stats Lists",
    singular: "Stats List",
  },
};
