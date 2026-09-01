import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const DealershipInquiry: Block = {
  slug: 'dealershipInquiry',
  interfaceName: 'DealershipInquiryBlock',
  labels: {
    singular: 'Dealership Inquiry Block',
    plural: 'Dealership Inquiry Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Dealership Inquiry',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Join Nepal’s fastest growing paint network. Expand your business with industry-leading products, generous dealership margins, and comprehensive marketing support.',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Inquiry Form',
    },
  ],
}
