import type { Block } from "payload";

export const ImpactNumbers: Block = {
  slug: "impactNumbers",
  interfaceName: "ImpactNumbersBlock",
  fields: [
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Horizontal Row", value: "row" },
        { label: "Masonry", value: "masonry" },
      ],
    },
    {
      name: "pretitle",
      type: "text",
      label: "Pretitle",
      defaultValue: "Our Impact",
      localized: true,
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Making a Difference",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "stats",
      type: "array",
      label: "Impact Statistics",
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Stat Value",
          required: true,
          admin: {
            description: "e.g., '10,000+', '$2M', '50+'",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Stat Label",
          required: true,
          localized: true,
          admin: {
            description: "e.g., 'Lives Changed', 'Raised', 'Countries'",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Short Description",
          localized: true,
        },
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
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
      name: "backgroundStyle",
      type: "select",
      label: "Background Style",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Muted/Gray", value: "muted" },
        { label: "Primary Color", value: "primary" },
        { label: "Dark", value: "dark" },
        { label: "Gradient", value: "gradient" },
      ],
    },
    {
      name: "showIcons",
      type: "checkbox",
      label: "Show Icons",
      defaultValue: true,
    },
    {
      name: "animateNumbers",
      type: "checkbox",
      label: "Animate Numbers on Scroll",
      defaultValue: true,
    },
  ],
  labels: {
    singular: "Impact Numbers",
    plural: "Impact Numbers Blocks",
  },
};
