import type { Block } from 'payload'

export const ContractorsProgram: Block = {
  slug: 'contractorsProgram',
  interfaceName: 'ContractorsProgramBlock',
  labels: {
    singular: 'Contractors Program Block',
    plural: 'Contractors Program Blocks',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
          defaultValue: 'Reliance Pro Contractors',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Partner With The Best',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Elevate your painting business with exclusive pricing, priority support, and premium Reliance products tailored for professional contractors.',
        },
        {
          name: 'stats',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Paint Roller', value: 'PaintRoller' },
                { label: 'Trending Up', value: 'TrendingUp' },
                { label: 'Trophy', value: 'Trophy' },
                { label: 'Users', value: 'Users' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Program Benefits',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            "We understand the demands of professional painting. That's why we've designed a program that supports your business growth every step of the way.",
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Nepali Rupee', value: 'NepaliRupee' },
                { label: 'Percent', value: 'Percent' },
                { label: 'Headset', value: 'Headset' },
                { label: 'Package Open', value: 'PackageOpen' },
                { label: 'Trophy', value: 'Trophy' },
                { label: 'Users', value: 'Users' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'How To Join',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Three simple steps to unlock premium benefits.',
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Clipboard List', value: 'ClipboardList' },
                { label: 'Thumbs Up', value: 'ThumbsUp' },
                { label: 'Wrench', value: 'Wrench' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Ready to Upgrade Your Business?',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Join hundreds of top professionals who trust Reliance Paints to deliver quality and value on every job.',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Apply Now',
        },
      ],
    },
  ],
}
