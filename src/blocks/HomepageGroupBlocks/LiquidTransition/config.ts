import type { Block } from "payload";

export const LiquidTransition: Block = {
  slug: "liquidTransition",
  interfaceName: "LiquidTransitionBlock",
  labels: {
    singular: "Liquid Transition",
    plural: "Liquid Transitions",
  },
  fields: [
    {
      name: "topColor",
      type: "text",
      label: "Top Section Background Color (Hex or class)",
      defaultValue: "#FFFFFF",
      required: true,
    },
    {
      name: "bottomColor",
      type: "text",
      label: "Bottom Section Background Color (Hex or class)",
      defaultValue: "#C9A84C",
      required: true,
    },
    {
      name: "height",
      type: "number",
      label: "Transition Height (in px)",
      defaultValue: 200,
      admin: {
        description: "How tall the liquid transition svg should be.",
      },
    },
  ],
};
