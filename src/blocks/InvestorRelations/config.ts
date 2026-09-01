import type { Block } from 'payload'

export const InvestorRelations: Block = {
  slug: 'investorRelations',
  interfaceName: 'InvestorRelationsBlock',
  labels: {
    singular: 'Investor Relations Block',
    plural: 'Investor Relations Blocks',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Title',
      required: true,
      defaultValue: 'Investor Relations',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Hero Subtitle',
      defaultValue:
        'Explore Reliance Paints corporate governance, financial reports, annual disclosures, and investor information.',
    },
    {
      name: 'overviewTitle',
      type: 'text',
      label: 'Overview Section Title',
      defaultValue: 'Company Overview & Strategic Growth',
    },
    {
      name: 'overviewContent',
      type: 'richText',
      label: 'Overview Content',
    },
    {
      name: 'reportsSectionTitle',
      type: 'text',
      label: 'Reports Section Title',
      defaultValue: 'Financial Statements & Annual Reports',
    },
    {
      name: 'reports',
      type: 'array',
      label: 'Reports & Disclosures',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
          required: true,
          defaultValue: 2025,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Annual Report', value: 'annual' },
            { label: 'Quarterly Report', value: 'quarterly' },
            { label: 'Financial Statement', value: 'financial' },
            { label: 'Corporate Presentation', value: 'presentation' },
            { label: 'Press Release / Disclosure', value: 'press' },
          ],
          required: true,
          defaultValue: 'annual',
        },
        {
          name: 'fileUrl',
          type: 'text',
          label: 'Direct File URL / PDF Link',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'files',
          label: 'Report Document Upload',
        },
      ],
    },
  ],
}
