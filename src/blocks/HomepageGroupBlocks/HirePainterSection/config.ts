import type { Block } from "payload";

export const HirePainterSection: Block = {
  slug: "hirePainterSection",
  interfaceName: "HirePainterSectionBlock",
  labels: {
    singular: "Hire Painter Section",
    plural: "Hire Painter Sections",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label",
      defaultValue: "Professional Services",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Hire a Painter You Can Trust",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      defaultValue: "Our ColourCast-certified painters deliver flawless finishes — backed by an absolute satisfaction guarantee.",
      required: true,
    },
    {
      name: "features",
      type: "array",
      label: "Features",
      maxRows: 4,
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Icon",
          required: true,
          options: [
            { label: "Badge Check", value: "BadgeCheck" },
            { label: "Shield Check", value: "ShieldCheck" },
            { label: "Check Circle", value: "CheckCircle" },
            { label: "Clock", value: "Clock" },
          ],
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
};
