import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Booking Inquiry',
    plural: 'Booking Inquiries',
  },
  access: {
    // Anyone can submit the booking inquiry form
    create: anyone,
    // Only admins can view, update, or delete submissions
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Client Inquiries',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'service', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'service', 'message', 'source'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, index: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', index: true, admin: { width: '50%' } },
        {
          name: 'service',
          type: 'select',
          defaultValue: 'wedding',
          index: true,
          options: [
            { label: 'Wedding Photography & Film', value: 'wedding' },
            { label: 'Cinematic Videography', value: 'videography' },
            { label: 'Drone Aerial Cinematography', value: 'drone' },
            { label: 'Fashion & Commercial Editorial', value: 'fashion' },
            { label: 'Concert & Live Event Coverage', value: 'concert' },
            { label: 'Brand Digital Campaign', value: 'brand' },
            { label: 'Other Creative Inquiries', value: 'other' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Website Booking Form',
      admin: {
        description: 'Where this inquiry was submitted from',
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'sanjayguwaju@gmail.com'
            await req.payload.sendEmail({
              to: recipientEmail,
              subject: `New Studio Shoot Inquiry: ${doc.name} (${doc.service || 'General'})`,
              html: `
                <h2>New Booking Inquiry - The Golden Light Creations</h2>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phone || 'N/A'}</p>
                <p><strong>Service:</strong> ${doc.service}</p>
                <p><strong>Message:</strong></p>
                <p>${doc.message}</p>
              `,
            })
          } catch (error) {
            req.payload.logger.error(`Error sending notification email for inquiry ${doc.id}: ${error}`)
          }
        }
        return doc
      },
    ],
  },
  timestamps: true,
}
