import type { Block } from "payload";

export const AboutHero: Block = {
  slug: "aboutHero",
  interfaceName: "AboutHeroBlock",
  labels: {
    singular: "About Hero",
    plural: "About Heros",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "About Us",
    },
    {
      name: "titleLineOne",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "titleLineTwo",
      type: "text",
      localized: true,
    },
    {
      name: "subtitle",
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
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageLabel",
      type: "text",
      localized: true,
    },
    {
      name: "imageCaption",
      type: "text",
      localized: true,
    },
  ],
};
