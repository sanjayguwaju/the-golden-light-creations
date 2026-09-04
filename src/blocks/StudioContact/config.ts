import type { Block } from "payload";

export const StudioContactBlock: Block = {
  slug: "studioContact",
  interfaceName: "StudioContactBlock",
  labels: {
    singular: "Studio Contact & Booking",
    plural: "Studio Contact & Bookings",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Let's Create Something Timeless Together",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Subheading",
      defaultValue:
        "Whether it's your dream wedding, an editorial campaign, or a commercial film — we are ready to bring your vision to life.",
    },
  ],
};
