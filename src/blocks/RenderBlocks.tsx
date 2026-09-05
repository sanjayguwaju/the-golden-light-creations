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
import { CarouselBlockComponent } from "@/blocks/Carousel/Component";
import { TestimonialsBlock } from "./Testimonials/Component";
import { ContactBlock } from "./Contact/Component";
import { StudioPortfolioBlockComponent } from "@/blocks/StudioPortfolio/Component";
import { StudioFilmsBlockComponent } from "@/blocks/StudioFilms/Component";
import { StudioServicesBlockComponent } from "@/blocks/StudioServices/Component";
import { StudioStoryBlockComponent } from "@/blocks/StudioStory/Component";
import { StudioStatsBlockComponent } from "@/blocks/StudioStats/Component";
import { StudioSocialBlockComponent } from "@/blocks/StudioSocial/Component";
import { StudioMarqueeBlockComponent } from "@/blocks/StudioMarquee/Component";
import { StudioHeroBlockComponent } from "@/blocks/StudioHero/Component";
import { StudioContactBlockComponent } from "@/blocks/StudioContact/Component";
import { StudioTestimonialsBlockComponent } from "@/blocks/StudioTestimonials/Component";
import { StudioPageHeaderBlockComponent } from "@/blocks/StudioPageHeader/Component";
import { StudioBannerBlockComponent } from "@/blocks/StudioBanner/Component";
import { StudioPillarsBlockComponent } from "@/blocks/StudioPillars/Component";
import { StudioProcessBlockComponent } from "@/blocks/StudioProcess/Component";
import { StudioJournalBlockComponent } from "@/blocks/StudioJournal/Component";
import { StudioFAQBlockComponent } from "@/blocks/StudioFAQ/Component";
import { StudioTeamBlockComponent } from "@/blocks/StudioTeam/Component";

const blockComponents = {
  studioHero: StudioHeroBlockComponent,
  studioPageHeader: StudioPageHeaderBlockComponent,
  studioMarquee: StudioMarqueeBlockComponent,
  studioPortfolio: StudioPortfolioBlockComponent,
  studioFilms: StudioFilmsBlockComponent,
  studioServices: StudioServicesBlockComponent,
  studioStory: StudioStoryBlockComponent,
  studioStats: StudioStatsBlockComponent,
  studioPillars: StudioPillarsBlockComponent,
  studioProcess: StudioProcessBlockComponent,
  studioJournal: StudioJournalBlockComponent,
  studioFAQ: StudioFAQBlockComponent,
  studioTeam: StudioTeamBlockComponent,
  studioTestimonials: StudioTestimonialsBlockComponent,
  studioSocial: StudioSocialBlockComponent,
  studioBanner: StudioBannerBlockComponent,
  studioContact: StudioContactBlockComponent,
  archive: ArchiveBlock,
  brandMarquee: BrandMarqueeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: GalleryBlock,
  aboutUs: AboutUsBlock,
  carouselBlock: CarouselBlockComponent,
  testimonials: TestimonialsBlock,
  contact: ContactBlock,
};

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page["layout"]>;
}> = ({ blocks }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents];

          return (
            <div key={index}>
              <ScrollReveal>
                <Block {...(block as any)} disableInnerContainer />
              </ScrollReveal>
            </div>
          );
        }

        return null;
      })}
    </Fragment>
  );
};
