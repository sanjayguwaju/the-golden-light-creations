import type { Block } from "payload";

export const StudioMarqueeBlock: Block = {
  slug: "studioMarquee",
  interfaceName: "StudioMarqueeBlock",
  labels: {
    singular: "[Studio V1] Marquee Band",
    plural: "[Studio V1] Marquee Bands",
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
