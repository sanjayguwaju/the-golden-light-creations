import type { CollectionConfig, Where } from "payload";
import { slugField } from "payload";
import { revalidateList, revalidateListDelete } from "./hooks/revalidateList";

export const List: CollectionConfig = {
  slug: "list",
  hooks: {
    afterChange: [revalidateList],
    afterDelete: [revalidateListDelete],
  },
  labels: {
    singular: "Document",
    plural: "Documents",
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "priority", "publishedDate", "status"],
    listSearchableFields: ["title", "slug", "subtitle", "description", "documentNumber"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        and: [
          { status: { equals: "published" } },
          { targetAudience: { not_equals: "staff_only" } },
        ],
      } as Where;
    },
  },
  fields: [
    // ─── SIDEBAR ─────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      index: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "priority",
      type: "select",
      defaultValue: "low",
      index: true,
      options: [
        { label: "🔴 High", value: "high" },
        { label: "🟡 Medium", value: "medium" },
        { label: "🟢 Low", value: "low" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "targetAudience",
      type: "select",
      defaultValue: "public",
      index: true,
      options: [
        { label: "Public", value: "public" },
        { label: "Staff Only", value: "staff_only" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "isPinned",
      type: "checkbox",
      label: "Pin to Top",
      defaultValue: false,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "showInPopup",
      type: "checkbox",
      label: "Show in Popup",
      defaultValue: false,
      admin: { position: "sidebar" },
    },

    // ─── TABS ────────────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        // TAB 1 — Content
        {
          label: "Content",
          fields: [
            {
              // Title is localized — editors fill EN + NE separately
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            slugField(),
            {
              name: "mainDocument",
              type: "upload",
              relationTo: "media",
              label: "Upload Notice (PDF/Document)",
              admin: {
                description:
                  "Upload the actual notice file here. This will be automatically displayed in the PDF viewer.",
              },
            },
            {
              name: "tags",
              type: "select",
              hasMany: true,
              // Tags are NOT localized — values are consistent across locales
              options: [
                { label: "Vacancy", value: "vacancy" },
                { label: "Tender", value: "tender" },
                { label: "Emergency", value: "emergency" },
                { label: "Holiday", value: "holiday" },
                { label: "Training", value: "training" },
                { label: "Announcement", value: "announcement" },
                { label: "Result", value: "result" },
              ],
            },
            {
              // Rich text description — localized per language
              name: "description",
              type: "richText",
              localized: true,
              label: "Full Description",
            },
            {
              // Short excerpt for cards/listings — localized
              name: "excerpt",
              type: "textarea",
              localized: true,
              label: "Short Excerpt",
              admin: {
                description: "Brief summary shown in listing cards. Shown per language.",
              },
            },
          ],
        },

        // TAB 2 — Media & Attachments
        {
          label: "Media & Attachments",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Notice Preview Image",
              admin: {
                description: "Upload a photo or thumbnail to represent this notice in listings.",
              },
              // Images are shared across locales — NOT localized
            },
            {
              name: "externalImage",
              type: "text",
              label: "External Image URL",
              // NOT localized — same URL regardless of language
              admin: {
                description: "Direct URL to a scanned notice image.",
              },
            },
            {
              name: "attachments",
              type: "array",
              label: "Downloadable Attachments",
              // Localized so you can upload NE/EN versions of PDFs separately
              localized: true,
              admin: {
                description:
                  "You can upload different PDF versions per language (e.g. Nepali notice PDF vs English PDF).",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "File Label",
                      admin: {
                        width: "50%",
                        description: "e.g. Application Form, Result PDF",
                      },
                    },
                    {
                      name: "file",
                      type: "upload",
                      relationTo: "media",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "externalFileUrl",
                  type: "text",
                  label: "External File URL",
                },
              ],
            },
          ],
        },

        // TAB 3 — Dates & Scheduling
        {
          label: "Dates & Scheduling",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "publishedDate",
                  type: "date",
                  required: true,
                  defaultValue: () => new Date(),
                  // Dates are NOT localized — same date for all languages
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayAndTime" },
                    components: {
                      Field: "/components/admin/NepaliDatePickerField#NepaliDatePickerField",
                    },
                  },
                },
                {
                  name: "expiryDate",
                  type: "date",
                  label: "Expiry Date",
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayAndTime" },
                    description: "Hidden from frontend after this date.",
                    components: {
                      Field: "/components/admin/NepaliDatePickerField#NepaliDatePickerField",
                    },
                  },
                },
              ],
            },
            {
              name: "applicationDeadline",
              type: "date",
              label: "Application Deadline",
              admin: {
                date: { pickerAppearance: "dayAndTime" },
                description: "For vacancy/tender notices only.",
                condition: (_, siblingData) =>
                  ["vacancy", "tender"].some((tag) => siblingData?.tags?.includes(tag)),
                components: {
                  Field: "/components/admin/NepaliDatePickerField#NepaliDatePickerField",
                },
              },
            },
            {
              name: "popupSettings",
              type: "group",
              label: "Popup Scheduling",
              admin: {
                condition: (_, siblingData) => siblingData?.showInPopup,
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "popupStartDate",
                      type: "date",
                      label: "Popup Start",
                      admin: {
                        width: "50%",
                        date: { pickerAppearance: "dayAndTime" },
                        components: {
                          Field: "/components/admin/NepaliDatePickerField#NepaliDatePickerField",
                        },
                      },
                    },
                    {
                      name: "popupEndDate",
                      type: "date",
                      label: "Popup End",
                      admin: {
                        width: "50%",
                        date: { pickerAppearance: "dayAndTime" },
                        components: {
                          Field: "/components/admin/NepaliDatePickerField#NepaliDatePickerField",
                        },
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "displayMode",
                      type: "select",
                      defaultValue: "full",
                      options: [
                        { label: "Full Notice", value: "full" },
                        { label: "Image Only", value: "image_only" },
                        { label: "Image + Title", value: "image_title" },
                      ],
                      admin: { width: "50%" },
                    },
                    {
                      name: "pdf",
                      type: "text",
                      label: "PDF URL (Optional Override)",
                      admin: {
                        width: "50%",
                        description: "Direct URL or Base64 for the PDF if different from attachment.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // TAB 4 — SEO
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "SEO Settings",
              fields: [
                {
                  name: "metaTitle",
                  type: "text",
                  label: "Meta Title",
                  localized: true, // Different meta title per language
                  admin: {
                    description: "Defaults to notice title if left empty.",
                  },
                },
                {
                  name: "metaDescription",
                  type: "textarea",
                  label: "Meta Description",
                  localized: true, // Different meta description per language
                  admin: {
                    description: "Recommended: 150–160 characters.",
                  },
                },
                {
                  name: "ogImage",
                  type: "upload",
                  relationTo: "media",
                  label: "OG / Social Share Image",
                  // NOT localized — same image for all languages
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
