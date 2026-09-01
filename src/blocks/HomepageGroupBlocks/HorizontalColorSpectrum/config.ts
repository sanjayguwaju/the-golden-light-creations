import type { Block } from "payload";

export const HorizontalColorSpectrum: Block = {
  slug: "horizontalColorSpectrum",
  interfaceName: "HorizontalColorSpectrumBlock",
  labels: {
    singular: "Horizontal Color Spectrum",
    plural: "Horizontal Color Spectrums",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Explore The Spectrum",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue: "Discover vibrant shades crafted for perfect harmony.",
      localized: true,
    },
    {
      name: "colors",
      type: "array",
      label: "Color Spectrum",
      minRows: 3,
      maxRows: 20,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Color Name",
        },
        {
          name: "hex",
          type: "text",
          required: true,
          label: "Hex Code (e.g. #D94040)",
        },
      ],
    },
  ],
};
