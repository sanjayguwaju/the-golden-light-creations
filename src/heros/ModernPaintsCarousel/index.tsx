/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, ArrowRight, Palette } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { getMediaUrl } from "@/utilities/getMediaUrl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface ProductSlide {
  id: string | number;
  name: string;
  tagline: string;
  image: string;
  badge: string | null;
  isVideo?: boolean;
}

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
}

interface HeroCarouselProps {
  slides?: Array<{
    image: string | { url?: string; mimeType?: string } | null;
    title?: string | null;
    description?: string | null;
  }> | null;
  stats?: Array<{
    value: string;
    label: string;
    suffix?: string | null;
  }> | null;
  showStats?: boolean | null;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
}

const Stat: React.FC<StatProps> = ({ end, label, suffix = "+" }) => {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tabular-nums leading-none">
        {count}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs text-slate-350 leading-snug font-medium">
        {label}
      </span>
    </div>
  );
};

const useHeroProducts = (slides?: HeroCarouselProps["slides"]): ProductSlide[] => {
  return useMemo(() => {
    if (!slides || !Array.isArray(slides)) return [];
    return slides.map((slide, index): ProductSlide => {
      let imageUrl = "";
      let isVideo = false;

      if (slide.image) {
        if (typeof slide.image === "object" && slide.image !== null) {
          imageUrl = getMediaUrl(slide.image.url) || "";
          isVideo = slide.image.mimeType?.startsWith("video/") || false;
        } else if (typeof slide.image === "string") {
          imageUrl = getMediaUrl(slide.image);
          isVideo =
            slide.image.endsWith(".mp4") ||
            slide.image.endsWith(".webm") ||
            slide.image.endsWith(".mov") ||
            slide.image.includes("video-");
        }
      }
      return {
        id: index,
        name: slide.title || "Reliance Paints",
        tagline: slide.description || "Premium Quality Paint",
        image: imageUrl,
        badge: null,
        isVideo,
      };
    });
  }, [slides]);
};

const useImagePreloader = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

const useCarousel = (
  totalSlides: number,
  autoPlayInterval: number = 4500,
  onSlideChange?: (index: number) => void,
) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentRef = useRef(current);
  currentRef.current = current;

  const goToSlide = useCallback(
    (nextIndex: number, newDirection: number = 1) => {
      setDirection(newDirection);
      setCurrent(nextIndex);
      onSlideChange?.(nextIndex);
      setIsPaused(false);
    },
    [onSlideChange],
  );

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalSlides <= 1) return;
    timerRef.current = setInterval(() => {
      const nextIndex = (currentRef.current + 1) % totalSlides;
      setDirection(1);
      setCurrent(nextIndex);
      onSlideChange?.(nextIndex);
    }, autoPlayInterval);
  }, [totalSlides, autoPlayInterval, onSlideChange]);

  const resetAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPaused(false);
    startAutoPlay();
  }, [startAutoPlay]);

  const prev = useCallback(() => {
    const prevIndex = (currentRef.current - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex, -1);
    resetAutoPlay();
  }, [totalSlides, goToSlide, resetAutoPlay]);

  const next = useCallback(() => {
    const nextIndex = (currentRef.current + 1) % totalSlides;
    goToSlide(nextIndex, 1);
    resetAutoPlay();
  }, [totalSlides, goToSlide, resetAutoPlay]);

  const goToDot = useCallback(
    (index: number) => {
      const newDirection = index > currentRef.current ? 1 : -1;
      goToSlide(index, newDirection);
      resetAutoPlay();
    },
    [goToSlide, resetAutoPlay],
  );

  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      resetAutoPlay();
    }
  }, [isPaused, resetAutoPlay]);

  return { current, direction, prev, next, goToDot, togglePause, isPaused };
};

function useSlideTransition(
  current: number,
  direction: number,
  imageRef: React.RefObject<HTMLDivElement | null>,
  textRef: React.RefObject<HTMLDivElement | null>,
) {
  const prevRef = useRef(current);

  useEffect(() => {
    if (prevRef.current === current) return;
    const xIn = direction > 0 ? 80 : -80;

    if (imageRef?.current) {
      gsap.fromTo(
        imageRef.current,
        { x: xIn, opacity: 0, scale: 0.88 },
        { x: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    }
    if (textRef?.current) {
      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, delay: 0.05, ease: "power3.out" },
      );
    }
    prevRef.current = current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
}

interface MobileLayoutProps {
  slide: ProductSlide;
  products: ProductSlide[];
  current: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  stats?: HeroCarouselProps["stats"];
  showStats?: boolean | null;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  slide,
  products,
  current,
  direction,
  onPrev,
  onNext,
  onDot,
  onTouchStart,
  onTouchEnd,
  stats,
  showStats,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const words = slide.name.split(" ");
  const line1 = words.slice(0, 2).join(" ");
  const line2 = words.length > 2 ? words.slice(2).join(" ") : null;

  useSlideTransition(current, direction, imageRef, textRef);

  return (
    <div
      className="flex lg:hidden flex-col pt-32 pb-8 sm:pt-36 sm:pb-10 gap-8"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-reliance-gold/25 border border-reliance-gold/45 shadow-lg shadow-reliance-gold/5">
          <span className="w-6 h-6 rounded-full bg-reliance-gold/30 flex items-center justify-center">
            <Palette size={12} className="text-reliance-gold" />
          </span>
          <span className="text-xs font-semibold text-white tracking-wide">
            Premium Collection
          </span>
        </div>

        {/* Title */}
        <div ref={textRef} className="flex flex-col">
          <h1 className="text-[2.25rem] leading-[1.1] xs:text-4xl sm:text-5xl text-white tracking-tight font-extrabold flex flex-col">
            <span>{line1}</span>
            {line2 && <span className="text-reliance-gold">{line2}</span>}
          </h1>
          <p className="mt-3.5 text-sm xs:text-base sm:text-lg text-slate-200 leading-relaxed max-w-sm font-medium">
            {slide.tagline}
          </p>
        </div>

        {/* Glassmorphic Stats capsules */}
        {showStats !== false && stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 py-2">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-reliance-gold/20 hover:bg-white/8 transition-all duration-300 rounded-xl p-3 sm:p-4 flex flex-col gap-1"
              >
                <Stat
                  end={parseInt(s.value, 10) || 0}
                  label={s.label}
                  suffix={s.suffix || ""}
                />
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-row gap-3 pt-2">
          <button
            className="group relative flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-reliance-gold to-[#D8B962] text-slate-950 px-3 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-reliance-gold/20 hover:shadow-reliance-gold/40 hover:brightness-110 active:scale-[0.97] transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
            aria-label="Explore Range"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative z-10 flex items-center gap-1.5">
              Explore <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200 ease-out" />
            </span>
          </button>
          <button
            className="flex-1 inline-flex items-center justify-center gap-2 border border-white/30 backdrop-blur-xs text-white px-3 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/15 hover:border-white active:scale-[0.97] transition-all duration-200 cursor-pointer whitespace-nowrap"
            aria-label="View Palette"
          >
            View Palette
          </button>
        </div>
      </div>

      {/* Navigation Progress Indicators */}
      {products.length > 1 && (
        <div className="flex items-center justify-center gap-4 pb-4 mt-4">
          <button
            onClick={onPrev}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-slate-950 hover:border-white cursor-pointer active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => onDot(i)}
                className="group relative flex flex-col pt-1 pb-2 cursor-pointer focus:outline-hidden"
              >
                <div className="w-8 h-[3px] bg-white/20 rounded-full overflow-hidden relative">
                  <div
                    className={`progress-line-inner progress-line-inner-${i} absolute top-0 left-0 h-full bg-white`}
                    style={{ width: i < current ? "100%" : "0%" }}
                  />
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={onNext}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-slate-950 hover:border-white cursor-pointer active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

interface DesktopLayoutProps {
  slide: ProductSlide;
  products: ProductSlide[];
  current: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  stats?: HeroCarouselProps["stats"];
  showStats?: boolean | null;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  slide,
  products,
  current,
  direction,
  onPrev,
  onNext,
  onDot,
  stats,
  showStats,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = slide.name.split(" ");
  const line1 = words.slice(0, 2).join(" ");
  const line2 = words.length > 2 ? words.slice(2).join(" ") : null;

  useSlideTransition(current, direction, imageRef, textRef);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div className="hidden lg:grid lg:grid-cols-10 lg:gap-12 xl:gap-16 lg:items-center lg:min-h-svh lg:py-28">
      {/* Left Content */}
      <div ref={containerRef} className="col-span-6 flex flex-col space-y-9 xl:space-y-11">
        <div className="space-y-9 xl:space-y-11">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 pl-2.5 pr-6 py-2.5 rounded-full bg-reliance-gold/25 border border-reliance-gold/45 shadow-xl shadow-reliance-gold/5">
            <span className="w-7 h-7 rounded-full bg-reliance-gold/30 flex items-center justify-center animate-pulse">
              <Palette size={14} className="text-reliance-gold" />
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Premium Collection
            </span>
          </div>

          {/* Title & Tagline */}
          <div ref={textRef} className="flex flex-col">
            <h1 className="text-6xl xl:text-[80px] 2xl:text-[92px] text-white leading-[1.02] tracking-tight font-extrabold flex flex-col">
              <span>{line1}</span>
              {line2 && <span className="text-reliance-gold">{line2}</span>}
            </h1>
            <p className="mt-6 text-lg xl:text-xl text-slate-200 leading-relaxed max-w-xl font-medium">
              {slide.tagline}
            </p>
          </div>

          {/* Glassmorphic Stats Grid */}
          {showStats !== false && stats && stats.length > 0 && (
            <div className="grid grid-cols-4 gap-4 xl:gap-5 py-2">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-reliance-gold/20 hover:bg-white/8 transition-all duration-300 rounded-2xl p-5 flex flex-col gap-1.5"
                >
                  <Stat
                    end={parseInt(s.value, 10) || 0}
                    label={s.label}
                    suffix={s.suffix || ""}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-5">
            <button
              className="group relative inline-flex items-center gap-3 bg-linear-to-r from-reliance-gold to-[#D8B962] text-slate-950 px-9 py-4.5 rounded-full text-base font-bold transition-all shadow-xl shadow-reliance-gold/25 hover:shadow-reliance-gold/45 hover:scale-[1.03] active:scale-[0.98] hover:brightness-110 cursor-pointer overflow-hidden duration-200"
              aria-label="Explore Range"
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Range <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </span>
            </button>
            <button
              className="inline-flex items-center gap-2 border border-white/30 backdrop-blur-xs text-white px-9 py-4.5 rounded-full text-base font-semibold hover:bg-white/15 hover:border-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              aria-label="View Palette"
            >
              View Palette
            </button>
          </div>
        </div>

        {/* Controls */}
        {products.length > 1 && (
          <div className="flex items-center gap-6 pt-6">
            <button
              onClick={onPrev}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-slate-950 hover:border-white cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-3">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onDot(i)}
                  className="group relative flex flex-col pt-2 pb-3 cursor-pointer text-left focus:outline-hidden"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    i === current ? "text-reliance-gold" : "text-white/40 group-hover:text-white/80"
                  }`}>
                    0{i + 1}
                  </span>
                  <div className="mt-1 w-16 h-[3px] bg-white/20 rounded-full overflow-hidden relative">
                    <div
                      className={`progress-line-inner progress-line-inner-${i} absolute top-0 left-0 h-full bg-white`}
                      style={{ width: i < current ? "100%" : "0%" }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={onNext}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-slate-950 hover:border-white cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Right Content Spacer (allows full background to display clearly) */}
      <div className="col-span-4" />
    </div>
  );
};

export const ModernPaintsCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  stats,
  showStats = true,
  autoPlayInterval = 4500,
  onSlideChange,
}) => {
  const products = useHeroProducts(slides);
  const imageUrls = products.filter((p) => !p.isVideo).map((p) => p.image);

  const { current, direction, prev, next, goToDot, togglePause, isPaused } = useCarousel(
    products.length,
    autoPlayInterval,
    onSlideChange,
  );

  useImagePreloader(imageUrls);

  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);
  const watermarkRef1 = useRef<HTMLDivElement>(null);
  const watermarkRef2 = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  // Mouse move parallax for dot grid
  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !dotGridRef.current) return;
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth) - 0.5;
    const y = (e.clientY / clientHeight) - 0.5;
    gsap.to(dotGridRef.current, {
      x: x * 40,
      y: y * 40,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Device orientation tilt parallax
  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null && dotGridRef.current) {
        const x = Math.max(-0.5, Math.min(0.5, e.gamma / 90));
        const y = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 90));
        gsap.to(dotGridRef.current, {
          x: x * 40,
          y: y * 40,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [shouldReduceMotion]);

  // GSAP animations for watermark scale and scroll parallax
  useGSAP(() => {
    if (shouldReduceMotion) return;

    // Watermark scale animation
    if (watermarkRef1.current && watermarkRef2.current) {
      gsap.to([watermarkRef1.current, watermarkRef2.current], {
        scale: 1.05,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Scroll parallax for watermark
    if (watermarkRef1.current && watermarkRef2.current) {
      gsap.to([watermarkRef1.current, watermarkRef2.current], {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Scroll parallax for content translation
    gsap.to(".parallax-content-wrap", {
      y: -80,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Scroll parallax for content opacity fade
    gsap.to(".parallax-content-wrap", {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      }
    });
  }, { scope: sectionRef });

  // Progress Bar autoplay line tween
  useGSAP(() => {
    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
    }

    // Reset progress bars
    gsap.set(".progress-line-inner", { width: "0%" });
    for (let i = 0; i < current; i++) {
      gsap.set(`.progress-line-inner-${i}`, { width: "100%" });
    }

    // Create tween for active slide progress line
    progressTweenRef.current = gsap.fromTo(
      `.progress-line-inner-${current}`,
      { width: "0%" },
      {
        width: "100%",
        duration: autoPlayInterval / 1000,
        ease: "none",
      }
    );
  }, [current, autoPlayInterval]);

  // Pause progress tween on hover pause
  useEffect(() => {
    if (progressTweenRef.current) {
      if (isPaused) {
        progressTweenRef.current.pause();
      } else {
        progressTweenRef.current.play();
      }
    }
  }, [isPaused]);

  if (products.length === 0) {
    return (
      <section className="min-h-svh flex items-center justify-center bg-linear-to-br from-slate-50 to-white">
        <div className="w-10 h-10 border-4 border-reliance-navy/20 border-t-reliance-navy rounded-full animate-spin" />
      </section>
    );
  }

  const slide = products[current];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950 text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => togglePause()}
      onMouseLeave={() => isPaused && togglePause()}
      aria-label="Featured products carousel"
      role="region"
    >
      {/* Drifting Decorative Ambient Glow Blobs */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-reliance-gold/12 blur-[120px] mix-blend-screen pointer-events-none animate-pulse z-1" />
      <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-reliance-gold/8 blur-[160px] mix-blend-screen pointer-events-none animate-pulse z-1"
        style={{ animationDuration: "8s" }}
      />

      {/* ────── Background Media (Full-bleed with crossfade) ────── */}
      <div className="absolute inset-0 z-0">
        {products.map((p, index) => (
          <div
            key={p.id}
            className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {p.image ? (
              p.isVideo ? (
                <video
                  src={p.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover animate-scale-slow"
                />
              ) : (
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover animate-scale-slow"
                />
              )
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950" />
            )}
            {/* Ambient Dark Overlay to make the white text POP */}
            <div className="absolute inset-0 bg-slate-950/65" />
            {/* Left-side dark gradient to provide a high-contrast zone for text layout */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/45 to-transparent max-lg:bg-slate-950/80" />
          </div>
        ))}
      </div>

      {/* Devanagari Calligraphy Watermark behind content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div
          ref={watermarkRef1}
          className="absolute select-none font-bold text-[25vw] leading-none left-[-3vw] top-[15vh] parallax-watermark watermark-item"
          style={{ 
            fontFamily: "'Yatra One', 'Rozha One', 'Noto Serif Devanagari', sans-serif",
            WebkitTextStroke: "2px rgba(239, 68, 68, 0.75)",
            color: "transparent",
          }}
        >
          रंग
        </div>
        <div
          ref={watermarkRef2}
          className="absolute select-none font-bold text-[25vw] leading-none left-[-2.5vw] top-[14.5vh] parallax-watermark watermark-item"
          style={{ 
            fontFamily: "'Yatra One', 'Rozha One', 'Noto Serif Devanagari', sans-serif",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.75)",
            color: "transparent",
          }}
        >
          रंग
        </div>
      </div>

      {/* Subtle Dot Grid Texture Overlay on top of the media background with parallax */}
      <div
        ref={dotGridRef}
        className="absolute inset-[-40px] opacity-10 pointer-events-none z-1"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ────── Content Container ────── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 parallax-content-wrap">
        <MobileLayout
          slide={slide}
          products={products}
          current={current}
          direction={direction}
          onPrev={prev}
          onNext={next}
          onDot={goToDot}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          stats={stats}
          showStats={showStats}
        />
        <DesktopLayout
          slide={slide}
          products={products}
          current={current}
          direction={direction}
          onPrev={prev}
          onNext={next}
          onDot={goToDot}
          stats={stats}
          showStats={showStats}
        />
      </div>

      {/* ────── Bottom Gradient Fade to Page BG color ────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#F5F2ED] via-[#F5F2ED]/30 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default ModernPaintsCarousel;
