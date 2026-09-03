"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

interface PortfolioItem {
  id: string;
  src: string;
  cat: "weddings" | "events" | "fashion" | "concerts";
  categoryLabel: string;
  title: string;
  loc: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85",
    cat: "weddings",
    categoryLabel: "Weddings",
    title: "Nepali Wedding Ceremony",
    loc: "Kathmandu",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=85",
    cat: "weddings",
    categoryLabel: "Weddings",
    title: "Bride Portrait",
    loc: "Pokhara",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=85",
    cat: "weddings",
    categoryLabel: "Weddings",
    title: "Couple Session",
    loc: "Nagarkot",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=85",
    cat: "events",
    categoryLabel: "Events",
    title: "Corporate Gala",
    loc: "Kathmandu",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1000&q=85",
    cat: "concerts",
    categoryLabel: "Concerts",
    title: "Live Concert Coverage",
    loc: "Kathmandu",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85",
    cat: "fashion",
    categoryLabel: "Fashion",
    title: "Luxury Fashion Editorial",
    loc: "Studio",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=85",
    cat: "weddings",
    categoryLabel: "Weddings",
    title: "Bridal Portrait",
    loc: "Bhaktapur",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1000&q=85",
    cat: "events",
    categoryLabel: "Events",
    title: "Cultural Celebration",
    loc: "Patan",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=85",
    cat: "fashion",
    categoryLabel: "Fashion",
    title: "Fashion Portrait Series",
    loc: "Studio",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000&q=85",
    cat: "concerts",
    categoryLabel: "Concerts",
    title: "Music Festival",
    loc: "Lalitpur",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=85",
    cat: "weddings",
    categoryLabel: "Weddings",
    title: "Golden Hour Portraits",
    loc: "Chitwan",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=85",
    cat: "events",
    categoryLabel: "Events",
    title: "Wedding Reception",
    loc: "Kathmandu",
  },
];

type CategoryFilter = "all" | "weddings" | "events" | "fashion" | "concerts";

export function StudioPortfolio() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activeLightbox, setActiveLightbox] = useState<PortfolioItem | null>(null);

  const filterTabs: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "weddings", label: "Weddings" },
    { key: "events", label: "Events" },
    { key: "fashion", label: "Fashion" },
    { key: "concerts", label: "Concerts" },
  ];

  const filteredItems = portfolioData.filter(
    (item) => activeFilter === "all" || item.cat === activeFilter
  );

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
          {filteredItems.map((item) => (
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
                  {item.loc}, Nepal
                </p>
              </div>
            </div>
          ))}
        </div>
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
                {activeLightbox.title} — {activeLightbox.loc}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
