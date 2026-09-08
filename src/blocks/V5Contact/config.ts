import type { Block } from "payload";

export const V5ContactBlock: Block = {
  slug: "v5Contact",
  interfaceName: "V5ContactBlock",
  labels: {
    singular: "[V5 Editorial] Booking & Contact",
    plural: "[V5 Editorial] Booking & Contact",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Get In Touch",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Book your dream shoot",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone / WhatsApp",
      defaultValue: "+977 981 017 5322",
    },
    {
      name: "email",
      type: "email",
      label: "Contact Email",
      defaultValue: "info@thegoldenlightcreations.com",
    },
    {
      name: "address",
      type: "text",
      label: "Studio Location",
      defaultValue: "Kathmandu, Nepal",
    },
    {
      name: "serviceOptions",
      type: "array",
      label: "Booking Form Service Dropdown Options",
      defaultValue: [
        { label: "Wedding Photography & Film" },
        { label: "Cinematic Videography" },
        { label: "Drone Coverage" },
        { label: "Event Coverage" },
        { label: "Concert Photography" },
        { label: "Music Video Production" },
      ],
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
