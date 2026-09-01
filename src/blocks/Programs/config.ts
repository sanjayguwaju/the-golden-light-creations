import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Programs: Block = {
  slug: "programs",
  imageURL: '/blocks-preview/programs.webp',
  imageAltText: 'Programs block preview',
  interfaceName: "ProgramsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Programs",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle/Description",
      localized: true,
    },
    {
      name: "programs",
      type: "array",
      label: "Programs",
      minRows: 1,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Program Title",
          required: true,
          localized: true,
        },
        {
          name: "summary",
          type: "textarea",
          label: "Short Summary",
          localized: true,
        },
        {
          name: "description",
          type: "richText",
          label: "Full Description",
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
          label: "Program Image",
          relationTo: "media",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
        {
          name: "stats",
          type: "array",
          label: "Program Statistics",
          maxRows: 3,
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
            },
          ],
        },
        {
          name: "link",
          type: "group",
          label: "Learn More Link",
          fields: [
            {
              name: "url",
              type: "text",
              label: "URL",
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              defaultValue: "Learn More",
            },
          ],
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
        { label: "Accordion", value: "accordion" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns (Grid only)",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.layout === "grid",
      },
    },
    {
      name: "showViewAllButton",
      type: "checkbox",
      label: "Show View All Button",
      defaultValue: true,
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Link",
      defaultValue: "/programs",
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllButton,
      },
    },
  ],
  labels: {
    plural: "Programs Blocks",
    singular: "Programs Block",
  },
};
