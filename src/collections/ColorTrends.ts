import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { revalidateColorTrend, revalidateColorTrendDelete } from "./ColorTrends/hooks/revalidateColorTrend";

export const ColorTrends: CollectionConfig = {
  slug: "color-trends",
  hooks: {
    afterChange: [revalidateColorTrend],
    afterDelete: [revalidateColorTrendDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
    group: "Catalog",
    defaultColumns: ["name", "icon", "updatedAt"],
    listSearchableFields: ["name", "description"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "icon",
      type: "select",
      options: [
        { label: "Paintbrush", value: "paintbrush" },
        { label: "Droplets", value: "droplets" },
        { label: "Sparkles", value: "sparkles" },
        { label: "Palette", value: "palette" },
      ],
      defaultValue: "palette",
    },
    {
      name: "colors",
      type: "relationship",
      relationTo: "colors",
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        description: "Order in which this trend appears (lower numbers appear first)",
        position: 'sidebar'
      }
    }
  ],
};
