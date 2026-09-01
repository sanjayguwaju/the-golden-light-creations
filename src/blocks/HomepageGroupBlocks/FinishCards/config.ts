import type { Block } from "payload";

export const FinishCards: Block = {
  slug: "finishCards",
  interfaceName: "FinishCardsBlock",
  labels: {
    singular: "Finish Cards",
    plural: "Finish Cards Blocks",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label",
      defaultValue: "Surface Finishes",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Choose the Perfect Finish",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      defaultValue: "Each finish is engineered for a specific ambience.",
    },
    {
      name: "finishes",
      type: "array",
      label: "Finishes",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Finish Name",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Finish Image Preview",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          label: "Description",
          required: true,
        },
        {
          name: "texture",
          type: "text",
          label: "Texture Utility (optional)",
          defaultValue: "bg-zinc-200",
        },
      ],
    },
  ],
};
