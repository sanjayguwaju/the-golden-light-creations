import type { Block } from "payload";

export const StoreLocator: Block = {
  slug: "storeLocator",
  interfaceName: "StoreLocatorBlock",
  imageURL: "/blocks-preview/storeLocator.webp",
  labels: {
    singular: "Dealer Locator",
    plural: "Dealer Locators",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Enable this block",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Find Your Nearest Dealer",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
      label: "Subheading",
      defaultValue: "Browse our network of authorized dealers.",
      required: true,
    },
  ],
};
