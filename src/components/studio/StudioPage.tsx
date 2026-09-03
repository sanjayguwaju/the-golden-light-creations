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

export function StudioPage() {
  return (
    <div className="relative w-full bg-[#0A0A0A] text-white selection:bg-[#F5B301] selection:text-[#0A0A0A]">
      {/* 1. Hero Section */}
      <StudioHero />

      {/* 2. Seamless Marquee Ticker */}
      <StudioMarquee />

      {/* 3. Filterable Portfolio + Lightbox */}
      <StudioPortfolio />

      {/* 4. Cinematic Films Reel Slider + Video Modal */}
      <StudioFilms />

      {/* 5. 10 Core Production Services */}
      <StudioServices />

      {/* 6. Studio Story Narrative + Live Counter Stats */}
      <StudioStory />

      {/* 7. Large Glowing Numbers Stat Band */}
      <StudioStats />

      {/* 8. Client Testimonials */}
      <StudioTestimonials />

      {/* 9. Curated Instagram Aesthetic Grid */}
      <StudioSocial />

      {/* 10. Booking Inquiry & WhatsApp Direct Section */}
      <StudioContact />
    </div>
  );
}
