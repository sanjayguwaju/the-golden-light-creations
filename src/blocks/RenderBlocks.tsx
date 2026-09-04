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

const blockComponents = {
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
  blocks: Page["layout"][0][];
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
