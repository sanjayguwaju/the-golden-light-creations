import type { CollectionConfig } from "payload";
import { isAdminOrStaff } from "../access/isAdminOrStaff";

export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  admin: {
    useAsTitle: "applicantName",
    defaultColumns: ["applicantName", "applicationType", "appliedFor", "status", "createdAt"],
    listSearchableFields: ["applicantName", "email", "phone", "coverLetter", "preferredDepartment"],
    group: "Operations",
  },
  access: {
    create: () => true, // Public can apply
    read: isAdminOrStaff, // Only admins/staff can view applications
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.appliedFor) {
          try {
            const careerId =
              typeof data.appliedFor === "object" ? data.appliedFor?.id : data.appliedFor;
            if (careerId) {
              const career = await req.payload.findByID({
                collection: "careers",
                id: String(careerId),
                req,
              });
              if (career) {
                if (career.type) {
                  data.applicationType = career.type;
                }
                if (career.department && !data.preferredDepartment) {
                  data.preferredDepartment = career.department;
                }
              }
            }
          } catch {
            // Silently continue if career query fails
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "applicantName",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          index: true,
          admin: { width: "50%" },
        },
        {
          name: "phone",
          type: "text",
          required: true,
          index: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "applicationType",
      type: "select",
      defaultValue: "general",
      index: true,
      options: [
        { label: "Full-Time", value: "full-time" },
        { label: "Part-Time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
        { label: "General / Talent Network", value: "general" },
        { label: "Specific Position", value: "specific" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "appliedFor",
      type: "relationship",
      relationTo: "careers",
      required: false, // Optional for general talent network submissions
      index: true,
    },
    {
      name: "preferredDepartment",
      type: "text",
      admin: {
        description: "Department for application (auto-filled from position or user selection)",
      },
    },
    {
      name: "cv",
      type: "upload",
      relationTo: "files",
      required: true,
      filterOptions: {
        fileCategory: { equals: "cv" },
      },
    },
    {
      name: "coverLetter",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      index: true,
      options: [
        { label: "New", value: "new" },
        { label: "Under Review", value: "review" },
        { label: "Interviewing", value: "interview" },
        { label: "Hired", value: "hired" },
        { label: "Rejected", value: "rejected" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "internalNotes",
      type: "textarea",
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};

