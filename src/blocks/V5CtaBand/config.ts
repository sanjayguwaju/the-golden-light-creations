import type { Block } from "payload";

export const V5CtaBandBlock: Block = {
  slug: "v5CtaBand",
  interfaceName: "V5CtaBandBlock",
  labels: {
    singular: "[V5 Editorial] Commissions CTA Band",
    plural: "[V5 Editorial] Commissions CTA Bands",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow Badge",
      defaultValue: "2026 Commissions Open",
    },
    {
      name: "title",
      type: "text",
      label: "Headline",
      defaultValue: "Let's capture your next visual masterpiece",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Label",
      defaultValue: "Book Your Shoot",
    },
    {
      name: "buttonLink",
      type: "text",
      label: "Button Link",
      defaultValue: "#contact",
    },
  ],
};
