import type { Block } from "payload";

export const AboutTeam: Block = {
  slug: "aboutTeam",
  interfaceName: "AboutTeamBlock",
  labels: {
    singular: "About Team",
    plural: "About Team Blocks",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      defaultValue: "Leadership Team",
    },
    {
      name: "heading",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "selectManually",
      type: "checkbox",
      label: "Select Staff Members Manually",
      defaultValue: false,
    },
    {
      name: "staffMembers",
      type: "relationship",
      relationTo: "staffs",
      hasMany: true,
      label: "Select Staff Members",
      admin: {
        condition: (_, siblingData) => siblingData?.selectManually,
      },
    },
    {
      name: "limit",
      type: "number",
      label: "Auto-fetch Limit",
      defaultValue: 12,
      admin: {
        condition: (_, siblingData) => !siblingData?.selectManually,
      },
    },
  ],
};
