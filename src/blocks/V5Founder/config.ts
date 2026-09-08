import type { Block } from "payload";

export const V5FounderBlock: Block = {
  slug: "v5Founder",
  interfaceName: "V5FounderBlock",
  labels: {
    singular: "[V5 Editorial] Founder Spotlight",
    plural: "[V5 Editorial] Founder Spotlights",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "A Message From Our Founder",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue:
        "Every frame we deliver carries a name and a promise behind it",
    },
    {
      name: "quote",
      type: "textarea",
      label: "Founder Quote",
      defaultValue:
        "We don't just shoot — we create emotions. That's not a tagline for us, it's the standard every shoot is held to.",
    },
    {
      name: "message1",
      type: "textarea",
      label: "Message Paragraph 1",
      defaultValue:
        "I started The Golden Light Creations in 2019 with one camera and a simple belief: that the most important moments in a person's life deserve to be told with honesty, patience, and craft. Since then, that belief has taken our team from intimate Kathmandu weddings to festival main stages across Nepal.",
    },
    {
      name: "message2",
      type: "textarea",
      label: "Message Paragraph 2",
      defaultValue:
        "Every project we take on — big or small — gets the same attention to light, timing, and emotion. That is the standard I hold our entire team to, and it's the reason clients trust us with their most meaningful days.",
    },
    {
      name: "founderName",
      type: "text",
      label: "Founder Name",
      defaultValue: "Suresh Lama",
    },
    {
      name: "founderTagTitle",
      type: "text",
      label: "Badge Title",
      defaultValue: "Founder & Creative Director",
    },
    {
      name: "founderSignRole",
      type: "text",
      label: "Signature Subtitle",
      defaultValue: "Founder, The Golden Light Creations",
    },
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
      label: "Founder Portrait (Media Library)",
    },
    {
      name: "portraitUrl",
      type: "text",
      label: "Fallback Portrait URL",
      defaultValue:
        "/v5/suresh-lama-founder-of-the-golden-light-creations.jpg",
    },
  ],
};
