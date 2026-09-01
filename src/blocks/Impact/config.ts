import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Impact: Block = {
  slug: "impact",
  imageURL: '/blocks-preview/impact.webp',
  imageAltText: 'Impact block preview',
  interfaceName: "ImpactBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Impact",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "stats",
      options: [
        { label: "Statistics Grid", value: "stats" },
        { label: "Counter Animation", value: "counter" },
        { label: "Story Cards", value: "stories" },
        { label: "Infographic", value: "infographic" },
      ],
    },
    {
      name: "metrics",
      type: "array",
      label: "Impact Metrics",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
          admin: {
            description: "e.g. 50,000+, 100%, 1.5M",
          },
        },
        {
          name: "numericValue",
          type: "number",
          label: "Numeric Value (for counter animation)",
          admin: {
            description: "Enter number without formatting (e.g. 50000)",
          },
        },
        {
          name: "suffix",
          type: "text",
          label: "Suffix",
          admin: {
            description: "e.g. +, %, M",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          localized: true,
        },
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
      ],
    },
    {
      name: "featuredStory",
      type: "group",
      label: "Featured Story",
      admin: {
        condition: (data, siblingData) => siblingData?.layout === "stories",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Story Title",
          localized: true,
        },
        {
          name: "content",
          type: "richText",
          label: "Story Content",
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
        {
          name: "image",
          type: "upload",
          label: "Story Image",
          relationTo: "media",
        },
        {
          name: "quote",
          type: "textarea",
          label: "Featured Quote",
          localized: true,
        },
        {
          name: "author",
          type: "text",
          label: "Quote Author",
          localized: true,
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "primary",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Muted", value: "muted" },
        { label: "Dark", value: "dark" },
      ],
    },
    {
      name: "showYearBadge",
      type: "checkbox",
      label: "Show Year Badge",
      defaultValue: true,
    },
    {
      name: "yearBadgeText",
      type: "text",
      label: "Year Badge Text",
      defaultValue: "2024 Impact Report",
      localized: true,
    },
  ],
  labels: {
    plural: "Impact Blocks",
    singular: "Impact Block",
  },
};
