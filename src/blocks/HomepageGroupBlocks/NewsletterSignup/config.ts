import type { Block } from "payload";

export const NewsletterSignup: Block = {
  slug: "newsletterSignup",
  interfaceName: "NewsletterSignupBlock",
  fields: [
    {
      name: "layout",
      type: "select",
      label: "Layout Style",
      defaultValue: "simple",
      options: [
        { label: "Simple (Inline)", value: "simple" },
        { label: "Card Style", value: "card" },
        { label: "Split (Text Left, Form Right)", value: "split" },
        { label: "Full Background", value: "fullscreen" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Stay Updated",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      defaultValue: "Subscribe to our newsletter for the latest updates and stories.",
      localized: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
    },
    {
      name: "backgroundStyle",
      type: "select",
      label: "Background Style",
      defaultValue: "primary",
      options: [
        { label: "Primary Color", value: "primary" },
        { label: "Secondary Color", value: "secondary" },
        { label: "Muted/Gray", value: "muted" },
        { label: "Dark", value: "dark" },
      ],
    },
    {
      name: "inputPlaceholder",
      type: "text",
      label: "Email Input Placeholder",
      defaultValue: "Enter your email address",
      localized: true,
    },
    {
      name: "buttonLabel",
      type: "text",
      label: "Button Label",
      defaultValue: "Subscribe",
      localized: true,
    },
    {
      name: "successMessage",
      type: "text",
      label: "Success Message",
      defaultValue: "Thank you for subscribing!",
      localized: true,
    },
    {
      name: "features",
      type: "array",
      label: "Features/Benefits",
      maxRows: 4,
      fields: [
        {
          name: "icon",
          type: "upload",
          label: "Icon",
          relationTo: "media",
        },
        {
          name: "text",
          type: "text",
          label: "Feature Text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "privacyNote",
      type: "text",
      label: "Privacy Note",
      defaultValue: "We respect your privacy. Unsubscribe at any time.",
      localized: true,
    },
    {
      name: "apiEndpoint",
      type: "text",
      label: "Newsletter API Endpoint",
      defaultValue: "/api/newsletter/subscribe",
    },
  ],
  labels: {
    singular: "Newsletter Signup",
    plural: "Newsletter Signup Blocks",
  },
};
