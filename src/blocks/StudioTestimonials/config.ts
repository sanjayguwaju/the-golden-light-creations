import type { Block } from "payload";

export const StudioTestimonialsBlock: Block = {
  slug: "studioTestimonials",
  interfaceName: "StudioTestimonialsBlock",
  labels: {
    singular: "Studio Testimonials Marquee",
    plural: "Studio Testimonials Marquees",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "What Our Clients Say",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      defaultValue:
        "Real stories and heartfelt words from the couples and brands we have had the privilege to document.",
    },
  ],
};
