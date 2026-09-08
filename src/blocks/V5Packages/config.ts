import type { Block } from "payload";

export const V5PackagesBlock: Block = {
  slug: "v5Packages",
  interfaceName: "V5PackagesBlock",
  labels: {
    singular: "[V5 Editorial] Wedding Packages & Pricing",
    plural: "[V5 Editorial] Wedding Packages & Pricing",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Wedding Packages",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Choose the coverage that fits your day",
    },
    {
      name: "description",
      type: "textarea",
      label: "Lead Description",
      defaultValue:
        "Every package includes a dedicated team, professional color grading, and a private delivery gallery.",
    },
    {
      name: "packages",
      type: "array",
      label: "Package Tiers",
      defaultValue: [
        {
          name: "Standard",
          price: "Starting at NPR 35,000",
          featured: false,
          features: [
            { item: "1 Photographer" },
            { item: "1 Videographer" },
            { item: "Highlight Video" },
            { item: "Long Video" },
            { item: "Unlimited Photos" },
          ],
          buttonText: "Enquire",
          buttonLink: "#contact",
        },
        {
          name: "Premium",
          price: "Starting at NPR 65,000",
          featured: true,
          badge: "Most Popular",
          features: [
            { item: "Drone + 1 Drone Pilot" },
            { item: "1 Photographer" },
            { item: "1 Videographer" },
            { item: "Highlight + Long Video" },
            { item: "64GB Pendrive" },
            { item: "Karizma Album" },
            { item: "Unlimited Photos" },
          ],
          buttonText: "Enquire",
          buttonLink: "#contact",
        },
        {
          name: "Gold",
          price: "Starting at NPR 50,000",
          featured: false,
          features: [
            { item: "1 Photographer" },
            { item: "1 Videographer" },
            { item: "Highlight Video" },
            { item: "Long Video" },
            { item: "Karizma Album" },
            { item: "Unlimited Photos" },
          ],
          buttonText: "Enquire",
          buttonLink: "#contact",
        },
      ],
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Package Name",
        },
        {
          name: "price",
          type: "text",
          required: true,
          label: "Price Display (e.g. Starting at NPR 35,000)",
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Featured / Highlighted Tier",
          defaultValue: false,
        },
        {
          name: "badge",
          type: "text",
          label: "Ribbon Badge (e.g. Most Popular)",
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.featured),
          },
        },
        {
          name: "features",
          type: "array",
          label: "Included Features",
          fields: [
            {
              name: "item",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "buttonText",
          type: "text",
          defaultValue: "Enquire",
        },
        {
          name: "buttonLink",
          type: "text",
          defaultValue: "#contact",
        },
      ],
    },
  ],
};
