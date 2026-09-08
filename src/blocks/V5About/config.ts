import type { Block } from "payload";

export const V5AboutBlock: Block = {
  slug: "v5About",
  interfaceName: "V5AboutBlock",
  labels: {
    singular: "[V5 Editorial] Story & About",
    plural: "[V5 Editorial] Story & About",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Story",
    },
    {
      name: "title",
      type: "text",
      label: "Headline",
      defaultValue: "Crafting timeless visual stories across Nepal since 2019",
    },
    {
      name: "quote",
      type: "textarea",
      label: "Italic Pull Quote",
      defaultValue:
        "Every love story is rare, intimate, and sacred. We document feelings, not just poses.",
    },
    {
      name: "paragraph",
      type: "textarea",
      label: "Body Narrative",
      defaultValue:
        "From royal palace weddings in Kathmandu Valley to high-altitude cinematic pre-wedding shoots in the Himalayas, our team blends international film-grade cameras with heartfelt cultural storytelling.",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Story Image (Media Library)",
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Fallback Story Image URL",
      defaultValue:
        "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=85",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Text",
      defaultValue: "Read Our Full Story",
    },
    {
      name: "buttonLink",
      type: "text",
      label: "Button Link",
      defaultValue: "/about",
    },
  ],
};
