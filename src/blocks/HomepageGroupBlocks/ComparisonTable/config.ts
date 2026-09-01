import type { Block } from "payload";

export const ComparisonTable: Block = {
  slug: "comparisonTable",
  interfaceName: "ComparisonTableBlock",
  imageURL: "/blocks-preview/comparisonTable.webp",
  labels: {
    singular: "Comparison Table",
    plural: "Comparison Tables",
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
      defaultValue: "Find the Right Paint",
      required: true,
      localized: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      defaultValue: "Compare features across our most popular paint ranges.",
      localized: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
      label: "Products to Compare",
      admin: {
        description: "Select 2 to 5 products to display in the comparison table.",
      },
    },
  ],
};
