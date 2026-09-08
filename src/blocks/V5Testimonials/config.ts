import type { Block } from "payload";

export const V5TestimonialsBlock: Block = {
  slug: "v5Testimonials",
  interfaceName: "V5TestimonialsBlock",
  labels: {
    singular: "[V5 Editorial] Testimonials Grid",
    plural: "[V5 Editorial] Testimonials Grids",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Client Love",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "What our clients say",
    },
    {
      name: "testimonials",
      type: "array",
      label: "Client Reviews",
      defaultValue: [
        {
          quote:
            "The Golden Light Creations transformed our wedding into a cinematic masterpiece. Every frame felt like a painting.",
          name: "Priya Maharjan",
          role: "Bride · Kathmandu",
          avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        },
        {
          quote:
            "Professional, punctual, and incredibly talented. The aftermovie became our brand's most-viewed content.",
          name: "Suman KC",
          role: "Event Director · Lalitpur",
          avatarUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
        },
        {
          quote:
            "I wanted my wedding photos to look like they belonged in a luxury magazine. That's exactly what I got.",
          name: "Anisha Tamang",
          role: "Bride · Bhaktapur",
          avatarUrl:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
        },
      ],
      fields: [
        {
          name: "quote",
          type: "textarea",
          required: true,
          label: "Client Quote",
        },
        {
          name: "name",
          type: "text",
          required: true,
          label: "Client Name",
        },
        {
          name: "role",
          type: "text",
          required: true,
          label: "Role / Location",
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
          label: "Client Avatar (Media Library)",
        },
        {
          name: "avatarUrl",
          type: "text",
          label: "Fallback Avatar URL",
        },
      ],
    },
  ],
};
