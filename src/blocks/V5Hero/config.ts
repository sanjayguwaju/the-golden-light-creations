import type { Block } from "payload";

export const V5HeroBlock: Block = {
  slug: "v5Hero",
  interfaceName: "V5HeroBlock",
  labels: {
    singular: "[V5 Editorial] Cinema Hero",
    plural: "[V5 Editorial] Cinema Heroes",
  },
  fields: [
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      label: "Hero Video (from Media Library)",
      admin: {
        description: "Upload an MP4/WebM video file from the media library",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      label: "Fallback / Direct Video URL",
      defaultValue: "/v5/hero-video.mp4",
      admin: {
        description: "Path or URL to hero background video",
      },
    },
    {
      name: "poster",
      type: "upload",
      relationTo: "media",
      label: "Video Poster (from Media Library)",
    },
    {
      name: "posterUrl",
      type: "text",
      label: "Fallback Poster Image URL",
      defaultValue: "/hero-poster.jpg",
    },
    {
      name: "mobileVideo",
      type: "upload",
      relationTo: "media",
      label: "Mobile Hero Video (Optional)",
    },
    {
      name: "mobileVideoUrl",
      type: "text",
      label: "Mobile Fallback Video URL",
    },
    {
      name: "showScrollCue",
      type: "checkbox",
      label: "Show Animated Scroll Indicator",
      defaultValue: true,
    },
    {
      name: "showAccentStrip",
      type: "checkbox",
      label: "Show Bottom Crimson Accent Strip",
      defaultValue: true,
    },
  ],
};
