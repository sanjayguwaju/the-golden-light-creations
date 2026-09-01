import type { Block } from "payload";

export const InspirationGallery: Block = {
  slug: "inspirationGallery",
  interfaceName: "InspirationGalleryBlock",
  labels: {
    singular: "Inspiration Gallery",
    plural: "Inspiration Galleries",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "title",
      type: "text",
      label: "Section Eyebrow",
      defaultValue: "Inspiration Gallery",
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Main Heading",
      defaultValue: "Discover Beautiful Spaces & Color Harmonies",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Click any space to view featured shades, harmonious accent colors, and recommended paint finishes.",
      localized: true,
    },
    {
      name: "roomTypeFilter",
      type: "select",
      label: "Default Room Filter",
      defaultValue: "all",
      options: [
        { label: "All Spaces", value: "all" },
        { label: "Living Room", value: "living-room" },
        { label: "Bedroom", value: "bedroom" },
        { label: "Kitchen", value: "kitchen" },
        { label: "Dining Room", value: "dining-room" },
        { label: "Exterior", value: "exterior" },
        { label: "Bathroom", value: "bathroom" },
        { label: "Office", value: "office" },
      ],
    },
    {
      name: "limit",
      type: "number",
      label: "Number of Spaces to Show",
      defaultValue: 9,
      min: 3,
      max: 30,
    },
    {
      name: "showFilters",
      type: "checkbox",
      label: "Show Interactive Room & Search Filters",
      defaultValue: true,
    },
    {
      name: "showDesignerPalettes",
      type: "checkbox",
      label: "Show Curated Designer Palettes Below Gallery",
      defaultValue: false,
    },
    {
      name: "showCtaBanners",
      type: "checkbox",
      label: "Show Visualizer & Paint Calculator CTA Banners",
      defaultValue: true,
    },
  ],
};
