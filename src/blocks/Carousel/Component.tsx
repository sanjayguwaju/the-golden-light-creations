"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import type { CarouselBlock as CarouselBlockProps, Media as MediaType } from "@/payload-types";

// ─── Height / aspect helpers ─────────────────────────────────────────────────

const heightClass: Record<string, string> = {
  sm: "h-[300px]",
  md: "h-[500px]",
  lg: "h-[700px]",
  full: "h-screen",
};

const aspectClass: Record<string, string> = {
  "none": "",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

// ─── Slice type ───────────────────────────────────────────────────────────────

type Slide = CarouselBlockProps["slides"][number];

// ─── Component ───────────────────────────────────────────────────────────────

export const CarouselBlockComponent: React.FC<CarouselBlockProps> = (props) => {
  const {
    slides,
    height = "lg",
    aspectRatio = "none",
    loop = true,
    autoplay = true,
    autoplayDelay = 5000,
    showArrows = true,
    showDots = true,
    showOverlay = true,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const useAspect = aspectRatio !== "none" && aspectRatio !== null;
  const containerClass = useAspect
    ? cn("relative w-full", aspectClass[aspectRatio ?? "none"])
    : cn("relative w-full", heightClass[height ?? "lg"]);

  return (
    <section className="relative w-full overflow-hidden bg-muted/40">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop={loop ?? true}
        autoplay={autoplay ? { delay: autoplayDelay ?? 5000, disableOnInteraction: false } : false}
        navigation={showArrows ?? false}
        pagination={showDots ? { clickable: true } : false}
        className="w-full"
      >
        {slides.map((slide: Slide, index: number) => {
          const image = slide.image as string | MediaType;
          const ctaEnabled = slide.link?.enabled && slide.link?.label && slide.link?.url;

          return (
            <SwiperSlide key={slide.id ?? index} className="pl-0 relative">
              <div className={containerClass}>
                {/* Background image */}
                {image && typeof image === "object" && (
                  <Media
                    fill
                    imgClassName="object-cover"
                    priority={index === 0}
                    resource={image}
                  />
                )}

                {/* Gradient overlays */}
                <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/30 to-transparent pointer-events-none z-10" />

                {/* Text overlay box */}
                {showOverlay && (slide.title || slide.subtitle || ctaEnabled) && (
                  <div className="absolute inset-x-0 bottom-12 flex justify-center px-6 z-20">
                    <div className="bg-[#C0171E]/85 backdrop-blur-md px-10 py-6 rounded-2xl border border-white/20 text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl">
                      {slide.title && (
                        <h2 className="text-white text-lg md:text-2xl font-semibold tracking-wide mb-2 drop-shadow-md uppercase">
                          {slide.title}
                        </h2>
                      )}
                      {slide.subtitle && (
                        <p className="text-white/90 text-sm md:text-base mb-3">
                          {slide.subtitle}
                        </p>
                      )}
                      {ctaEnabled && (
                        <a
                          href={slide.link!.url!}
                          className="inline-block mt-1 px-6 py-2.5 text-sm font-semibold text-[#C0171E] bg-white rounded-full hover:bg-[#FFD04A] hover:text-[#0A0A0A] transition-colors duration-200 shadow-md"
                        >
                          {slide.link!.label}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
