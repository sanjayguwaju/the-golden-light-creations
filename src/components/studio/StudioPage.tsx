"use client";

import React from "react";
import { StudioHero } from "./StudioHero";
import { StudioMarquee } from "./StudioMarquee";
import { StudioPortfolio } from "./StudioPortfolio";
import { StudioFilms } from "./StudioFilms";
import { StudioServices } from "./StudioServices";
import { StudioStory } from "./StudioStory";
import { StudioStats } from "./StudioStats";
import { StudioTestimonials } from "./StudioTestimonials";
import { StudioSocial } from "./StudioSocial";
import { StudioContact } from "./StudioContact";
import type {
  FallbackPortfolioItem,
  FallbackFilmItem,
  FallbackServiceItem,
  FallbackTestimonialItem,
} from "@/utilities/studioDefaults";

interface StudioPageProps {
  portfolio?: FallbackPortfolioItem[];
  films?: FallbackFilmItem[];
  services?: FallbackServiceItem[];
  testimonials?: FallbackTestimonialItem[];
  settings?: any;
}

export function StudioPage({
  portfolio,
  films,
  services,
  testimonials,
  settings,
}: StudioPageProps) {
  return (
    <div className="relative w-full bg-[#0A0A0A] text-white selection:bg-[#F5B301] selection:text-[#0A0A0A]">
      {/* 1. Hero Section */}
      <StudioHero />

      {/* 2. Seamless Marquee Ticker */}
      <StudioMarquee items={settings?.marqueeItems} />

      {/* 3. Filterable Portfolio Preview + Lightbox */}
      <StudioPortfolio items={portfolio} isHomepagePreview={true} />

      {/* 4. Cinematic Films Reel Slider + Video Modal */}
      <StudioFilms items={films} isHomepagePreview={true} />

      {/* 5. Core Production Services Preview */}
      <StudioServices items={services} isHomepagePreview={true} />

      {/* 6. Studio Story Narrative + Live Counter Stats */}
      <StudioStory
        headline={settings?.story?.headline}
        quote={settings?.story?.quote}
        paragraph1={settings?.story?.paragraph1}
        paragraph2={settings?.story?.paragraph2}
        stats={settings?.stats}
        isHomepagePreview={true}
      />

      {/* 7. Large Glowing Numbers Stat Band */}
      <StudioStats stats={settings?.stats} />

      {/* 8. Client Testimonials */}
      <StudioTestimonials items={testimonials} />

      {/* 9. Curated Instagram Aesthetic Grid */}
      <StudioSocial />

      {/* 10. Booking Inquiry & WhatsApp Direct Section */}
      <StudioContact contact={settings?.contact} />
    </div>
  );
}
