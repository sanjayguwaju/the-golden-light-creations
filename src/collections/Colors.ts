import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "payload";
import { revalidateColor, revalidateColorDelete } from "./Colors/hooks/revalidateColor";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export const Colors: CollectionConfig = {
  slug: "colors",
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;

        const r = data.rgb?.r;
        const g = data.rgb?.g;
        const b = data.rgb?.b;

        if (typeof r === "number" && typeof g === "number" && typeof b === "number") {
          data.rgb = {
            ...data.rgb,
            r,
            g,
            b,
            string: `rgb(${r}, ${g}, ${b})`,
          };
        } else if (data.hexCode) {
          const parsedRgb = hexToRgb(data.hexCode);
          if (parsedRgb) {
            data.rgb = {
              r: parsedRgb.r,
              g: parsedRgb.g,
              b: parsedRgb.b,
              string: `rgb(${parsedRgb.r}, ${parsedRgb.g}, ${parsedRgb.b})`,
            };
          }
        }
        // Sync shadeCode and colorId
        if (data.shadeCode && !data.colorId) {
          data.colorId = data.shadeCode;
        } else if (data.colorId && !data.shadeCode) {
          data.shadeCode = data.colorId;
        }

        return data;
      },
    ],
    afterChange: [revalidateColor],
    afterDelete: [revalidateColorDelete],
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
    defaultColumns: ["name", "shadeCode", "hexCode", "colorFamily", "updatedAt"],
    listSearchableFields: ["name", "hexCode", "shadeCode", "colorId"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      localized: true,
    },
    slugField({ fieldToUse: "name" }),
    {
      name: "shadeCode",
      type: "text",
      label: "Shade Code",
      index: true,
      admin: {
        description: "Official factory formulation shade code (e.g., 1-10-1, 5-38-7)",
      },
    },
    {
      name: "colorId",
      type: "text",
      label: "Color ID",
      admin: {
        description: "Internal color identifier / shade code",
      },
    },
    {
      name: "hexCode",
      type: "text",
      required: true,
      index: true,
      admin: {
        description: "Enter a valid hex color code (e.g., #1A5F7A)",
        components: {
          Cell: '/components/admin/ColorSwatchCell',
        }
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexRegex.test(value) || "Please enter a valid hex color code starting with #";
      },
    },
    {
      name: "rgb",
      type: "group",
      label: "RGB Values",
      admin: {
        description: "Factory formulation RGB values (0-255)",
      },
      fields: [
        {
          name: "r",
          type: "number",
          label: "R (Red)",
          min: 0,
          max: 255,
        },
        {
          name: "g",
          type: "number",
          label: "G (Green)",
          min: 0,
          max: 255,
        },
        {
          name: "b",
          type: "number",
          label: "B (Blue)",
          min: 0,
          max: 255,
        },
        {
          name: "string",
          type: "text",
          label: "RGB String",
          admin: {
            description: "Formatted RGB value (e.g. rgb(26, 95, 122))",
          },
        },
      ],
    },
    {
      name: "colorFamily",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Reds", value: "reds" },
        { label: "Blues", value: "blues" },
        { label: "Greens", value: "greens" },
        { label: "Yellows", value: "yellows" },
        { label: "Neutrals", value: "neutrals" },
        { label: "Oranges", value: "oranges" },
        { label: "Purples", value: "purples" },
        { label: "Earths", value: "earths" },
        { label: "Darks", value: "darks" },
        { label: "Whites", value: "whites" }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: "moodTags",
      type: "select",
      hasMany: true,
      index: true,
      options: [
        { label: "Calm", value: "calm" },
        { label: "Vibrant", value: "vibrant" },
        { label: "Earthy", value: "earthy" },
        { label: "Energetic", value: "energetic" },
        { label: "Elegant", value: "elegant" },
        { label: "Playful", value: "playful" },
        { label: "Minimalist", value: "minimalist" },
        { label: "Cozy", value: "cozy" }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: "complementaryColours",
      type: "relationship",
      relationTo: "colors",
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: "popularity",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        description: "Higher numbers indicate more popular colors",
        position: 'sidebar'
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        description: "Mark as featured for the Popular Colours section",
        position: 'sidebar'
      },
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      index: true,
    },
  ],
};
