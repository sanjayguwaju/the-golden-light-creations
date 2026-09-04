import type { Block } from "payload";

export const StudioPillarsBlock: Block = {
  slug: "studioPillars",
  labels: {
    singular: "Studio Pillars",
    plural: "Studio Pillars",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "How We Work",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "The Studio",
    },
    {
      name: "highlight",
      type: "text",
      label: "Highlight Word",
      defaultValue: "Pillars",
    },
    {
      name: "items",
      type: "array",
      label: "Pillar Cards",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          required: true,
        },
        {
          name: "iconType",
          type: "select",
          defaultValue: "sparkles",
          options: [
            { label: "Sparkles (Light)", value: "sparkles" },
            { label: "Heart (Emotion)", value: "heart" },
            { label: "Video (Cinema Gear)", value: "video" },
            { label: "Shield (Reliability)", value: "shield" },
          ],
        },
      ],
    },
  ],
};
