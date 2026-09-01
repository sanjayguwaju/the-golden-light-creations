import type { Block } from "payload";

export const LatestNews: Block = {
  slug: "latestNews",
  interfaceName: "LatestNewsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Latest News",
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
      name: "source",
      type: "select",
      label: "News Source",
      defaultValue: "auto",
      options: [
        { label: "Auto (Latest from Posts)", value: "auto" },
        { label: "Manual Selection", value: "manual" },
      ],
    },
    {
      name: "posts",
      type: "relationship",
      label: "Select Posts",
      relationTo: "posts",
      hasMany: true,
      maxRows: 6,
      admin: {
        condition: (data) => data?.source === "manual",
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Posts to Show",
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: {
        condition: (data) => data?.source === "auto",
      },
    },
    {
      name: "category",
      type: "relationship",
      label: "Filter by Category",
      relationTo: "categories",
      admin: {
        condition: (data) => data?.source === "auto",
      },
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
        { label: "Featured + List", value: "featuredList" },
        { label: "Carousel", value: "carousel" },
      ],
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
      admin: {
        condition: (data) => data?.layout === "grid",
      },
    },
    {
      name: "showImages",
      type: "checkbox",
      label: "Show Featured Images",
      defaultValue: true,
    },
    {
      name: "showExcerpt",
      type: "checkbox",
      label: "Show Excerpt",
      defaultValue: true,
    },
    {
      name: "showDate",
      type: "checkbox",
      label: "Show Publication Date",
      defaultValue: true,
    },
    {
      name: "showAuthor",
      type: "checkbox",
      label: "Show Author",
      defaultValue: true,
    },
    {
      name: "showReadMore",
      type: "checkbox",
      label: "Show Read More Link",
      defaultValue: true,
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Link",
      defaultValue: "/news",
    },
  ],
  labels: {
    singular: "Latest News",
    plural: "Latest News Blocks",
  },
};
