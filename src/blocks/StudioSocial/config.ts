import type { Block } from "payload";

export const StudioSocialBlock: Block = {
  slug: "studioSocial",
  interfaceName: "StudioSocialBlock",
  labels: {
    singular: "[Studio V1] Instagram & Social Grid",
    plural: "[Studio V1] Instagram & Social Grids",
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
