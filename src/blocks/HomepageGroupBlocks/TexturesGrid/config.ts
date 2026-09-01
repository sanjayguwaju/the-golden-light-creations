import type { Block } from "payload";

export const TexturesGrid: Block = {
  slug: "texturesGrid",
  interfaceName: "TexturesGridBlock",
  imageURL: "/blocks-preview/texturesGrid.webp",
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Textures & Finishes",
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "finishes",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "features",
          type: "array",
          fields: [
            {
              name: "feature",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "isFeatured",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "If checked, this finish will take up more space in the grid (e.g. span 2 columns/rows)",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "Optional link to the finish product page",
          },
        },
      ],
    },
  ],
};
