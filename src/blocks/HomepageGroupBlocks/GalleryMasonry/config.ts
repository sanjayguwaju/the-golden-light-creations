import type { Block } from "payload";

export const GalleryMasonry: Block = {
  slug: "galleryMasonry",
  interfaceName: "GalleryMasonryBlock",
  labels: {
    singular: "Gallery Masonry",
    plural: "Gallery Masonrys",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "title",
      type: "text",
      label: "Section Tagline",
      defaultValue: "Real Homes",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Real Results",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue: "See how Reliance Paints transforms homes across India.",
      localized: true,
    },
    {
      name: "limit",
      type: "number",
      label: "Limit Items",
      defaultValue: 6,
      min: 1,
      max: 18,
      required: true,
    },
    {
      name: "buttonLabel",
      type: "text",
      label: "Button Label",
      defaultValue: "Submit Your Room",
      localized: true,
    },
    {
      name: "redirectClickToImage",
      type: "checkbox",
      defaultValue: true,
      label: "Redirect click to full image",
    },
    {
      name: "items",
      type: "array",
      label: "Gallery Items",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "color",
          type: "text",
          label: "Featured Color",
          required: true,
          localized: true,
        },
        {
          name: "room",
          type: "text",
          label: "Room Name / Category",
          required: true,
          localized: true,
        },
        {
          name: "tall",
          type: "checkbox",
          label: "Is Tall",
          defaultValue: false,
        },
      ],
    },
  ],
};
