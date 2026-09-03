"use client";

import React, { useState, useRef } from "react";
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
  const [activeVideo, setActiveVideo] = useState<FallbackFilmItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -440 : 440;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="films" className="bg-[#0A0A0A] py-24 sm:py-32 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
                Cinematic Stories
              </span>
              <span className="w-10 h-[1px] bg-[#F5B301]/60" />
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
              Our <em className="text-[#F5B301] not-italic">Films</em>
            </h2>
            <p className="font-poppins text-sm text-white/70 max-w-xl mt-3 leading-relaxed">
              From emotional wedding highlights to powerful commercial ads — every frame crafted
              with cinematic precision and international standards.
            </p>
          </div>

          {/* Controls: Slider Arrows + Link to /films */}
          <div className="flex items-center gap-3">
            {isHomepagePreview && (
              <Link
                href="/films"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-[#F5B301] hover:text-[#FFD04A] mr-4 transition-colors"
              >
                <span>View All Films</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous Films"
                className="w-12 h-12 border border-white/20 hover:border-[#F5B301] text-white hover:text-[#F5B301] flex items-center justify-center transition-colors bg-white/5 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next Films"
                className="w-12 h-12 border border-white/20 hover:border-[#F5B301] text-white hover:text-[#F5B301] flex items-center justify-center transition-colors bg-white/5 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Films Horizontal Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto px-6 sm:px-8 max-w-7xl mx-auto pb-4 scrollbar-none snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((film) => (
          <div
            key={film.id}
            onClick={() => setActiveVideo(film)}
            className="flex-[0_0_340px] sm:flex-[0_0_420px] group relative bg-[#111111] border border-white/10 hover:border-[#F5B301]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 snap-start"
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
                <div className="w-16 h-16 rounded-full border-2 border-[#F5B301]/80 bg-[#0A0A0A]/60 backdrop-blur-sm flex items-center justify-center text-[#F5B301] group-hover:bg-[#F5B301] group-hover:text-[#0A0A0A] transition-all duration-300 group-hover:scale-110 shadow-xl">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>

            {/* Film Meta Information */}
            <div className="p-6 bg-gradient-to-b from-transparent to-[#0A0A0A]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase text-[#F5B301]">
                  {film.category}
                </span>
                <span className="font-poppins text-xs text-white/50 tracking-wider">
                  ▶ {film.duration}
                </span>
              </div>
              <h3 className="font-bebas text-2xl tracking-[0.05em] text-white uppercase group-hover:text-[#F5B301] transition-colors leading-tight">
                {film.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black border border-[#F5B301]/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close Film Viewer"
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-[#F5B301] text-white hover:text-black p-2 transition-colors rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Interactive Player Frame */}
            <iframe
              src={activeVideo.videoUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
