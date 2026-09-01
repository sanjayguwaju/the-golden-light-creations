"use client";

import React from "react";
import { HeroSection } from "@/components/home/HeroSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeroCarousel: React.FC<any> = (props) => {
  const { slides } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedSlides = (slides || []).map((slide: any) => {
    const primaryLink = slide.links?.[0];
    const secondaryLink = slide.links?.[1];

    return {
      ...slide, // keep original properties just in case
      titlePrefix: slide.title || "",
      subtitle: slide.description || "",
      image: slide.image,
      primaryButtonText: primaryLink?.label || "",
      primaryButtonUrl: primaryLink?.url || "",
      secondaryButtonText: secondaryLink?.label || "",
      secondaryButtonUrl: secondaryLink?.url || "",
    };
  });

  return <HeroSection slides={mappedSlides} />;
};
