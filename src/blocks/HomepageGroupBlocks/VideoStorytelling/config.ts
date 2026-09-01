import type { Block } from "payload";

export const VideoStorytelling: Block = {
  slug: "videoStorytelling",
  interfaceName: "VideoStorytellingBlock",
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Toggle to show or hide this block on the page",
      },
    },
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Our Story",
    },
    {
      name: "subheading",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "videoMedia",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Select a video to play",
      },
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Image to show before the video loads or plays",
      },
    },
    {
      name: "layoutReversed",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "If checked, the video will appear on the right instead of the left",
      },
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Text",
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Link",
    },
  ],
};
