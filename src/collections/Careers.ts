import type { CollectionConfig } from "payload";
import { isAdminOrStaff } from "../access/isAdminOrStaff";
import { anyone } from "../access/anyone";
import { slugField } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateCareer, revalidateCareerDelete } from "./Careers/hooks/revalidateCareer";

export const Careers: CollectionConfig = {
  slug: "careers",
  hooks: {
    afterChange: [revalidateCareer],
    afterDelete: [revalidateCareerDelete],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "type", "isActive", "createdAt"],
    listSearchableFields: ["title", "slug", "department", "location"],
    group: "Content",
  },
  access: {
    create: isAdminOrStaff,
    read: anyone,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slugField(),
    {
      type: "row",
      fields: [
        {
          name: "department",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "type",
          type: "select",
          required: true,
          index: true,
          options: [
            { label: "Full-Time", value: "full-time" },
            { label: "Part-Time", value: "part-time" },
            { label: "Contract", value: "contract" },
            { label: "Internship", value: "internship" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor(),
      required: true,
      localized: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active (Accepting Applications)",
      defaultValue: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
