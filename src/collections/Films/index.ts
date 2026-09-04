import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { slugField } from "payload";
import {
  revalidateStudioCollection,
  revalidateStudioCollectionDelete,
} from "../../hooks/revalidateStudioCollection";

export const Films: CollectionConfig = {
  slug: "films",
  labels: {
    singular: "Film",
    plural: "Films",
  },
  hooks: {
    afterChange: [revalidateStudioCollection("films")],
    afterDelete: [revalidateStudioCollectionDelete("films")],
  },
  admin: {
    group: "Studio",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "duration", "featured", "order"],
    listSearchableFields: ["title", "category"],
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
      name: "category",
      type: "select",
      required: true,
      defaultValue: "Wedding Film",
      options: [
        { label: "Wedding Film", value: "Wedding Film" },
        { label: "Cinematic Reel", value: "Cinematic Reel" },
        { label: "Event Aftermovie", value: "Event Aftermovie" },
        { label: "Concert Film", value: "Concert Film" },
        { label: "Commercial", value: "Commercial" },
        { label: "Music Video", value: "Music Video" },
      ],
    },
    {
      name: "videoUrl",
      type: "text",
      required: true,
      admin: {
        description: "YouTube / Vimeo embed or video URL (e.g. https://www.youtube-nocookie.com/embed/...)",
      },
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Poster image uploaded to media",
      },
    },
    {
      name: "posterUrl",
      type: "text",
      admin: {
        description: "Fallback direct CDN or external poster URL",
      },
    },
    {
      name: "duration",
      type: "text",
      defaultValue: "3:45",
      admin: {
        description: "Film duration display (e.g. 4:32, 6:05)",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Show in homepage films reel",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
    },
    slugField({ fieldToUse: "title" }),
  ],
};
