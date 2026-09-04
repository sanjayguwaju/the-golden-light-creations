import type { Block } from "payload";

export const StudioStoryBlock: Block = {
  slug: "studioStory",
  interfaceName: "StudioStoryBlock",
  labels: {
    singular: "Studio Story & Narrative",
    plural: "Studio Story & Narratives",
  },
  fields: [
    {
      name: "headline",
      type: "text",
      label: "Custom Headline",
      admin: {
        description: "Leave empty to use default from Studio Settings.",
      },
    },
    {
      name: "quote",
      type: "text",
      label: "Highlighted Quote",
      admin: {
        description: "Leave empty to use default from Studio Settings.",
      },
    },
    {
      name: "paragraph1",
      type: "textarea",
      label: "First Narrative Paragraph",
      admin: {
        description: "Leave empty to use default from Studio Settings.",
      },
    },
    {
      name: "paragraph2",
      type: "textarea",
      label: "Second Narrative Paragraph",
      admin: {
        description: "Leave empty to use default from Studio Settings.",
      },
    },
  ],
};
