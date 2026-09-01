import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { revalidateProduct, revalidateProductDelete } from './Products/hooks/revalidateProduct'

export const Products: CollectionConfig = {
  slug: 'products',
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Catalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'subcategory', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'tagline'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Optional sorting order. Lower numbers appear first.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'product-subcategories',
      index: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ data }) => {
        if (data?.category) {
          return { parentCategory: { equals: data.category } }
        }
        return true
      },
    },
    {
      name: 'isComingSoon',
      type: 'checkbox',
      label: 'Mark as Coming Soon / Under Formulation',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Check this to show a "Coming Soon" badge and hide incomplete specifications on frontend.',
      },
    },
    {
      name: 'availability',
      type: 'select',
      label: 'Availability Status',
      index: true,
      options: [
        { label: 'Available / In Stock', value: 'available' },
        { label: 'Coming Soon', value: 'coming_soon' },
        { label: 'Under Formulation', value: 'under_formulation' },
      ],
      defaultValue: 'available',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
            {
              name: 'keyFeatures',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              name: 'packSizes',
              type: 'array',
              fields: [
                {
                  name: 'size',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'isPaintable',
              type: 'checkbox',
              label: 'Can this product be used in the Paint Calculator?',
              defaultValue: false,
              index: true,
            },
            {
              name: 'coverageRate',
              type: 'number',
              label: 'Coverage Rate (sq. ft. per litre) for Calculator',
              admin: {
                condition: (data) => Boolean(data?.isPaintable),
              },
            },
            {
              name: 'pricePerLitre',
              type: 'number',
              label: 'Base Price Per Litre (Rs) for Calculator',
              admin: {
                condition: (data) => Boolean(data?.isPaintable),
              },
            },
            {
              name: 'coverage',
              type: 'text',
              label: 'Coverage Text (For display only)',
            },
            {
              name: 'applicationMethod',
              type: 'text',
            },
            {
              name: 'surfaceCompatibility',
              type: 'text',
            },
            {
              name: 'dryingTime',
              type: 'text',
            },
            {
              name: 'recommendedPrimer',
              type: 'text',
            },
            {
              name: 'basicComposition',
              type: 'text',
              label: 'Basic Composition / Binder',
            },
            {
              name: 'paintFilmProperties',
              type: 'textarea',
              label: 'Paint Film Properties',
            },
            {
              name: 'finish',
              type: 'text',
              label: 'Finish',
            },
            {
              name: 'appearance',
              type: 'text',
              label: 'Appearance or Consistency',
            },
            {
              name: 'specificGravity',
              type: 'text',
              label: 'Specific Gravity (kg/ltr)',
            },
            {
              name: 'viscosity',
              type: 'text',
              label: 'Viscosity',
            },
            {
              name: 'scrubResistance',
              type: 'text',
              label: 'Scrub Resistance',
            },
            {
              name: 'volumeSolids',
              type: 'text',
              label: 'Volume Solids',
            },
            {
              name: 'dft',
              type: 'text',
              label: 'DFT min. for coverage per coat',
            },
            {
              name: 'thinner',
              type: 'text',
              label: 'Thinner Recommended',
            },
            {
              name: 'thinningRatio',
              type: 'textarea',
              label: 'Thinning Ratio',
            },
            {
              name: 'isWarrantyAvailable',
              type: 'checkbox',
              label: 'Is Warranty Available?',
              defaultValue: false,
              admin: {
                description: 'Enable if this product comes with an official manufacturer warranty or durability guarantee.',
              },
            },
            {
              name: 'durability',
              type: 'text',
              label: 'Durability / Lifespan',
              admin: {
                condition: (data) => Boolean(data?.isWarrantyAvailable),
                placeholder: 'e.g. 10 Years Warranty / 5 Years Minimum',
                description: 'Shown only if Warranty / Durability is enabled for this product.',
              },
            },
            {
              name: 'shelfLife',
              type: 'text',
              label: 'Shelf Life',
            },
            {
              name: 'sheenLevel',
              type: 'text',
              label: 'Sheen Level',
            },
            {
              name: 'surfacePreparationNew',
              type: 'textarea',
              label: 'Surface Preparation for New Plaster',
            },
            {
              name: 'surfacePreparationOld',
              type: 'textarea',
              label: 'Surface Preparation for Old Plaster',
            },
            {
              name: 'comparison',
              type: 'group',
              label: 'Comparison Attributes',
              fields: [
                {
                  name: 'durability',
                  type: 'select',
                  options: [
                    { label: '1 Star', value: '★' },
                    { label: '2 Stars', value: '★★' },
                    { label: '3 Stars', value: '★★★' },
                    { label: '4 Stars', value: '★★★★' },
                    { label: '5 Stars', value: '★★★★★' },
                  ],
                  defaultValue: '★★★',
                },
                {
                  name: 'washability',
                  type: 'checkbox',
                  label: 'Washability',
                  defaultValue: false,
                },
                {
                  name: 'matteFinish',
                  type: 'checkbox',
                  label: 'Matte Finish',
                  defaultValue: false,
                },
                {
                  name: 'lowVOC',
                  type: 'checkbox',
                  label: 'Low VOC',
                  defaultValue: false,
                },
                {
                  name: 'warranty',
                  type: 'text',
                  label: 'Warranty (e.g. 10-Year Warranty, None)',
                  admin: {
                    condition: (data) => Boolean(data?.isWarrantyAvailable),
                  },
                },
                {
                  name: 'antiFungal',
                  type: 'checkbox',
                  label: 'Anti-Fungal',
                  defaultValue: false,
                },
                {
                  name: 'uvResistant',
                  type: 'checkbox',
                  label: 'UV Resistant',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'availableColours',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'color',
                  type: 'text',
                  label: 'Color (Hex or Name)',
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_equals: id,
                  },
                }
              },
            },
            {
              name: 'youMayAlsoLike',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_equals: id,
                  },
                }
              },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
