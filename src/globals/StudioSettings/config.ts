import type { GlobalConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const StudioSettings: GlobalConfig = {
  slug: "studio-settings",
  label: "Studio Settings",
  admin: {
    group: "Studio",
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal("studio-settings")],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          defaultValue: "Nepal's Finest Creative Studio",
        },
        {
          name: "headlinePart1",
          type: "text",
          defaultValue: "We Don't Just Shoot",
        },
        {
          name: "headlinePart2",
          type: "text",
          defaultValue: "We Create Emotions",
        },
        {
          name: "subheadline",
          type: "textarea",
          defaultValue:
            "Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
        },
      ],
    },
    {
      name: "marqueeItems",
      type: "array",
      label: "Marquee Ticker Items",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "stats",
      type: "group",
      label: "Studio Key Metrics",
      fields: [
        {
          name: "projectsCount",
          type: "number",
          defaultValue: 500,
        },
        {
          name: "clientsCount",
          type: "number",
          defaultValue: 300,
        },
        {
          name: "socialReach",
          type: "text",
          defaultValue: "20M+",
        },
        {
          name: "yearsExperience",
          type: "number",
          defaultValue: 5,
        },
      ],
    },
    {
      name: "story",
      type: "group",
      label: "About Narrative",
      fields: [
        {
          name: "headline",
          type: "text",
          defaultValue: "Born From Golden Light",
        },
        {
          name: "quote",
          type: "text",
          defaultValue: "Every frame tells a timeless story.",
        },
        {
          name: "paragraph1",
          type: "textarea",
          defaultValue:
            "The Golden Light Creations was born in the heart of Nepal with a singular vision — to transform fleeting moments into eternal visual poetry. We are not just photographers and filmmakers; we are storytellers, artists, and dreamers who believe every love story, every brand, and every emotion deserves to be captured in its purest, most luminous form.",
        },
        {
          name: "paragraph2",
          type: "textarea",
          defaultValue:
            "From the misty mountains of Kathmandu to luxury resort ceremonies, we bring an international eye and a deeply Nepali soul to every project we undertake.",
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Coordinates",
      fields: [
        {
          name: "phone",
          type: "text",
          defaultValue: "+977 9810175322",
        },
        {
          name: "whatsappNumber",
          type: "text",
          defaultValue: "9779810175322",
        },
        {
          name: "email",
          type: "email",
          defaultValue: "info@thegoldenlightcreations.com",
        },
        {
          name: "address",
          type: "text",
          defaultValue: "Kathmandu, Nepal",
        },
      ],
    },
    {
      name: "socialHandles",
      type: "group",
      label: "Social Media Channels",
      fields: [
        {
          name: "instagram",
          type: "text",
          defaultValue: "https://instagram.com/the_golden_creations",
        },
        {
          name: "youtube",
          type: "text",
          defaultValue: "https://youtube.com/@thegoldenlightcreations",
        },
        {
          name: "tiktok",
          type: "text",
          defaultValue: "https://tiktok.com/@thegoldencreations",
        },
        {
          name: "facebook",
          type: "text",
          defaultValue: "https://facebook.com/thegoldenlightcreations",
        },
      ],
    },
  ],
};
