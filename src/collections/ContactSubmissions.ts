import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    // Anyone can submit the form
    create: anyone,
    // Only admins can view, update, or delete submissions
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Form Submissions',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'message', 'source'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, index: true, admin: { width: '50%' } },
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', index: true, admin: { width: '50%' } },
        { 
          name: 'subject', 
          type: 'select', 
          required: true,
          index: true,
          options: [
            { label: 'Fresh Project', value: 'fresh-project' },
            { label: 'Buying Paint', value: 'buying-paint' },
            { label: 'Become a Dealer', value: 'become-dealer' },
            { label: 'Book Painting Service', value: 'book-painting-service' },
            { label: 'Other', value: 'other' },
          ],
          admin: { width: '50%' }
        },
      ]
    },
    { 
      name: 'message', 
      type: 'textarea', 
      required: true 
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Where this contact submission came from (e.g. Website Contact Page)',
        readOnly: true,
      }
    }
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'admin@reliancepaints.com',
              subject: `New Inquiry: ${doc.subject}`,
              html: `<p>Name: ${doc.name}</p><p>Email: ${doc.email}</p><p>Phone: ${doc.phone}</p><p>Message: ${doc.message}</p>`
            })
          } catch (error) {
            req.payload.logger.error(`Error sending email for submission ${doc.id}: ${error}`)
          }
        }
        return doc
      }
    ]
  }
}
