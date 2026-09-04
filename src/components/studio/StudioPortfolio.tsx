"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import { Plus, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { defaultPortfolio, type FallbackPortfolioItem } from "@/utilities/studioDefaults";

interface StudioPortfolioProps {
  items?: FallbackPortfolioItem[];
  isHomepagePreview?: boolean;
}

type CategoryFilter = "all" | "weddings" | "events" | "fashion" | "concerts" | "commercial";

export function StudioPortfolio({
  items = defaultPortfolio,
  isHomepagePreview = false,
}: StudioPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filterTabs: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "weddings", label: "Weddings" },
    { key: "events", label: "Events" },
    { key: "fashion", label: "Fashion" },
    { key: "concerts", label: "Concerts" },
  ];

  const filteredItems = items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const displayedItems = isHomepagePreview ? filteredItems.slice(0, 9) : filteredItems;

  const activeLightbox =
    activeLightboxIndex !== null ? displayedItems[activeLightboxIndex] : null;

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : displayedItems.length - 1
    );
  }, [activeLightboxIndex, displayedItems.length]);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! < displayedItems.length - 1 ? prev! + 1 : 0
    );
  }, [activeLightboxIndex, displayedItems.length]);

  // Lock background scroll & handle keyboard navigation when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveLightboxIndex(null);
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeLightboxIndex, handlePrev, handleNext]);

  // Touch Swipe Support for Mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section id="portfolio" className="bg-[#111111] py-20 sm:py-32 px-4 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
                Our Work
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#F5B301]/60" />
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
              Visual <em className="text-[#F5B301] not-italic">Portfolio</em>
            </h2>
          </div>

          {/* Filter Tabs (Horizontally scrollable on small mobile screens) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key);
                  setActiveLightboxIndex(null);
                }}
                className={`font-montserrat text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeFilter === tab.key
                    ? "bg-[#F5B301] text-[#0A0A0A] font-bold shadow-lg shadow-[#F5B301]/25"
                    : "border border-white/20 text-white/70 hover:border-[#F5B301] hover:text-[#F5B301] bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="relative group overflow-hidden bg-[#0A0A0A] border border-white/5 cursor-pointer break-inside-avoid"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 brightness-95"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                {/* Zoom Icon Button */}
                <div className="absolute top-4 right-4 w-9 h-9 border border-[#F5B301]/80 rounded-full flex items-center justify-center text-[#F5B301] bg-[#0A0A0A]/40 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                  <Plus className="w-4 h-4" />
                </div>

                <span className="font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase text-[#F5B301] mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-bebas text-xl sm:text-2xl tracking-[0.05em] text-white uppercase leading-tight">
                  {item.title}
                </h3>
                <p className="font-poppins text-xs text-white/60 mt-0.5">
                  {item.location}, Nepal
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Homepage Preview Action: Link to dedicated /portfolio page */}
        {isHomepagePreview && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto border border-[#F5B301] text-[#F5B301] hover:bg-[#F5B301] hover:text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-8 sm:px-10 py-4 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile-Optimized Lightbox Modal (Centered with 100dvh) */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-6 h-[100dvh] w-full overflow-hidden select-none animate-fadeIn"
          onClick={() => setActiveLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Title / Counter & Close Button */}
          <div
            className="w-full max-w-5xl flex items-center justify-between px-3 py-2 mb-2 sm:mb-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs font-montserrat text-white/70">
              <span className="text-[#F5B301] font-bold uppercase tracking-wider">
                {activeLightbox.categoryLabel}
              </span>
              <span>•</span>
              <span className="text-white/50">
                {(activeLightboxIndex ?? 0) + 1} / {displayedItems.length}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-[#F5B301] text-white hover:text-black transition-colors rounded-full font-montserrat text-xs font-bold uppercase tracking-wider focus:outline-none"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Centered Image Container with Safe dvh bounds */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Photo"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-[#F5B301] text-white hover:text-black border border-white/20 hover:border-[#F5B301] rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo */}
            <div className="relative flex items-center justify-center w-full h-full max-h-[62dvh] sm:max-h-[72dvh]">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-w-[92vw] sm:max-w-4xl max-h-[60dvh] sm:max-h-[72dvh] w-auto h-auto object-contain border border-[#F5B301]/30 shadow-2xl rounded-sm"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Photo"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-[#F5B301] text-white hover:text-black border border-white/20 hover:border-[#F5B301] rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo Caption (Never pushed off screen) */}
            <div className="text-center mt-3 sm:mt-4 px-4 max-w-lg shrink-0">
              <h4 className="font-bebas text-xl sm:text-3xl text-white tracking-[0.05em] uppercase line-clamp-1">
                {activeLightbox.title}
              </h4>
              <p className="font-poppins text-xs text-[#F5B301] mt-0.5">
                {activeLightbox.location}, Nepal
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
