import { GlobalConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    group: "Settings",
  },
  label: "Site Settings",
  hooks: {
    afterChange: [revalidateGlobal("site-settings")],
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "contactDetails",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text",
          required: true,
          defaultValue: "+977 1 4444444",
        },
        {
          name: "email",
          type: "email",
          required: true,
          defaultValue: "info@reliancepaints.com",
        },
        {
          name: "address",
          type: "textarea",
          required: true,
          defaultValue: "Reliance Paints\nKathmandu, Bagmati\nNepal",
        },
        {
          name: "whatsappNumber",
          type: "text",
          required: true,
          defaultValue: "9779851310048",
          admin: {
            description:
              "Format: Country code followed by number, no spaces or + (e.g., 9779800000000)",
          },
        },
        {
          name: "businessHours",
          type: "array",
          fields: [
            { name: "days", type: "text", required: true, defaultValue: "Sunday - Friday" },
            { name: "hours", type: "text", required: true, defaultValue: "10am - 6pm" },
          ],
        },
      ],
    },
    {
      name: "officeLocation",
      type: "group",
      fields: [
        { name: "latitude", type: "number", required: true, defaultValue: 27.7172 },
        { name: "longitude", type: "number", required: true, defaultValue: 85.324 },
      ],
    },
    {
      name: "tawkToChat",
      type: "group",
      admin: {
        description: "Configure Tawk.to Chatbot Widget",
      },
      fields: [
        {
          name: "enableTawkTo",
          type: "checkbox",
          defaultValue: false,
          label: "Enable Tawk.to Chatbot",
        },
        {
          name: "propertyId",
          type: "text",
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enableTawkTo),
            description: "Property ID from your Tawk.to dashboard",
          },
        },
        {
          name: "widgetId",
          type: "text",
          defaultValue: "default",
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enableTawkTo),
            description: "Widget ID (defaults to 'default')",
          },
        },
      ],
    },
  ],
};
