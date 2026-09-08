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
      type: "tabs",
      tabs: [
        {
          label: "Contact & Location",
          fields: [
            {
              name: "contactDetails",
              type: "group",
              fields: [
                {
                  name: "phone",
                  type: "text",
                  required: true,
                  defaultValue: "+977 9810175322",
                },
                {
                  name: "email",
                  type: "email",
                  required: true,
                  defaultValue: "info@thegoldenlightcreations.com",
                },
                {
                  name: "address",
                  type: "textarea",
                  required: true,
                  defaultValue: "The Golden Light Creations\nKathmandu, Nepal",
                },
                {
                  name: "whatsappNumber",
                  type: "text",
                  required: true,
                  defaultValue: "9779810175322",
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
          ],
        },
        {
          label: "Live Chat",
          fields: [
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
        },
        {
          label: "Google Analytics",
          fields: [
            {
              name: "googleAnalytics",
              type: "group",
              admin: {
                description: "Configure Google Analytics 4 (GA4) tracking for website analytics",
              },
              fields: [
                {
                  name: "enableGoogleAnalytics",
                  type: "checkbox",
                  defaultValue: false,
                  label: "Enable Google Analytics",
                },
                {
                  name: "measurementId",
                  type: "text",
                  label: "GA4 Measurement ID",
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.enableGoogleAnalytics),
                    description:
                      "Your Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX). Found in GA4 Admin > Data Streams.",
                    placeholder: "G-XXXXXXXXXX",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
