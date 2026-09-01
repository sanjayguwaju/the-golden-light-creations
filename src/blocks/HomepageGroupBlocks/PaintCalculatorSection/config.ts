import type { Block } from "payload";

export const PaintCalculatorSection: Block = {
  slug: "paintCalculatorSection",
  interfaceName: "PaintCalculatorSectionBlock",
  imageURL: "/blocks-preview/paintCalculatorSection.webp",
  labels: {
    singular: "Paint Calculator Section",
    plural: "Paint Calculator Sections",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label",
      defaultValue: "Paint Calculator",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Calculate Your Requirements",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      defaultValue: "Get an instant estimate — live as you type.",
      required: true,
    },
  ],
};
