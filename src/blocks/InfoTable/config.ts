import type { Block } from "payload";

export const InfoTable: Block = {
  slug: "infoTable",
  imageURL: '/blocks-preview/infoTable.webp',
  imageAltText: 'InfoTable block preview',
  interfaceName: "InfoTableBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Table Heading",
    },
    {
      name: "caption",
      type: "text",
      label: "Table Caption",
    },
    {
      name: "headers",
      type: "array",
      label: "Column Headers",
      minRows: 1,
      maxRows: 6,
      admin: {
        description: "Define the columns of the table",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Column Header",
          required: true,
        },
      ],
    },
    {
      name: "rows",
      type: "array",
      label: "Rows",
      minRows: 1,
      fields: [
        {
          name: "cells",
          type: "array",
          label: "Cells",
          minRows: 1,
          fields: [
            {
              name: "value",
              type: "text",
              label: "Cell Value",
              required: true,
            },
            {
              name: "isHeader",
              type: "checkbox",
              label: "Is Row Header",
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: "style",
      type: "select",
      label: "Table Style",
      defaultValue: "striped",
      options: [
        { label: "Striped", value: "striped" },
        { label: "Bordered", value: "bordered" },
        { label: "Clean", value: "clean" },
      ],
    },
  ],
  labels: {
    plural: "Info Tables",
    singular: "Info Table",
  },
};
