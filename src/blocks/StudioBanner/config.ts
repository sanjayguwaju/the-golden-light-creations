import type { Block } from "payload";

export const StudioBannerBlock: Block = {
  slug: "studioBanner",
  labels: {
    singular: "Studio Banner",
    plural: "Studio Banners",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow Text",
      defaultValue: "Ready To Create Magic?",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Let's Capture Your Next Visual Story",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Label",
      defaultValue: "Book Your Shoot",
    },
    {
      name: "buttonLink",
      type: "text",
      label: "Button Link URL",
      defaultValue: "/contact",
    },
  ],
};
