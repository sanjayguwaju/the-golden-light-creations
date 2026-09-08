import type { Block } from "payload";

export const V5LiveEventsBlock: Block = {
  slug: "v5LiveEvents",
  interfaceName: "V5LiveEventsBlock",
  labels: {
    singular: "[V5 Editorial] Live Events & Concerts Gallery",
    plural: "[V5 Editorial] Live Events & Concerts Galleries",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "On Location",
    },
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Live events, concerts & festival coverage",
    },
    {
      name: "description",
      type: "textarea",
      label: "Lead Description",
      defaultValue:
        "Real coverage from real stages — festival crowds, headline performers, and the energy of a live show captured frame by frame.",
    },
    {
      name: "items",
      type: "array",
      label: "Event Photos",
      defaultValue: [
        {
          title: "GE Fest — Main Stage",
          imageUrl: "/v5/ge-fest-main-stage-performance.jpg",
          span: "tall",
        },
        {
          title: "Festival Crowd Coverage",
          imageUrl: "/v5/festival-crowd.jpg",
          span: "wide",
        },
        {
          title: "Live Vocal Performance",
          imageUrl: "/v5/vocalist-performing-live.jpg",
          span: "standard",
        },
        {
          title: "On-Stage Performance",
          imageUrl: "/v5/guitarist-on-stage.jpg",
          span: "standard",
        },
        {
          title: "Headline Performance",
          imageUrl: "/v5/headline-performer-on-stage.jpg",
          span: "tall",
        },
        {
          title: "Crowd Interaction",
          imageUrl: "/v5/performer-waving-to-crowd.jpg",
          span: "standard",
        },
        {
          title: "Stage Coverage",
          imageUrl: "/v5/performer-on-stage.jpg",
          span: "standard",
        },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Caption / Title",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Media Image",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Fallback Image URL",
        },
        {
          name: "span",
          type: "select",
          label: "Grid Span",
          defaultValue: "standard",
          options: [
            { label: "Standard (1x1)", value: "standard" },
            { label: "Tall (Row Span 2)", value: "tall" },
            { label: "Wide (Col Span 2)", value: "wide" },
          ],
        },
      ],
    },
  ],
};
