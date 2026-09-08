import type { Block } from "payload";

// ==============================================================================
// 1. Studio V1 Homepage Suite (Original Dark Cinema Theme)
// ==============================================================================
import { StudioHeroBlock } from "@/blocks/StudioHero/config";
import { StudioPageHeaderBlock } from "@/blocks/StudioPageHeader/config";
import { StudioMarqueeBlock } from "@/blocks/StudioMarquee/config";
import { StudioPortfolioBlock } from "@/blocks/StudioPortfolio/config";
import { StudioFilmsBlock } from "@/blocks/StudioFilms/config";
import { StudioServicesBlock } from "@/blocks/StudioServices/config";
import { StudioStoryBlock } from "@/blocks/StudioStory/config";
import { StudioStatsBlock } from "@/blocks/StudioStats/config";
import { StudioPillarsBlock } from "@/blocks/StudioPillars/config";
import { StudioProcessBlock } from "@/blocks/StudioProcess/config";
import { StudioJournalBlock } from "@/blocks/StudioJournal/config";
import { StudioFAQBlock } from "@/blocks/StudioFAQ/config";
import { StudioTeamBlock } from "@/blocks/StudioTeam/config";
import { StudioTestimonialsBlock } from "@/blocks/StudioTestimonials/config";
import { StudioSocialBlock } from "@/blocks/StudioSocial/config";
import { StudioBannerBlock } from "@/blocks/StudioBanner/config";
import { StudioContactBlock } from "@/blocks/StudioContact/config";

// ==============================================================================
// 2. V5 Editorial Homepage Suite (Warm Paper, Fraunces Serif, 3D Tilt)
// ==============================================================================
import { V5HeroBlock } from "@/blocks/V5Hero/config";
import { V5StatsBlock } from "@/blocks/V5Stats/config";
import { V5ServicesBlock } from "@/blocks/V5Services/config";
import { V5PortfolioBlock } from "@/blocks/V5Portfolio/config";
import { V5LiveEventsBlock } from "@/blocks/V5LiveEvents/config";
import { V5PackagesBlock } from "@/blocks/V5Packages/config";
import { V5AboutBlock } from "@/blocks/V5About/config";
import { V5FounderBlock } from "@/blocks/V5Founder/config";
import { V5TestimonialsBlock } from "@/blocks/V5Testimonials/config";
import { V5CtaBandBlock } from "@/blocks/V5CtaBand/config";
import { V5ContactBlock } from "@/blocks/V5Contact/config";

// ==============================================================================
// 3. Shared Utility & General Content Blocks
// ==============================================================================
import { CallToAction } from "@/blocks/CallToAction/config";
import { Content } from "@/blocks/Content/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { FormBlock } from "@/blocks/Form/config";
import { Gallery } from "@/blocks/Gallery/config";
import { BrandMarquee } from "@/blocks/BrandMarquee/config";
import { CarouselBlock } from "@/blocks/Carousel/config";
import { Testimonials } from "@/blocks/Testimonials/config";
import { Contact } from "@/blocks/Contact/config";
import { AboutUs } from "@/blocks/AboutUs/config";

// Versioned Block Bundles
export const studioV1Blocks: Block[] = [
  StudioHeroBlock,
  StudioPageHeaderBlock,
  StudioMarqueeBlock,
  StudioPortfolioBlock,
  StudioFilmsBlock,
  StudioServicesBlock,
  StudioStoryBlock,
  StudioStatsBlock,
  StudioPillarsBlock,
  StudioProcessBlock,
  StudioJournalBlock,
  StudioFAQBlock,
  StudioTeamBlock,
  StudioTestimonialsBlock,
  StudioSocialBlock,
  StudioBannerBlock,
  StudioContactBlock,
];

export const v5EditorialBlocks: Block[] = [
  V5HeroBlock,
  V5StatsBlock,
  V5ServicesBlock,
  V5PortfolioBlock,
  V5LiveEventsBlock,
  V5PackagesBlock,
  V5AboutBlock,
  V5FounderBlock,
  V5TestimonialsBlock,
  V5CtaBandBlock,
  V5ContactBlock,
];

export const sharedContentBlocks: Block[] = [
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
];

// Complete combined block list registered with Pages collection layout
export const pageLayoutBlocks: Block[] = [
  ...v5EditorialBlocks,
  ...studioV1Blocks,
  ...sharedContentBlocks,
];
