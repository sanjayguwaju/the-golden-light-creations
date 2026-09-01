import type { Block } from "payload";

export const ShippingDelivery: Block = {
  slug: "shippingDelivery",
  interfaceName: "ShippingDeliveryBlock",
  labels: {
    singular: "Shipping & Delivery Block",
    plural: "Shipping & Delivery Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Shipping & Delivery Information",
      localized: true,
    },
    {
      name: "lastUpdated",
      type: "date",
      label: "Last Updated Date",
    },
    {
      name: "introText",
      type: "textarea",
      label: "Introduction Text",
      localized: true,
    },
    {
      name: "shippingMethods",
      type: "array",
      label: "Shipping Methods",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "timeframe",
          type: "text",
          required: true,
        },
        {
          name: "cost",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "trackingInfo",
      type: "group",
      label: "Order Tracking Information",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Order Tracking & Notifications",
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "faqs",
      type: "array",
      label: "Frequently Asked Questions",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
