import type { CollectionConfig } from "payload";
import { nanoid } from "nanoid";
import { authenticated } from "../../access/authenticated";

export const CommonFormSubmissions: CollectionConfig = {
  slug: "common-form-submissions",
  admin: {
    group: "Form Submissions",
    useAsTitle: "name",
    defaultColumns: ["ticketCode", "name", "email", "subject", "status", "priority", "createdAt"],
    listSearchableFields: ["ticketCode", "name", "email", "phone", "subject", "message"],
    description: "Public common form submissions from the website",
  },
  access: {
    create: () => true, // Public can submit
    read: authenticated, // Only admins can read
    update: authenticated, // Only admins can update
    delete: authenticated, // Only admins can delete
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create") {
          // Auto-generate unique ticket code
          data.ticketCode = `CNT-${nanoid(8).toUpperCase()}`;
          data.status = "new";
          data.priority = "normal";
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Auto-stamp repliedDate when status changes to "replied"
        if (
          operation === "update" &&
          doc.status !== previousDoc?.status &&
          doc.status === "replied"
        ) {
          await req.payload.update({
            collection: "common-form-submissions",
            id: doc.id,
            data: {
              repliedDate: new Date().toISOString(),
              repliedBy: req.user?.id,
            },
          });
        }
      },
    ],
  },
  timestamps: true,

  fields: [
    // ─── SIDEBAR ─────────────────────────────────────────────
    {
      name: "ticketCode",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Auto-generated ticket reference code",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      index: true,
      options: [
        { label: "🆕 New", value: "new" },
        { label: "👀 Under Review", value: "under_review" },
        { label: "↩️ Replied", value: "replied" },
        { label: "✅ Resolved", value: "resolved" },
        { label: "🗄️ Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "priority",
      type: "select",
      defaultValue: "normal",
      index: true,
      options: [
        { label: "🔴 Urgent", value: "urgent" },
        { label: "🟡 High", value: "high" },
        { label: "🟢 Normal", value: "normal" },
        { label: "⚪ Low", value: "low" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "subject",
      type: "select",
      label: "Subject / Department",
      index: true,
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Feedback", value: "feedback" },
        { label: "Complaint", value: "complaint" },
        { label: "Billing / Finance", value: "billing" },
        { label: "Other", value: "other" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: "Assigned To",
      index: true,
      admin: {
        position: "sidebar",
        description: "Assign this submission to a staff member",
      },
    },
    {
      name: "repliedBy",
      type: "relationship",
      relationTo: "users",
      label: "Replied By",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "repliedDate",
      type: "date",
      label: "Replied Date",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },

    // ─── TABS ────────────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        // TAB 1 — Submitter Info
        {
          label: "Submitter Info",
          fields: [
            {
              type: "row",
              fields: [
                {
                  // Name — NOT localized (proper noun)
                  name: "name",
                  type: "text",
                  required: true,
                  label: {
                    en: "Full Name",
                    ne: "पूरा नाम",
                  },
                  admin: { width: "50%" },
                },
                {
                  // Email — NOT localized
                  name: "email",
                  type: "email",
                  label: {
                    en: "Email Address",
                    ne: "इमेल ठेगाना",
                  },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  // Phone stored as text to support +977 format
                  name: "phone",
                  type: "text",
                  required: true,
                  label: {
                    en: "Phone Number",
                    ne: "फोन नम्बर",
                  },
                  admin: {
                    width: "50%",
                    placeholder: "+977-XXXXXXXXXX",
                  },
                },
                {
                  // Address — NOT localized (physical address)
                  name: "address",
                  type: "text",
                  required: true,
                  label: {
                    en: "Address",
                    ne: "ठेगाना",
                  },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "preferredContactMethod",
              type: "select",
              label: {
                en: "Preferred Contact Method",
                ne: "सम्पर्कको माध्यम",
              },
              defaultValue: "email",
              options: [
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
                { label: "Either", value: "either" },
              ],
            },
          ],
        },

        // TAB 2 — Message
        {
          label: "Message",
          fields: [
            {
              // Message IS localized — user writes in their own language
              name: "message",
              type: "textarea",
              required: true,
              localized: true,
              label: {
                en: "Message",
                ne: "सन्देश",
              },
              admin: {
                rows: 6,
                placeholder: "Your message here...",
              },
            },
            {
              // Attachments — NOT localized (same files regardless of language)
              name: "attachments",
              type: "array",
              label: {
                en: "Attachments",
                ne: "संलग्न फाइलहरू",
              },
              admin: {
                description: "Optional files attached by the submitter (images, documents)",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "File Label",
                      admin: { width: "40%" },
                    },
                    {
                      name: "file",
                      type: "upload",
                      relationTo: "files",
                      label: "File",
                      admin: { width: "60%" },
                      filterOptions: {
                        fileCategory: { equals: "form_attachment" },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // TAB 3 — Admin Response
        {
          label: "Admin Response",
          fields: [
            {
              name: "internalNotes",
              type: "textarea",
              label: "Internal Notes (Admin Only)",
              admin: {
                description: "Private notes — never shown to the submitter.",
                rows: 3,
              },
            },
            {
              // Response IS localized — may be shown to submitter
              name: "adminResponse",
              type: "richText",
              localized: true,
              label: {
                en: "Official Response (shown to submitter)",
                ne: "आधिकारिक जवाफ (निवेदकलाई देखाइने)",
              },
              admin: {
                description:
                  "Write in both EN and NE. This is the official reply sent or shown to the submitter.",
              },
            },
            {
              name: "responseChannel",
              type: "select",
              label: "Response Channel Used",
              options: [
                { label: "Email", value: "email" },
                { label: "Phone Call", value: "phone" },
                { label: "In Person", value: "in_person" },
                { label: "No Response Needed", value: "none" },
              ],
              admin: {
                condition: (_, siblingData) =>
                  ["replied", "resolved"].includes(siblingData?.status),
                description: "How did you respond to this submission?",
              },
            },
            {
              name: "escalatedTo",
              type: "relationship",
              relationTo: "users",
              label: "Escalated To",
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.priority === "urgent" || siblingData?.priority === "high",
                description: "Escalate urgent/high priority submissions to senior staff",
              },
            },
            {
              name: "resolutionSummary",
              type: "textarea",
              localized: true,
              label: {
                en: "Resolution Summary",
                ne: "समाधानको सारांश",
              },
              admin: {
                condition: (_, siblingData) => siblingData?.status === "resolved",
                description: "Brief summary of how this submission was resolved",
                rows: 3,
              },
            },
          ],
        },

        // TAB 4 — Meta
        {
          label: "Meta",
          fields: [
            {
              name: "source",
              type: "select",
              label: "Submission Source",
              defaultValue: "website",
              options: [
                { label: "Website Contact Form", value: "website" },
                { label: "Walk-in", value: "walk_in" },
                { label: "Phone Call", value: "phone" },
                { label: "Email", value: "email" },
                { label: "Social Media", value: "social_media" },
              ],
              admin: {
                description: "Where did this submission originate?",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "ipAddress",
                  type: "text",
                  label: "IP Address",
                  admin: {
                    width: "50%",
                    readOnly: true,
                    description: "Auto-captured from form submission",
                  },
                },
                {
                  name: "userAgent",
                  type: "text",
                  label: "Browser / Device",
                  admin: {
                    width: "50%",
                    readOnly: true,
                    description: "Auto-captured from form submission",
                  },
                },
              ],
            },
            {
              name: "isSpam",
              type: "checkbox",
              label: "Mark as Spam",
              defaultValue: false,
              index: true,
              admin: {
                description: "Flag this submission as spam to filter it out",
              },
            },
          ],
        },
      ],
    },
  ],
};
