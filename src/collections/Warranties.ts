import type { CollectionConfig } from "payload";
import { isAdminOrStaff } from "../access/isAdminOrStaff";

export const Warranties: CollectionConfig = {
  slug: "warranties",
  admin: {
    useAsTitle: "customerName",
    defaultColumns: ["customerName", "productPurchased", "purchaseDate", "status", "createdAt"],
    listSearchableFields: ["customerName", "email", "phone", "batchNumber", "dealerName", "invoiceNumber", "city"],
    group: "Operations",
  },
  access: {
    create: () => true, // Public can register warranties
    read: isAdminOrStaff, // Only admins/staff can view
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    {
      name: "customerName",
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
      name: "productPurchased",
      type: "relationship",
      relationTo: "products",
      required: true,
      index: true,
    },
    {
      name: "volume",
      type: "text",
      label: "Liters / Volume (e.g., 4L, 10L)",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "batchNumber",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "purchaseDate",
          type: "date",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "invoice",
      type: "upload",
      relationTo: "files",
      required: true,
      filterOptions: {
        fileCategory: { equals: "warranty_invoice" },
      },
    },
    {
      name: "dealerInfo",
      type: "text",
      label: "Purchased From (Dealer/Store Name)",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending Verification", value: "pending" },
        { label: "Verified & Active", value: "active" },
        { label: "Rejected", value: "rejected" },
        { label: "Expired", value: "expired" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
