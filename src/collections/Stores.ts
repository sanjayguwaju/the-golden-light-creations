import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateStore, revalidateStoreDelete } from './Stores/hooks/revalidateStore'

export const Stores: CollectionConfig = {
  slug: 'stores',
  hooks: {
    afterChange: [revalidateStore],
    afterDelete: [revalidateStoreDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Catalog',
    useAsTitle: 'storeName',
    defaultColumns: ['storeName', 'province', 'district', 'phone'],
    listSearchableFields: ['storeName', 'dealerCode', 'contactPerson', 'phone', 'email', 'city', 'district', 'address'],
  },
  fields: [
    { 
      name: 'storeName', 
      type: 'text', 
      required: true,
      label: 'Dealer / Store Name',
    },
    {
      name: 'dealerCode',
      type: 'text',
      label: 'Dealer Code / S.N.',
      admin: {
        description: 'Serial number or dealer code from machine report / CSV',
      },
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'area',
      type: 'text',
      label: 'Sales Area / Provision',
      admin: {
        description: 'e.g. PROVISION-1, PROVISION-2, etc.',
      },
    },
    {
      name: 'dealerType',
      type: 'select',
      label: 'Dealer Type',
      defaultValue: 'authorized_dealer',
      index: true,
      options: [
        { label: 'Authorized Dealer', value: 'authorized_dealer' },
        { label: 'Exclusive Tinting Center', value: 'tinting_center' },
        { label: 'Studio', value: 'studio' },
        { label: 'Showroom', value: 'showroom' },
      ],
    },
    { 
      name: 'province', 
      type: 'select', 
      required: true,
      index: true,
      options: [
        { label: 'Koshi', value: 'Koshi' },
        { label: 'Madhesh', value: 'Madhesh' },
        { label: 'Bagmati', value: 'Bagmati' },
        { label: 'Gandaki', value: 'Gandaki' },
        { label: 'Lumbini', value: 'Lumbini' },
        { label: 'Karnali', value: 'Karnali' },
        { label: 'Sudurpashchim', value: 'Sudurpashchim' },
      ],
      admin: {
        description: 'Standard province name in Nepal',
      },
    },
    { 
      name: 'district', 
      type: 'text', 
      required: true,
      index: true,
      admin: {
        description: 'e.g. Kathmandu, Lalitpur, Morang, Jhapa, etc.',
      },
    },
    { 
      name: 'address', 
      type: 'textarea', 
      required: true,
      label: 'Address / Location',
      admin: {
        description: 'Local address, chowk, town or municipality',
      },
    },
    { 
      name: 'phone', 
      type: 'text', 
      required: false,
      label: 'Contact Number',
      admin: {
        description: 'Phone / mobile number',
      },
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'contactPerson',
      type: 'text',
      label: 'Contact Person',
      required: false,
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: false,
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'operatingHours',
      type: 'text',
      label: 'Operating Hours',
      admin: {
        description: 'e.g. Mon–Sat: 9:00 AM – 6:00 PM',
      },
    },
    { 
      name: 'googleMapsUrl', 
      type: 'text',
      label: 'Google Maps Link',
    },
    {
      type: 'row',
      fields: [
        { 
          name: 'latitude', 
          type: 'number',
        },
        { 
          name: 'longitude', 
          type: 'number',
        },
      ],
    },
    {
      name: 'showOnHomepage',
      type: 'checkbox',
      label: 'Show on Homepage',
      defaultValue: false,
      index: true,
    },
  ],
}
