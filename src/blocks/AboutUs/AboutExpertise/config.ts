import type { Block } from "payload";

export const AboutExpertise: Block = {
  slug: "aboutExpertise",
  interfaceName: "AboutExpertiseBlock",
  labels: {
    singular: "About Expertise",
    plural: "About Expertise Blocks",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Expertise",
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
      name: "bulletPoints",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
