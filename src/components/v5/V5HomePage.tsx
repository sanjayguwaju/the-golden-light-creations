import React from "react";
import { V5HeroBlockComponent } from "@/blocks/V5Hero/Component";
import { V5StatsBlockComponent } from "@/blocks/V5Stats/Component";
import { V5ServicesBlockComponent } from "@/blocks/V5Services/Component";
import { V5PortfolioBlockComponent } from "@/blocks/V5Portfolio/Component";
import { V5LiveEventsBlockComponent } from "@/blocks/V5LiveEvents/Component";
import { V5PackagesBlockComponent } from "@/blocks/V5Packages/Component";
import { V5AboutBlockComponent } from "@/blocks/V5About/Component";
import { V5FounderBlockComponent } from "@/blocks/V5Founder/Component";
import { V5TestimonialsBlockComponent } from "@/blocks/V5Testimonials/Component";
import { V5CtaBandBlockComponent } from "@/blocks/V5CtaBand/Component";
import { V5ContactBlockComponent } from "@/blocks/V5Contact/Component";

export function V5HomePage() {
  return (
    <div className="relative w-full bg-white text-[#1A1414] selection:bg-[#A31621] selection:text-white">
      <V5HeroBlockComponent />
      <V5StatsBlockComponent />
      <V5ServicesBlockComponent />
      <V5PortfolioBlockComponent />
      <V5LiveEventsBlockComponent />
      <V5PackagesBlockComponent />
      <V5AboutBlockComponent />
      <V5FounderBlockComponent />
      <V5TestimonialsBlockComponent />
      <V5CtaBandBlockComponent />
      <V5ContactBlockComponent />
    </div>
  );
}
