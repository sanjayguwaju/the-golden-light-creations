import type { Block } from "payload";

export const StudioFilmsBlock: Block = {
  slug: "studioFilms",
  interfaceName: "StudioFilmsBlock",
  labels: {
    singular: "[Studio V1] Films Showcase",
    plural: "[Studio V1] Films Showcases",
  },
  fields: [
    {
      name: "isHomepagePreview",
      type: "checkbox",
      label: "Homepage Preview Mode",
      defaultValue: true,
      admin: {
        description: "Enables slider carousel mode with preview badges.",
      },
    },
  ],
};
