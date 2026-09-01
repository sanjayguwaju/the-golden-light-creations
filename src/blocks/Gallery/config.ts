import type { Block } from "payload";

export const Gallery: Block = {
  slug: "gallery",
  imageURL: '/blocks-preview/gallery.webp',
  imageAltText: 'Gallery block preview',
  interfaceName: "GalleryBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "caption",
      type: "textarea",
      label: "Caption",
    },
    {
      name: "columns",
      type: "select",
      label: "Columns",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "Images",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          label: "Caption",
        },
      ],
    },
  ],
  labels: {
    plural: "Galleries",
    singular: "Gallery",
  },
};
