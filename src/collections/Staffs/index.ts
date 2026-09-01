import type { CollectionConfig } from "payload";
import { revalidateStaff, revalidateStaffDelete } from "./hooks/revalidateStaff";

export const Staffs: CollectionConfig = {
  slug: "staffs",
  hooks: {
    afterChange: [revalidateStaff],
    afterDelete: [revalidateStaffDelete],
  },
  admin: {
    group: "Content",
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "designation", "department", "roleType", "isActive"],
    listSearchableFields: ["fullName", "designation", "email", "phone", "department", "specialization"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        showOnWebsite: {
          equals: true,
        },
      };
    },
  },
  fields: [
    // ─── SIDEBAR FIELDS ──────────────────────────────────────
    {
      name: "titlePrefix",
      type: "select",
      required: true,
      options: [
        { label: "Dr.", value: "dr" },
        { label: "Mr.", value: "mr" },
        { label: "Ms.", value: "ms" },
        { label: "Mrs.", value: "mrs" },
        { label: "Prof.", value: "prof" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "roleType",
      type: "select",
      required: true,
      options: [
        { label: "Director", value: "director" },
        { label: "Manager", value: "manager" },
        { label: "Executive", value: "executive" },
        { label: "Officer", value: "officer" },
        { label: "Administrator", value: "administrator" },
        { label: "Staff", value: "staff" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "department",
      type: "select",
      index: true,
      options: [
        { label: "Sales", value: "sales" },
        { label: "Marketing", value: "marketing" },
        { label: "Production", value: "production" },
        { label: "Human Resources", value: "human_resources" },
        { label: "Finance", value: "finance" },
        { label: "Logistics", value: "logistics" },
        { label: "Administration", value: "administration" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "employmentType",
      type: "select",
      options: [
        { label: "Full-Time", value: "full_time" },
        { label: "Part-Time", value: "part_time" },
        { label: "Contract", value: "contract" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active Staff Member",
      defaultValue: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "showOnWebsite",
      type: "checkbox",
      label: "Show on Public Website",
      defaultValue: true,
      index: true,
      admin: { position: "sidebar" },
    },

    {
      name: "displayOrder",
      type: "number",
      label: "Display Order",
      index: true,
      admin: {
        position: "sidebar",
        description: "Lower number appears first on the staff page",
      },
      validate: async (value: number | null | undefined, options: any) => {
        const { req, id } = options;
        if (!value) return true;
        
        const existingStaff = await req.payload.find({
          collection: "staffs",
          where: {
            displayOrder: { equals: value },
            ...(id ? { id: { not_equals: id } } : {}),
          },
          depth: 0,
          limit: 1,
        });

        if (existingStaff.totalDocs > 0) {
          return "This display order is already assigned to another staff member.";
        }

        return true;
      },
    },

    // ─── MAIN TABS ───────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        // TAB 1 — General Info
        {
          label: "General Info",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "fullName",
                  type: "text",
                  required: true,
                  admin: { width: "75%" },
                },
                {
                  name: "slug",
                  type: "text",
                  unique: true,
                  admin: {
                    width: "25%",
                    description: "e.g. dr-kiran-tiwari",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "designation",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "specialization",
                  type: "text",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "joinDate",
                  type: "date",
                  admin: { width: "100%" },
                },
              ],
            },
            {
              name: "profilePhoto",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "biography",
              type: "richText",
              label: "Biography (Public Profile)",
            },
          ],
        },

        // TAB 2 — Contact
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "phone",
                  type: "text",
                  admin: { width: "50%" },
                },
                {
                  name: "email",
                  type: "email",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "address",
              type: "group",
              label: "Address",
              access: {
                read: ({ req: { user } }) => Boolean(user),
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "street",
                      type: "text",
                      admin: { width: "50%" },
                    },
                    {
                      name: "city",
                      type: "text",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "district",
                      type: "text",
                      admin: { width: "33%" },
                    },
                    {
                      name: "province",
                      type: "text",
                      admin: { width: "33%" },
                    },
                    {
                      name: "zipCode",
                      type: "text",
                      admin: { width: "33%" },
                    },
                  ],
                },
              ],
            },
            {
              name: "emergencyContact",
              type: "group",
              label: "Emergency Contact (Private)",
              access: {
                read: ({ req: { user } }) => Boolean(user),
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      admin: { width: "50%" },
                    },
                    {
                      name: "relationship",
                      type: "text",
                      admin: {
                        width: "50%",
                        description: "e.g. Spouse, Parent, Sibling",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "emergencyPhone",
                      type: "text",
                      label: "Phone",
                      admin: { width: "50%" },
                    },
                    {
                      name: "emergencyEmail",
                      type: "email",
                      label: "Email",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // TAB 3 — Qualifications
        {
          label: "Qualifications",
          fields: [
            {
              name: "qualifications",
              type: "array",
              label: "Academic Qualifications",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "degree",
                      type: "text",
                      required: true,
                      admin: { width: "33%" },
                    },
                    {
                      name: "institution",
                      type: "text",
                      admin: { width: "45%" },
                    },
                    {
                      name: "year",
                      type: "number",
                      admin: { width: "22%" },
                    },
                  ],
                },
              ],
            },
            {
              name: "languagesSpoken",
              type: "array",
              label: "Languages Spoken",
              fields: [
                {
                  name: "language",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },

        // TAB 4 — Schedule
        {
          label: "Schedule",
          fields: [
            {
              name: "availabilitySchedule",
              type: "array",
              label: "Weekly Availability",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "day",
                      type: "select",
                      options: [
                        { label: "Sunday", value: "sunday" },
                        { label: "Monday", value: "monday" },
                        { label: "Tuesday", value: "tuesday" },
                        { label: "Wednesday", value: "wednesday" },
                        { label: "Thursday", value: "thursday" },
                        { label: "Friday", value: "friday" },
                        { label: "Saturday", value: "saturday" },
                      ],
                      admin: { width: "40%" },
                    },
                    {
                      name: "hours",
                      type: "text",
                      admin: {
                        width: "60%",
                        description: "e.g. 9AM - 1PM",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // TAB 5 — Documents
        {
          label: "Documents",
          fields: [

          ],
        },
      ],
    },
  ],
};
