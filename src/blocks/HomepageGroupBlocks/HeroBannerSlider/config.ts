import type { Block } from "payload";

export const HeroBannerSlider: Block = {
  slug: "heroBannerSlider",
  interfaceName: "HeroBannerSliderBlock",
  labels: {
    singular: "Hero Banner Slider (Images Only)",
    plural: "Hero Banner Sliders (Images Only)",
  },
  fields: [
    {
      name: "slides",
      type: "array",
      label: "Banner Slides",
      minRows: 1,
      required: true,
      labels: {
        singular: "Banner Slide",
        plural: "Banner Slides",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Desktop / Main Banner Image",
          admin: {
            description: "High-resolution full-width marketing/promotional banner image.",
          },
        },
        {
          name: "mobileImage",
          type: "upload",
          relationTo: "media",
          label: "Mobile Banner Image (Optional)",
          admin: {
            description: "Optional portrait or cropped banner optimized specifically for small mobile screens.",
          },
        },
        {
          name: "altText",
          type: "text",
          label: "Alt Text / Image Description",
          localized: true,
          admin: {
            description: "For screen readers and SEO.",
          },
        },
        {
          name: "link",
          type: "text",
          label: "Slide Link URL (Optional)",
          admin: {
            description: "Clicking the banner will navigate to this link (e.g. /products, /contact-us).",
          },
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          label: "Open Link in New Tab",
          defaultValue: false,
        },
      ],
    },
    {
      name: "autoplay",
      type: "checkbox",
      label: "Enable Autoplay",
      defaultValue: true,
    },
    {
      name: "autoplaySpeed",
      type: "number",
      label: "Autoplay Delay (seconds)",
      defaultValue: 5,
      min: 2,
      max: 20,
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
      name: "aspectRatio",
      type: "select",
      label: "Banner Aspect Ratio / Sizing",
      defaultValue: "fullscreen",
      options: [
        { label: "Full Viewport Height (100vh / Fullscreen)", value: "fullscreen" },
        { label: "Natural Aspect Ratio (Preserve Banner Proportions)", value: "auto" },
        { label: "Widescreen 16:9 Banner", value: "16/9" },
        { label: "Ultra-wide 21:9 Hero Banner", value: "21/9" },
      ],
    },
  ],
};
