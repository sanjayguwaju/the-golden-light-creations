import type { Block } from "payload";

export const StudioTeamBlock: Block = {
  slug: "studioTeam",
  interfaceName: "StudioTeamBlock",
  labels: {
    singular: "Studio Team Showcase",
    plural: "Studio Team Showcases",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Section Eyebrow",
      defaultValue: "The Creative Collective",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Meet The Artists Behind The Lens",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      defaultValue:
        "A world-class collective of directors, cinematographers, portrait masters, and color scientists dedicated to immortalizing timeless emotion.",
    },
  ],
};
