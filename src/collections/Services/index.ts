import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { slugField } from "payload";
import {
  revalidateStudioCollection,
  revalidateStudioCollectionDelete,
} from "../../hooks/revalidateStudioCollection";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  hooks: {
    afterChange: [revalidateStudioCollection("services")],
    afterDelete: [revalidateStudioCollectionDelete("services")],
  },
  admin: {
    group: "Studio",
    useAsTitle: "title",
    defaultColumns: ["serviceNumber", "title", "icon", "featured", "order"],
    listSearchableFields: ["title", "serviceNumber", "shortDescription", "targetAudience"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "serviceNumber",
      type: "text",
      required: true,
      defaultValue: "001",
      admin: {
        description: "3-digit prefix number (e.g. 001, 002, 003...)",
      },
    },
    {
      name: "tagline",
      type: "text",
      admin: {
        description: "Catchy single-sentence proposition (e.g. 'Cinema-grade media for civic leaders.')",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      admin: {
        description: "Brief summary used in cards on homepage and services archive",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Page Overview & Media",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Primary high-resolution hero photo for the single service page",
              },
            },
            {
              name: "heroImageUrl",
              type: "text",
              admin: {
                description: "External CDN/Unsplash image fallback URL if not uploading media",
              },
            },
            {
              name: "overview",
              type: "textarea",
              admin: {
                description: "Detailed narrative explaining why clients commission this service",
              },
            },
            {
              name: "targetAudience",
              type: "text",
              admin: {
                description: "Primary audience (e.g. 'Mayors, Civic Leaders, Celebrities, VIP Figures')",
              },
            },
            {
              name: "confidentialityNotice",
              type: "text",
              defaultValue: "Full NDA Compliance & Discretion Guaranteed",
              admin: {
                description: "Notice displayed on VIP service pages (e.g. NDA / discretion guarantee)",
              },
            },
          ],
        },
        {
          label: "Deliverables",
          fields: [
            {
              name: "deliverables",
              type: "array",
              label: "Key Deliverables",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "highlight",
                  type: "text",
                  admin: {
                    description: "Optional badge tag (e.g. '4K HDR', 'Same-Day Press', 'NDA Protected')",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Production Workflow",
          fields: [
            {
              name: "processSteps",
              type: "array",
              label: "Workflow Steps",
              fields: [
                {
                  name: "stepNumber",
                  type: "text",
                  defaultValue: "01",
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "FAQs",
          fields: [
            {
              name: "faqs",
              type: "array",
              label: "Frequently Asked Questions",
              fields: [
                {
                  name: "question",
                  type: "text",
                  required: true,
                },
                {
                  name: "answer",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          name: "meta",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "icon",
      type: "select",
      defaultValue: "camera",
      options: [
        { label: "Camera", value: "camera" },
        { label: "Film", value: "film" },
        { label: "Drone / Compass", value: "compass" },
        { label: "Party / Sparkles", value: "party" },
        { label: "Music", value: "music" },
        { label: "Video", value: "video" },
        { label: "Smartphone", value: "smartphone" },
        { label: "Branding", value: "sparkles" },
        { label: "TV / Commercial", value: "tv" },
        { label: "Creative Direction", value: "lightbulb" },
        { label: "Civic / Mayors / Crown", value: "award" },
        { label: "Celebrity / Star", value: "star" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
    },
    slugField({ fieldToUse: "title" }),
  ],
};
