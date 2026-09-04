import type { Block } from "payload";

export const StudioSocialBlock: Block = {
  slug: "studioSocial",
  interfaceName: "StudioSocialBlock",
  labels: {
    singular: "Studio Instagram & Social Grid",
    plural: "Studio Instagram & Social Grids",
  },
  fields: [
    {
      name: "instagramHandle",
      type: "text",
      label: "Instagram Handle",
      defaultValue: "@the_golden_creations",
    },
  ],
};
