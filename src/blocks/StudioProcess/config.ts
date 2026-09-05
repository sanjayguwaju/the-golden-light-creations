import type { Block } from "payload";

export const StudioProcessBlock: Block = {
  slug: "studioProcess",
  labels: {
    singular: "Studio Process",
    plural: "Studio Processes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "The Creative Journey",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "How We Craft Your",
    },
    {
      name: "highlight",
      type: "text",
      label: "Highlight Word",
      defaultValue: "Vision",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "From initial consultation to final 4K master delivery, our structured production workflow ensures effortless elegance and cinema-grade results every time.",
    },
    {
      name: "steps",
      type: "array",
      label: "Workflow Steps",
      fields: [
        {
          name: "stepNumber",
          type: "text",
          required: true,
          label: "Step Number (e.g. 01)",
        },
        {
          name: "tag",
          type: "text",
          required: true,
          label: "Phase Tag (e.g. Pre-Production)",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Step Title",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Description",
        },
        {
          name: "iconType",
          type: "select",
          defaultValue: "compass",
          options: [
            { label: "Compass (Discovery)", value: "compass" },
            { label: "Camera (Production)", value: "camera" },
            { label: "Sliders (Post-Production)", value: "sliders" },
            { label: "Sparkles (Delivery)", value: "sparkles" },
          ],
        },
      ],
    },
  ],
};
