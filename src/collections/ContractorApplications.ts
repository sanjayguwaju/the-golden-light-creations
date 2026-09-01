import type { CollectionConfig } from "payload";
import { isAdminOrStaff } from "../access/isAdminOrStaff";

export const ContractorApplications: CollectionConfig = {
  slug: "contractor-applications",
  labels: {
    singular: "Contractor / Painter Application",
    plural: "Contractor / Painter Applications",
  },
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "type", "email", "phone", "status", "createdAt"],
    listSearchableFields: ["fullName", "email", "phone", "district", "city", "citizenship"],
    group: "Operations",
  },
  access: {
    create: () => true, // Public can submit forms
    read: isAdminOrStaff, // Only admins/staff can view
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Contractor", value: "contractor" },
        { label: "Painter", value: "painter" },
      ],
      admin: {
        position: "sidebar",
      }
    },
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          index: true,
          admin: { width: "50%" },
        },
        {
          name: "phone",
          type: "text",
          required: true,
          index: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "citizenship",
      type: "text",
      label: "Citizenship Number",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
