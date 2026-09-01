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
import { Staffs } from "@/blocks/Staffs/config";
import { Feedback } from "@/blocks/Feedback/config";
import { OurServices } from "@/blocks/OurServices/config";
import { Highlights } from "../../blocks/Highlights/config";
import { CarouselBlock } from "@/blocks/Carousel/config";
import { NewsActivities } from "@/blocks/NewsActivities/config";
import { HighlightsAndNews } from "@/blocks/HighlightsAndNews/config";
import { MissionVision } from "@/blocks/MissionVision/config";
import { HeroSection } from "@/blocks/HomepageGroupBlocks/HeroSection/config";
import { FeaturedCauses } from "@/blocks/HomepageGroupBlocks/FeaturedCauses/config";
import { ImpactNumbers } from "@/blocks/HomepageGroupBlocks/ImpactNumbers/config";
import { LatestNews } from "@/blocks/HomepageGroupBlocks/LatestNews/config";
import { NewsletterSignup } from "@/blocks/HomepageGroupBlocks/NewsletterSignup/config";

import { SuccessStories } from "@/blocks/HomepageGroupBlocks/SuccessStories/config";
import { QuickLinks } from "@/blocks/HomepageGroupBlocks/QuickLinks/config";
import { WelcomeSection } from "@/blocks/HomepageGroupBlocks/WelcomeSection/config";
import { VideoHero } from "@/blocks/HomepageGroupBlocks/VideoHero/config";
import { PopularColours } from "@/blocks/HomepageGroupBlocks/PopularColours/config";
import { CurvedColorProfile } from "@/blocks/HomepageGroupBlocks/CurvedColorProfile/config";
import { PremiumPaintsGrid } from "@/blocks/HomepageGroupBlocks/PremiumPaintsGrid/config";
import { ColorsToSuit } from "@/blocks/HomepageGroupBlocks/ColorsToSuit/config";
import { ComparisonTable } from "@/blocks/HomepageGroupBlocks/ComparisonTable/config";
import { PaletteShowcase } from "@/blocks/HomepageGroupBlocks/PaletteShowcase/config";
import { FinishCards } from "@/blocks/HomepageGroupBlocks/FinishCards/config";
import { RoomVisualizerCTA } from "@/blocks/HomepageGroupBlocks/RoomVisualizerCTA/config";
import { PaintCalculatorSection } from "@/blocks/HomepageGroupBlocks/PaintCalculatorSection/config";
import { GalleryMasonry } from "@/blocks/HomepageGroupBlocks/GalleryMasonry/config";
import { InspirationGallery } from "@/blocks/HomepageGroupBlocks/InspirationGallery/config";
import { MoodQuiz } from "@/blocks/HomepageGroupBlocks/MoodQuiz/config";
import { StoreLocator } from "@/blocks/HomepageGroupBlocks/StoreLocator/config";
import { HirePainterSection } from "@/blocks/HomepageGroupBlocks/HirePainterSection/config";
import { ExcellenceStats } from "@/blocks/HomepageGroupBlocks/ExcellenceStats/config";
import { BeforeAfterSplit } from "@/blocks/HomepageGroupBlocks/BeforeAfterSplit/config";
import { VideoStorytelling } from "@/blocks/HomepageGroupBlocks/VideoStorytelling/config";
import { ProjectShowcase } from "@/blocks/HomepageGroupBlocks/ProjectShowcase/config";
import { TexturesGrid } from "@/blocks/HomepageGroupBlocks/TexturesGrid/config";
import { AboutHero } from "@/blocks/AboutUs/AboutHero/config";
import { AboutMissionStory } from "@/blocks/AboutUs/AboutMissionStory/config";
import { AboutHeritage } from "@/blocks/AboutUs/AboutHeritage/config";
import { AboutExpertise } from "@/blocks/AboutUs/AboutExpertise/config";
import { AboutValues } from "@/blocks/AboutUs/AboutValues/config";
import { AboutTeam } from "@/blocks/AboutUs/AboutTeam/config";
import { AboutCTA } from "@/blocks/AboutUs/AboutCTA/config";
import { Programs } from "@/blocks/Programs/config";
import { Testimonials } from "@/blocks/Testimonials/config";
import { Partners } from "@/blocks/Partners/config";
import { Impact } from "@/blocks/Impact/config";
import { VolunteerCTA } from "@/blocks/VolunteerCTA/config";
import { UpcomingEvents } from "@/blocks/UpcomingEvents/config";
import { Contact } from "@/blocks/Contact/config";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { LiquidTransition } from "@/blocks/HomepageGroupBlocks/LiquidTransition/config";
import { HorizontalColorSpectrum } from "@/blocks/HomepageGroupBlocks/HorizontalColorSpectrum/config";
import { PeelingTapeFeatures } from "@/blocks/HomepageGroupBlocks/PeelingTapeFeatures/config";
import { HeroBannerSlider } from "@/blocks/HomepageGroupBlocks/HeroBannerSlider/config";
import { HeroBannerVideoSlider } from "@/blocks/HomepageGroupBlocks/HeroBannerVideoSlider/config";
import { HeroCarouselBlock } from "@/blocks/HomepageGroupBlocks/HeroCarousel/config";
import { BestSellingProducts } from "@/blocks/HomepageGroupBlocks/BestSellingProducts/config";
import { ShippingDelivery } from "@/blocks/ShippingDelivery/config";
import { PolicyDocument } from "@/blocks/PolicyDocument/config";
import { ContractorsProgram } from "@/blocks/ContractorsProgram/config";
import { InvestorRelations } from "@/blocks/InvestorRelations/config";
import { DealershipInquiry } from "@/blocks/DealershipInquiry/config";
import { Sustainability } from "@/blocks/Sustainability/config";


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
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
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
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                BrandMarquee,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Gallery,
                AboutUs,
                Staffs,
                Feedback,
                OurServices,
                Highlights,
                CarouselBlock,
                HeroCarouselBlock,
                NewsActivities,
                HighlightsAndNews,
                MissionVision,
                Programs,
                Testimonials,
                Partners,
                Impact,
                VolunteerCTA,
                UpcomingEvents,
                Contact,
                HeroSection,
                FeaturedCauses,
                ImpactNumbers,
                LatestNews,
                NewsletterSignup,
                SuccessStories,
                QuickLinks,
                WelcomeSection,
                VideoHero,
                PopularColours,
                CurvedColorProfile,
                PremiumPaintsGrid,
                ColorsToSuit,
                ComparisonTable,
                PaletteShowcase,
                FinishCards,
                RoomVisualizerCTA,
                PaintCalculatorSection,
                GalleryMasonry,
                InspirationGallery,
                MoodQuiz,
                StoreLocator,
                HirePainterSection,
                ExcellenceStats,
                BeforeAfterSplit,
                VideoStorytelling,
                ProjectShowcase,
                TexturesGrid,
                AboutHero,
                AboutMissionStory,
                AboutHeritage,
                AboutExpertise,
                AboutValues,
                AboutTeam,
                AboutCTA,
                LiquidTransition,
                HorizontalColorSpectrum,
                PeelingTapeFeatures,
                HeroBannerSlider,
                HeroBannerVideoSlider,
                BestSellingProducts,
                ShippingDelivery,
                PolicyDocument,
                ContractorsProgram,
                InvestorRelations,
                DealershipInquiry,
                Sustainability,
              ],
              required: true,
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
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
