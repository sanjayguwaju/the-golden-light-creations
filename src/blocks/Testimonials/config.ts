import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Testimonials: Block = {
  slug: "testimonials",
  imageURL: '/blocks-preview/testimonials.webp',
  imageAltText: 'Testimonials block preview',
  interfaceName: "TestimonialsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Stories of Impact",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "testimonials",
      type: "array",
      label: "Testimonials",
      minRows: 1,
      fields: [
        {
          name: "type",
          type: "select",
          label: "Type",
          defaultValue: "beneficiary",
          options: [
            { label: "Beneficiary Story", value: "beneficiary" },
            { label: "Donor Quote", value: "donor" },
            { label: "Volunteer Experience", value: "volunteer" },
            { label: "Partner Testimonial", value: "partner" },
          ],
        },
        {
          name: "quote",
          type: "richText",
          label: "Quote/Story",
          required: true,
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
          name: "authorName",
          type: "text",
          label: "Author Name",
          required: true,
          localized: true,
        },
        {
          name: "authorTitle",
          type: "text",
          label: "Author Title/Role",
          localized: true,
        },
        {
          name: "authorImage",
          type: "upload",
          label: "Author Photo",
          relationTo: "media",
        },
        {
          name: "location",
          type: "text",
          label: "Location",
          localized: true,
        },
        {
          name: "featuredImage",
          type: "upload",
          label: "Featured Image",
          relationTo: "media",
        },
        {
          name: "videoUrl",
          type: "text",
          label: "Video URL",
          admin: {
            description: "YouTube or Vimeo URL for video testimonials",
          },
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout",
      defaultValue: "carousel",
      options: [
        { label: "Carousel", value: "carousel" },
        { label: "Grid", value: "grid" },
        { label: "Masonry", value: "masonry" },
      ],
    },
    {
      name: "showTypeFilter",
      type: "checkbox",
      label: "Show Type Filter Tabs",
      defaultValue: true,
    },
  ],
  labels: {
    plural: "Testimonials Blocks",
    singular: "Testimonials Block",
  },
};
