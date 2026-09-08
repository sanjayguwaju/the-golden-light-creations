import type { Block } from "payload";

export const V5ServicesBlock: Block = {
  slug: "v5Services",
  interfaceName: "V5ServicesBlock",
  labels: {
    singular: "[V5 Editorial] Tilting Services Grid",
    plural: "[V5 Editorial] Tilting Services Grids",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "What We Offer",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Premium creative services, built for people who notice detail",
    },
    {
      name: "description",
      type: "textarea",
      label: "Lead Description",
      defaultValue:
        "From intimate weddings to full commercial campaigns — every service is shot, edited, and delivered to a cinema-grade standard.",
    },
    {
      name: "services",
      type: "array",
      label: "Service Cards",
      defaultValue: [
        {
          idx: "01",
          title: "Wedding Photography",
          description:
            "Timeless luxury coverage capturing every intimate emotion and golden detail of your day.",
        },
        {
          idx: "02",
          title: "Cinematic Videography",
          description:
            "Wedding films crafted like feature productions — emotional, gripping, and built to last.",
        },
        {
          idx: "03",
          title: "Drone Coverage",
          description:
            "Aerial perspectives that reveal the scale of your venue and the grandeur of the moment.",
        },
        {
          idx: "04",
          title: "Event Coverage",
          description:
            "Full documentation of corporate galas, cultural celebrations, and milestone occasions.",
        },
        {
          idx: "05",
          title: "Concert Photography",
          description:
            "High-energy live coverage that captures the raw power of a performance in motion.",
        },
        {
          idx: "06",
          title: "Music Video Production",
          description:
            "Concept-to-screen production — artistic, cinematic, and built around your sound.",
        },
      ],
      fields: [
        {
          name: "idx",
          type: "text",
          label: "Index Number (e.g. 01)",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Service Title",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Service Description",
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: "Optional Detail Link",
        },
      ],
    },
  ],
};
