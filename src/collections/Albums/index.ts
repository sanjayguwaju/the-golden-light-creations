import type { CollectionConfig } from "payload";

import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { slugField } from "payload";
import { revalidateAlbum, revalidateAlbumDelete } from "./hooks/revalidateAlbum";

export const Albums: CollectionConfig = {
  slug: "albums",
  hooks: {
    afterChange: [revalidateAlbum],
    afterDelete: [revalidateAlbumDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: "Media",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    listSearchableFields: ["title", "slug"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          localized: true,
        },
      ],
    },
    slugField(),
  ],
};
