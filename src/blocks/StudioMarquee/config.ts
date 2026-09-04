import type { Block } from "payload";

export const StudioMarqueeBlock: Block = {
  slug: "studioMarquee",
  interfaceName: "StudioMarqueeBlock",
  labels: {
    singular: "Studio Marquee Band",
    plural: "Studio Marquee Bands",
  },
  fields: [
    {
      name: "overrideItems",
      type: "checkbox",
      label: "Override Studio Settings Marquee Items",
      defaultValue: false,
    },
    {
      name: "items",
      type: "array",
      label: "Marquee Items",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.overrideItems),
      },
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
