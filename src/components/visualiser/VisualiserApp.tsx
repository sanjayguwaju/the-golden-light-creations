"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Download, 
  Search, 
  Sofa, 
  BedDouble, 
  Home, 
  Copy, 
  Check, 
  AlertCircle,
  ChefHat,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { LivingRoom } from "./rooms/LivingRoom";
import { Bedroom } from "./rooms/Bedroom";
import { Exterior } from "./rooms/Exterior";
import { Kitchen } from "./rooms/Kitchen";
import { UploadedRoom } from "./rooms/UploadedRoom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Color } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface VisualiserAppProps {
  colors: Color[];
}

type RoomType = "living" | "bedroom" | "kitchen" | "exterior" | "upload";

const ROOM_TABS: { id: RoomType; label: string; icon: React.ReactNode }[] = [
  { id: "living",   label: "Living",   icon: <Sofa     className="w-3.5 h-3.5" /> },
  { id: "bedroom",  label: "Bedroom",  icon: <BedDouble className="w-3.5 h-3.5" /> },
  { id: "kitchen",  label: "Kitchen",  icon: <ChefHat  className="w-3.5 h-3.5" /> },
  { id: "exterior", label: "Exterior", icon: <Home     className="w-3.5 h-3.5" /> },
  { id: "upload",   label: "My Photo", icon: <Upload   className="w-3.5 h-3.5" /> },
];

const ROOM_TITLES: Record<RoomType, string> = {
  living:   "Living Room Space",
  bedroom:  "Master Bedroom",
  kitchen:  "Kitchen",
  exterior: "Building Exterior",
  upload:   "Upload Your Own Photo",
};

const familyInfo: Record<string, { label: string; color: string }> = {
  all: { label: "All Colors", color: "#C9A84C" },
  reds: { label: "Reds", color: "#D94040" },
  blues: { label: "Blues", color: "#1A5F7A" },
  greens: { label: "Greens", color: "#2D6A4F" },
  yellows: { label: "Yellows", color: "#F9C74F" },
  neutrals: { label: "Neutrals", color: "#8E8E8E" },
  oranges: { label: "Oranges", color: "#F8961E" },
  purples: { label: "Purples", color: "#7209B7" },
  earths: { label: "Earths", color: "#8C6239" },
  darks: { label: "Darks", color: "#1F2937" },
  whites: { label: "Whites", color: "#F3F4F6" },
};

const moodOptions = [
  { value: "all", label: "All Moods & Vibes" },
  { value: "calm", label: "Calm & Relaxed" },
  { value: "vibrant", label: "Vibrant & Active" },
  { value: "earthy", label: "Earthy & Warm" },
  { value: "energetic", label: "Energetic & Bright" },
  { value: "elegant", label: "Elegant & Classic" },
  { value: "playful", label: "Playful & Fun" },
  { value: "minimalist", label: "Minimalist & Clean" },
  { value: "cozy", label: "Cozy & Comfortable" },
];

export const VisualiserApp: React.FC<VisualiserAppProps> = ({ colors }) => {
  const searchParams = useSearchParams();
  const colorParam = searchParams?.get("color")?.trim() || "";
  const hexParam = searchParams?.get("hex")?.trim() || "";
  const codeParam = searchParams?.get("code")?.trim() || "";
  const roomParam = searchParams?.get("room")?.trim() || "";

  const [activeRoom, setActiveRoom] = useState<RoomType>("living");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Filtering state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFamily, setActiveFamily] = useState<string>("all");
  const [activeMood, setActiveMood] = useState<string>("all");
  const [displayLimit, setDisplayLimit] = useState(48);

  const svgContainerRef  = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Prefetch room background templates on mount into browser cache
  useEffect(() => {
    const templateSources = [
      "/visualiser/living-room-new.jpg",
      "/visualiser/bedroom-new.jpg",
      "/visualiser/kitchen.jpg",
      "/visualiser/exterior-new.jpg",
    ];
    templateSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Reset displayLimit when filters change
  useEffect(() => {
    setDisplayLimit(48);
  }, [searchQuery, activeFamily, activeMood]);

  // Match color from URL search parameters on mount or when searchParams change
  useEffect(() => {
    if (colorParam || hexParam || codeParam) {
      const match = colors.find((c) => {
        const cSlug = (c.slug || "").toLowerCase();
        const cName = (c.name || "").toLowerCase();
        const cCode = (c.shadeCode || c.colorId || "").toLowerCase();
        const cHex = (c.hexCode || "").toLowerCase().replace("#", "");

        const targetColor = decodeURIComponent(colorParam).toLowerCase();
        const targetHex = decodeURIComponent(hexParam).toLowerCase().replace("#", "");
        const targetCode = decodeURIComponent(codeParam).toLowerCase();

        if (targetColor && (cSlug === targetColor || cName === targetColor || cSlug === targetColor.replace(/\s+/g, "-"))) return true;
        if (targetCode && cCode === targetCode) return true;
        if (targetHex && cHex === targetHex) return true;
        if (targetColor && cHex === targetColor.replace("#", "")) return true;
        if (targetColor && (cName.includes(targetColor) || targetColor.includes(cName))) return true;
        return false;
      });

      if (match) {
        setSelectedColor(match);
        if (match.colorFamily) {
          setActiveFamily(match.colorFamily);
        }
      }
    } else if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colorParam, hexParam, codeParam, colors]);

  // Set active room from URL if valid
  useEffect(() => {
    if (roomParam && ["living", "bedroom", "kitchen", "exterior", "upload"].includes(roomParam)) {
      setActiveRoom(roomParam as RoomType);
    }
  }, [roomParam]);

  // Extract unique families from the fetched colors
  const families = useMemo(() => {
    const fams = new Set(
      colors
        .map((c) => c.colorFamily)
        .filter((family): family is Color["colorFamily"] => typeof family === "string" && family.trim() !== "")
    );
    return ["all", ...Array.from(fams)];
  }, [colors]);

  const filteredColors = useMemo(() => {
    return colors
      .filter((color) => {
        const codeStr = color.shadeCode || color.colorId || "";
        const matchesSearch = 
          color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (codeStr && codeStr.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFamily = activeFamily === "all" || color.colorFamily === activeFamily;
        const matchesMood = activeMood === "all" || (color.moodTags && (color.moodTags as string[]).includes(activeMood));
        return matchesSearch && matchesFamily && matchesMood;
      })
      .sort((a, b) => {
        const codeA = a.shadeCode || a.colorId || a.name || "";
        const codeB = b.shadeCode || b.colorId || b.name || "";
        return codeA.localeCompare(codeB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
  }, [colors, searchQuery, activeFamily, activeMood]);

  // Displayed colors slice for high-performance virtualized rendering
  const displayedColors = useMemo(() => {
    return filteredColors.slice(0, displayLimit);
  }, [filteredColors, displayLimit]);

  // Complementary colors helper
  const complementaryColorsList = useMemo(() => {
    if (!selectedColor?.complementaryColours) return [];
    return selectedColor.complementaryColours
      .map((rel) => {
        const id = typeof rel === "object" ? rel.id : rel;
        return colors.find((c) => c.id === id);
      })
      .filter(Boolean) as Color[];
  }, [selectedColor, colors]);

  // Copy hex to clipboard
  const handleCopyHex = () => {
    if (!selectedColor) return;
    navigator.clipboard.writeText(selectedColor.hexCode);
    setCopied(true);
    toast.success("Hex code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveImage = () => {
    // Get all canvas elements from the room container
    const canvases = Array.from(svgContainerRef.current?.querySelectorAll("canvas") || []);
    if (canvases.length === 0) {
      toast.error("Could not find canvas to save.");
      return;
    }

    toast.info("Generating your image export...");

    try {
      const baseCanvas = canvases[0];
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = baseCanvas.width;
      exportCanvas.height = baseCanvas.height;
      
      const ctx = exportCanvas.getContext("2d");
      if (!ctx) throw new Error("Could not create 2d context");

      // Draw base canvas
      ctx.drawImage(baseCanvas, 0, 0);

      // Draw overlay canvas if it exists
      if (canvases.length > 1) {
        const overlayCanvas = canvases[1];
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(overlayCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }

      const png = exportCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = png;
      downloadLink.download = `reliance-room-${activeRoom}.png`;
      downloadLink.click();
      toast.success("High resolution image saved!");
    } catch (err) {
      toast.error("Failed to generate image. Ensure you are not in a cross-origin context.");
      console.error(err);
    }
  };

  // GSAP: Sliding active underline for Room Selector tabs
  useGSAP(() => {
    const activeButton = tabsContainerRef.current?.querySelector(`button[data-room="${activeRoom}"]`) as HTMLButtonElement;
    const indicator = tabsContainerRef.current?.querySelector("#tab-indicator") as HTMLDivElement;
    if (activeButton && indicator) {
      gsap.to(indicator, {
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: 0.45,
        ease: "power3.out"
      });
    }
  }, { dependencies: [activeRoom], scope: tabsContainerRef });

  // GSAP: Room container fade-in on room switch
  useGSAP(() => {
    const container = svgContainerRef.current;
    if (container) {
      gsap.fromTo(
        container,
        { opacity: 0.4, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, { dependencies: [activeRoom] });

  // GSAP: Stagger top color grid items lightly on filter updates
  useGSAP(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      const itemsToAnimate = Array.from(gridRef.current.children).slice(0, 16);
      gsap.killTweensOf(itemsToAnimate);
      gsap.fromTo(
        itemsToAnimate,
        { opacity: 0, scale: 0.9, y: 8 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.01,
          ease: "power2.out",
        }
      );
    }
  }, { dependencies: [activeFamily, activeMood, searchQuery], scope: gridRef });

  // GSAP: Selected color info card entrance animation
  useGSAP(() => {
    if (detailsRef.current && selectedColor) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
  }, { dependencies: [selectedColor?.id] });

  // GSAP: Float animation for instruction overlay
  useGSAP(() => {
    const overlay = document.getElementById("instruction-overlay");
    if (overlay) {
      gsap.fromTo(overlay,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
      gsap.to(overlay, {
        y: 6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, { dependencies: [selectedColor] });

  const roomColorProps = {
    selectedColorHex: selectedColor?.hexCode ?? null,
    selectedColorName: selectedColor?.name ?? null,
  };

  const renderActiveRoom = () => {
    if (activeRoom === "upload") {
      return (
        <UploadedRoom
          selectedColorHex={selectedColor?.hexCode ?? null}
          selectedColorName={selectedColor?.name ?? null}
          paintMode="fill"
        />
      );
    }
    switch (activeRoom) {
      case "living":   return <LivingRoom  {...roomColorProps} />;
      case "bedroom":  return <Bedroom     {...roomColorProps} />;
      case "kitchen":  return <Kitchen     {...roomColorProps} />;
      case "exterior": return <Exterior    {...roomColorProps} />;
      default:         return null;
    }
  };


  return (
    <div className="border-4 border-double border-[#C9A84C]/50 p-1.5 bg-white dark:bg-slate-950 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Left Area: Canvas & Controls */}
        <div className="lg:col-span-8 flex flex-col py-4 lg:py-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          
          {/* Header Bar */}
          <div className="flex flex-col gap-4 mb-6 px-4 lg:px-8 border-b border-slate-100 dark:border-slate-800/40 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Interactive Preview</span>
              <h2 className="text-2xl font-display font-bold text-reliance-navy dark:text-white capitalize flex items-center gap-2 mt-0.5">
                {ROOM_TITLES[activeRoom]}
              </h2>
            </div>

            {/* Room Switcher Tabs */}
            <div ref={tabsContainerRef} className="relative flex border border-slate-200 dark:border-slate-850 p-0.5 bg-slate-50 dark:bg-slate-900/60 w-full overflow-x-auto">
              {/* Sliding Indicator */}
              <div 
                id="tab-indicator"
                className="absolute top-0.5 bottom-0.5 left-0.5 bg-reliance-navy dark:bg-[#C9A84C] transition-all"
                style={{ width: `${100 / ROOM_TABS.length}%` }}
              />
              
              {ROOM_TABS.map((tab) => (
                <button
                  key={tab.id}
                  data-room={tab.id}
                  onClick={() => setActiveRoom(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 lg:px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors relative z-10 whitespace-nowrap ${
                    activeRoom === tab.id
                      ? "text-white dark:text-reliance-navy"
                      : "text-muted-foreground hover:text-reliance-navy dark:hover:text-white"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Canvas Container */}
          <div 
            ref={svgContainerRef}
            className="w-full bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 shadow-inner relative overflow-hidden"
          >
            {renderActiveRoom()}
          </div>

          {/* Canvas Actions Bar */}
          <div className="flex flex-wrap justify-end items-center gap-4 mt-6 border-t border-slate-100 dark:border-slate-800/40 pt-5 px-4 lg:px-8">
            <Button
              onClick={handleSaveImage}
              className="bg-[#C9A84C] hover:bg-[#A88B3F] text-reliance-navy hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none flex items-center gap-2 px-5 py-2.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Save Design
            </Button>
          </div>
        </div>

        {/* Right Area: Color Studio Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-950 p-6 lg:p-8 flex flex-col h-full lg:max-h-212.5 overflow-hidden">
          
          {/* Studio Header */}
          <div className="border-b border-slate-250 dark:border-slate-800 pb-5 mb-5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] block mb-1">Architectural Palette</span>
            <h3 className="text-xl font-display font-bold text-reliance-navy dark:text-white uppercase tracking-tight">
              Colour Studio
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Explore designer color ranges and mood profiles.</p>
          </div>
          
          {/* Search Box */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or code (e.g. RP-101)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-none border-slate-200 dark:border-slate-850 focus-visible:ring-[#C9A84C] bg-slate-50 dark:bg-slate-900/40 focus:bg-white dark:focus:bg-slate-900 text-xs transition-colors"
            />
          </div>

          {/* Filters Wrapper */}
          <div className="space-y-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/40">
            {/* Color Family Filters */}
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Color Family:</span>
              <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-1.5">
                {families.map((family) => {
                  const info = familyInfo[family] || { label: family, color: "#8E8E8E" };
                  const isSelected = activeFamily === family;
                  return (
                    <button
                      key={family}
                      onClick={() => setActiveFamily(family)}
                      className={`whitespace-nowrap px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-reliance-navy text-white border-reliance-navy dark:bg-[#C9A84C] dark:text-reliance-navy dark:border-[#C9A84C]"
                          : "bg-transparent text-muted-foreground border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      <span 
                        className="w-2 h-2 shrink-0 border border-black/10 dark:border-white/10" 
                        style={{ backgroundColor: info.color }}
                      />
                      {info.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mood Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">Mood vibe:</span>
              <select
                value={activeMood}
                onChange={(e) => setActiveMood(e.target.value)}
                className="grow rounded-none border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-xs font-semibold py-1 px-2.5 focus:outline-none focus:border-[#C9A84C] text-reliance-navy dark:text-white"
              >
                {moodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Color Info Card */}
          {selectedColor && (
            <div 
              ref={detailsRef}
              className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 p-4 mb-4 transition-all"
            >
              <div className="flex gap-4 items-start">
                {/* Large Swatch Card */}
                <div
                  className="w-16 h-20 border border-slate-350 dark:border-slate-800 shrink-0 p-1 bg-white dark:bg-slate-900 flex flex-col shadow-sm"
                >
                  <div className="w-full grow border border-black/5" style={{ backgroundColor: selectedColor.hexCode }} />
                  <div className="text-[8px] font-bold text-center pt-1 text-reliance-navy dark:text-slate-350 truncate">
                    {selectedColor.shadeCode || selectedColor.colorId || "RP-COLOR"}
                  </div>
                </div>

                {/* Details */}
                <div className="grow space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] block">Selected Tone</span>
                  <h4 className="text-lg font-display font-bold text-reliance-navy dark:text-white leading-tight">
                    {selectedColor.name}
                  </h4>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
                    <button 
                      onClick={handleCopyHex}
                      className="flex items-center gap-1 hover:text-reliance-navy dark:hover:text-[#C9A84C] font-mono cursor-pointer transition-colors"
                      title="Copy hex code"
                    >
                      {selectedColor.hexCode.toUpperCase()}
                      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                    {selectedColor.rgb?.string && (
                      <>
                        <span>•</span>
                        <span className="font-mono">{selectedColor.rgb.string}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className="capitalize">{selectedColor.colorFamily}</span>
                  </div>

                  {/* Mood Tags */}
                  {selectedColor.moodTags && selectedColor.moodTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {selectedColor.moodTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 border border-slate-200 dark:border-slate-850 text-muted-foreground bg-white dark:bg-slate-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedColor.description && (
                <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 italic leading-relaxed">
                  &quot;{selectedColor.description}&quot;
                </p>
              )}

              {/* Complementary Colors Selection */}
              {complementaryColorsList.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] block mb-2">
                    Complementary Palette
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {complementaryColorsList.map((compColor) => (
                      <button
                        key={compColor.id}
                        onClick={() => setSelectedColor(compColor)}
                        className="flex items-center gap-1.5 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#C9A84C] dark:hover:border-[#C9A84C] transition-all group"
                        title={compColor.name}
                      >
                        <div
                          className="w-3 h-3 border border-black/5 shrink-0"
                          style={{ backgroundColor: compColor.hexCode }}
                        />
                        <span className="text-[9px] font-semibold text-reliance-navy dark:text-slate-350 truncate max-w-20">
                          {compColor.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Color Grid list */}
          <div 
            className="grow overflow-y-auto pr-2 scrollbar-thin space-y-3"
            onScroll={(e) => {
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
              if (scrollHeight - scrollTop - clientHeight < 160) {
                setDisplayLimit((prev) => {
                  if (prev < filteredColors.length) {
                    return Math.min(prev + 40, filteredColors.length);
                  }
                  return prev;
                });
              }
            }}
          >
            {filteredColors.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-slate-200 dark:border-slate-850 p-6 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="w-6 h-6 text-muted-foreground/60" />
                <p className="text-xs font-bold uppercase tracking-wide">No Designer Shades Found</p>
                <p className="text-[10px]">Try adjusting your search query or filters.</p>
              </div>
            ) : (
              <>
                <div ref={gridRef} className="grid grid-cols-4 gap-2">
                  {displayedColors.map((color) => {
                    const isSelected = selectedColor?.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative aspect-3/4 flex flex-col focus:outline-none border p-1 bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-reliance-navy dark:border-[#C9A84C] ring-1 ring-reliance-navy dark:ring-[#C9A84C] scale-95"
                            : "border-slate-200 dark:border-slate-850 hover:border-slate-400 dark:hover:border-slate-650 hover:scale-102"
                        }`}
                        title={color.name}
                      >
                        {/* Color Swatch */}
                        <div
                          className="w-full grow border border-black/5"
                          style={{ backgroundColor: color.hexCode }}
                        />
                        
                        {/* Architectural Swatch Label */}
                        <div className="pt-1.5 pb-0.5 flex flex-col items-center justify-center">
                          <span className="text-[8px] font-bold font-mono text-reliance-navy dark:text-slate-200 truncate w-full text-center px-0.5 leading-none">
                            {color.shadeCode || color.colorId || color.hexCode}
                          </span>
                          <span className="text-[7px] text-muted-foreground font-mono uppercase tracking-wider scale-90 mt-0.5 leading-none">
                            {color.hexCode.toUpperCase()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {displayLimit < filteredColors.length && (
                  <div className="text-center py-2">
                    <button
                      type="button"
                      onClick={() => setDisplayLimit((prev) => Math.min(prev + 48, filteredColors.length))}
                      className="text-[9px] font-bold uppercase tracking-wider text-reliance-navy/70 dark:text-white/70 hover:text-reliance-navy dark:hover:text-[#C9A84C] px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors w-full cursor-pointer"
                    >
                      Load More Shades ({filteredColors.length - displayLimit} more)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
