import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Site Header",
  admin: {
    group: "Settings",
    hidden: true,
  },
  hooks: {
    afterChange: [revalidateGlobal("header")],
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      localized: true,
      required: true,
      defaultValue: "The Golden Light Creations",
    },
    {
      name: "location",
      type: "text",
      localized: true,
      defaultValue: "Kathmandu, Nepal",
    },
    {
      name: "emblem",
      type: "upload",
      relationTo: "media",
      label: "Government Emblem (left)",
    },
    {
      name: "flag",
      type: "upload",
      relationTo: "media",
      label: "National Flag (right)",
    },
  ],
};
