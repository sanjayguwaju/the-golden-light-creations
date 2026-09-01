import type { Block } from "payload";

export const BeforeAfterSplit: Block = {
  slug: "beforeAfterSplit",
  interfaceName: "BeforeAfterSplitBlock",
  imageURL: "/blocks-preview/beforeAfterSplit.webp",
  labels: {
    singular: "Before & After Split",
    plural: "Before & After Splits",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable Block",
    },
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Transform Your Space",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "See the difference with Reliance Paints",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Our premium paints bring life back into dull spaces. Slide to see the magic.",
    },
    {
      name: "beforeImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Before Image",
    },
    {
      name: "afterImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "After Image (Painted)",
    },
    {
      name: "ctaText",
      type: "text",
      defaultValue: "Explore Colors",
      label: "Button Text",
    },
    {
      name: "ctaLink",
      type: "text",
      defaultValue: "/colors",
      label: "Button Link",
    },
  ],
};
