import type { Block } from "payload";

export const AboutCTA: Block = {
  slug: "aboutCTA",
  interfaceName: "AboutCTABlock",
  labels: {
    singular: "About CTA",
    plural: "About CTA Blocks",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Ready to explore",
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
      name: "primaryCtaLabel",
      type: "text",
      localized: true,
    },
    {
      name: "primaryCtaHref",
      type: "text",
    },
    {
      name: "secondaryCtaLabel",
      type: "text",
      localized: true,
    },
    {
      name: "secondaryCtaHref",
      type: "text",
    },
  ],
};
