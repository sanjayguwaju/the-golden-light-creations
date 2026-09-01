import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { revalidateSubcategory, revalidateSubcategoryDelete } from './ProductSubcategories/hooks/revalidateSubcategory'

export const ProductSubcategories: CollectionConfig = {
  slug: 'product-subcategories',
  hooks: {
    afterChange: [revalidateSubcategory],
    afterDelete: [revalidateSubcategoryDelete],
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
    defaultColumns: ['title', 'slug', 'parentCategory', 'updatedAt'],
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
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
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
