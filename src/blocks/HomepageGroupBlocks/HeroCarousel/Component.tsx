import React from "react";
import type { HomepageHeroCarouselBlock as HomepageHeroCarouselProps } from "@/payload-types";
import { HeroSection } from "@/components/home/HeroSection";

export const HomepageHeroCarouselBlock: React.FC<HomepageHeroCarouselProps> = (props) => {
  return <HeroSection slides={props.slides as any} />;
};

export const HeroCarouselBlockComponent = HomepageHeroCarouselBlock;
