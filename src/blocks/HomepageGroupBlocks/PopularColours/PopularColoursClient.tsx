"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/utilities/ui";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Search,
  Palette,
  Eye,
} from "lucide-react";
import type { PopularColoursBlock as PopularColoursProps } from "@/payload-types";
import { toast } from "sonner";

export interface ColorSwatch {
  id: string;
  name: string;
  hexCode: string;
  description?: string | null;
  category?: string | null;
  slug?: string | null;
  shadeCode?: string | null;
  colorId?: string | null;
  rgb?: {
    r?: number;
    g?: number;
    b?: number;
    string?: string;
  } | null;
  colorFamily?: string | null;
  moodTags?: string[] | null;
  popularity?: number | null;
  complementaryColours?: Array<{ name: string; hexCode: string; slug?: string }> | null;
}

export interface PopularColoursClientProps {
  title?: string | null;
  subtitle?: string | null;
  layout?: "grid" | "carousel" | "fanDeck" | "details" | null;
  columns?: "2" | "3" | "4" | "5" | "6" | null;
  colors: ColorSwatch[];
  limit?: number | null;
  showHexCode?: boolean | null;
  showDescription?: boolean | null;
  enableHoverEffect?: boolean | null;
  clickAction?: "copy" | "navigate" | "finder" | null;
  colorPagePath?: string | null;
  finderPath?: string | null;
  viewAllLink?: {
    label?: string | null;
    url?: string | null;
  } | null;
}

const getRgbString = (color: ColorSwatch): string => {
  if (color.rgb?.string) return color.rgb.string;
  if (
    typeof color.rgb?.r === "number" &&
    typeof color.rgb?.g === "number" &&
    typeof color.rgb?.b === "number"
  ) {
    return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  }
  const hex = (color.hexCode || "").replace("#", "");
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return "";
};

const CATEGORIES = [
  { id: "all", label: "All Colours" },
  { id: "warm", label: "Warm & Terracotta" },
  { id: "blues", label: "Blues & Coastal" },
  { id: "greens", label: "Greens & Botanical" },
  { id: "neutrals", label: "Neutrals & Whites" },
  { id: "golds", label: "Royal Golds" },
  { id: "darks", label: "Darks & Accents" },
];

export default function PopularColoursClient({
  title = "Our Premium Selection",
  subtitle = "Designer Colour Studio",
  columns = "3",
  colors,
  limit = 6,
  showHexCode = true,
  viewAllLink,
}: PopularColoursClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Copy Hex Handler with Sonner Toast
  const handleCopy = (hexCode: string, colorName: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    navigator.clipboard.writeText(hexCode);
    setCopiedHex(hexCode);
    toast.success(`Copied ${colorName} (${hexCode}) to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Color text contrast helper
  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 145 ? "#0D1B3E" : "#FFFFFF";
  };

  // Filter colors by category and search
  const filteredColors = useMemo(() => {
    return colors.filter((c) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesHex =
          c.hexCode.toLowerCase().includes(q) ||
          c.hexCode.replace("#", "").toLowerCase().includes(q.replace("#", ""));
        const shadeCode = (c.shadeCode || c.colorId || "").toLowerCase();
        const matchesId = shadeCode.includes(q);
        const rgbStr = getRgbString(c).toLowerCase();
        const rgbRaw =
          c.rgb && typeof c.rgb.r === "number"
            ? `${c.rgb.r} ${c.rgb.g} ${c.rgb.b}, ${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}`
            : "";
        const matchesRgb = rgbStr.includes(q) || rgbRaw.includes(q);
        if (!matchesName && !matchesHex && !matchesId && !matchesRgb) return false;
      }

      // Category filter
      if (activeCategory === "all") return true;
      const fam = (c.colorFamily || "").toLowerCase();
      if (activeCategory === "warm") return ["reds", "oranges", "earths"].includes(fam);
      if (activeCategory === "blues") return ["blues"].includes(fam);
      if (activeCategory === "greens") return ["greens"].includes(fam);
      if (activeCategory === "neutrals") return ["neutrals", "whites"].includes(fam);
      if (activeCategory === "golds") return ["yellows"].includes(fam);
      if (activeCategory === "darks") return ["darks", "purples"].includes(fam);
      return true;
    });
  }, [colors, activeCategory, searchQuery]);

  const gridColsClass =
    columns === "2"
      ? "grid-cols-2"
      : columns === "4"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      : columns === "5"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      : columns === "6"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"; // 3 cols default

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#FAF8F5] text-reliance-navy selection:bg-reliance-gold selection:text-reliance-navy border-y border-reliance-navy/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-reliance-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-reliance-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative z-10 space-y-8 sm:space-y-10 md:space-y-12">
        {/* 1. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 border-b border-reliance-navy/10 pb-6 sm:pb-8">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-gold/15 border border-reliance-gold/30 text-reliance-navy text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <Palette className="w-3.5 h-3.5 text-reliance-gold shrink-0" />
              {subtitle}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
              {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-reliance-navy/70 leading-relaxed font-sans">
              Discover Nepal&apos;s most loved architectural paint shades. Explore curated shades, copy hex codes, and test colors live in our 3D Room Visualizer.
            </p>
          </div>

          {/* Quick Actions & Full Library Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              href="/visualiser"
              className="inline-flex items-center justify-center gap-2 bg-reliance-gold hover:bg-reliance-gold/90 text-reliance-navy px-4 sm:px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all shadow-sm active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              3D Room Visualizer
            </Link>
            <Link
              href={viewAllLink?.url || "/colors"}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-reliance-navy hover:text-white border border-reliance-navy/20 text-reliance-navy px-4 sm:px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              All 1000+ Shades
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. FILTER TABS & SEARCH BAR */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 sm:gap-4">
          {/* Category Filter Pills (Edge-to-edge scrollable on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border rounded-none shrink-0",
                    isCatActive
                      ? "bg-reliance-navy text-white border-reliance-navy shadow-[2px_2px_0_0_#C59B27]"
                      : "bg-white text-reliance-navy/80 border-reliance-navy/15 hover:border-reliance-navy hover:text-reliance-navy"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <Search className="w-4 h-4 text-reliance-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shade name, code, #hex..."
              className="w-full bg-white border border-reliance-navy/20 pl-10 pr-12 py-2 sm:py-2.5 text-xs font-medium text-reliance-navy placeholder:text-reliance-navy/40 focus:outline-none focus:border-reliance-navy focus:ring-1 focus:ring-reliance-navy rounded-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-reliance-navy/50 hover:text-reliance-navy cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3. COLOR SWATCHES GRID (Responsive & Touch-Optimized) */}
        {filteredColors.length > 0 ? (
          <div className={cn("grid gap-3 sm:gap-4 md:gap-6", gridColsClass)}>
            {filteredColors.slice(0, limit || 6).map((color) => {
              const textColor = getContrastColor(color.hexCode);
              const colorVisualizerLink = `/visualiser?color=${encodeURIComponent(color.slug || color.name)}&hex=${encodeURIComponent(color.hexCode)}&code=${encodeURIComponent(color.colorId || "")}`;

              return (
                <div
                  key={color.id}
                  className="group relative bg-white border border-reliance-navy/15 hover:border-reliance-navy shadow-[3px_3px_0_0_#0D1B3E] sm:shadow-[4px_4px_0_0_#0D1B3E] hover:shadow-[5px_5px_0_0_#C59B27] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Upper Paint Swatch Area */}
                  <Link
                    href={colorVisualizerLink}
                    className="relative w-full aspect-[4/3] p-2.5 sm:p-3 md:p-4 flex flex-col justify-between transition-transform duration-300 block cursor-pointer"
                    style={{
                      backgroundColor: color.hexCode,
                      boxShadow: "inset 0 -12px 24px -12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Top Badges & Copy Button */}
                    <div className="flex items-center justify-between gap-1.5 relative z-10">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider rounded-none backdrop-blur-xs"
                        style={{
                          backgroundColor:
                            textColor === "#FFFFFF" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.65)",
                          color: textColor,
                        }}
                      >
                        {color.shadeCode || color.colorId || "RP-SHADE"}
                      </span>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(color.hexCode, color.name, e);
                        }}
                        className="p-1 sm:p-1.5 rounded-none backdrop-blur-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer z-30"
                        style={{
                          backgroundColor:
                            textColor === "#FFFFFF" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.75)",
                          color: textColor,
                        }}
                        title="Copy Hex Code"
                        aria-label={`Copy hex code for ${color.name}`}
                      >
                        {copiedHex === color.hexCode ? (
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Desktop Hover Overlay Actions */}
                    <div className="hidden md:flex absolute inset-0 bg-reliance-navy/85 opacity-0 group-hover:opacity-100 transition-opacity flex-col items-center justify-center gap-1.5 p-3 z-20">
                      <span className="w-full bg-reliance-gold hover:bg-white text-reliance-navy text-[11px] font-bold uppercase tracking-wider py-2 px-2.5 transition-colors flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Try in Visualizer
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-white uppercase">
                        {color.hexCode}
                      </span>
                      {getRgbString(color) && (
                        <span className="text-[9px] font-mono text-white/80">
                          {getRgbString(color)}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Lower Info Bar */}
                  <div className="p-2.5 sm:p-3 md:p-3.5 bg-white border-t border-reliance-navy/10 flex items-center justify-between gap-1.5">
                    <div className="min-w-0 flex-1">
                      <Link href={colorVisualizerLink}>
                        <h4 className="font-bold text-xs sm:text-sm text-reliance-navy truncate group-hover:text-reliance-gold transition-colors">
                          {color.name}
                        </h4>
                      </Link>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                        {showHexCode && (
                          <div className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: color.hexCode }}
                            />
                            <span className="font-mono text-[10px] sm:text-xs text-reliance-navy/70 truncate">
                              {color.hexCode.toUpperCase()}
                            </span>
                          </div>
                        )}
                        {getRgbString(color) && (
                          <span className="font-mono text-[9px] sm:text-[10px] text-reliance-navy/50 truncate">
                            {getRgbString(color)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 bg-reliance-navy/5 text-reliance-navy/70 border border-reliance-navy/10">
                        {color.colorFamily || "Emulsion"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white border border-dashed border-reliance-navy/20 p-6 sm:p-8 space-y-3.5">
            <Palette className="w-10 h-10 text-reliance-navy/30 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-reliance-navy uppercase">
              No matching shades found
            </h3>
            <p className="text-xs sm:text-sm text-reliance-navy/60 max-w-sm mx-auto">
              Try searching with another shade name, or reset the filters to see all colours.
            </p>
            <Button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="bg-reliance-navy text-white rounded-none text-xs uppercase font-bold"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
