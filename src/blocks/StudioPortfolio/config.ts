import type { Block } from "payload";

export const StudioPortfolioBlock: Block = {
  slug: "studioPortfolio",
  interfaceName: "StudioPortfolioBlock",
  labels: {
    singular: "[Studio V1] Portfolio Showcase",
    plural: "[Studio V1] Portfolio Showcases",
  },
  fields: [
    {
      name: "isHomepagePreview",
      type: "checkbox",
      label: "Limit to Grid Preview (9 items)",
      defaultValue: true,
      admin: {
        description: "When checked, shows the top 9 items with category filters and a 'View Full Portfolio' CTA button.",
      },
    },
  ],
};
