import type { Block } from "payload";

export const VideoHero: Block = {
  slug: "videoHero",
  interfaceName: "VideoHeroBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Hero Title",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Hero Subtitle",
      localized: true,
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Background Video (MP4 recommended)",
    },
    {
      name: "fallbackImage",
      type: "upload",
      relationTo: "media",
      label: "Fallback Image (For mobile/slow connections)",
    },
    {
      name: "overlayOpacity",
      type: "number",
      label: "Overlay Opacity (0 to 100)",
      defaultValue: 50,
      min: 0,
      max: 100,
    },
    {
      name: "actions",
      type: "array",
      label: "Call to Action Buttons",
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
          defaultValue: "/",
        },
        {
          name: "variant",
          type: "select",
          defaultValue: "default",
          options: [
            { label: "Primary (Solid)", value: "default" },
            { label: "Secondary (Outline)", value: "outline" },
            { label: "Ghost", value: "ghost" },
          ],
        },
      ],
    },
  ],
  labels: {
    singular: "Video Hero",
    plural: "Video Heros",
  },
};
