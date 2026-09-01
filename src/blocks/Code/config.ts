import type { Block } from "payload";

export const Code: Block = {
  slug: "code",
  imageURL: '/blocks-preview/code.webp',
  imageAltText: 'Code block preview',
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "typescript",
      options: [
        {
          label: "Typescript",
          value: "typescript",
        },
        {
          label: "Javascript",
          value: "javascript",
        },
        {
          label: "CSS",
          value: "css",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
};
