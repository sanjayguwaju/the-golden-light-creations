import type { Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        { label: "None", value: "none" },
        { label: "Studio Hero (Golden Light)", value: "studioHero" },
        { label: "High Impact", value: "highImpact" },
        { label: "Medium Impact", value: "mediumImpact" },
        { label: "Low Impact", value: "lowImpact" },
        { label: "Mission Hero", value: "missionHero" },
        { label: "Stats Hero", value: "statsHero" },
        { label: "Split Hero", value: "splitHero" },
        { label: "Video Hero", value: "videoHero" },
        { label: "Story Hero", value: "storyHero" },
        { label: "Minimal Hero", value: "minimalHero" },
      ],
      required: true,
    },
    {
      name: "richText",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) =>
          [
            "highImpact",
            "mediumImpact",
            "missionHero",
            "statsHero",
            "splitHero",
            "storyHero",
          ].includes(type),
      },
      relationTo: "media",
    },
    // Split Hero Layout Option
    {
      name: "splitLayout",
      type: "select",
      defaultValue: "left",
      label: "Split Layout",
      options: [
        { label: "Content Left / Image Right", value: "left" },
        { label: "Image Left / Content Right", value: "right" },
      ],
      admin: {
        condition: (_, { type } = {}) => type === "splitHero",
      },
    },
    // Video Hero Fields
    {
      name: "videoUrl",
      type: "text",
      label: "Video URL",
      admin: {
        description: "Direct URL to MP4 video file",
        condition: (_, { type } = {}) => type === "videoHero",
      },
    },
    {
      name: "videoPoster",
      type: "upload",
      label: "Video Poster Image",
      relationTo: "media",
      admin: {
        condition: (_, { type } = {}) => type === "videoHero",
      },
    },
    // Story Hero Fields
    {
      name: "storyQuote",
      type: "textarea",
      label: "Story Quote",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthor",
      type: "text",
      label: "Story Author Name",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthorTitle",
      type: "text",
      label: "Story Author Title",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthorImage",
      type: "upload",
      label: "Story Author Image",
      relationTo: "media",
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
  ],
  label: false,
};
