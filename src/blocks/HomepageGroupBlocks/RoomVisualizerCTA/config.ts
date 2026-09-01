import type { Block } from "payload";

export const RoomVisualizerCTA: Block = {
  slug: "roomVisualizerCTA",
  interfaceName: "RoomVisualizerCTABlock",
  imageURL: "/blocks-preview/roomVisualizerCTA.webp",
  labels: {
    singular: "Room Visualizer CTA",
    plural: "Room Visualizer CTAs",
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
      label: "Block Title (Admin Display)",
      defaultValue: "Room Visualizer CTA",
      admin: {
        description: "Identifies this block in the CMS page layout",
      },
    },
    {
      name: "sectionLabel",
      type: "text",
      label: "Section Label (above heading)",
      defaultValue: "Room Visualizer",
      localized: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "See It On Your Wall",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue: "Pick any shade and instantly preview how it transforms your space before committing.",
      localized: true,
    },
    {
      name: "rooms",
      type: "array",
      label: "Room Previews",
      admin: {
        description: "Configure room spaces with their original photo and manually painted color variant photos.",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Room Name",
          required: true,
          admin: {
            description: "e.g. Living Room, Bedroom, Kitchen, Exterior",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Original Room Image (Base Unpainted Photo)",
          required: true,
          admin: {
            description: "Upload the original / base unpainted photo for this room space.",
          },
        },
        {
          name: "colorVariants",
          type: "array",
          label: "Color-Specific Painted Room Images",
          labels: {
            singular: "Color Image Variant",
            plural: "Color Image Variants",
          },
          admin: {
            description: "Upload an image for each color shade. Select a color from the Colors collection or customize.",
          },
          fields: [
            {
              name: "color",
              type: "relationship",
              relationTo: "colors",
              label: "Linked Reliance Color",
              admin: {
                description: "Select a color from the official Reliance Colors catalog. Name and hex will auto-populate if left empty.",
              },
            },
            {
              name: "colorLabel",
              type: "text",
              label: "Color Name Override",
              admin: {
                description: "Optional override for display name (e.g. 'Navy Blue'). Defaults to the linked color's name.",
              },
            },
            {
              name: "hex",
              type: "text",
              label: "Color Swatch Hex Code Override",
              admin: {
                description: "Optional hex override (e.g. #0D1B3E). Defaults to the linked color's hexCode.",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Room Image Painted in this Shade",
              required: true,
              admin: {
                description: "Upload the actual photo of the room painted in this color.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "ctaButton",
      type: "group",
      label: "CTA Button",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Try the Full Visualizer →",
          localized: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          defaultValue: "/visualiser",
        },
      ],
    },
  ],
};
