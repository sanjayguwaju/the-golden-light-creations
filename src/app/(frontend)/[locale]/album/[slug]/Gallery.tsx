"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import type { Media } from "@/payload-types";

interface GalleryImage {
  image: string | Media;
  caption?: string | null;
  id?: string | null;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [_, setIsHovered] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const showNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  }, [currentIndex, images.length]);

  const showPrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  }, [currentIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, showNext, showPrev]);

  const selectedItem = currentIndex !== null ? images[currentIndex] : null;
  const selectedImage = selectedItem?.image as Media;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {images.map((item, index) => {
          const img = item.image as Media;
          if (!img?.url) return null;

          return (
            <div
              key={item.id || index}
              className="group relative cursor-pointer outline-none"
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-muted shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1.5 ring-1 ring-border/50">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={img.url}
                    alt={img.alt || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 text-white/90 mb-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-full ring-1 ring-white/20">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-xs uppercase tracking-widest">
                        Enlarge
                      </span>
                    </div>
                    {item.caption && (
                      <p className="text-white/80 text-sm font-medium line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </AspectRatio>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Dialog */}
      <Dialog open={currentIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogPortal>
          <DialogOverlay className="bg-zinc-900/85 backdrop-blur-xl transition-all duration-300 z-100" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-101 w-full max-w-[100vw] h-full border-none bg-transparent p-0 translate-x-[-50%] translate-y-[-50%] shadow-none focus-visible:outline-none flex items-center justify-center overflow-hidden">
            <DialogTitle className="sr-only">Photo Gallery Lightbox</DialogTitle>
            <DialogDescription className="sr-only">
              View full size image and navigate through the album. Use arrow keys to navigate.
            </DialogDescription>
            {selectedImage && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-10 lg:p-16">
                {/* Dynamic Background Blur */}
                <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
                  <Image
                    src={selectedImage.url!}
                    alt=""
                    fill
                    className="object-cover scale-125 blur-[100px] opacity-30 transition-all duration-1000"
                  />
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 z-110 text-white/70 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
                >
                  <X className="w-8 h-8" />
                </Button>

                {/* Navigation Buttons */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-109 pointer-events-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    className="h-16 w-16 rounded-full bg-zinc-800/40 backdrop-blur-md text-white/80 hover:text-white hover:bg-zinc-700/60 border border-white/10 pointer-events-auto transition-all"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    className="h-16 w-16 rounded-full bg-zinc-800/40 backdrop-blur-md text-white/80 hover:text-white hover:bg-zinc-700/60 border border-white/10 pointer-events-auto transition-all"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </Button>
                </div>

                {/* Image Container */}
                <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image
                      src={selectedImage.url!}
                      alt={selectedImage.alt || ""}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Info Bar */}
                <div className="mt-8 text-center max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/40 text-xs font-mono mb-4">
                    <span>{currentIndex! + 1}</span>
                    <span className="opacity-30">/</span>
                    <span>{images.length}</span>
                  </div>

                  {selectedItem?.caption && (
                    <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                      {selectedItem.caption}
                    </p>
                  )}
                  {selectedImage.alt && !selectedItem?.caption && (
                    <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                      {selectedImage.alt}
                    </p>
                  )}
                </div>
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
