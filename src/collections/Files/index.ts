import type { CollectionConfig, Where } from "payload";
import { authenticated } from "../../access/authenticated";
import { buildPrefixedFilename, type FileCategory } from "../../lib/files/getCategoryFolder";
import type { User, File as FileDoc } from "@/payload-types";

// ─── Constants ────────────────────────────────────────────────────────────────
const PRIVATE_CATEGORIES: FileCategory[] = [
  "identity_document",
  "authorization_letter",
  "staff_contract",
  "cv",
  "warranty_invoice",
];

const VERIFICATION_CATEGORIES: FileCategory[] = [
  "academic_certificate",
  "identity_document",
  "authorization_letter",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FileUploadBody {
  fileCategory?: FileCategory;
  [key: string]: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPrivateCategory(category: unknown): category is FileCategory {
  return typeof category === "string" && PRIVATE_CATEGORIES.includes(category as FileCategory);
}

function isVerificationCategory(category: unknown): category is FileCategory {
  return typeof category === "string" && VERIFICATION_CATEGORIES.includes(category as FileCategory);
}

// ─── Collection ───────────────────────────────────────────────────────────────

export const Files: CollectionConfig = {
  slug: "files",
  admin: {
    useAsTitle: "title",
    description:
      "Central file storage — notices, PDFs, form attachments, staff documents, certificates",
    defaultColumns: ["title", "fileCategory", "uploadedFrom", "isPrivate", "createdAt"],
    listSearchableFields: ["title", "filename", "fileCategory", "uploadedFrom"],
    group: "Media",
  },

  access: {
    read: ({ req }): boolean | Where => {
      const user = req.user as User | null;
      if (!user) return { isPrivate: { equals: false } };
      if (user.role === "admin" || user.role === "staff") return true;
      return { isPrivate: { equals: false } };
    },
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },

  upload: {
    mimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    adminThumbnail: ({ doc }): string => {
      const { mimeType, url } = doc as unknown as FileDoc;
      if (mimeType?.startsWith("image/") && url) return url;
      if (mimeType === "application/pdf") return "/icons/pdf.svg";
      if (mimeType?.includes("word")) return "/icons/doc.svg";
      if (mimeType?.includes("excel") || mimeType?.includes("spreadsheet")) return "/icons/xls.svg";
      return "/icons/file.svg";
    },
  },

  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if ((operation === "create" || operation === "update") && args.req?.file) {
          const file = args.req.file;
          const body = args.req.body as FileUploadBody | undefined;
          const category: FileCategory = body?.fileCategory ?? "other";
          file.name = buildPrefixedFilename(category, file.name);
          args.req.file = file;
        }
        return args;
      },
    ],

    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "create" && req.user) {
          data.uploadedBy = req.user.id;
        }
        if (isPrivateCategory(data.fileCategory)) {
          data.isPrivate = true;
        }
        return data;
      },
    ],

    afterChange: [
      ({ doc, operation, req }) => {
        if (operation === "create") {
          const typedDoc = doc as unknown as FileDoc;
          req.payload.logger.info({
            msg: "File uploaded",
            fileId: typedDoc.id,
            category: typedDoc.fileCategory,
            uploadedBy: typedDoc.uploadedBy,
            isPrivate: typedDoc.isPrivate,
            filename: typedDoc.filename,
          });
        }
        return doc;
      },
    ],
  },

  fields: [
    // ─── SIDEBAR ────────────────────────────────────────────────────────
    {
      name: "isPrivate",
      type: "checkbox",
      label: "Private File",
      defaultValue: false,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Private files are only accessible to admins and staff. Sensitive categories are auto-set to private.",
      },
    },
    {
      name: "fileCategory",
      type: "select",
      label: "File Category",
      required: true,
      index: true,
      options: [
        { label: "Notice PDF", value: "notice_pdf" },
        { label: "Notice Image", value: "notice_image" },
        { label: "Staff Photo", value: "staff_photo" },
        { label: "Report / Publication", value: "report" },
        { label: "Tender Document", value: "tender" },
        { label: "Form Attachment", value: "form_attachment" },
        { label: "Academic Certificate", value: "academic_certificate" },
        { label: "Identity Document", value: "identity_document" },
        { label: "Authorization Letter", value: "authorization_letter" },
        { label: "Staff Contract", value: "staff_contract" },
        { label: "Applicant CV", value: "cv" },
        { label: "Warranty Invoice", value: "warranty_invoice" },
        { label: "Other", value: "other" },
      ] satisfies { label: string; value: FileCategory }[],
      admin: { position: "sidebar" },
    },
    {
      name: "uploadedFrom",
      type: "select",
      label: "Uploaded From",
      admin: { position: "sidebar" },
      options: [
        { label: "Admin Panel", value: "admin" },
        { label: "Notices", value: "notices" },
        { label: "Suchi Darta", value: "suchi-darta" },
        { label: "Common Form Submission", value: "common-form-submissions" },
        { label: "Grievance / Complaint", value: "grievance-complaints" },
        { label: "Staff Profile", value: "staffs" },
        { label: "Careers / Job Application", value: "careers" },
        { label: "Talent Network", value: "talent-network" },
      ],
    },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "users",
      label: "Uploaded By",
      admin: { position: "sidebar", readOnly: true },
    },

    // ─── TABS ────────────────────────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        {
          label: "File Info",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { en: "File Title", ne: "फाइलको शीर्षक" },
            },
            {
              name: "description",
              type: "textarea",
              localized: true,
              label: { en: "Description", ne: "विवरण" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "fiscalYear",
                  type: "text",
                  label: { en: "Fiscal Year (B.S.)", ne: "आर्थिक वर्ष (वि.सं.)" },
                  admin: { width: "50%", description: "e.g. 2081/2082" },
                },
                {
                  name: "expiryDate",
                  type: "date",
                  label: { en: "Expiry / Valid Until", ne: "म्याद सकिने मिति" },
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayOnly" },
                  },
                },
              ],
            },
            {
              name: "relatedTrackingCode",
              type: "text",
              label: "Related Tracking Code",
              admin: {
                readOnly: true,
                description: "e.g. SDC-A3KF92PQ",
              },
            },
          ],
        },
        {
          label: "Verification",
          fields: [
            {
              name: "isVerified",
              type: "checkbox",
              label: "Verified by Admin",
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => isVerificationCategory(siblingData?.fileCategory),
              },
            },
            {
              name: "verifiedBy",
              type: "relationship",
              relationTo: "users",
              label: "Verified By",
              admin: {
                readOnly: true,
                condition: (_, siblingData) => siblingData?.isVerified === true,
              },
            },
            {
              name: "verificationNotes",
              type: "textarea",
              label: "Verification Notes",
              admin: {
                rows: 3,
                condition: (_, siblingData) => isVerificationCategory(siblingData?.fileCategory),
              },
            },
          ],
        },
      ],
    },
  ],
};
