import type { Block } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Accordion: Block = {
  slug: "accordion",
  imageURL: '/blocks-preview/accordion.webp',
  imageAltText: 'Accordion block preview',
  interfaceName: "AccordionBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
    },
    {
      name: "items",
      type: "array",
      label: "Accordion Items",
      minRows: 1,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title / Question",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          label: "Content / Answer",
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
            },
          }),
        },
      ],
    },
    {
      name: "defaultOpen",
      type: "checkbox",
      label: "Open first item by default",
      defaultValue: true,
    },
  ],
  labels: {
    plural: "Accordions",
    singular: "Accordion",
  },
};
