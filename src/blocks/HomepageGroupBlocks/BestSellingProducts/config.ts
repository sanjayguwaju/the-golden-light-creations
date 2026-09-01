import type { Block } from "payload";

export const BestSellingProducts: Block = {
  slug: "bestSellingProducts",
  interfaceName: "BestSellingProductsBlock",
  labels: {
    singular: "Best Selling Products Block",
    plural: "Best Selling Products Blocks",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
      admin: {
        description: "Toggle to display or hide this block on the homepage.",
      },
    },
    {
      name: "badge",
      type: "text",
      localized: true,
      label: "Section Badge / Tagline",
      defaultValue: "Best Sellers",
    },
    {
      name: "title",
      type: "text",
      localized: true,
      label: "Main Title",
      required: true,
      defaultValue: "Our Best Selling Paints",
    },
    {
      name: "subtitle",
      type: "textarea",
      localized: true,
      label: "Subtitle / Description",
      defaultValue:
        "Our most sought-after coatings and primers, engineered for ultimate coverage, brilliant durability, and vibrant color retention across all seasons.",
    },
    {
      name: "populateBy",
      type: "select",
      label: "Populate Products By",
      defaultValue: "collection",
      options: [
        {
          label: "Automatic (Top Products from Catalog)",
          value: "collection",
        },
        {
          label: "Manual Selection (Choose specific products)",
          value: "selection",
        },
        {
          label: "Custom Product Cards (Manual data)",
          value: "custom",
        },
      ],
    },
    {
      name: "selectedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      label: "Select Best Selling Products",
      admin: {
        condition: (data, siblingData) => siblingData?.populateBy === "selection",
        description: "Pick up to 6 products to showcase in this section.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "Filter by Category (Optional)",
      admin: {
        condition: (data, siblingData) => siblingData?.populateBy === "collection",
        description: "Leave empty to include products across all categories.",
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Products to Show",
      defaultValue: 6,
      admin: {
        condition: (data, siblingData) => siblingData?.populateBy === "collection",
      },
    },
    {
      name: "columns",
      type: "select",
      label: "Grid Columns (Desktop)",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns (Default / Recommended)", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
    {
      name: "customProducts",
      type: "array",
      label: "Custom Product Cards",
      admin: {
        condition: (data, siblingData) => siblingData?.populateBy === "custom",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
          label: "Product Name",
        },
        {
          name: "tagline",
          type: "text",
          localized: true,
          label: "Tagline / Key Feature",
        },
        {
          name: "categoryTitle",
          type: "text",
          label: "Category Label",
          defaultValue: "Interior Emulsion",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Product Image",
        },
        {
          name: "badge",
          type: "text",
          label: "Card Badge",
          defaultValue: "Best Seller",
        },
        {
          name: "warranty",
          type: "text",
          label: "Warranty / Durability",
          defaultValue: "7-10 Yrs",
        },
        {
          name: "link",
          type: "text",
          label: "Product Link",
          defaultValue: "/products",
        },
        {
          name: "packSizes",
          type: "text",
          label: "Pack Sizes (e.g. 1L, 4L, 10L, 20L)",
          defaultValue: "1L, 4L, 10L, 20L",
        },
      ],
    },
    {
      name: "viewAllLink",
      type: "group",
      label: "View All Link",
      fields: [
        {
          name: "showLink",
          type: "checkbox",
          defaultValue: true,
          label: "Show View All Link",
        },
        {
          name: "label",
          type: "text",
          localized: true,
          defaultValue: "Explore Full Catalog",
          label: "Button Label",
        },
        {
          name: "url",
          type: "text",
          defaultValue: "/products",
          label: "Button URL",
        },
      ],
    },
  ],
};
