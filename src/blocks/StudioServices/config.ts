import type { Block } from "payload";

export const StudioServicesBlock: Block = {
  slug: "studioServices",
  interfaceName: "StudioServicesBlock",
  labels: {
    singular: "Studio Services Showcase",
    plural: "Studio Services Showcases",
  },
  fields: [
    {
      name: "isHomepagePreview",
      type: "checkbox",
      label: "Homepage Preview Mode",
      defaultValue: true,
      admin: {
        description: "Shows the top 6 core disciplines with luxury glow cards and direct booking links.",
      },
    },
  ],
};
