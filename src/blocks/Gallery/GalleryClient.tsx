"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Media } from "@/components/Media";
import { Search, ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utilities/ui";

const COLUMN_CLASSES: Record<string, string> = {
  "2": "grid-cols-2",
  "3": "grid-cols-2 md:grid-cols-3",
  "4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

export const GalleryClient: React.FC<Omit<GalleryBlockProps, "blockType">> = ({
  images,
  columns = "4",
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentImage = selectedIndex !== null ? images?.[selectedIndex] : null;
  const colClass = COLUMN_CLASSES[columns ?? "4"] ?? COLUMN_CLASSES["4"];
  const previewImages = images?.slice(0, 8) ?? [];

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? (images?.length ?? 1) - 1 : prev - 1
      );
    },
    [images?.length]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedIndex((prev) =>
        prev === null || prev === (images?.length ?? 1) - 1 ? 0 : prev + 1
      );
    },
    [images?.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null || !images?.length) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, images?.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Gallery Grid */}
      <div className={cn("grid gap-3 w-full", colClass)}>
        {previewImages.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-4/3 bg-muted rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`View image ${index + 1}`}
          >
            <Media
              resource={item.image}
              fill
              className="h-full w-full"
              imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-1">
                <Search className="text-white w-7 h-7" />
                <span className="text-white font-semibold text-sm tracking-wide">View</span>
              </div>
            </div>

            {/* Index badge */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Badge
                variant="secondary"
                className="text-xs font-bold bg-black/60 text-white border-0 backdrop-blur-sm"
              >
                {index + 1}/{images.length}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* View All Button */}
      <Link
        href="/albums"
        className="inline-flex items-center gap-2 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-primary/20 active:scale-95 text-base"
      >
        <Images className="w-5 h-5" />
        View All Albums
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>

      {/* Shadcn Dialog Lightbox */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent
          className="max-w-[95vw] lg:max-w-7xl w-full p-0 bg-transparent border-none shadow-none flex flex-col items-center justify-center focus:outline-none"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            {currentImage?.caption ?? `Image ${(selectedIndex ?? 0) + 1} of ${images.length}`}
          </DialogTitle>

          <div className="flex flex-col w-full">
            {/* Top bar (Floating) */}
            <div className="flex items-center justify-between w-full px-6 py-4 mb-4 z-20">
              <span className="text-white/80 text-sm font-bold tracking-widest uppercase">
                {selectedIndex !== null ? selectedIndex + 1 : 0}{" "}
                <span className="text-white/30 mx-1">/</span> {images.length}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="text-white hover:bg-white/10 rounded-full w-10 h-10 transition-all active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <div className="w-px h-6 bg-white/10 mx-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="text-white hover:bg-white/10 rounded-full w-10 h-10 transition-all active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
                {/* Custom spacing to avoid overlapping with default close button */}
                <div className="w-10" />
              </div>
            </div>

            {/* Image Area */}
            <div className="relative w-full aspect-video md:aspect-21/9 flex items-center justify-center overflow-hidden">
              {currentImage && (
                <div className="relative w-full h-full">
                  <Media
                    resource={currentImage.image}
                    fill
                    imgClassName="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Side Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black/20 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-md opacity-0 md:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black/20 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-md opacity-0 md:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Footer Console */}
            <div className="w-full flex flex-col gap-4 mt-4">
              {/* Caption */}
              {currentImage?.caption && (
                <div className="px-8 py-4 text-center text-lg font-medium text-white/90 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl max-w-3xl mx-auto">
                  {currentImage.caption}
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex justify-center gap-3 overflow-x-auto px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl scrollbar-none max-w-4xl mx-auto mb-4">
                  {images.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={cn(
                        "relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-500",
                        i === selectedIndex
                          ? "border-primary ring-4 ring-primary/20 scale-110 z-10"
                          : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
                      )}
                      aria-label={`Go to image ${i + 1}`}
                    >
                      <Media
                        resource={item.image}
                        imgClassName="object-cover w-full h-full"
                        className="w-full h-full"
                      />
                      {i === selectedIndex && (
                        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
