import type { Block } from "payload";

export const ExcellenceStats: Block = {
  slug: "excellenceStats",
  interfaceName: "ExcellenceStatsBlock",
  imageURL: "/blocks-preview/excellenceStats.webp",
  labels: {
    singular: "Excellence Stats",
    plural: "Excellence Stats Blocks",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "pretitle",
      type: "text",
      label: "Pretitle",
      defaultValue: "Our Promise",
      localized: true,
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Engineered for Excellence",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      defaultValue: "Every can of Reliance Paints carries a commitment to quality.",
      localized: true,
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics Cards",
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Icon",
          defaultValue: "flask",
          options: [
            { label: "VOC/Flask (FlaskConical)", value: "flask" },
            { label: "Warranty/Shield (Shield)", value: "shield" },
            { label: "Certified/Award (Award)", value: "award" },
            { label: "Options/Palette (Palette)", value: "palette" },
          ],
          required: true,
        },
        {
          name: "value",
          type: "number",
          label: "Value",
          required: true,
          defaultValue: 0,
        },
        {
          name: "suffix",
          type: "text",
          label: "Suffix",
          defaultValue: "",
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
