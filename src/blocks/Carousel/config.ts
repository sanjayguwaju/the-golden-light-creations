import type { Block } from "payload";

export const CarouselBlock: Block = {
  slug: "carouselBlock",
  imageURL: '/blocks-preview/carouselBlock.webp',
  imageAltText: 'Carousel block preview',
  interfaceName: "CarouselBlock",
  labels: {
    singular: "Carousel Block",
    plural: "Carousel Blocks",
  },
  fields: [
    // ─── Slides ───────────────────────────────────────────────
    {
      name: "slides",
      type: "array",
      label: "Slides",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Image",
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          localized: true,
        },
        {
          name: "subtitle",
          type: "text",
          label: "Subtitle",
          localized: true,
        },
        {
          name: "link",
          type: "group",
          label: "Call to Action",
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              label: "Show Button",
              defaultValue: false,
            },
            {
              name: "label",
              type: "text",
              label: "Button Label",
              localized: true,
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.enabled),
              },
            },
            {
              name: "url",
              type: "text",
              label: "Button URL",
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.enabled),
              },
            },
          ],
        },
      ],
    },

    // ─── Layout ───────────────────────────────────────────────
    {
      type: "row",
      fields: [
        {
          name: "height",
          type: "select",
          label: "Height",
          defaultValue: "lg",
          options: [
            { label: "Small  (300 px)", value: "sm" },
            { label: "Medium (500 px)", value: "md" },
            { label: "Large  (700 px)", value: "lg" },
            { label: "Full viewport", value: "full" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "aspectRatio",
          type: "select",
          label: "Aspect Ratio (overrides Height)",
          defaultValue: "none",
          options: [
            { label: "None (use Height)", value: "none" },
            { label: "16 / 9", value: "16/9" },
            { label: "4 / 3", value: "4/3" },
            { label: "Square (1 / 1)", value: "1/1" },
          ],
          admin: { width: "50%" },
        },
      ],
    },

    // ─── Behaviour ────────────────────────────────────────────
    {
      type: "row",
      fields: [
        {
          name: "loop",
          type: "checkbox",
          label: "Loop infinitely",
          defaultValue: true,
          admin: { width: "25%" },
        },
        {
          name: "autoplay",
          type: "checkbox",
          label: "Autoplay",
          defaultValue: true,
          admin: { width: "25%" },
        },
        {
          name: "autoplayDelay",
          type: "number",
          label: "Autoplay delay (ms)",
          defaultValue: 5000,
          min: 1000,
          max: 30000,
          admin: {
            width: "50%",
            condition: (_, siblingData) => Boolean(siblingData?.autoplay),
          },
        },
      ],
    },

    // ─── Controls ─────────────────────────────────────────────
    {
      type: "row",
      fields: [
        {
          name: "showArrows",
          type: "checkbox",
          label: "Show Arrows",
          defaultValue: true,
          admin: { width: "33%" },
        },
        {
          name: "showDots",
          type: "checkbox",
          label: "Show Dot Indicators",
          defaultValue: true,
          admin: { width: "33%" },
        },
        {
          name: "showOverlay",
          type: "checkbox",
          label: "Show Text Overlay",
          defaultValue: true,
          admin: { width: "34%" },
        },
      ],
    },
  ],
};
