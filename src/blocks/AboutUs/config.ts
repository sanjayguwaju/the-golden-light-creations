import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const AboutUs: Block = {
  slug: "aboutUs",
  imageURL: '/blocks-preview/aboutUs.webp',
  imageAltText: 'AboutUs block preview',
  interfaceName: "AboutUsBlock",
  fields: [
    {
      name: "isVisibleOnHomepage",
      type: "checkbox",
      label: "Show in Homepage",
      defaultValue: false,
    },
    {
      name: "title",
      type: "text",
      localized: true,
      label: "Title",
    },
    {
      name: "content",
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
      label: "About Content",
    },
    {
      name: "historyTitle",
      type: "text",
      localized: true,
      label: "History Title",
    },
    {
      name: "historyTimeline",
      type: "array",
      label: "Historical Timeline",
      localized: true,
      fields: [
        {
          name: "year",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "showFacebookIframe",
      type: "checkbox",
      label: "Show Facebook Iframe",
      defaultValue: false,
      admin: {
        // ✅ Fixed: was `isAvailableInHomepage`, matches the actual field name now
        condition: (_, siblingData) => siblingData?.isVisibleOnHomepage,
      },
    },
    {
      name: "facebookPageUrl",
      type: "text",
      label: "Facebook Page URL",
      admin: {
        condition: (_, siblingData) => siblingData?.showFacebookIframe,
      },
    },
    {
      name: "iframePosition",
      type: "select",
      label: "Iframe Position (Homepage Only)",
      defaultValue: "right",
      // ✅ Fixed: removed the stray duplicate field object that was here
      options: [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
      ],
      admin: {
        // ✅ Fixed: was `isAvailableInHomepage`, matches the actual field name now
        condition: (_, siblingData) =>
          siblingData?.isVisibleOnHomepage && siblingData?.showFacebookIframe,
      },
    },
  ],
  labels: {
    plural: "About Us Blocks",
    singular: "About Us Block",
  },
};