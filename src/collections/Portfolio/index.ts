import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { slugField } from "payload";
import {
  revalidateStudioCollection,
  revalidateStudioCollectionDelete,
} from "../../hooks/revalidateStudioCollection";

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  labels: {
    singular: "Portfolio Item",
    plural: "Portfolio",
  },
  hooks: {
    afterChange: [revalidateStudioCollection("portfolio")],
    afterDelete: [revalidateStudioCollectionDelete("portfolio")],
  },
  admin: {
    group: "Studio",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "location", "featured", "order"],
    listSearchableFields: ["title", "location", "category"],
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
      name: "category",
      type: "select",
      required: true,
      defaultValue: "weddings",
      options: [
        { label: "Weddings", value: "weddings" },
        { label: "Events", value: "events" },
        { label: "Fashion", value: "fashion" },
        { label: "Concerts", value: "concerts" },
        { label: "Commercial", value: "commercial" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload local/media asset image",
      },
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "Optional fallback or external CDN/Unsplash URL if not uploading media",
      },
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Kathmandu",
      admin: {
        description: "Shoot location (e.g. Kathmandu, Pokhara, Bhaktapur, Patan)",
      },
    },
    {
      name: "client",
      type: "text",
      admin: {
        description: "Client or couple name (optional)",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Feature this item on the studio homepage preview",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
      admin: {
        description: "Lower numbers appear first (e.g. 1, 2, 3...)",
      },
    },
    slugField({ fieldToUse: "title" }),
  ],
};
