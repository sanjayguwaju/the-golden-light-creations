import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const VolunteerCTA: Block = {
  slug: "volunteerCta",
  imageURL: '/blocks-preview/volunteerCta.webp',
  imageAltText: 'VolunteerCTA block preview',
  interfaceName: "VolunteerCtaBlock",
  fields: [
    {
      name: "style",
      type: "select",
      label: "CTA Style",
      defaultValue: "split",
      options: [
        { label: "Split (Image + Content)", value: "split" },
        { label: "Centered", value: "centered" },
        { label: "Full Width Banner", value: "banner" },
        { label: "Card Grid", value: "cards" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Join Our Mission",
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
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media",
    },
    {
      name: "benefits",
      type: "array",
      label: "Volunteer Benefits/Perks",
      maxRows: 4,
      fields: [
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "text",
          label: "Description",
          localized: true,
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
          label: "Button Label",
          defaultValue: "Become a Volunteer",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "Button URL",
          defaultValue: "/volunteer/signup",
        },
      ],
    },
    {
      name: "secondaryButton",
      type: "group",
      label: "Secondary Button",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Learn More",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "Button URL",
          defaultValue: "/volunteer",
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "accent",
      options: [
        { label: "Accent", value: "accent" },
        { label: "Primary", value: "primary" },
        { label: "Muted", value: "muted" },
        { label: "Dark", value: "dark" },
      ],
    },
    {
      name: "showStats",
      type: "checkbox",
      label: "Show Volunteer Stats",
      defaultValue: true,
    },
    {
      name: "stats",
      type: "array",
      label: "Stats",
      maxRows: 3,
      admin: {
        condition: (data, siblingData) => siblingData?.showStats,
      },
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: "Volunteer CTA Blocks",
    singular: "Volunteer CTA Block",
  },
};
