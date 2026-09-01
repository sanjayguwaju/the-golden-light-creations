import type { Block } from "payload";

export const AboutHeritage: Block = {
  slug: "aboutHeritage",
  interfaceName: "AboutHeritageBlock",
  imageURL: "/blocks-preview/aboutHeritage.webp",
  labels: {
    singular: "About Heritage",
    plural: "About Heritage Blocks",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Our Heritage",
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
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageLabel",
      type: "text",
      localized: true,
    },
    {
      name: "milestones",
      type: "array",
      fields: [
        {
          name: "year",
          type: "text",
          required: true,
          localized: true,
        },
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
      ],
    },
  ],
};
