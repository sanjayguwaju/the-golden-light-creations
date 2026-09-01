import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { revalidateInspiration, revalidateInspirationDelete } from "./Inspiration/hooks/revalidateInspiration";

export const Inspiration: CollectionConfig = {
  slug: "inspiration",
  hooks: {
    afterChange: [revalidateInspiration],
    afterDelete: [revalidateInspirationDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    group: "Catalog",
    defaultColumns: ["title", "featuredColour", "roomType", "updatedAt"],
    listSearchableFields: ["title", "description", "roomType"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "featuredColour",
      type: "relationship",
      relationTo: "colors",
      index: true,
      admin: {
        description: "The dominant paint color featured in this image.",
      },
    },
    {
      name: "roomType",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Living Room", value: "living-room" },
        { label: "Bedroom", value: "bedroom" },
        { label: "Kitchen", value: "kitchen" },
        { label: "Bathroom", value: "bathroom" },
        { label: "Exterior", value: "exterior" },
        { label: "Office", value: "office" },
        { label: "Dining Room", value: "dining-room" },
        { label: "Interior", value: "interior" },
        { label: "Luxury", value: "luxury" },
        { label: "Other", value: "other" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "styleTags",
      type: "select",
      hasMany: true,
      index: true,
      options: [
        { label: "Modern", value: "modern" },
        { label: "Classic", value: "classic" },
        { label: "Minimalist", value: "minimalist" },
        { label: "Rustic", value: "rustic" },
        { label: "Contemporary", value: "contemporary" },
        { label: "Industrial", value: "industrial" },
        { label: "Bohemian", value: "bohemian" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "secondaryColours",
      type: "relationship",
      relationTo: "colors",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Any other distinct paint shades featured in the room.",
      },
    },
    {
      name: "recommendedProduct",
      type: "relationship",
      relationTo: "products",
      admin: {
        position: "sidebar",
        description: "Select an actual paint product from your catalog to recommend for this space.",
      },
    },
  ],
};
