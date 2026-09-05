import React from "react";
import { StudioHero } from "./StudioHero";
import { StudioMarquee } from "./StudioMarquee";
import { StudioPortfolio } from "./StudioPortfolio";
import { StudioFilms } from "./StudioFilms";
import { StudioPillars } from "./StudioPillars";
import { StudioServices } from "./StudioServices";
import { StudioProcess } from "./StudioProcess";
import { StudioStory } from "./StudioStory";
import { StudioStats } from "./StudioStats";
import { StudioJournal } from "./StudioJournal";
import { StudioBanner } from "./StudioBanner";
import { StudioTestimonials } from "./StudioTestimonials";
import { StudioFAQ } from "./StudioFAQ";
import { StudioSocial } from "./StudioSocial";
import { StudioContact } from "./StudioContact";
import { StudioTeam } from "./StudioTeam";
import type {
  FallbackPortfolioItem,
  FallbackFilmItem,
  FallbackServiceItem,
  FallbackTestimonialItem,
  FallbackTeamMember,
  FallbackPostItem,
} from "@/utilities/studioDefaults";

interface StudioPageProps {
  portfolio?: FallbackPortfolioItem[];
  films?: FallbackFilmItem[];
  services?: FallbackServiceItem[];
  testimonials?: FallbackTestimonialItem[];
  team?: FallbackTeamMember[];
  posts?: FallbackPostItem[];
  settings?: any;
}

export function StudioPage({
  portfolio,
  films,
  services,
  testimonials,
  team,
  posts,
  settings,
}: StudioPageProps) {
  return (
    <div className="relative w-full bg-white text-[#0A0A0A] selection:bg-[#C0171E] selection:text-white">
      {/* 1. Hero Section */}
      <StudioHero />

      {/* 2. Seamless Marquee Ticker */}
      <StudioMarquee items={settings?.marqueeItems} />

      {/* 3. Filterable Portfolio Preview + Lightbox */}
      <StudioPortfolio items={portfolio} isHomepagePreview={true} />

      {/* 4. Cinematic Films Reel Slider + Video Modal */}
      <StudioFilms items={films} isHomepagePreview={true} />

      {/* 5. The Studio Pillars */}
      <StudioPillars />

      {/* 6. Core Production Services Preview */}
      <StudioServices items={services} isHomepagePreview={true} />

      {/* 7. The Creative Journey / Process */}
      <StudioProcess />

      {/* 8. Studio Story Narrative + Live Counter Stats */}
      <StudioStory
        headline={settings?.story?.headline}
        quote={settings?.story?.quote}
        paragraph1={settings?.story?.paragraph1}
        paragraph2={settings?.story?.paragraph2}
        stats={settings?.stats}
        isHomepagePreview={true}
      />

      {/* 9. Large Glowing Numbers Stat Band */}
      <StudioStats stats={settings?.stats} />

      {/* 10. The Creative Collective (Studio Team) */}
      <StudioTeam members={team} />

      {/* 11. From the Studio Journal */}
      <StudioJournal posts={posts} />

      {/* 11. Mid-Page Callout Banner */}
      <StudioBanner />

      {/* 12. Client Testimonials */}
      <StudioTestimonials items={testimonials} />

      {/* 13. Frequently Asked Questions */}
      <StudioFAQ />

      {/* 14. Curated Instagram Aesthetic Grid */}
      <StudioSocial />

      {/* 15. Booking Inquiry & WhatsApp Direct Section */}
      <StudioContact contact={settings?.contact} />
    </div>
  );
}
