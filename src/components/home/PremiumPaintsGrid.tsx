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

export interface GridCard {
  title: string;
  surface: string;
  image: string;
  /** Tailwind grid span classes, e.g. "col-span-1 row-span-2" */
  spanClass: string;
  linkUrl?: string;
}

export interface PremiumPaintsGridProps {
  heading?: string;
  subheading?: string;
  cards?: GridCard[];
  viewAllLink?: {
    label?: string | null;
    url?: string | null;
  } | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PremiumPaintsGrid: React.FC<PremiumPaintsGridProps> = ({
  heading = "Engineered for Every Surface",
  subheading = "Discover our premium range of paints crafted for durability and aesthetic excellence.",
  cards,
  viewAllLink,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const displayCards = cards && cards.length > 0 ? cards : [];

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
      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
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
    <section ref={sectionRef} className="py-12 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-reliance-navy mb-4">{heading}</h2>
          {subheading && (
            <p className="text-lg text-reliance-grey max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>

        {/* ── Masonry Grid ─────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-reliance-navy/20 border border-reliance-navy/20 auto-rows-[300px]"
        >
          {displayCards.map((card: GridCard, idx: number) => (
            <div
              key={idx}
              className={`group relative overflow-hidden cursor-pointer bg-white ${card.spanClass}`}
            >
              <Link
                href={card.linkUrl ?? "#"}
                className="absolute inset-0 z-10"
                aria-label={card.title}
              />

              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-reliance-navy/40 group-hover:bg-reliance-navy/60 transition-colors duration-300" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                {card.surface && (
                  <span className="bg-white text-reliance-navy px-3 py-1 self-start text-xs font-bold mb-4 tracking-widest uppercase border border-white">
                    {card.surface}
                  </span>
                )}
                <h3 className="text-3xl lg:text-4xl text-white uppercase tracking-tight mb-2">
                  {card.title}
                </h3>

                <div className="overflow-hidden h-0 group-hover:h-[24px] transition-all duration-300">
                  <span className="flex items-center text-white text-sm tracking-widest uppercase font-bold gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    View Product <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── View All CTA ─────────────────────────────────────────────── */}
        {viewAllLink?.url && (
          <div ref={ctaRef} className="flex justify-center mt-12">
            <Link
              href={viewAllLink.url}
              className="inline-flex items-center gap-2 px-8 py-4 border border-reliance-navy bg-reliance-navy text-white text-sm font-bold uppercase tracking-widest hover:bg-transparent hover:text-reliance-navy transition-colors duration-300"
            >
              {viewAllLink.label ?? "View All Products"}
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
