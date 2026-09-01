import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const WelcomeSection: Block = {
  slug: "welcomeSection",
  interfaceName: "WelcomeSectionBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Welcome Image",
    },
    {
      name: "features",
      type: "array",
      label: "Features/Highlights",
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "primaryButton",
      type: "group",
      label: "Primary Button",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          defaultValue: "/",
        },
      ],
    },
  ],
  labels: {
    singular: "Welcome Section",
    plural: "Welcome Sections",
  },
};
