import type { CollectionConfig } from "payload";

import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

import { adminsEditorsAndAuthors } from "../../access/adminsEditorsAndAuthors";
import { postABAC } from "../../access/postABAC";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { Banner } from "../../blocks/Banner/config";
import { Code } from "../../blocks/Code/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { VideoEmbed } from "../../blocks/VideoEmbed/config";
import { Quote } from "../../blocks/Quote/config";
import { StatsList } from "../../blocks/StatsList/config";
import { Accordion } from "../../blocks/Accordion/config";
import { InfoTable } from "../../blocks/InfoTable/config";
import { Gallery } from "../../blocks/Gallery/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { populateAuthors } from "./hooks/populateAuthors";
import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { slugField } from "payload";

export const Posts: CollectionConfig<"posts"> = {
  slug: "posts",
  access: {
    create: adminsEditorsAndAuthors,
    delete: postABAC,
    read: authenticatedOrPublished,
    update: postABAC,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "posts",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "posts",
        req,
      }),
    useAsTitle: "title",
    listSearchableFields: ["title", "slug", "meta.title", "meta.description"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description: "Mandatory featured/hero image for the blog post and preview cards.",
              },
            },
            {
              name: "content",
              type: "richText",
              localized: true,
              editor: lexicalEditor({
                features: () => [
                  // ── Text formatting ──────────────────────────────
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  SubscriptFeature(),
                  SuperscriptFeature(),
                  InlineCodeFeature(),

                  // ── Block types ──────────────────────────────────
                  ParagraphFeature(),
                  HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                  BlockquoteFeature(),

                  // ── Lists ────────────────────────────────────────
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  ChecklistFeature(),

                  // ── Layout ───────────────────────────────────────
                  AlignFeature(),
                  IndentFeature(),
                  HorizontalRuleFeature(),

                  // ── Links & embeds ───────────────────────────────
                  LinkFeature({ enabledCollections: ["posts", "pages"] }),
                  RelationshipFeature(),
                  UploadFeature(),

                  // ── Custom blocks + inline blocks ─────────────────
                  BlocksFeature({
                    blocks: [
                      Banner,
                      Code,
                      MediaBlock,
                      VideoEmbed,
                      Quote,
                      StatsList,
                      Accordion,
                      InfoTable,
                      Gallery,
                      CallToAction,
                    ],
                    inlineBlocks: [
                      {
                        slug: "highlight",
                        labels: { singular: "Highlight", plural: "Highlights" },
                        fields: [
                          {
                            name: "label",
                            type: "text",
                            required: true,
                            admin: { placeholder: "e.g. Important" },
                          },
                          {
                            name: "color",
                            type: "select",
                            defaultValue: "yellow",
                            options: [
                              { label: "Yellow", value: "yellow" },
                              { label: "Green", value: "green" },
                              { label: "Blue", value: "blue" },
                              { label: "Red", value: "red" },
                            ],
                          },
                        ],
                      },
                      {
                        slug: "tag",
                        labels: { singular: "Tag", plural: "Tags" },
                        fields: [
                          {
                            name: "label",
                            type: "text",
                            required: true,
                            admin: { placeholder: "e.g. Health, Migration" },
                          },
                        ],
                      },
                      {
                        slug: "calloutInline",
                        labels: { singular: "Inline Callout", plural: "Inline Callouts" },
                        fields: [
                          {
                            name: "text",
                            type: "text",
                            required: true,
                            admin: { placeholder: "Short note text" },
                          },
                          {
                            name: "variant",
                            type: "select",
                            defaultValue: "info",
                            options: [
                              { label: "Info", value: "info" },
                              { label: "Warning", value: "warning" },
                              { label: "Success", value: "success" },
                            ],
                          },
                        ],
                      },
                    ],
                  }),

                  // ── Toolbars (always last) ────────────────────────
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "posts",
            },
            {
              name: "categories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categories",
              index: true,
            },
          ],
          label: "Meta",
        },
        {
          name: "meta",
          label: "SEO",
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      index: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
      index: true,
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
