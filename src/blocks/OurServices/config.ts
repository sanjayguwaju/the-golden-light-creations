import type { Block } from "payload";

export const OurServices: Block = {
  slug: "ourServices",
  imageURL: "/blocks-preview/ourServices.webp",
  imageAltText: "OurServices block preview",
  interfaceName: "OurServicesBlock",
  labels: {
    singular: "Product Categories Block",
    plural: "Product Categories Blocks",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      label: "Enable this block",
      defaultValue: true,
      admin: {
        description: "Toggle to display or hide this block on the page.",
      },
    },
    {
      name: "title",
      type: "text",
      localized: true,
      label: "Main Title",
      required: true,
      defaultValue: "Products We Offer",
    },
    {
      name: "subtitle",
      type: "textarea",
      localized: true,
      label: "Subtitle / Introduction",
      defaultValue: "We offer a wide range of the best quality products.",
    },
    {
      name: "badge",
      type: "text",
      localized: true,
      label: "Badge / Tagline",
      defaultValue: "Catalog Range",
    },
    {
      name: "populateBy",
      type: "select",
      label: "Populate Categories By",
      defaultValue: "collection",
      options: [
        {
          label: "All Categories (Automatic from Product Categories)",
          value: "collection",
        },
        {
          label: "Manual Selection (Choose specific categories)",
          value: "selection",
        },
        {
          label: "Custom Category Items (Manual cards)",
          value: "custom",
        },
      ],
    },
    {
      name: "selectedCategories",
      type: "relationship",
      relationTo: "product-categories",
      hasMany: true,
      label: "Select Categories",
      admin: {
        condition: (data) => data?.populateBy === "selection",
        description: "Choose which categories to display and in what order.",
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Categories to Display",
      defaultValue: 6,
      min: 1,
      max: 24,
      admin: {
        condition: (data) => data?.populateBy === "collection" || !data?.populateBy,
        description: "Maximum number of categories to fetch.",
      },
    },
    {
      name: "sortBy",
      type: "select",
      label: "Sort By",
      defaultValue: "displayOrder",
      options: [
        { label: "Display Order (Custom)", value: "displayOrder" },
        { label: "Newest First", value: "-createdAt" },
        { label: "Oldest First", value: "createdAt" },
        { label: "Title (A-Z)", value: "title" },
        { label: "Title (Z-A)", value: "-title" },
      ],
      admin: {
        condition: (data) => data?.populateBy === "collection" || !data?.populateBy,
      },
    },
    {
      name: "columns",
      type: "select",
      label: "Grid Columns",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
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
          label: "Show View All Link Button",
          defaultValue: true,
        },
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
    {
      name: "categories",
      type: "array",
      label: "Custom Category Items",
      localized: true,
      admin: {
        condition: (data) => data?.populateBy === "custom",
        description: "Manually specify category items if custom cards are needed.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Category Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Short Description",
        },
        {
          name: "icon",
          type: "select",
          label: "Icon",
          options: [
            { label: "Paint Brush", value: "paint-brush" },
            { label: "Paint Bucket", value: "paint-bucket" },
            { label: "Home (Interior)", value: "home" },
            { label: "Building (Exterior)", value: "building" },
            { label: "Wood", value: "wood" },
            { label: "Spray", value: "spray" },
            { label: "Drop", value: "drop" },
            { label: "Roller", value: "roller" },
            { label: "Palette", value: "palette" },
          ],
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Category Image",
        },
        {
          name: "link",
          type: "text",
          label: "Explore Link",
        },
      ],
    },
    {
      name: "isVisibleOnHomepage",
      type: "checkbox",
      label: "Show in Homepage (Legacy)",
      defaultValue: true,
      admin: {
        hidden: true,
      },
    },
  ],
};
