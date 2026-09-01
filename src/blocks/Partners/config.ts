import type { Block } from "payload";

export const Partners: Block = {
  slug: "partners",
  imageURL: '/blocks-preview/partners.webp',
  imageAltText: 'Partners block preview',
  interfaceName: "PartnersBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Partners & Sponsors",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "partners",
      type: "array",
      label: "Partners",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          label: "Organization Name",
          required: true,
          localized: true,
        },
        {
          name: "type",
          type: "select",
          label: "Partner Type",
          defaultValue: "sponsor",
          options: [
            { label: "Platinum Sponsor", value: "platinum" },
            { label: "Gold Sponsor", value: "gold" },
            { label: "Silver Sponsor", value: "silver" },
            { label: "Bronze Sponsor", value: "bronze" },
            { label: "Strategic Partner", value: "strategic" },
            { label: "Community Partner", value: "community" },
            { label: "Media Partner", value: "media" },
          ],
        },
        {
          name: "logo",
          type: "upload",
          label: "Logo",
          relationTo: "media",
          required: true,
        },
        {
          name: "website",
          type: "text",
          label: "Website URL",
        },
        {
          name: "description",
          type: "textarea",
          label: "Short Description",
          localized: true,
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      label: "Layout",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Marquee", value: "marquee" },
        { label: "Grouped by Tier", value: "tiered" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns",
      defaultValue: "4",
      options: [
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
        { label: "6 Columns", value: "6" },
      ],
    },
    {
      name: "logoHeight",
      type: "select",
      label: "Logo Height",
      defaultValue: "medium",
      options: [
        { label: "Small (60px)", value: "small" },
        { label: "Medium (80px)", value: "medium" },
        { label: "Large (120px)", value: "large" },
      ],
    },
    {
      name: "showPartnerNames",
      type: "checkbox",
      label: "Show Partner Names",
      defaultValue: false,
    },
  ],
  labels: {
    plural: "Partners Blocks",
    singular: "Partners Block",
  },
};
