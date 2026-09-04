"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/routing";
import { Play, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { defaultFilms, type FallbackFilmItem } from "@/utilities/studioDefaults";

interface StudioFilmsProps {
  items?: FallbackFilmItem[];
  isHomepagePreview?: boolean;
}

export function StudioFilms({
  items = defaultFilms,
  isHomepagePreview = false,
}: StudioFilmsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<FallbackFilmItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Lock background scroll without layout shift and listen for Escape key when video modal is open
  useEffect(() => {
    if (activeVideo) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveVideo(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeVideo]);

  return (
    <section id="films" className="bg-[#FFF5F5] py-20 sm:py-32 border-b border-[#C0171E]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
                Cinematic Stories
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-[#0A0A0A] uppercase leading-none">
              Our <em className="text-[#C0171E] not-italic">Films</em>
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 max-w-xl mt-3 leading-relaxed">
              From emotional wedding highlights to powerful commercial ads — every frame crafted
              with cinematic precision and international standards.
            </p>
          </div>

          {/* Controls: Slider Arrows + Link to /films */}
          <div className="flex items-center gap-3">
            {isHomepagePreview && (
              <Link
                href="/films"
                className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-[#C0171E] hover:text-[#A01018] transition-colors"
              >
                <span>View All Films</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous Films"
                className="w-12 h-12 border border-white/20 hover:border-[#C0171E] text-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/5 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next Films"
                className="w-12 h-12 border border-white/20 hover:border-[#C0171E] text-white hover:text-[#C0171E] flex items-center justify-center transition-colors bg-white/5 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Films Horizontal Slider (Snap-center & viewport-aware card width on mobile) */}
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-8 max-w-7xl mx-auto pb-4 scrollbar-none snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((film) => (
          <div
            key={film.id}
            onClick={() => setActiveVideo(film)}
            className="flex-[0_0_84vw] sm:flex-[0_0_420px] max-w-[420px] group relative bg-white border border-[#C0171E]/10 hover:border-[#C0171E]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 snap-center shrink-0"
          >
            {/* Film Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={film.thumb}
                alt={film.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#C0171E]/80 bg-[#0A0A0A]/60 backdrop-blur-sm flex items-center justify-center text-[#C0171E] group-hover:bg-[#C0171E] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-xl">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />
                </div>
              </div>
            </div>

            {/* Film Meta Information */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-transparent to-white/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase text-[#C0171E]">
                  {film.category}
                </span>
                <span className="font-poppins text-xs text-[#0A0A0A]/50 tracking-wider">
                  ▶ {film.duration}
                </span>
              </div>
              <h3 className="font-bebas text-xl sm:text-2xl tracking-[0.05em] text-[#0A0A0A] uppercase group-hover:text-[#C0171E] transition-colors leading-tight line-clamp-1">
                {film.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal (Strictly Centered in 100dvh & Portaled to Body) */}
      {mounted &&
        activeVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-6 h-[100dvh] w-full overflow-hidden select-none animate-modal-backdrop"
            onClick={() => setActiveVideo(null)}
          >
            {/* Top Bar with Title and Accessible Close Button */}
            <div
              className="w-full max-w-4xl flex items-center justify-between px-2 py-2 mb-2 sm:mb-3 z-20 animate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 text-xs font-montserrat text-white/80 truncate pr-2">
                <span className="text-[#C0171E] font-bold uppercase tracking-wider shrink-0">
                  {activeVideo.category}
                </span>
                <span>•</span>
                <span className="truncate text-white/90">{activeVideo.title}</span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close Film Viewer"
                className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-[#C0171E] text-white hover:text-white transition-all duration-200 rounded-full font-montserrat text-xs font-bold uppercase tracking-wider shrink-0 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Interactive Player Frame */}
            <div
              className="relative w-full max-w-4xl aspect-video bg-black border border-[#C0171E]/40 shadow-2xl overflow-hidden rounded-sm animate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
