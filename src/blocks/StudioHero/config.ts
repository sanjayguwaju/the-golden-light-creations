import type { Block } from "payload";

export const StudioHeroBlock: Block = {
  slug: "studioHero",
  interfaceName: "StudioHeroBlock",
  labels: {
    singular: "Studio Cinematic Hero",
    plural: "Studio Cinematic Heroes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow Badge",
      defaultValue: "Nepal's Finest Creative Studio",
    },
    {
      name: "headlinePart1",
      type: "text",
      label: "Headline Part 1",
      defaultValue: "We Don't Just Shoot",
    },
    {
      name: "headlinePart2",
      type: "text",
      label: "Headline Part 2 (Gold Accent)",
      defaultValue: "We Create Emotions",
    },
    {
      name: "subheadline",
      type: "textarea",
      label: "Subheadline Description",
      defaultValue:
        "Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
    },
  ],
};
