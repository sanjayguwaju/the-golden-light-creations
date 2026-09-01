import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "payload";
import { revalidatePostCategory, revalidatePostCategoryDelete } from "./Categories/hooks/revalidateCategory";

export const Categories: CollectionConfig = {
  slug: "categories",
  hooks: {
    afterChange: [revalidatePostCategory],
    afterDelete: [revalidatePostCategoryDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    listSearchableFields: ["title", "slug"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Display Order",
      index: true,
      admin: {
        position: "sidebar",
        description: "Optional sorting order. Lower numbers appear first.",
      },
    },
    slugField({
      position: undefined,
    }),
  ],
};
