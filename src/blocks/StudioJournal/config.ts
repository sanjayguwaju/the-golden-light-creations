import type { Block } from "payload";

export const StudioJournalBlock: Block = {
  slug: "studioJournal",
  labels: {
    singular: "Studio Journal",
    plural: "Studio Journals",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Studio Journal",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Stories, Craft &",
    },
    {
      name: "highlight",
      type: "text",
      label: "Highlight Word",
      defaultValue: "Perspectives",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "Behind the lens narratives, technical lighting breakdowns, destination wedding diaries, and creative inspirations from Nepal's finest visual team.",
    },
    {
      name: "limit",
      type: "number",
      label: "Number of posts to display",
      defaultValue: 3,
    },
  ],
};
