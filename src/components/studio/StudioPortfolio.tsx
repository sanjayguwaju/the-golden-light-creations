"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { Plus, X, ArrowUpRight } from "lucide-react";
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
  const [activeLightbox, setActiveLightbox] = useState<FallbackPortfolioItem | null>(null);

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

  return (
    <section id="portfolio" className="bg-[#111111] py-24 sm:py-32 px-6 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
                Our Work
              </span>
              <span className="w-10 h-[1px] bg-[#F5B301]/60" />
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
              Visual <em className="text-[#F5B301] not-italic">Portfolio</em>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`font-montserrat text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-200 ${
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
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* Zoom Icon Button */}
                <div className="absolute top-4 right-4 w-9 h-9 border border-[#F5B301]/80 rounded-full flex items-center justify-center text-[#F5B301] bg-[#0A0A0A]/40 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                  <Plus className="w-4 h-4" />
                </div>

                <span className="font-montserrat text-[10px] font-bold tracking-[0.3em] uppercase text-[#F5B301] mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-bebas text-2xl tracking-[0.05em] text-white uppercase leading-tight">
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
          <div className="mt-16 flex justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 border border-[#F5B301] text-[#F5B301] hover:bg-[#F5B301] hover:text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightbox(null)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-8 flex items-center gap-2 font-bebas text-lg tracking-[0.2em] text-white/80 hover:text-[#F5B301] transition-colors focus:outline-none"
          >
            <X className="w-6 h-6" />
            <span>CLOSE</span>
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightbox.src}
              alt={activeLightbox.title}
              className="max-w-[90vw] max-h-[75vh] object-contain border border-[#F5B301]/30 shadow-2xl"
            />
            <div className="text-center mt-4">
              <span className="font-montserrat text-xs font-bold tracking-[0.3em] uppercase text-[#F5B301]">
                {activeLightbox.categoryLabel}
              </span>
              <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.05em] uppercase mt-1">
                {activeLightbox.title} — {activeLightbox.location}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
