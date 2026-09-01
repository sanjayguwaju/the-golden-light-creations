import type { Block } from "payload";

export const QuickLinks: Block = {
  slug: "quickLinks",
  interfaceName: "QuickLinksBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "links",
      type: "array",
      label: "Quick Links",
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Link Title",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          localized: true,
        },
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
        {
          name: "link",
          type: "group",
          label: "Link Details",
          fields: [
            {
              name: "url",
              type: "text",
              label: "URL",
              required: true,
            },
            {
              name: "openInNewTab",
              type: "checkbox",
              label: "Open in New Tab",
              defaultValue: false,
            },
          ],
        },
        {
          name: "color",
          type: "select",
          label: "Accent Color",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Info", value: "info" },
          ],
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Horizontal Scroll", value: "horizontal" },
        { label: "List", value: "list" },
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
      ],
      admin: {
        condition: (data) => data?.layout === "grid",
      },
    },
    {
      name: "backgroundStyle",
      type: "select",
      label: "Background Style",
      defaultValue: "muted",
      options: [
        { label: "White", value: "white" },
        { label: "Muted/Gray", value: "muted" },
        { label: "Primary Light", value: "primaryLight" },
        { label: "Dark", value: "dark" },
      ],
    },
    {
      name: "showIcons",
      type: "checkbox",
      label: "Show Icons",
      defaultValue: true,
    },
  ],
  labels: {
    singular: "Quick Links",
    plural: "Quick Links Blocks",
  },
};
