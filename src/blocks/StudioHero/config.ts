import type { Block } from "payload";

export const StudioHeroBlock: Block = {
  slug: "studioHero",
  interfaceName: "StudioHeroBlock",
  labels: {
    singular: "Studio Cinematic Hero",
    plural: "Studio Cinematic Heroes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow Badge",
      defaultValue: "Nepal's Finest Creative Studio",
    },
    {
      name: "headlinePart1",
      type: "text",
      label: "Headline Part 1",
      defaultValue: "We Don't Just Shoot",
    },
    {
      name: "headlinePart2",
      type: "text",
      label: "Headline Part 2 (Gold Accent)",
      defaultValue: "We Create Emotions",
    },
    {
      name: "subheadline",
      type: "textarea",
      label: "Subheadline Description",
      defaultValue:
        "Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      label: "Hero Background Video (from Media Library)",
      admin: {
        description: "Select an uploaded video (.mp4 or .mov) from the Media Library stored on Cloudflare R2",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      label: "External / Fallback Video URL",
      defaultValue: "/hero-video.mp4",
      admin: {
        description: "Direct URL to video file if hosted externally or on R2 CDN",
      },
    },
    {
      name: "poster",
      type: "upload",
      relationTo: "media",
      label: "Hero Video Poster Frame (from Media Library)",
      admin: {
        description: "High-resolution still image displayed instantly while video loads",
      },
    },
    {
      name: "posterUrl",
      type: "text",
      label: "Fallback Poster Image URL",
      defaultValue: "/hero-poster.jpg",
      admin: {
        description: "Direct URL to poster still image",
      },
    },
    {
      name: "mobileVideo",
      type: "upload",
      relationTo: "media",
      label: "Hero Mobile Background Video (from Media Library)",
      admin: {
        description: "Select a portrait/vertical video (9:16) for mobile devices (< 768px). Falls back to desktop video if not set.",
      },
    },
    {
      name: "mobileVideoUrl",
      type: "text",
      label: "External / Fallback Mobile Video URL",
      admin: {
        description: "Direct URL to mobile vertical video file (optional)",
      },
    },
    {
      name: "mobilePoster",
      type: "upload",
      relationTo: "media",
      label: "Hero Mobile Poster Frame (from Media Library)",
      admin: {
        description: "Vertical still image displayed instantly on mobile devices while video loads",
      },
    },
    {
      name: "mobilePosterUrl",
      type: "text",
      label: "Fallback Mobile Poster Image URL",
      admin: {
        description: "Direct URL to mobile poster still image (optional)",
      },
    },
  ],
};
