import type { CollectionConfig } from "payload";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrStaff } from "../../access/isAdminOrStaff";
import { isAdminOrSelf } from "../../access/isAdminOrSelf";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isAdminOrStaff, // Staff can access admin panel, but maybe not manage Users
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    group: "Settings",
    defaultColumns: ["name", "email", "role"],
    useAsTitle: "name",
    listSearchableFields: ["name", "email"],
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "staff",
      index: true,
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Staff", value: "staff" },
        { label: "User", value: "user" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
