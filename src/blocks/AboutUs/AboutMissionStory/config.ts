import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const AboutMissionStory: Block = {
  slug: "aboutMissionStory",
  interfaceName: "AboutMissionStoryBlock",
  labels: {
    singular: "About Mission & Story",
    plural: "About Mission & Story Blocks",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Banner Image",
    },
    {
      name: "imageLabel",
      type: "text",
      localized: true,
      label: "Banner Overlay Label",
    },
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Mission Statement",
    },
    {
      name: "heading",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "supportingText",
      type: "textarea",
      localized: true,
    },
    {
      name: "story",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: "stats",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
