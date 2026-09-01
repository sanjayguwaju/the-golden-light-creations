"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaletteColor {
  name: string;
  hex: string;
  slug?: string;
}

export interface PaletteGroup {
  name: string;
  colors: PaletteColor[];
}

export interface MoodImage {
  imageUrl: string;
  caption: string;
  linkLabel: string;
  linkUrl: string;
}

export interface PaletteShowcaseProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  palettes?: PaletteGroup[];
  moodImages?: MoodImage[];
  viewAllLink?: {
    label?: string | null;
    url?: string | null;
  } | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PaletteShowcase: React.FC<PaletteShowcaseProps> = ({
  sectionLabel = "1,500+ Shades",
  heading = "To Define Your Space",
  subheading = "Scroll through curated palette groups and find your perfect color story.",
  palettes = [],
  moodImages = [],
  viewAllLink,
}) => {
  const [activePalette, setActivePalette] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  // Use dynamic palettes from CMS
  const displayPalettes = palettes;

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }
    },
    { scope: sectionRef },
  );

  // Animate the details panel expanding/collapsing and the staggered items inside
  useEffect(() => {
    const el = detailsPanelRef.current;
    if (!el) return;

    if (activePalette !== null) {
      // Clear inline styles before measuring
      gsap.set(el, { height: "auto", opacity: 1, marginBottom: 48, display: "block" });
      const height = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0, marginBottom: 0 },
        { height, opacity: 1, marginBottom: 48, duration: 0.45, ease: "power3.out" }
      );

      // Stagger animate swatches inside
      const items = el.querySelectorAll(".palette-item-link");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, delay: 0.15, ease: "power2.out" }
        );
      }
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        marginBottom: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { display: "none" });
        },
      });
    }
  }, [activePalette]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-white overflow-hidden" id="colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg text-reliance-grey">{subheading}</p>
          )}
        </div>

        {/* ── Horizontal palette strip ────────────────────────────────────── */}
        <div className="overflow-x-auto pb-4 mb-12 -mx-6 px-6">
          <div className="flex gap-6 min-w-max">
            {displayPalettes.map((palette, pidx) => (
              <div
                key={pidx}
                className="flex flex-col gap-2 cursor-pointer group/strip"
                onClick={() => setActivePalette(activePalette === pidx ? null : pidx)}
              >
                <div
                  className={`flex overflow-hidden transition-all duration-300 border group-hover/strip:-translate-y-1 ${
                    activePalette === pidx
                      ? "border-reliance-gold"
                      : "border-transparent hover:border-reliance-navy/30"
                  }`}
                  style={{ transition: "transform 0.25s ease, border-color 0.25s ease" }}
                >
                  {palette.colors.map((c, cidx) => (
                    <div
                      key={cidx}
                      className="w-14 h-20 transition-all duration-300 hover:scale-y-110 origin-bottom"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
                <p
                  className={`text-xs font-bold uppercase tracking-widest text-center transition-colors ${
                    activePalette === pidx ? "text-reliance-gold" : "text-reliance-navy"
                  }`}
                >
                  {palette.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Expanded palette detail panel ──────────────────────────────── */}
        <div
          ref={detailsPanelRef}
          className="bg-reliance-navy p-8 border border-reliance-navy overflow-hidden"
          style={{ display: "none", height: 0, opacity: 0 }}
        >
          {activePalette !== null && displayPalettes[activePalette] && (
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                <h3 className="text-2xl text-white uppercase tracking-tight">
                  {displayPalettes[activePalette].name}
                </h3>
                <button
                  onClick={() => setActivePalette(null)}
                  className="text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  aria-label="Close palette"
                >
                  ✕ Close
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/20 border border-white/20">
                {displayPalettes[activePalette].colors.map((c, cidx) => (
                  <Link
                    key={cidx}
                    href={`/colors/${c.slug || slugify(c.name)}`}
                    className="palette-item-link flex flex-col gap-2 bg-reliance-navy p-4 group cursor-pointer hover:bg-reliance-navy/90 transition-colors"
                  >
                    <div className="flex flex-col h-full">
                      <div
                        className="h-24 border border-white/10 group-hover:scale-[1.02] transition-transform duration-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <p className="text-xs font-bold uppercase tracking-widest text-white mt-2 group-hover:text-reliance-gold transition-colors">{c.name}</p>
                      <p className="text-xs font-mono text-white/50">{c.hex}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Mood / room images ──────────────────────────────────────────── */}
        {moodImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-reliance-navy/20 border border-reliance-navy/20 mb-12">
            {moodImages.map((img, i) => (
              <div key={i} className="h-80 overflow-hidden relative group bg-white">
                <img
                  src={img.imageUrl}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-reliance-navy/40" />
                <div className="absolute bottom-6 left-6 text-white border-l-2 border-reliance-gold pl-4">
                  <p className="text-lg uppercase tracking-tight mb-2">{img.caption}</p>
                  <Link
                    href={img.linkUrl}
                    className="text-xs font-bold uppercase tracking-widest text-reliance-gold hover:text-white transition-colors"
                  >
                    {img.linkLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── View All CTA ────────────────────────────────────────────────── */}
        {viewAllLink?.url && (
          <div className="flex justify-center">
            <Link
              href={viewAllLink.url}
              className="inline-flex items-center gap-2 px-8 py-4 border border-reliance-navy bg-reliance-navy text-white text-sm font-bold uppercase tracking-widest hover:bg-transparent hover:text-reliance-navy transition-colors duration-300"
            >
              {viewAllLink.label ?? "Explore All Palettes"}
              <span>→</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
