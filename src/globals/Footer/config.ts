import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Settings",
  },
  label: "Footer",
  hooks: {
    afterChange: [revalidateGlobal("footer")],
  },
  fields: [
    {
      type: "group",
      name: "companyInfo",
      label: "Company Info",
      fields: [
        {
          name: "description",
          type: "textarea",
          localized: true,
          required: true,
        },
        {
          name: "facebookUrl",
          type: "text",
        },
        {
          name: "instagramUrl",
          type: "text",
        },
        {
          name: "tiktokUrl",
          type: "text",
        },
        {
          name: "youtubeUrl",
          type: "text",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Footer Logo",
        },
      ],
    },
    {
      name: "quickLinks",
      type: "array",
      label: "Quick Links",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "products",
      type: "array",
      label: "Products",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "contactInfo",
      label: "Contact Info",
      fields: [
        {
          name: "location",
          type: "textarea",
          localized: true,
          required: true,
        },
        {
          name: "phone",
          type: "text",
          required: true,
        },
        {
          name: "email",
          type: "text",
          required: true,
        },
        {
          name: "branches",
          type: "array",
          label: "Branch Offices",
          localized: true,
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "location",
              type: "textarea",
              required: true,
            },
            {
              name: "phone",
              type: "text",
            },
            {
              name: "email",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "bottomBar",
      label: "Bottom Bar",
      fields: [
        {
          name: "copyright",
          type: "text",
          localized: true,
        },
        {
          name: "links",
          type: "array",
          label: "Links",
          localized: true,
          defaultValue: [
            { label: "Privacy Policy", url: "/privacy-policy" },
            { label: "Terms of Service", url: "/terms-and-conditions" }
          ],
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
