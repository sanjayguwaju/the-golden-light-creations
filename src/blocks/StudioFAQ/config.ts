import type { Block } from "payload";

export const StudioFAQBlock: Block = {
  slug: "studioFAQ",
  labels: {
    singular: "Studio FAQ",
    plural: "Studio FAQs",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Client Inquiries",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Frequently Asked",
    },
    {
      name: "highlight",
      type: "text",
      label: "Highlight Word",
      defaultValue: "Questions",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "Everything you need to know about our booking process, destination travel logistics, cinema camera hardware, and heirloom film delivery.",
    },
    {
      name: "items",
      type: "array",
      label: "FAQ Items",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          label: "Question",
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
          label: "Answer",
        },
      ],
    },
  ],
};
