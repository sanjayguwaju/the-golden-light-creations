"use client";

import React from "react";

export function StudioMarquee() {
  const items = [
    "Wedding Photography",
    "Cinematic Films",
    "Drone Coverage",
    "Concert Photography",
    "Fashion Shoots",
    "Commercial Ads",
    "Digital Marketing",
    "Social Branding",
  ];

  return (
    <div
      id="intro-band"
      className="bg-[#F5B301] py-4 sm:py-5 overflow-hidden border-y border-[#C8920A] flex items-center select-none"
    >
      <div className="flex w-max animate-marquee">
        {/* First Loop */}
        <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap">
          {items.map((item, idx) => (
            <React.Fragment key={`marquee-1-${idx}`}>
              <span className="font-bebas text-lg sm:text-2xl md:text-3xl tracking-[0.12em] text-[#0A0A0A] uppercase font-bold">
                {item}
              </span>
              <span className="text-[#0A0A0A]/40 text-xs sm:text-base">◆</span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate Loop for Seamless Infinite Scroll */}
        <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap" aria-hidden="true">
          {items.map((item, idx) => (
            <React.Fragment key={`marquee-2-${idx}`}>
              <span className="font-bebas text-lg sm:text-2xl md:text-3xl tracking-[0.12em] text-[#0A0A0A] uppercase font-bold">
                {item}
              </span>
              <span className="text-[#0A0A0A]/40 text-xs sm:text-base">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
