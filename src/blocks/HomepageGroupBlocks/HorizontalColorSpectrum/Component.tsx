"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { HorizontalColorSpectrumBlock as HorizontalColorSpectrumBlockProps } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_COLORS = [
  { label: "Crimson Red", hex: "#D94040" },
  { label: "Navy Blue", hex: "#0D1B3E" },
  { label: "Golden Yellow", hex: "#C9A84C" },
  { label: "Forest Green", hex: "#2A4B3C" },
  { label: "Sunset Orange", hex: "#E86A33" },
  { label: "Dusty Rose", hex: "#B87C80" },
  { label: "Ocean Teal", hex: "#1D7874" },
];

export const HorizontalColorSpectrumBlock: React.FC<HorizontalColorSpectrumBlockProps> = ({
  title,
  description,
  colors,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const displayColors = colors && colors.length > 0 ? colors : FALLBACK_COLORS;
  
  // Track hovered color to transition the background softly
  const [activeBg, setActiveBg] = useState("#F5F2ED"); // default light background

  useGSAP(
    () => {
      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      if (!container || !scrollWrapper) return;

      // The distance we need to scroll horizontally
      // It's the full width of the wrapper minus the viewport width
      const xDistance = -(scrollWrapper.scrollWidth - window.innerWidth);

      gsap.to(scrollWrapper, {
        x: xDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(xDistance)}`,
          pin: true,
          scrub: 1, // smooth scrubbing
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Background color tween
  useGSAP(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundColor: activeBg,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [activeBg]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden text-reliance-navy">
      {/* Dynamic Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 bg-[#F5F2ED]" />

      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Header (pinned visually because parent is pinned) */}
        <div className="px-8 md:px-20 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">{title}</h2>
          {description && <p className="text-xl max-w-2xl opacity-80">{description}</p>}
        </div>

        {/* Horizontal Scrolling Track */}
        <div ref={scrollWrapperRef} className="flex px-8 md:px-20 gap-8 items-center w-max">
          {displayColors.map((color, index) => (
            <div
              key={`${color.hex}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              onMouseEnter={() => setActiveBg(color.hex)}
              onMouseLeave={() => setActiveBg("#F5F2ED")}
            >
              <div
                className="w-48 h-64 md:w-64 md:h-96 rounded-t-full rounded-b-md shadow-lg transition-transform duration-500 ease-out group-hover:-translate-y-4"
                style={{ backgroundColor: color.hex }}
              />
              <div className="mt-6">
                <p className="font-bold text-lg uppercase tracking-wider">{color.label}</p>
                <p className="text-sm opacity-60 font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
