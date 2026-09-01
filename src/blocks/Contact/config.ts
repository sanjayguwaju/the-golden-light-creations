import type { Block } from "payload";

export const Contact: Block = {
  slug: "contact",
  imageURL: '/blocks-preview/contact.webp',
  imageAltText: 'Contact block preview',
  interfaceName: "ContactBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Get in Touch",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "layout",
      type: "select",
      label: "Layout",
      defaultValue: "split",
      options: [
        { label: "Two Column (Addresses + Form)", value: "split" },
        { label: "Form Only", value: "formOnly" },
        { label: "Addresses Only", value: "addressesOnly" },
      ],
    },
    {
      name: "offices",
      type: "array",
      label: "Office Locations",
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: "country",
          type: "text",
          label: "Country/City Name",
          required: true,
          localized: true,
          defaultValue: "Nepal Office",
        },
        {
          name: "address",
          type: "textarea",
          label: "Full Address",
          required: true,
          localized: true,
        },
        {
          name: "phone",
          type: "text",
          label: "Phone Number",
        },
        {
          name: "email",
          type: "text",
          label: "Email",
        },
        {
          name: "officeHours",
          type: "text",
          label: "Office Hours",
          localized: true,
          defaultValue: "Sun - Fri: 9:00 AM - 5:00 PM",
        },
        {
          name: "mapUrl",
          type: "text",
          label: "Google Maps Embed URL",
        },
        {
          name: "flag",
          type: "upload",
          label: "Country Flag Icon",
          relationTo: "media",
        },
      ],
    },
    {
      name: "formSettings",
      type: "group",
      label: "Contact Form Settings",
      fields: [
        {
          name: "showForm",
          type: "checkbox",
          label: "Show Contact Form",
          defaultValue: true,
        },
        {
          name: "formTitle",
          type: "text",
          label: "Form Title",
          defaultValue: "Send us a Message",
          localized: true,
        },
        {
          name: "submitButtonText",
          type: "text",
          label: "Submit Button Text",
          defaultValue: "Send Message",
          localized: true,
        },
        {
          name: "successMessage",
          type: "textarea",
          label: "Success Message",
          localized: true,
          defaultValue: "Thank you! Your message has been sent successfully.",
        },
        {
          name: "recipientEmail",
          type: "text",
          label: "Form Recipient Email",
          admin: {
            description: "Where contact form submissions should be sent",
          },
        },
        {
          name: "fields",
          type: "select",
          label: "Form Fields",
          hasMany: true,
          defaultValue: ["name", "email", "subject", "message"],
          options: [
            { label: "Name", value: "name" },
            { label: "Email", value: "email" },
            { label: "Phone", value: "phone" },
            { label: "Subject", value: "subject" },
            { label: "Message", value: "message" },
            { label: "Organization", value: "organization" },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      fields: [
        {
          name: "platform",
          type: "select",
          label: "Platform",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Twitter/X", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "YouTube", value: "youtube" },
          ],
        },
        {
          name: "url",
          type: "text",
          label: "Profile URL",
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Style",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Muted/Gray", value: "muted" },
        { label: "Primary Color", value: "primary" },
      ],
    },
  ],
  labels: {
    plural: "Contact Blocks",
    singular: "Contact Block",
  },
};
