import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const TopBar: GlobalConfig = {
  slug: "top-bar",
  admin: {
    group: "Settings",
  },
  label: "Top Bar",
  hooks: {
    afterChange: [revalidateGlobal("top-bar")],
  },
  fields: [
    {
      type: "row",
      fields: [
        // {
        //   name: "sitemapUrl",
        //   type: "text",
        //   label: "Sitemap URL",
        //   defaultValue: "/sitemap",
        //   admin: { width: "33%" },
        // },
        // {
        //   name: "lowBandwidthUrl",
        //   type: "text",
        //   label: "Low Bandwidth URL",
        //   defaultValue: "/low-bandwidth",
        //   admin: { width: "33%" },
        // },
        // {
        //   name: "screenReaderUrl",
        //   type: "text",
        //   label: "Screen Reader URL",
        //   defaultValue: "/screen-reader",
        //   admin: { width: "33%" },
        // },
      ],
    },
    {
      type: "row",
      fields: [
        // {
        //   name: "adminPhone",
        //   type: "text",
        //   label: "Administration Phone",
        //   localized: true,
        //   defaultValue: "०६८५२०२८९",
        //   admin: { width: "50%" },
        // },
        // {
        //   name: "emergencyPhone",
        //   type: "text",
        //   label: "Emergency Phone",
        //   localized: true,
        //   defaultValue: "०६८५२४१०४",
        //   admin: { width: "50%" },
        // },
      ],
    },
    {
      type: "row",
      fields: [
        // {
        //   name: "showDate",
        //   type: "checkbox",
        //   label: "Show Date",
        //   defaultValue: true,
        //   admin: { width: "25%" },
        // },
        // {
        //   name: "showFontSize",
        //   type: "checkbox",
        //   label: "Show Font Size Controls",
        //   defaultValue: true,
        //   admin: { width: "25%" },
        // },
        // {
        //   name: "showLanguage",
        //   type: "checkbox",
        //   label: "Show Language Toggle",
        //   defaultValue: true,
        //   admin: { width: "25%" },
        // },
        // {
        //   name: "isDarkMode",
        //   type: "checkbox",
        //   label: "Enable Dark Mode",
        //   defaultValue: false,
        //   admin: { width: "25%" },
        // },
      ],
    },
    {
      name: "announcement",
      type: "group",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: false,
          label: "Enable Announcement",
        },
        {
          name: "text",
          type: "text",
          localized: true,
          label: "Announcement Text",
          admin: {
            condition: (data, siblingData) => siblingData.enabled,
          },
        },
        {
          name: "link",
          type: "text",
          label: "Optional Link",
          admin: {
            condition: (data, siblingData) => siblingData.enabled,
          },
        },
      ],
    },
  ],
};
