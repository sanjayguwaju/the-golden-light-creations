"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eye,
  Calculator,
  ExternalLink,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface GalleryItem {
  image: string;
  color: string;
  room: string;
  tall?: boolean;
  title?: string;
  colorHex?: string;
  colorSlug?: string;
  styleTags?: string[];
  secondaryColours?: {
    name: string;
    hexCode: string;
    slug?: string;
  }[];
  productRecommendation?: string;
}

interface GalleryMasonryProps {
  items?: GalleryItem[];
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  buttonLabel?: string | null;
  buttonUrl?: string | null;
  redirectClickToImage?: boolean | null;
}

export const GalleryMasonry = ({
  items,
  title,
  subtitle,
  description,
  buttonLabel,
  buttonUrl,
  redirectClickToImage = false,
}: GalleryMasonryProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayItems = items || [];
  const selectedItem = selectedIndex !== null ? displayItems[selectedIndex] : null;

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

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || displayItems.length <= 1) return prev;
      return prev === 0 ? displayItems.length - 1 : prev - 1;
    });
  }, [displayItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || displayItems.length <= 1) return prev;
      return prev === displayItems.length - 1 ? 0 : prev + 1;
    });
  }, [displayItems.length]);

  const closeModal = useCallback(() => {
    if (modalBackdropRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, { scale: 0.94, opacity: 0, y: 15, duration: 0.2, ease: "power2.in" });
      gsap.to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setSelectedIndex(null),
      });
    } else {
      setSelectedIndex(null);
    }
  }, []);

  // Escape & Arrow keys to navigate modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeModal, handlePrev, handleNext]);

  // Animate modal in/out + body scroll lock
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      if (modalBackdropRef.current && modalContentRef.current) {
        gsap.set(modalBackdropRef.current, { display: "flex", opacity: 0 });
        gsap.set(modalContentRef.current, { scale: 0.94, opacity: 0, y: 20 });
        gsap.to(modalBackdropRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });
        gsap.to(modalContentRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.1)" });
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  const handleCardClick = (item: GalleryItem, index: number) => {
    if (redirectClickToImage) {
      window.open(item.image, "_blank", "noopener,noreferrer");
    } else {
      setSelectedIndex(index);
    }
  };

  const displayTitle = title || "Real Homes";
  const displaySubtitle = subtitle || "Real Results";
  const displayDescription = description || "See how Reliance Paints transforms homes across Nepal.";
  const displayButtonLabel = buttonLabel || "Explore Full Inspiration Gallery";
  const targetButtonUrl = buttonUrl || "/inspiration";

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
            {displayTitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4 font-display uppercase tracking-tight">
            {displaySubtitle}
          </h2>
          <p className="text-lg text-reliance-grey max-w-2xl mx-auto">{displayDescription}</p>
        </div>

        {/* CSS masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayItems.map((item: GalleryItem, i: number) => (
            <div
              key={i}
              onClick={() => handleCardClick(item, i)}
              className={`break-inside-avoid w-full overflow-hidden relative group cursor-pointer border border-reliance-navy/20 text-left bg-[#F5F2ED] transition-all duration-300 hover:border-reliance-navy hover:shadow-xl ${
                item.tall ? "aspect-3/4" : "aspect-4/3"
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(item, i);
                }
              }}
              aria-label={`View inspiration space ${item.title || item.color}`}
            >
              <img
                src={item.image}
                alt={item.color}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay with details */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-white text-reliance-navy text-xs font-bold uppercase tracking-widest px-3 py-1 border border-white">
                    {item.room}
                  </span>
                  <span className="px-2.5 py-1 bg-reliance-navy text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-reliance-gold" />
                    View Details
                  </span>
                </div>

                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/80 text-xs font-medium mb-1">{item.title || "Room Inspiration"}</p>
                  <div className="flex items-center gap-3">
                    {item.colorHex && (
                      <span
                        className="w-5 h-5 rounded-full border-2 border-white shadow-xs shrink-0"
                        style={{ backgroundColor: item.colorHex }}
                      />
                    )}
                    <h3 className="text-white text-xl uppercase tracking-tight font-bold font-sans">
                      {item.color}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href={targetButtonUrl}
            className="inline-flex items-center gap-2 bg-reliance-navy text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-reliance-gold hover:text-reliance-navy transition-all shadow-md"
          >
            {displayButtonLabel}
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && selectedIndex !== null && (
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md"
          style={{ display: "none", opacity: 0 }}
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-reliance-navy text-white hover:bg-reliance-gold hover:text-reliance-navy transition-colors z-30 border border-white/20 shadow-lg cursor-pointer"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            ref={modalContentRef}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row bg-[#FAF8F5] overflow-hidden shadow-2xl border border-reliance-navy"
            style={{ transform: "scale(0.94)", opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Image with Next/Prev Controls */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[42vh] lg:min-h-[58vh]">
              <img
                src={selectedItem.image}
                alt={selectedItem.color}
                className="w-full h-full object-contain"
              />

              {displayItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-reliance-navy text-white transition-all border border-white/20 rounded-full hover:scale-110 z-20 cursor-pointer"
                    aria-label="Previous space"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-reliance-navy text-white transition-all border border-white/20 rounded-full hover:scale-110 z-20 cursor-pointer"
                    aria-label="Next space"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-mono border border-white/15">
                {selectedIndex + 1} / {displayItems.length}
              </div>
            </div>

            {/* Right Column: Detail panel */}
            <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh] border-t lg:border-t-0 lg:border-l border-reliance-navy/20 bg-[#FAF8F5] shrink-0">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-reliance-navy text-white text-[11px] font-bold uppercase tracking-wider">
                      {selectedItem.room}
                    </span>
                    {selectedItem.styleTags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-reliance-gold/20 text-reliance-navy text-[10px] font-bold uppercase tracking-wider border border-reliance-gold/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-reliance-navy">
                    {selectedItem.title || selectedItem.color}
                  </h3>
                </div>

                {/* Featured Colour Card */}
                <div className="bg-white border border-reliance-navy/15 p-4 shadow-xs">
                  <p className="text-[11px] text-reliance-navy/60 mb-2 uppercase tracking-widest font-bold">
                    Featured Shade
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 border-2 border-reliance-navy/20 shadow-inner shrink-0"
                      style={{ backgroundColor: selectedItem.colorHex || "#C59B27" }}
                    />
                    <div>
                      <p className="font-bold text-reliance-navy font-sans text-base">
                        {selectedItem.color}
                      </p>
                      {selectedItem.colorHex && (
                        <p className="text-xs font-mono uppercase text-reliance-navy/60">
                          {selectedItem.colorHex}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommended Product Topcoat */}
                <div className="bg-[#ECE7DF] border border-reliance-navy/10 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-reliance-navy">
                        Recommended Coating
                      </p>
                      <p className="text-xs text-reliance-navy/80 mt-0.5">
                        {selectedItem.productRecommendation ||
                          (selectedItem.room.toLowerCase().includes("exterior")
                            ? "Double Dfence Exterior Luxury Emulsion"
                            : "Elega Luxury Emulsion with Pearl Sheen")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-reliance-navy/15 flex flex-col gap-2.5">
                <Link
                  href={
                    selectedItem.colorSlug
                      ? `/visualiser?color=${selectedItem.colorSlug}`
                      : "/visualiser"
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-reliance-navy hover:bg-reliance-gold hover:text-reliance-navy text-white font-sans text-xs uppercase tracking-widest px-5 py-3.5 font-bold transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Try in Room Visualizer
                </Link>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={
                      selectedItem.colorSlug
                        ? `/colors/${selectedItem.colorSlug}`
                        : "/colors"
                    }
                    className="inline-flex items-center justify-center gap-1.5 bg-white border border-reliance-navy text-reliance-navy hover:bg-reliance-navy hover:text-white font-sans text-xs uppercase tracking-wider px-3 py-2.5 font-bold transition-all text-center"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    Color Details
                  </Link>

                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-1.5 bg-white border border-reliance-navy text-reliance-navy hover:bg-reliance-navy hover:text-white font-sans text-xs uppercase tracking-wider px-3 py-2.5 font-bold transition-all text-center"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Estimate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

