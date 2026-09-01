"use client";

import React from "react";

// ── New spec-compliant sections strictly from HomepageGroup ──────────────────
import { HeroSection } from "./home/HeroSection";
import { HeroBannerSliderBlock } from "@/blocks/HomepageGroupBlocks/HeroBannerSlider/Component";
import { CurvedColorProfile } from "./home/CurvedColorProfile";
import { BestSellingProducts } from "./home/BestSellingProducts";
import { PremiumPaintsGrid } from "./home/PremiumPaintsGrid";
import { ColorsToSuit } from "./home/ColorsToSuit";
import { ComparisonTable } from "./home/ComparisonTable";
import { PaletteShowcase } from "./home/PaletteShowcase";
import { FinishCards } from "./home/FinishCards";
import { RoomVisualizerCTA } from "./home/RoomVisualizerCTA";
import { PaintCalculatorSection } from "./home/PaintCalculatorSection";
import { GalleryMasonry } from "./home/GalleryMasonry";
import { MoodQuiz } from "./home/MoodQuiz";
import { StoreLocator } from "./home/StoreLocator";
import { HirePainterSection } from "./home/HirePainterSection";
import { ExcellenceStats } from "./home/ExcellenceStats";
import { BrandMarquee } from "./home/BrandMarquee";

const mockHeroSlides = [
  {
    image: "/paint-tin-mockup.png",
    titlePrefix: "SuperClean Matt",
    titleHighlight: "Pro",
    subtitle: "Premium Paints Engineered for Every Surface",
    primaryButtonText: "Explore Range",
    primaryButtonUrl: "/products",
    secondaryButtonText: "View Palette",
    secondaryButtonUrl: "/colors",
  },
  {
    image: "/paint-tin-mockup.png",
    titlePrefix: "LuxSheen Gloss",
    titleHighlight: "Elite",
    subtitle: "Mirror-finish brilliance for interiors & exteriors",
    primaryButtonText: "Explore Range",
    primaryButtonUrl: "/products",
    secondaryButtonText: "View Palette",
    secondaryButtonUrl: "/colors",
  },
];

export default function Homepage() {
  return (
    <div className="font-sans antialiased bg-page-bg text-reliance-navy">
      {/* 1. Hero — Full-bleed Hero Banner / Slider strictly from HomepageGroup */}
      <HeroBannerSliderBlock
        autoplay
        autoplaySpeed={5}
        aspectRatio="auto"
        showArrows
        showDots
      />

      {/* Alternative interactive product slider */}
      {/* <HeroSection slides={mockHeroSlides} /> */}

      {/* 2. Curved Color Profile Banner */}
      <CurvedColorProfile />

      {/* 3. Our Best Selling Products (6 Products) */}
      <BestSellingProducts />

      {/* 4. Premium Paints Grid — Masonry-style */}
      <PremiumPaintsGrid />

      {/* 4. Colors to Suit Your Palette */}
      <ColorsToSuit />

      {/* 5. Find the Right Paint — Comparison Table */}
      <ComparisonTable />

      {/* 6. 1,500+ Shades Palette Showcase */}
      <PaletteShowcase />
      {/* 7. Choose the Perfect Finish — Room Cards */}
      <FinishCards />

      {/* 8. See It On Your Wall — Room Visualizer CTA */}
      <RoomVisualizerCTA />

      {/* 9. Paint Calculator */}
      <PaintCalculatorSection />

      {/* 10. Real Homes, Real Results — Gallery */}
      <GalleryMasonry />

      {/* 11. Find Your Perfect Color — Mood Quiz */}
      <MoodQuiz />

      {/* 12. Locate Your Nearest Store — Map Section */}
      <StoreLocator />

      {/* 13. Hire a Certified ColourCast Painter */}
      <HirePainterSection />

      {/* 14. Engineered for Excellence — Stats Bar */}
      <ExcellenceStats />

      {/* 15. Trusted Across India — Brand Logos Marquee */}
      <BrandMarquee />
    </div>
  );
}
