import type { Block } from "payload";

export const StudioStatsBlock: Block = {
  slug: "studioStats",
  interfaceName: "StudioStatsBlock",
  labels: {
    singular: "Studio Stats Bar",
    plural: "Studio Stats Bars",
  },
  fields: [
    {
      name: "overrideStats",
      type: "checkbox",
      label: "Override Studio Settings Stats",
      defaultValue: false,
    },
    {
      name: "projectsCount",
      type: "number",
      label: "Projects Completed",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.overrideStats),
      },
    },
    {
      name: "clientsCount",
      type: "number",
      label: "Happy Clients",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.overrideStats),
      },
    },
    {
      name: "socialReach",
      type: "text",
      label: "Social Reach (e.g. 20M+)",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.overrideStats),
      },
    },
    {
      name: "yearsExperience",
      type: "number",
      label: "Years Experience",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.overrideStats),
      },
    },
  ],
};
