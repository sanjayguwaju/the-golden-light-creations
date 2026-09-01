import type { Block } from "payload";

export const AboutValues: Block = {
  slug: "aboutValues",
  interfaceName: "AboutValuesBlock",
  labels: {
    singular: "About Values",
    plural: "About Values Blocks",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Core Values",
    },
    {
      name: "heading",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Value Card Image (Overrides fallback)",
        },
      ],
    },
  ],
};
