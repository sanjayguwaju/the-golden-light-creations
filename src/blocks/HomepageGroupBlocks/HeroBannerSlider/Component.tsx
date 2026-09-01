"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Media } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface HeroBannerSlideItem {
  id?: string | null;
  image: string | Media;
  mobileImage?: string | Media | null;
  altText?: string | null;
  link?: string | null;
  openInNewTab?: boolean | null;
}

export interface HeroBannerSliderProps {
  slides?: HeroBannerSlideItem[] | null;
  autoplay?: boolean | null;
  autoplaySpeed?: number | null;
  showArrows?: boolean | null;
  showDots?: boolean | null;
  aspectRatio?: "auto" | "16/9" | "21/9" | "fullscreen" | null;
  disableInnerContainer?: boolean;
}

const DEFAULT_BANNER = "/hero-protect-banner.jpg";

export const HeroBannerSliderBlock: React.FC<HeroBannerSliderProps> = (props) => {
  const {
    slides = [],
    autoplay = true,
    autoplaySpeed = 5,
    showArrows = true,
    showDots = true,
    aspectRatio = "auto",
  } = props;

  const validSlides: HeroBannerSlideItem[] =
    slides && slides.length > 0
      ? slides
      : [
          {
            image: DEFAULT_BANNER,
            altText: "Reliance Paints Protect Banner",
          },
        ];

  const totalSlides = validSlides.length;
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);

  // Touch / Drag Gesture tracking
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);


  const goToSlide = useCallback(
    (targetIndex: number, direction: "next" | "prev" = "next") => {
      if (isAnimatingRef.current || totalSlides <= 1 || targetIndex === current) return;

      const currentSlideEl = slidesRef.current[current];
      const nextSlideEl = slidesRef.current[targetIndex];

      if (!currentSlideEl || !nextSlideEl) {
        setCurrent(targetIndex);
        return;
      }

      isAnimatingRef.current = true;
      const xOffset = direction === "next" ? 100 : -100;

      // Position incoming slide
      gsap.set(nextSlideEl, {
        xPercent: xOffset,
        opacity: 1,
        zIndex: 2,
        scale: 1.02,
        visibility: "visible",
      });

      gsap.set(currentSlideEl, { zIndex: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentSlideEl, {
            visibility: "hidden",
            xPercent: 0,
            opacity: 0,
            scale: 1,
          });
          isAnimatingRef.current = false;
          setCurrent(targetIndex);
        },
      });

      tl.to(currentSlideEl, {
        xPercent: -xOffset * 0.4,
        opacity: 0.3,
        duration: 0.75,
        ease: "power3.inOut",
      }).to(
        nextSlideEl,
        {
          xPercent: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0
      );
    },
    [current, totalSlides]
  );

  const next = useCallback(() => {
    const nextIdx = (current + 1) % totalSlides;
    goToSlide(nextIdx, "next");
  }, [current, totalSlides, goToSlide]);

  const prev = useCallback(() => {
    const prevIdx = (current - 1 + totalSlides) % totalSlides;
    goToSlide(prevIdx, "prev");
  }, [current, totalSlides, goToSlide]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || totalSlides <= 1 || isHovered) {
      if (timerRef.current) timerRef.current.kill();
      return;
    }

    if (timerRef.current) timerRef.current.kill();
    const delay = (autoplaySpeed || 5);
    timerRef.current = gsap.delayedCall(delay, () => {
      next();
    });

    return () => {
      if (timerRef.current) timerRef.current.kill();
    };
  }, [autoplay, autoplaySpeed, current, isHovered, totalSlides, next]);

  // Initial slide visibility setup
  useGSAP(
    () => {
      slidesRef.current.forEach((el, index) => {
        if (!el) return;
        if (index === current) {
          gsap.set(el, { xPercent: 0, opacity: 1, visibility: "visible", zIndex: 1 });
        } else {
          gsap.set(el, { xPercent: 0, opacity: 0, visibility: "hidden", zIndex: 0 });
        }
      });
    },
    { dependencies: [], scope: containerRef }
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isAnimatingRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchStartX.current = clientX;
    touchStartY.current = clientY;
    touchCurrentX.current = clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    touchCurrentX.current = clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const deltaX = touchCurrentX.current - touchStartX.current;
    const minSwipeDistance = 45; // pixels

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        // Swiped left -> Next
        next();
      } else {
        // Swiped right -> Prev
        prev();
      }
    }
  };

  // Determine Aspect Ratio Container Classes
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case "16/9":
        return "aspect-16/9 w-full";
      case "21/9":
        return "aspect-21/9 w-full";
      case "fullscreen":
      case "auto":
      default:
        return "w-full h-[calc(100svh-64px)] sm:h-[calc(100svh-80px)] min-h-[480px] sm:min-h-[550px] md:min-h-[650px] lg:h-[calc(100vh-84px)] lg:min-h-[700px]";
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Image Hero Banner Slider"
    >
      {/* Slider Viewport Track */}
      <div
        ref={trackRef}
        className={`relative ${getAspectRatioClasses()} overflow-hidden cursor-grab active:cursor-grabbing`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        {validSlides.map((slide, index) => {
          const desktopUrl = getMediaUrl(slide.image) || DEFAULT_BANNER;
          const mobileUrl = getMediaUrl(slide.mobileImage);
          const alt =
            slide.altText ||
            (typeof slide.image === "object" ? slide.image.alt : "") ||
            `Reliance Paints Banner ${index + 1}`;

          const slideContent = (
            <picture className="w-full h-full block">
              {mobileUrl && (
                <source media="(max-width: 768px)" srcSet={mobileUrl} />
              )}
              {desktopUrl && (
                <source media="(min-width: 769px)" srcSet={desktopUrl} />
              )}
              <img
                src={desktopUrl || DEFAULT_BANNER}
                alt={alt}
                draggable={false}
                className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
              />
            </picture>
          );

          return (
            <div
              key={slide.id || index}
              ref={(el) => {
                slidesRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full"
              aria-hidden={index !== current}
            >
              {slide.link ? (
                <Link
                  href={slide.link}
                  target={slide.openInNewTab ? "_blank" : "_self"}
                  rel={slide.openInNewTab ? "noopener noreferrer" : undefined}
                  className="block w-full h-full"
                  onClick={(e) => {
                    // Prevent accidental clicks during swipe drag
                    if (Math.abs(touchCurrentX.current - touchStartX.current) > 10) {
                      e.preventDefault();
                    }
                  }}
                >
                  {slideContent}
                </Link>
              ) : (
                slideContent
              )}
            </div>
          );
        })}

        {/* Visible Arrow Navigation - Left and Right */}
        {showArrows && totalSlides > 1 && (
          <>
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-reliance-gold"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 -translate-x-0.5" />
            </button>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-reliance-gold"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 translate-x-0.5" />
            </button>
          </>
        )}

        {/* Pagination Dots Indicator */}
        {showDots && totalSlides > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
            {validSlides.map((_, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx, idx > current ? "next" : "prev")}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 sm:h-2.5 transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-6 sm:w-8 bg-white shadow-sm"
                      : "w-2 sm:w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
