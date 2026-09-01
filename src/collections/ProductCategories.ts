import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { revalidateCategory, revalidateCategoryDelete } from './ProductCategories/hooks/revalidateCategory'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  hooks: {
    afterChange: [revalidateCategory],
    afterDelete: [revalidateCategoryDelete],
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
    defaultColumns: ['title', 'slug', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'description'],
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
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    slugField(),
  ],
}
