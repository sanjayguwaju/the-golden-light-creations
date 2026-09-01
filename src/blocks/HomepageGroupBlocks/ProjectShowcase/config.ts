import type { Block } from "payload";

export const ProjectShowcase: Block = {
  slug: "projectShowcase",
  interfaceName: "ProjectShowcaseBlock",
  imageURL: "/blocks-preview/projectShowcase.webp",
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
      defaultValue: "Featured Showcases",
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "projects",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "category",
          type: "select",
          options: [
            { label: "Interior", value: "interior" },
            { label: "Exterior", value: "exterior" },
            { label: "Commercial", value: "commercial" },
          ],
          defaultValue: "interior",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "Optional URL to read more about this project",
          },
        },
        {
          name: "recommendedColor",
          type: "relationship",
          relationTo: "colors",
          admin: {
            description: "The primary color used in this project.",
          },
        },
        {
          name: "recommendedProduct",
          type: "relationship",
          relationTo: "products",
          admin: {
            description: "The primary paint product used in this project.",
          },
        },
      ],
    },
  ],
};
