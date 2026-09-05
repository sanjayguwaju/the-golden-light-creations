import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import {
  revalidateStudioCollection,
  revalidateStudioCollectionDelete,
} from "../../hooks/revalidateStudioCollection";

export const Team: CollectionConfig = {
  slug: "team",
  labels: {
    singular: "Team Member",
    plural: "Team Members",
  },
  hooks: {
    afterChange: [revalidateStudioCollection("team")],
    afterDelete: [revalidateStudioCollectionDelete("team")],
  },
  admin: {
    group: "Studio",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "featured", "order", "updatedAt"],
    listSearchableFields: ["name", "role", "bio"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: "Role / Title",
      admin: {
        description: "e.g. Founder & Creative Director, Lead Cinematographer",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Portrait Photo",
    },
    {
      name: "photoUrl",
      type: "text",
      label: "Fallback Photo URL",
      admin: {
        description: "Direct URL to high-resolution portrait if media is not uploaded",
      },
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio / Artist Statement",
      admin: {
        description: "Brief 1-2 sentence description of their expertise and creative vision",
      },
    },
    {
      name: "specialties",
      type: "array",
      label: "Specialties / Focus Areas",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "e.g. Cinema Lighting, Drone Elopements, Editorial Portraiture",
      },
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Profiles & Contact",
      fields: [
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn Profile URL",
          admin: {
            placeholder: "https://www.linkedin.com/in/...",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram Profile URL",
          admin: {
            placeholder: "https://www.instagram.com/...",
          },
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter / X Profile URL",
          admin: {
            placeholder: "https://x.com/...",
          },
        },
        {
          name: "facebook",
          type: "text",
          label: "Facebook Profile URL",
          admin: {
            placeholder: "https://www.facebook.com/...",
          },
        },
        {
          name: "email",
          type: "text",
          label: "Direct Email Address",
          admin: {
            placeholder: "name@thegoldenlightcreations.com",
          },
        },
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      defaultValue: 10,
      admin: {
        description: "Lower numbers appear first (e.g. 1 for Founder)",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured on About Page & Homepage",
      defaultValue: true,
    },
  ],
};
