import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const MissionVision: Block = {
  slug: "missionVision",
  imageURL: '/blocks-preview/missionVision.webp',
  imageAltText: 'MissionVision block preview',
  interfaceName: "MissionVisionBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Purpose",
      localized: true,
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "cards",
      options: [
        { label: "Cards", value: "cards" },
        { label: "Side by Side", value: "sideBySide" },
        { label: "Timeline", value: "timeline" },
      ],
    },
    {
      name: "pillars",
      type: "array",
      label: "Mission/Vision/Values",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "richText",
          label: "Description",
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
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
        {
          name: "color",
          type: "select",
          label: "Accent Color",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Accent", value: "accent" },
            { label: "Muted", value: "muted" },
          ],
        },
      ],
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
    },
    {
      name: "showDivider",
      type: "checkbox",
      label: "Show Divider Lines",
      defaultValue: true,
    },
  ],
  labels: {
    plural: "Mission & Vision Blocks",
    singular: "Mission & Vision Block",
  },
};
