import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const FeaturedCauses: Block = {
  slug: "featuredCauses",
  interfaceName: "FeaturedCausesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Causes",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "causes",
      type: "array",
      label: "Featured Causes",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Cause Title",
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
                HeadingFeature({ enabledHeadingSizes: ["h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
        {
          name: "image",
          type: "upload",
          label: "Cause Image",
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
          name: "progress",
          type: "group",
          label: "Funding Progress",
          fields: [
            {
              name: "raised",
              type: "number",
              label: "Amount Raised",
            },
            {
              name: "goal",
              type: "number",
              label: "Funding Goal",
            },
            {
              name: "currency",
              type: "text",
              label: "Currency Symbol",
              defaultValue: "$",
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
              defaultValue: "/causes",
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              defaultValue: "Donate Now",
              localized: true,
            },
          ],
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Highlight as Featured",
          defaultValue: false,
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
        { label: "Featured + Grid", value: "featuredGrid" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Grid Columns",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
      admin: {
        condition: (data) => data?.layout === "grid" || data?.layout === "featuredGrid",
      },
    },
    {
      name: "showViewAll",
      type: "checkbox",
      label: "Show View All Button",
      defaultValue: true,
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Link",
      defaultValue: "/causes",
      admin: {
        condition: (data) => data?.showViewAll,
      },
    },
  ],
  labels: {
    singular: "Featured Causes",
    plural: "Featured Causes Blocks",
  },
};
