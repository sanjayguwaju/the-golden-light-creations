import type { Block } from "payload";

export const V5StatsBlock: Block = {
  slug: "v5Stats",
  interfaceName: "V5StatsBlock",
  labels: {
    singular: "[V5 Editorial] Floating Stats Bar",
    plural: "[V5 Editorial] Floating Stats Bars",
  },
  fields: [
    {
      name: "stats",
      type: "array",
      label: "Metrics Items",
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        { num: "5+", label: "Years of Craft" },
        { num: "300+", label: "Projects Delivered" },
        { num: "250+", label: "Happy Clients" },
        { num: "10M+", label: "Social Reach" },
      ],
      fields: [
        {
          name: "num",
          type: "text",
          required: true,
          label: "Metric Value (e.g. 5+, 300+)",
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Metric Label",
        },
      ],
    },
    {
      name: "pullUp",
      type: "checkbox",
      label: "Pull Up over Previous Section (-46px offset)",
      defaultValue: true,
    },
  ],
};
