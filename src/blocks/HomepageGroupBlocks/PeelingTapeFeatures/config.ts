import type { Block } from "payload";

export const PeelingTapeFeatures: Block = {
  slug: "peelingTapeFeatures",
  interfaceName: "PeelingTapeFeaturesBlock",
  labels: {
    singular: "Peeling Tape Features",
    plural: "Peeling Tape Features",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Uncover The Quality",
      required: true,
      localized: true,
    },
    {
      name: "features",
      type: "array",
      label: "Features (Hidden under tape)",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
          label: "Feature Heading",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Feature Description",
        },
      ],
    },
  ],
};
