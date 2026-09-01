import type { Block } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const SuccessStories: Block = {
  slug: "successStories",
  interfaceName: "SuccessStoriesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Success Stories",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "stories",
      type: "array",
      label: "Stories",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "name",
          type: "text",
          label: "Person/Project Name",
          required: true,
          localized: true,
        },
        {
          name: "title",
          type: "text",
          label: "Title/Role",
          localized: true,
        },
        {
          name: "quote",
          type: "richText",
          label: "Quote/Story",
          required: true,
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
            },
          }),
        },
        {
          name: "image",
          type: "upload",
          label: "Photo",
          relationTo: "media",
        },
        {
          name: "program",
          type: "text",
          label: "Related Program/Cause",
          localized: true,
        },
        {
          name: "outcome",
          type: "text",
          label: "Outcome/Achievement",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Full Story Link",
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "cards",
      options: [
        { label: "Cards", value: "cards" },
        { label: "Carousel", value: "carousel" },
        { label: "Grid with Featured", value: "featuredGrid" },
      ],
    },
    {
      name: "showImages",
      type: "checkbox",
      label: "Show Photos",
      defaultValue: true,
    },
    {
      name: "showQuotes",
      type: "checkbox",
      label: "Show Full Quotes",
      defaultValue: true,
    },
  ],
  labels: {
    singular: "Success Stories",
    plural: "Success Stories Blocks",
  },
};
