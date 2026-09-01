import type { Block } from "payload";

export const HeroBannerVideoSlider: Block = {
  slug: "heroBannerVideoSlider",
  interfaceName: "HeroBannerVideoSliderBlock",
  labels: {
    singular: "Hero Banner Video Slider (Videos Only)",
    plural: "Hero Banner Video Sliders (Videos Only)",
  },
  fields: [
    {
      name: "slides",
      type: "array",
      label: "Video Banner Slides",
      minRows: 1,
      required: true,
      labels: {
        singular: "Video Slide",
        plural: "Video Slides",
      },
      fields: [
        {
          name: "video",
          type: "upload",
          relationTo: "media",
          label: "Desktop / Main Video (Upload)",
          admin: {
            description: "High-definition video (.mp4, .webm) for desktop & widescreen displays.",
          },
        },
        {
          name: "videoUrl",
          type: "text",
          label: "Desktop Video URL (External / CDN Fallback)",
          admin: {
            description: "Direct video URL (e.g. S3, CloudFront, CDN) if not uploaded above.",
          },
        },
        {
          name: "mobileVideo",
          type: "upload",
          relationTo: "media",
          label: "Mobile Video (Upload - Optional)",
          admin: {
            description: "Vertical (9:16) or mobile-optimized video for phones and small screens. Falls back to desktop video if omitted.",
          },
        },
        {
          name: "mobileVideoUrl",
          type: "text",
          label: "Mobile Video URL (External / CDN Fallback)",
          admin: {
            description: "Direct mobile video URL if not uploaded above.",
          },
        },
        {
          name: "posterImage",
          type: "upload",
          relationTo: "media",
          label: "Desktop Video Poster / Thumbnail Image",
          admin: {
            description: "Image displayed before the video starts or while loading.",
          },
        },
        {
          name: "mobilePosterImage",
          type: "upload",
          relationTo: "media",
          label: "Mobile Video Poster / Thumbnail Image (Optional)",
          admin: {
            description: "Mobile poster image for small screens.",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Slide Title / Caption (Optional)",
          localized: true,
          admin: {
            description: "Optional overlay heading or accessibility title for the video.",
          },
        },
        {
          name: "subtitle",
          type: "text",
          label: "Slide Subtitle / Tagline (Optional)",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Slide Link URL (Optional)",
          admin: {
            description: "Clicking the slide will navigate to this URL (e.g. /products, /colors).",
          },
        },
        {
          name: "buttonText",
          type: "text",
          label: "Button Label / CTA Text (Optional)",
          localized: true,
          admin: {
            description: "Optional call-to-action button (e.g. 'Explore Products', 'View Colors').",
          },
        },
        {
          name: "buttonStyle",
          type: "select",
          label: "Button Style",
          defaultValue: "gold",
          options: [
            { label: "Reliance Gold Button", value: "gold" },
            { label: "Reliance Navy Button", value: "navy" },
            { label: "White Glassmorphism Button", value: "white" },
          ],
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          label: "Open Link in New Tab",
          defaultValue: false,
        },
        {
          name: "muted",
          type: "checkbox",
          label: "Muted by Default (Recommended for Autoplay)",
          defaultValue: true,
        },
        {
          name: "loop",
          type: "checkbox",
          label: "Loop Single Video",
          defaultValue: true,
        },
      ],
    },
    {
      name: "autoplay",
      type: "checkbox",
      label: "Enable Slider Autoplay (Advance Slides)",
      defaultValue: true,
    },
    {
      name: "autoplaySpeed",
      type: "number",
      label: "Autoplay Delay (seconds)",
      defaultValue: 8,
      min: 2,
      max: 60,
      admin: {
        condition: (data) => Boolean(data?.autoplay),
      },
    },
    {
      name: "advanceOnVideoEnd",
      type: "checkbox",
      label: "Automatically Advance to Next Slide when Video Finishes",
      defaultValue: true,
      admin: {
        condition: (data) => Boolean(data?.autoplay),
      },
    },
    {
      name: "showArrows",
      type: "checkbox",
      label: "Show Navigation Arrows (< and >)",
      defaultValue: true,
    },
    {
      name: "showDots",
      type: "checkbox",
      label: "Show Pagination Indicators (Dots)",
      defaultValue: true,
    },
    {
      name: "showProgressBar",
      type: "checkbox",
      label: "Show Video Timeline / Progress Bar Indicator",
      defaultValue: true,
    },
    {
      name: "showSoundBadge",
      type: "checkbox",
      label: "Show Floating 'Tap for Sound' Unmute Badge",
      defaultValue: true,
    },
    {
      name: "showControls",
      type: "checkbox",
      label: "Show Play/Pause & Sound Toggle Controls",
      defaultValue: true,
    },
    {
      name: "aspectRatio",
      type: "select",
      label: "Banner Aspect Ratio / Sizing",
      defaultValue: "fullscreen",
      options: [
        { label: "Full Viewport Height (100vh / Fullscreen)", value: "fullscreen" },
        { label: "Natural Aspect Ratio (Preserve Video Dimensions)", value: "auto" },
        { label: "Widescreen 16:9 Banner", value: "16/9" },
        { label: "Ultra-wide 21:9 Hero Banner", value: "21/9" },
      ],
    },
  ],
};
