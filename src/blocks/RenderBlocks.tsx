import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import { ScrollReveal } from "@/components/ScrollReveal";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { BrandMarqueeBlock } from "@/blocks/BrandMarquee/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { AboutUsBlock } from "@/blocks/AboutUs/Component";
import { StaffsBlock } from "@/blocks/Staffs/Component";
import { FeedbackBlock } from "@/blocks/Feedback/Component";
import { OurServicesBlock } from "@/blocks/OurServices/Component";
import { HighlightsBlock } from "@/blocks/Highlights/Component";
import { CarouselBlockComponent } from "@/blocks/Carousel/Component";
import { NewsActivitiesBlock } from "./NewsActivities/Component";
import { HighlightsAndNewsBlock } from "./HighlightsAndNews/Component";
import { MissionVisionBlock } from "./MissionVision/Component";
import { ProgramsBlock } from "./Programs/Component";
import { TestimonialsBlock } from "./Testimonials/Component";
import { PartnersBlock } from "./Partners/Component";
import { ImpactBlock } from "./Impact/Component";
import { VolunteerCtaBlock } from "./VolunteerCTA/Component";
import { UpcomingEventsBlock } from "./UpcomingEvents/Component";
import { ContactBlock } from "./Contact/Component";
import {
  HeroSectionBlock,
  FeaturedCausesBlock,
  ImpactNumbersBlock,
  LatestNewsBlock,
  NewsletterSignupBlock,
  SuccessStoriesBlock,
  QuickLinksBlock,
  WelcomeSectionBlock,
  VideoHeroBlock,
  PopularColoursBlock,
  CurvedColorProfileBlock,
  PremiumPaintsGridBlock,
  ColorsToSuitBlock,
  ComparisonTableBlock,
  PaletteShowcaseBlock,
  FinishCardsBlock,
  RoomVisualizerCTABlock,
  PaintCalculatorSectionBlock,
  InspirationGalleryBlock,
  GalleryMasonryBlock,
  MoodQuizBlock,
  StoreLocatorBlock,
  HirePainterSectionBlock,
  ExcellenceStatsBlock,
  BeforeAfterSplitBlock,
  VideoStorytellingBlock,
  ProjectShowcaseBlock,
  TexturesGridBlock,
  LiquidTransitionBlock,
  HorizontalColorSpectrumBlock,
  PeelingTapeFeaturesBlock,
  HeroBannerSliderBlock,
  HeroBannerVideoSliderBlock,
  HeroCarouselBlockComponent,
  BestSellingProductsBlock,
} from "./HomepageGroupBlocks";
import { AboutHeroBlock } from "@/blocks/AboutUs/AboutHero/Component";
import { AboutMissionStoryBlock } from "@/blocks/AboutUs/AboutMissionStory/Component";
import { AboutHeritageBlock } from "@/blocks/AboutUs/AboutHeritage/Component";
import { AboutExpertiseBlock } from "@/blocks/AboutUs/AboutExpertise/Component";
import { AboutValuesBlock } from "@/blocks/AboutUs/AboutValues/Component";
import { AboutTeamBlock } from "@/blocks/AboutUs/AboutTeam/Component";
import { AboutCTABlock } from "@/blocks/AboutUs/AboutCTA/Component";
import { ShippingDeliveryBlock } from "@/blocks/ShippingDelivery/Component";
import { PolicyDocumentBlock } from "@/blocks/PolicyDocument/Component";
import { ContractorsProgramBlock } from "@/blocks/ContractorsProgram/Component";
import { InvestorRelationsBlock } from "@/blocks/InvestorRelations/Component";
import { DealershipInquiryBlock } from "@/blocks/DealershipInquiry/Component";
import { SustainabilityBlock } from "@/blocks/Sustainability/Component";

const blockComponents = {
  archive: ArchiveBlock,
  brandMarquee: BrandMarqueeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: GalleryBlock,
  aboutUs: AboutUsBlock,
  staffsBlock: StaffsBlock,
  feedback: FeedbackBlock,
  ourServices: OurServicesBlock,
  highlights: HighlightsBlock,
  carouselBlock: CarouselBlockComponent,
  heroCarouselBlock: HeroCarouselBlockComponent,
  homepageHeroCarousel: HeroCarouselBlockComponent,
  newsActivities: NewsActivitiesBlock,
  highlightsAndNews: HighlightsAndNewsBlock,
  missionVision: MissionVisionBlock,
  programs: ProgramsBlock,
  testimonials: TestimonialsBlock,
  partners: PartnersBlock,
  impact: ImpactBlock,
  volunteerCta: VolunteerCtaBlock,
  upcomingEvents: UpcomingEventsBlock,
  contact: ContactBlock,
  heroSection: HeroSectionBlock,
  featuredCauses: FeaturedCausesBlock,
  impactNumbers: ImpactNumbersBlock,
  latestNews: LatestNewsBlock,
  newsletterSignup: NewsletterSignupBlock,
  successStories: SuccessStoriesBlock,
  quickLinks: QuickLinksBlock,
  welcomeSection: WelcomeSectionBlock,
  videoHero: VideoHeroBlock,
  popularColours: PopularColoursBlock,
  curvedColorProfile: CurvedColorProfileBlock,
  premiumPaintsGrid: PremiumPaintsGridBlock,
  colorsToSuit: ColorsToSuitBlock,
  comparisonTable: ComparisonTableBlock,
  paletteShowcase: PaletteShowcaseBlock,
  finishCards: FinishCardsBlock,
  roomVisualizerCTA: RoomVisualizerCTABlock,
  paintCalculatorSection: PaintCalculatorSectionBlock,
  galleryMasonry: GalleryMasonryBlock,
  inspirationGallery: InspirationGalleryBlock,
  moodQuiz: MoodQuizBlock,
  storeLocator: StoreLocatorBlock,
  hirePainterSection: HirePainterSectionBlock,
  excellenceStats: ExcellenceStatsBlock,
  beforeAfterSplit: BeforeAfterSplitBlock,
  videoStorytelling: VideoStorytellingBlock,
  projectShowcase: ProjectShowcaseBlock,
  texturesGrid: TexturesGridBlock,
  liquidTransition: LiquidTransitionBlock,
  horizontalColorSpectrum: HorizontalColorSpectrumBlock,
  peelingTapeFeatures: PeelingTapeFeaturesBlock,
  heroBannerSlider: HeroBannerSliderBlock,
  heroBannerVideoSlider: HeroBannerVideoSliderBlock,
  bestSellingProducts: BestSellingProductsBlock,
  aboutHero: AboutHeroBlock,
  aboutMissionStory: AboutMissionStoryBlock,
  aboutHeritage: AboutHeritageBlock,
  aboutExpertise: AboutExpertiseBlock,
  aboutValues: AboutValuesBlock,
  aboutTeam: AboutTeamBlock,
  aboutCTA: AboutCTABlock,
  shippingDelivery: ShippingDeliveryBlock,
  policyDocument: PolicyDocumentBlock,
  contractorsProgram: ContractorsProgramBlock,
  investorRelations: InvestorRelationsBlock,
  dealershipInquiry: DealershipInquiryBlock,
  sustainability: SustainabilityBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = ({ blocks }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType];

          return (
            <div key={index}>
              <ScrollReveal>
                <Block {...block} disableInnerContainer />
              </ScrollReveal>
            </div>
          );
        }

        return null;
      })}
    </Fragment>
  );
};
