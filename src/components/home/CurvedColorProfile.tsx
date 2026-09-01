"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Swatch {
  name: string;
  hex: string;
  slug?: string;
}

export interface CurvedColorProfileProps {
  heading?: string;
  subheading?: string;
  swatches?: Swatch[];
  ctaButton?: {
    label?: string | null;
    url?: string | null;
  } | null;
  backgroundStyle?: "navy" | "dark" | "gold" | null;
}

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_SWATCHES: Swatch[] = [
  { name: "Off-White", hex: "#F5F2ED", slug: "off-white" },
  { name: "Warm Grey", hex: "#8E8E8E", slug: "warm-grey" },
  { name: "Accent Gold", hex: "#C9A84C", slug: "accent-gold" },
  { name: "Danger Red", hex: "#D94040", slug: "danger-red" },
  { name: "Deep Navy", hex: "#0D1B3E", slug: "deep-navy" },
];

// ─── Background style map ─────────────────────────────────────────────────────

const BG_CLASSES: Record<string, string> = {
  navy: "bg-[#0D1B3E]",
  dark: "bg-[#0D1B3E]",
  gold: "bg-reliance-gold",
};

const FILL_CLASSES: Record<string, string> = {
  navy: "fill-[#0D1B3E]",
  dark: "fill-[#0D1B3E]",
  gold: "fill-reliance-gold",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const CurvedColorProfile: React.FC<CurvedColorProfileProps> = ({
  heading = "Curved Color Profile for 2026",
  subheading,
  swatches,
  ctaButton,
  backgroundStyle = "navy",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const swatchesContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const displaySwatches = swatches && swatches.length > 0 ? swatches : FALLBACK_SWATCHES;
  const bg = BG_CLASSES[backgroundStyle ?? "navy"] ?? BG_CLASSES.navy;
  const fill = FILL_CLASSES[backgroundStyle ?? "navy"] ?? FILL_CLASSES.navy;
  const isGold = backgroundStyle === "gold";
  const btnUrl = ctaButton?.url ?? "/colors";
  const btnLabel = ctaButton?.label ?? "Shop Now";

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }
      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: subheadingRef.current, start: "top 85%" },
        });
      }
      if (swatchesContainerRef.current) {
        gsap.from(Array.from(swatchesContainerRef.current.children), {
          opacity: 0,
          scale: 0.7,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: swatchesContainerRef.current, start: "top 85%" },
        });
      }
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={`relative w-full ${bg} text-white overflow-hidden py-16 md:py-32`}>
      {/* ── Top SVG Curve ───────────────────────────────────────────── */}
      <div className="absolute top-[-49px] left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[50px] ${fill}`}>
          <path d="M0,120 V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47 V120 Z" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
        {/* ── Heading ────────────────────────────────────────────────── */}
        <h2 ref={headingRef} className={`text-3xl md:text-4xl lg:text-6xl mb-4 ${isGold ? "text-reliance-navy" : "text-white"}`}>
          {heading}
        </h2>

        {subheading && (
          <p
            ref={subheadingRef}
            className={`text-lg mb-10 max-w-xl ${isGold ? "text-reliance-navy/80" : "text-white/70"}`}
          >
            {subheading}
          </p>
        )}

        {/* ── Swatches ───────────────────────────────────────────────── */}
        <div
          ref={swatchesContainerRef}
          className={`flex flex-wrap justify-center gap-6 ${subheading ? "mb-12" : "mt-8 mb-12"}`}
        >
          {displaySwatches.map((swatch, idx) => {
            const swatchSlug =
              swatch.slug ||
              swatch.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            return (
              <Link href={`/colors/${swatchSlug}`} key={idx} className="block" scroll={true}>
                <div className="group relative cursor-pointer">
                  <div
                    className="w-24 h-24 rounded-full shadow-lg border-4 border-white/10 transition-transform duration-300 group-hover:scale-125 group-hover:border-white/50"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-medium">
                    {swatch.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA Button ─────────────────────────────────────────────── */}
        <div ref={ctaRef}>
          <Link
            href={btnUrl}
            className={`inline-block px-8 py-4 rounded-full font-bold shadow-lg transition-colors duration-300 ${
              isGold
                ? "bg-reliance-navy text-white hover:bg-reliance-navy/90"
                : "bg-reliance-gold text-reliance-navy hover:bg-reliance-gold/90"
            }`}
          >
            {btnLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};
