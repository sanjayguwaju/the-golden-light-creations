import type { CollectionConfig } from "payload";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { BrandMarquee } from "../../blocks/BrandMarquee/config";
import { Content } from "../../blocks/Content/config";
import { FormBlock } from "../../blocks/Form/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { Gallery } from "../../blocks/Gallery/config";
import { hero } from "@/heros/config";
import { AboutUs } from "@/blocks/AboutUs/config";
import { CarouselBlock } from "@/blocks/Carousel/config";
import { Testimonials } from "@/blocks/Testimonials/config";
import { Contact } from "@/blocks/Contact/config";
import { StudioPortfolioBlock } from "@/blocks/StudioPortfolio/config";
import { StudioFilmsBlock } from "@/blocks/StudioFilms/config";
import { StudioServicesBlock } from "@/blocks/StudioServices/config";
import { StudioStoryBlock } from "@/blocks/StudioStory/config";
import { StudioStatsBlock } from "@/blocks/StudioStats/config";
import { StudioSocialBlock } from "@/blocks/StudioSocial/config";
import { StudioMarqueeBlock } from "@/blocks/StudioMarquee/config";
import { StudioHeroBlock } from "@/blocks/StudioHero/config";
import { StudioContactBlock } from "@/blocks/StudioContact/config";
import { StudioTestimonialsBlock } from "@/blocks/StudioTestimonials/config";
import { StudioPageHeaderBlock } from "@/blocks/StudioPageHeader/config";
import { StudioBannerBlock } from "@/blocks/StudioBanner/config";
import { StudioPillarsBlock } from "@/blocks/StudioPillars/config";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
    group: "Content",
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
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                StudioHeroBlock,
                StudioPageHeaderBlock,
                StudioMarqueeBlock,
                StudioPortfolioBlock,
                StudioFilmsBlock,
                StudioServicesBlock,
                StudioStoryBlock,
                StudioStatsBlock,
                StudioPillarsBlock,
                StudioTestimonialsBlock,
                StudioSocialBlock,
                StudioBannerBlock,
                StudioContactBlock,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Gallery,
                BrandMarquee,
                CarouselBlock,
                Testimonials,
                Contact,
                AboutUs,
              ],
              required: false,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
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
              hasGenerateFn: true,
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
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
