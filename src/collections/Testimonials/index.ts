import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  admin: {
    group: "Studio",
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "roleOrEvent", "rating", "featured", "order"],
    listSearchableFields: ["clientName", "roleOrEvent", "quote"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      required: true,
    },
    {
      name: "roleOrEvent",
      type: "text",
      required: true,
      defaultValue: "Bride · Kathmandu",
      admin: {
        description: "Client role and location (e.g. Bride · Kathmandu, Brand Director)",
      },
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 5,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "avatarUrl",
      type: "text",
      admin: {
        description: "Fallback avatar image URL",
      },
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
  ],
};
