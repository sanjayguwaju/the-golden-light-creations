import type { Block } from "payload";

export const PopularColours: Block = {
  slug: "popularColours",
  interfaceName: "PopularColoursBlock",
  imageURL: "/blocks-preview/popularColours.webp",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Popular Colours",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "layout",
      type: "select",
      label: "Display Layout",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
        { label: "Fan Deck", value: "fanDeck" },
        { label: "Details Explorer", value: "details" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Grid Columns",
      defaultValue: "4",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
        { label: "6 Columns", value: "6" },
      ],
      admin: {
        condition: (data) => data?.layout === "grid" || data?.layout === "details",
      },
    },
    {
      name: "selectionType",
      type: "select",
      label: "Colour Selection Method",
      defaultValue: "auto",
      options: [
        { label: "Automatic (Based on Sort/Filter)", value: "auto" },
        { label: "Manual Selection (Choose specific colors)", value: "manual" },
      ],
    },
    {
      name: "selectedColors",
      type: "relationship",
      relationTo: "colors",
      hasMany: true,
      label: "Select Colours",
      admin: {
        condition: (data) => data?.selectionType === "manual",
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Colors to Display",
      defaultValue: 8,
      min: 1,
      max: 24,
      admin: {
        condition: (data) => data?.selectionType !== "manual",
      },
    },
    {
      name: "sortBy",
      type: "select",
      label: "Sort By",
      defaultValue: "popularity",
      options: [
        { label: "Popularity (Highest First)", value: "popularity" },
        { label: "Popularity (Lowest First)", value: "popularity_asc" },
        { label: "Name (A-Z)", value: "name" },
        { label: "Name (Z-A)", value: "name_desc" },
        { label: "Featured Only", value: "featured" },
        { label: "Recently Added", value: "createdAt" },
      ],
      admin: {
        condition: (data) => data?.selectionType !== "manual",
      },
    },
    {
      name: "showHexCode",
      type: "checkbox",
      label: "Show Hex Code",
      defaultValue: true,
    },
    {
      name: "showDescription",
      type: "checkbox",
      label: "Show Description",
      defaultValue: false,
    },
    {
      name: "enableHoverEffect",
      type: "checkbox",
      label: "Enable Hover Effect",
      defaultValue: true,
    },
    {
      name: "clickAction",
      type: "select",
      label: "Click Action",
      defaultValue: "copy",
      options: [
        { label: "Copy Hex Code", value: "copy" },
        { label: "Navigate to Color Page", value: "navigate" },
        { label: "Navigate to Colors Finder", value: "finder" },
      ],
    },
    {
      name: "colorPagePath",
      type: "text",
      label: "Color Page Path",
      defaultValue: "/colors/",
      admin: {
        description: "Path to individual color pages. Will append color slug or ID.",
        condition: (data) => data?.clickAction === "navigate",
      },
    },
    {
      name: "finderPath",
      type: "text",
      label: "Colors Finder Path",
      defaultValue: "/colors",
      admin: {
        description: "Path to colors finder page. Will append color filter query parameter.",
        condition: (data) => data?.clickAction === "finder",
      },
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
          defaultValue: "View All Colours",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          defaultValue: "/colors",
        },
      ],
    },
  ],
  labels: {
    singular: "Popular Colours",
    plural: "Popular Colours Blocks",
  },
};
