import type { CollectionConfig } from "payload";
import { isAdminOrStaff } from "../access/isAdminOrStaff";
import { anyone } from "../access/anyone";
import { revalidateFaq, revalidateFaqDelete } from "./Faqs/hooks/revalidateFaq";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  hooks: {
    afterChange: [revalidateFaq],
    afterDelete: [revalidateFaqDelete],
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category", "order", "createdAt"],
    listSearchableFields: ["question", "answer"],
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
      name: "question",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "general",
      index: true,
      options: [
        { label: "General", value: "general" },
        { label: "Products", value: "products" },
        { label: "Application & Technical", value: "technical" },
        { label: "Visualizer & Color Advice", value: "visualizer" },
        { label: "Warranty & Registration", value: "warranty" },
      ],
      admin: {
        width: "50%",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        width: "50%",
      },
    },
  ],
  timestamps: true,
};
