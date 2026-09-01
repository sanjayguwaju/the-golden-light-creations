import type { Block } from "payload";

export const VideoEmbed: Block = {
  slug: "videoEmbed",
  imageURL: '/blocks-preview/videoEmbed.webp',
  imageAltText: 'VideoEmbed block preview',
  interfaceName: "VideoEmbedBlock",
  fields: [
    {
      name: "platform",
      type: "select",
      label: "Platform",
      defaultValue: "youtube",
      required: true,
      options: [
        { label: "YouTube", value: "youtube" },
        { label: "Vimeo", value: "vimeo" },
        { label: "Custom URL", value: "custom" },
      ],
    },
    {
      name: "videoId",
      type: "text",
      label: "Video ID / URL",
      required: true,
      admin: {
        description: "YouTube/Vimeo video ID or full embed URL for custom",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
    {
      name: "aspectRatio",
      type: "select",
      label: "Aspect Ratio",
      defaultValue: "16:9",
      options: [
        { label: "16:9 (Widescreen)", value: "16:9" },
        { label: "4:3 (Standard)", value: "4:3" },
        { label: "1:1 (Square)", value: "1:1" },
      ],
    },
  ],
  labels: {
    plural: "Video Embeds",
    singular: "Video Embed",
  },
};
