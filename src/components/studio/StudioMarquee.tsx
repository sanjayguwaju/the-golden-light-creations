"use client";

import React from "react";
import { defaultStudioSettings } from "@/utilities/studioDefaults";

interface StudioMarqueeProps {
  items?: Array<{ text: string } | string>;
}

export function StudioMarquee({ items }: StudioMarqueeProps) {
  const normalizedItems = (items && items.length > 0 ? items : defaultStudioSettings.marqueeItems).map(
    (it) => (typeof it === "string" ? it : it.text)
  );

  return (
    <div
      id="intro-band"
      className="bg-[#C0171E] py-4 sm:py-5 overflow-hidden border-y border-[#A01018] flex items-center select-none"
    >
      <div className="flex w-max animate-marquee">
        {/* First Loop */}
        <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap">
          {normalizedItems.map((item, idx) => (
            <React.Fragment key={`marquee-1-${idx}`}>
              <span className="font-bebas text-lg sm:text-2xl md:text-3xl tracking-[0.12em] text-white uppercase font-bold">
                {item}
              </span>
              <span className="text-white/40 text-xs sm:text-base">◆</span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate Loop for Seamless Infinite Scroll */}
        <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap" aria-hidden="true">
          {normalizedItems.map((item, idx) => (
            <React.Fragment key={`marquee-2-${idx}`}>
              <span className="font-bebas text-lg sm:text-2xl md:text-3xl tracking-[0.12em] text-white uppercase font-bold">
                {item}
              </span>
              <span className="text-white/40 text-xs sm:text-base">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
