import type { Block } from "payload";

export const HeroSection: Block = {
  slug: "heroSection",
  interfaceName: "HeroSectionBlock",
  fields: [
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "centered",
      options: [
        { label: "Centered Text", value: "centered" },
        { label: "Split (Text Left, Image Right)", value: "split" },
        { label: "Full Background Image", value: "fullscreen" },
      ],
    },
    {
      name: "pretitle",
      type: "text",
      label: "Pretitle (Optional)",
      localized: true,
    },
    {
      name: "title",
      type: "text",
      label: "Main Title",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle / Mission Statement",
      localized: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
    },
    {
      name: "foregroundImage",
      type: "upload",
      label: "Foreground/Feature Image",
      relationTo: "media",
      admin: {
        condition: (data) => data?.layout === "split",
      },
    },
    {
      name: "primaryCTA",
      type: "group",
      label: "Primary Call-to-Action",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Donate Now",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link URL",
          defaultValue: "/donate",
        },
        {
          name: "variant",
          type: "select",
          label: "Button Style",
          defaultValue: "default",
          options: [
            { label: "Primary", value: "default" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
      ],
    },
    {
      name: "secondaryCTA",
      type: "group",
      label: "Secondary Call-to-Action",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Learn More",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link URL",
          defaultValue: "/about",
        },
        {
          name: "variant",
          type: "select",
          label: "Button Style",
          defaultValue: "outline",
          options: [
            { label: "Primary", value: "default" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Hero Statistics",
      maxRows: 4,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Stat Value (e.g., '10K+')",
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Stat Label (e.g., 'Lives Impacted')",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "overlayOpacity",
      type: "select",
      label: "Image Overlay Opacity",
      defaultValue: "50",
      options: [
        { label: "None", value: "0" },
        { label: "Light (30%)", value: "30" },
        { label: "Medium (50%)", value: "50" },
        { label: "Dark (70%)", value: "70" },
      ],
    },
  ],
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
};
