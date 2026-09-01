import type { Block } from "payload";

export const Feedback: Block = {
  slug: "feedback",
  imageURL: '/blocks-preview/feedback.webp',
  imageAltText: 'Feedback block preview',
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Feedback",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "viewCount",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Show a mock or dynamic view count at the bottom.",
      },
    },
  ],
  interfaceName: "FeedbackBlock",
};
