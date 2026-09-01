"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Swatch {
  hex: string;
  label: string;
  slug?: string | null;
  colorId?: string | null;
}

export interface ColorVariant {
  colorLabel?: string | null;
  hex?: string | null;
  slug?: string | null;
  colorId?: string | null;
  image?: string | null;
}

export interface RoomPreview {
  name: string;
  image: string;
  colorVariants?: ColorVariant[];
}

export interface RoomVisualizerCTAProps {
  title?: string;
  sectionLabel?: string;
  heading?: string;
  description?: string;
  swatches?: Swatch[];
  rooms?: RoomPreview[];
  ctaButton?: {
    label?: string | null;
    url?: string | null;
  } | null;
}

export const RoomVisualizerCTA: React.FC<RoomVisualizerCTAProps> = ({
  title,
  sectionLabel = "Room Visualizer",
  heading = "See It On Your Wall",
  description = "Pick any shade and instantly preview how it transforms your space before committing.",
  swatches = [],
  rooms = [],
  ctaButton,
}) => {
  const displayHeading = heading || title || "See It On Your Wall";
  const displayRooms = rooms || [];

  // Derive swatches from rooms if none are explicitly provided
  let effectiveSwatches = swatches && swatches.length > 0 ? swatches : [];
  if (effectiveSwatches.length === 0 && displayRooms.length > 0) {
    const swatchMap = new Map<string, Swatch>();
    displayRooms.forEach((r) => {
      (r.colorVariants || []).forEach((v) => {
        if (v.colorLabel) {
          const key = v.colorLabel.toLowerCase().trim();
          if (!swatchMap.has(key)) {
            swatchMap.set(key, {
              label: v.colorLabel,
              hex: v.hex || "#C9A84C",
            });
          }
        }
      });
    });
    if (swatchMap.size > 0) {
      effectiveSwatches = Array.from(swatchMap.values());
    }
  }

  const displaySwatches = effectiveSwatches;

  const [activeColor, setActiveColor] = useState<Swatch | null>(null);
  const [activeRoom,  setActiveRoom]  = useState<RoomPreview | null>(displayRooms[0] || null);
  const [showOriginal, setShowOriginal] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Get swatches specifically for the active room space
  const currentRoomSwatches: Swatch[] =
    activeRoom?.colorVariants && activeRoom.colorVariants.length > 0
      ? activeRoom.colorVariants
          .filter((v) => v && (v.colorLabel || v.hex))
          .map((v) => ({
            label: v.colorLabel || "",
            hex: v.hex || "#C9A84C",
            slug: v.slug || null,
            colorId: v.colorId || null,
          }))
      : displaySwatches;

  // Find color-specific image variant for active room and active color
  const getColorVariantImage = (room: RoomPreview | null, color: Swatch | null): string | null => {
    if (!color || !room || !room.colorVariants || room.colorVariants.length === 0) return null;
    
    const targetLabel = color.label.toLowerCase().trim();
    const targetHex = color.hex.toLowerCase().trim().replace(/^#/, "");

    const match = room.colorVariants.find((v) => {
      if (!v || !v.image) return false;
      const vLabel = v.colorLabel?.toLowerCase().trim() || "";
      const vHex = (v.hex || vLabel).toLowerCase().trim().replace(/^#/, "");
      return (
        vLabel === targetLabel ||
        vHex === targetHex ||
        targetLabel.includes(vLabel) ||
        vLabel.includes(targetLabel)
      );
    });

    return match?.image || null;
  };

  const activeSpecificImage = showOriginal ? null : getColorVariantImage(activeRoom, activeColor);
  const displayImageSrc = showOriginal || !activeColor
    ? activeRoom?.image || ""
    : activeSpecificImage || activeRoom?.image || "";

  const handleColorClick = contextSafe((s: Swatch) => {
    setShowOriginal(false);
    if (activeColor && s.hex === activeColor.hex && s.label === activeColor.label && !showOriginal) return;

    const imgEl = imageRef.current;
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { opacity: 0.35 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    setActiveColor(s);
  });

  const handleOriginalClick = contextSafe(() => {
    setShowOriginal(true);
    setActiveColor(null);
    const imgEl = imageRef.current;
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { opacity: 0.35 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  });

  const handleRoomChange = contextSafe((r: RoomPreview) => {
    if (r.name === activeRoom?.name) return;
    
    const imgEl = imageRef.current;
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { opacity: 0.35 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    setActiveRoom(r);
    // Reset to Original unpainted image on room change
    setShowOriginal(true);
    setActiveColor(null);
  });

  // If no rooms are configured in CMS, return null after calling all hooks
  if (!activeRoom || displayRooms.length === 0) {
    return null;
  }

  const targetRoomKey = activeRoom.name.toLowerCase().includes("bed") 
    ? "bedroom" 
    : activeRoom.name.toLowerCase().includes("kit") 
    ? "kitchen" 
    : activeRoom.name.toLowerCase().includes("ext") 
    ? "exterior" 
    : "living";

  const currentActiveColor = activeColor || currentRoomSwatches[0] || { label: "Color", hex: "#0D1B3E" };
  const btnLabel = ctaButton?.label ?? "Try the Full Visualizer →";
  const rawUrl = ctaButton?.url || "/visualiser";
  const btnUrl = rawUrl.startsWith("/visualis") || rawUrl.startsWith("/visualiz")
    ? `/visualiser?color=${encodeURIComponent(currentActiveColor.slug || currentActiveColor.label)}&hex=${encodeURIComponent(currentActiveColor.hex)}&code=${encodeURIComponent(currentActiveColor.colorId || "")}&room=${targetRoomKey}`
    : rawUrl;

  return (
    <section className="py-0 overflow-hidden" id="visualizer">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* ── Left: Controls panel ───────────────────────────────────── */}
        <div className="bg-reliance-navy relative flex flex-col justify-center p-6 md:p-12 lg:p-20 overflow-hidden border-r border-reliance-navy">
          <div className="relative z-10">
            <div>
              <p className="text-reliance-gold text-sm font-bold uppercase tracking-widest mb-4">
                {sectionLabel}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight uppercase tracking-tight">
                {displayHeading}
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {description}
              </p>

              {/* Room picker tabs */}
              <div className="mb-8">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2.5">
                  Select Room Space:
                </div>
                <div className="flex flex-wrap gap-px bg-white/20 border border-white/20">
                  {displayRooms.map((r) => (
                    <button
                      key={r.name}
                      type="button"
                      onClick={() => handleRoomChange(r)}
                      className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        activeRoom.name === r.name
                          ? "bg-reliance-gold text-reliance-navy shadow-md"
                          : "bg-reliance-navy text-white hover:bg-white/10"
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color swatches & Original toggle */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Select Paint Shade:
                  </span>
                  <button
                    type="button"
                    onClick={handleOriginalClick}
                    className={`text-xs px-3 py-1 font-bold uppercase tracking-wider rounded-none border transition-all cursor-pointer ${
                      showOriginal || !activeColor
                        ? "bg-white text-reliance-navy border-white shadow-xs"
                        : "bg-transparent text-white/70 border-white/20 hover:text-white hover:border-white/40"
                    }`}
                  >
                    Original Room
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {currentRoomSwatches.map((s) => {
                    const isSelected = !showOriginal && activeColor?.hex === s.hex && activeColor?.label === s.label;

                    return (
                      <button
                        key={`${s.label}-${s.hex}`}
                        type="button"
                        onClick={() => handleColorClick(s)}
                        title={`${s.label} (${s.hex})`}
                        className={`relative w-11 h-11 sm:w-12 sm:h-12 transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? "border-reliance-gold scale-110 shadow-lg ring-2 ring-reliance-gold/70 z-10"
                            : "hover:scale-105 border-white/25 hover:border-white/50"
                        }`}
                        style={{ backgroundColor: s.hex }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currently previewing indicator */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {showOriginal || !activeColor ? (
                    <>
                      <span className="inline-block w-5 h-5 border border-white/40 bg-slate-400 shadow-xs" />
                      <span className="uppercase tracking-widest text-xs font-bold text-white">
                        Showing: <strong className="text-reliance-gold">Original Room Image</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="inline-block w-5 h-5 border border-white/40 shadow-xs"
                        style={{ backgroundColor: activeColor.hex }}
                      />
                      <span className="uppercase tracking-widest text-xs font-bold">
                        Currently previewing:{" "}
                        <strong className="text-reliance-gold">{activeColor.label}</strong>
                        <span className="text-white/40 font-mono text-[11px] ml-1.5 font-normal">
                          ({activeColor.hex})
                        </span>
                      </span>
                    </>
                  )}
                </div>

                {!showOriginal && activeColor?.slug && (
                  <Link
                    href={`/colors/${activeColor.slug}`}
                    className="text-xs text-reliance-gold hover:underline font-semibold uppercase tracking-wider"
                  >
                    Explore Shade →
                  </Link>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href={btnUrl}
                className="inline-block bg-reliance-gold text-reliance-navy px-8 py-4 font-bold text-sm uppercase tracking-widest border border-reliance-gold hover:bg-transparent hover:text-reliance-gold transition-colors shadow-md"
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right: Pure room photo display (no artificial programmatic filters) ────────────────────── */}
        <div 
          ref={containerRef} 
          className="relative overflow-hidden min-h-[420px] lg:min-h-[600px] border-l border-reliance-navy bg-slate-950 select-none flex items-center justify-center"
        >
          {/* Main Displayed Room Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={displayImageSrc}
            alt={`${activeRoom.name} - ${showOriginal || !activeColor ? "Original" : activeColor.label}`}
            className="w-full h-full object-cover"
          />

          {/* Floating Badge (Room & Active Color State) */}
          <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-r border-slate-200 z-10 shadow-lg">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
              {activeRoom.name}
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              {showOriginal || !activeColor ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-400 shadow-xs" />
                  Original View
                </>
              ) : (
                <>
                  <span 
                    className="inline-block w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs" 
                    style={{ backgroundColor: activeColor.hex }} 
                  />
                  {activeColor.label}
                </>
              )}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
