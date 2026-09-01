import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: {
    group: "Settings",
  },
  label: "Navigation",
  hooks: {
    afterChange: [revalidateGlobal("navigation")],
  },
  fields: [
    {
      name: "brand",
      type: "group",
      required: false,
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "logoConfiguration",
          type: "group",
          fields: [
            {
              name: "height",
              type: "number",
              defaultValue: 70,
            },
            {
              name: "width",
              type: "number",
              defaultValue: 140,
            },
          ],
        },
        {
          name: "brandName",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "navItems",
      type: "array",
      localized: true,
      fields: [
        link({
          enableMenuType: true,
          appearances: false,
          source: "header",
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/globals/Header/RowLabel#RowLabel",
        },
      },
    },
    {
      name: "whatsAppNumber",
      type: "text",
    },
    {
      name: "whatsAppUser",
      type: "text",
    },
  ],
};
