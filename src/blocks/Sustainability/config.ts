import type { Block } from 'payload'

export const Sustainability: Block = {
  slug: 'sustainability',
  interfaceName: 'SustainabilityBlock',
  labels: {
    singular: 'Sustainability Block',
    plural: 'Sustainability Blocks',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Our Commitment to Sustainability',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue:
            'At Reliance Paints, we believe in protecting both your walls and our planet. Our eco-friendly, zero-VOC and low-odor formulations ensure cleaner indoor air and sustainable manufacturing for generations.',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'introduction',
      type: 'richText',
      label: 'Introduction / Commitment Statement',
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'Sustainability Pillars',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Key Goals / Metrics',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: "e.g., '100%', 'Zero', '50k'",
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
