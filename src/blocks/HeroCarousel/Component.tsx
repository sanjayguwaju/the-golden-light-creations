import React from "react";
import type { HomepageHeroCarouselBlock as HeroCarouselBlockProps } from "@/payload-types";
import { HeroSection } from "@/components/home/HeroSection";

export const HeroCarouselBlockComponent: React.FC<HeroCarouselBlockProps> = (props) => {
  return <HeroSection slides={props.slides as any} />;
};

