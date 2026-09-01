import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Staffs: Block = {
  slug: "staffsBlock",
  imageURL: '/blocks-preview/staffsBlock.webp',
  imageAltText: 'Staffs block preview',
  interfaceName: "StaffsBlock",
  labels: {
    plural: "Staffs",
    singular: "Staffs Block",
  },
  fields: [
    {
      name: "introContent",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: "Intro Content",
    },
    {
      name: "staffsSelection",
      type: "select",
      defaultValue: "all",
      options: [
        { label: "All Active Staffs", value: "all" },
        { label: "Specific Departments", value: "department" },
      ],
      admin: {
        description:
          "Choose which staffs to display based on department, or show all structured by hierarchy.",
      },
    },
    {
      name: "departments",
      type: "select",
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.staffsSelection === "department",
      },
      options: [
        { label: "Anaesthesiology", value: "anaesthesiology" },
        { label: "Orthopedics", value: "orthopedics" },
        { label: "Obstetrics & Gynaecology", value: "obs_gynae" },
        { label: "General Surgery", value: "general_surgery" },
        { label: "General Medicine", value: "general_medicine" },
        { label: "Ophthalmology", value: "ophthalmology" },
        { label: "ENT", value: "ent" },
        { label: "Paediatrics", value: "paediatrics" },
        { label: "Nursing Administration", value: "nursing_admin" },
        { label: "Internal Medicine", value: "internal_medicine" },
      ],
    },
  ],
};
