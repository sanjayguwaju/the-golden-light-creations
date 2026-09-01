import type { Block } from "payload";

export const PremiumPaintsGrid: Block = {
  slug: "premiumPaintsGrid",
  interfaceName: "PremiumPaintsGridBlock",
  imageURL: "/blocks-preview/premiumPaintsGrid.webp",
  labels: {
    singular: "Premium Paints Grid",
    plural: "Premium Paints Grids",
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
      defaultValue: "Engineered for Every Surface",
      required: true,
      localized: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      defaultValue: "Discover our premium range of paints crafted for durability and aesthetic excellence.",
      localized: true,
    },
    {
      name: "populateBy",
      type: "select",
      label: "Populate Grid By",
      defaultValue: "manual",
      options: [
        { label: "Manual Selection", value: "manual" },
        { label: "Category (Auto)", value: "category" },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "Product Category",
      admin: {
        condition: (data) => data?.populateBy === "category",
        description: "Auto-fetch products from this category.",
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Products (Auto mode)",
      defaultValue: 4,
      min: 2,
      max: 8,
      admin: {
        condition: (data) => data?.populateBy === "category",
      },
    },
    {
      name: "cards",
      type: "array",
      label: "Grid Cards (Manual mode)",
      maxRows: 8,
      admin: {
        condition: (data) => data?.populateBy !== "category",
      },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          label: "Product",
          admin: {
            description: "Select a product to display.",
          },
        },
        {
          name: "overrideTitle",
          type: "text",
          label: "Override Title",
          admin: {
            description: "Leave blank to use the product title.",
          },
        },
        {
          name: "overrideSurface",
          type: "text",
          label: "Override Surface Label",
          admin: {
            description: "Leave blank to use the product tagline.",
          },
        },
        {
          name: "overrideImage",
          type: "upload",
          relationTo: "media",
          label: "Override Image",
          admin: {
            description: "Leave blank to use the first product image.",
          },
        },
        {
          name: "span",
          type: "select",
          label: "Grid Span",
          defaultValue: "tall",
          options: [
            { label: "Tall (1 col × 2 rows)", value: "tall" },
            { label: "Square (1 col × 1 row)", value: "square" },
            { label: "Wide (2 col × 1 row)", value: "wide" },
            { label: "Large (2 col × 2 rows)", value: "large" },
          ],
        },
        {
          name: "linkUrl",
          type: "text",
          label: "Link URL",
          admin: {
            description: "Defaults to /products/[slug]",
          },
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
          defaultValue: "View All Products",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          defaultValue: "/products",
        },
      ],
    },
  ],
};
