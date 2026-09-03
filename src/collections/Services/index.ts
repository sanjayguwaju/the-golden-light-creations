import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { slugField } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    group: "Studio",
    useAsTitle: "title",
    defaultColumns: ["serviceNumber", "title", "icon", "featured", "order"],
    listSearchableFields: ["title", "serviceNumber", "shortDescription"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "serviceNumber",
      type: "text",
      required: true,
      defaultValue: "001",
      admin: {
        description: "3-digit prefix number (e.g. 001, 002, 003...)",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "select",
      defaultValue: "camera",
      options: [
        { label: "Camera", value: "camera" },
        { label: "Film", value: "film" },
        { label: "Drone / Compass", value: "compass" },
        { label: "Party / Sparkles", value: "party" },
        { label: "Music", value: "music" },
        { label: "Video", value: "video" },
        { label: "Smartphone", value: "smartphone" },
        { label: "Branding", value: "sparkles" },
        { label: "TV / Commercial", value: "tv" },
        { label: "Creative Direction", value: "lightbulb" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
    },
    slugField({ fieldToUse: "title" }),
  ],
};
