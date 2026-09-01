"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, ArrowRight, Palette } from "lucide-react";
import Link from "next/link";
import { Media } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface HeroCarouselSlide {
  id?: string | null;
  badgeText?: string | null;
  titlePrefix: string;
  titleHighlight?: string | null;
  subtitle?: string | null;
  primaryButtonText?: string | null;
  primaryButtonUrl?: string | null;
  secondaryButtonText?: string | null;
  secondaryButtonUrl?: string | null;
  image: string | Media;
  imageCaption?: string | null;
}

export interface HeroSectionProps {
  slides?: HeroCarouselSlide[] | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const validSlides = slides || [];
  const totalSlides = validSlides.length;

  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<gsap.core.Tween | null>(null);

  // Use state refs to prevent stale closures inside GSAP context
  const currentRef = useRef(current);
  currentRef.current = current;

  const goToSlide = useCallback((nextIndex: number, newDirection: number = 1) => {
    setDirection(newDirection);
    setCurrent(nextIndex);
  }, []);

  const next = useCallback(() => {
    goToSlide((currentRef.current + 1) % totalSlides, 1);
  }, [totalSlides, goToSlide]);

  const prev = useCallback(() => {
    goToSlide((currentRef.current - 1 + totalSlides) % totalSlides, -1);
  }, [totalSlides, goToSlide]);

  // Autoplay Logic with gsap.delayedCall (handles tab switching gracefully)
  const resetAutoPlay = useCallback(() => {
    if (timerRef.current) timerRef.current.kill();
    if (totalSlides > 1) {
      timerRef.current = gsap.delayedCall(5, next);
    }
  }, [next, totalSlides]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (timerRef.current) timerRef.current.kill();
    };
  }, [current, resetAutoPlay]); // Re-trigger delay on slide change

  // Provide the sectionRef for GSAP Scope Safety (cleans up refs automatically)
  useGSAP({ scope: sectionRef });

  const prevRef = useRef(-1);

  // Main Continuous Animations (Only runs once)
  useGSAP(() => {
    if (totalSlides === 0) return;

    // Ken Burns Effect (Native GSAP instead of CSS keyframes)
    gsap.fromTo(
      ".gsap-image",
      { scale: 1 },
      { scale: 1.15, duration: 18, repeat: -1, yoyo: true, ease: "none" }
    );

    // Continuous Floating Particles
    const particles = gsap.utils.toArray(".gsap-particle");
    particles.forEach((particle: any) => {
      gsap.to(particle, {
        y: `+=${gsap.utils.random(-40, 40)}`,
        x: `+=${gsap.utils.random(-40, 40)}`,
        rotation: gsap.utils.random(-45, 45),
        duration: gsap.utils.random(4, 8),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // Highly optimized Mouse Parallax using quickTo (prevents garbage collection lag)
    const moveDot1X = gsap.quickTo(".gsap-dot1", "x", { duration: 0.5, ease: "power2.out" });
    const moveDot1Y = gsap.quickTo(".gsap-dot1", "y", { duration: 0.5, ease: "power2.out" });

    const moveDot2X = gsap.quickTo(".gsap-dot2", "x", { duration: 0.5, ease: "power2.out" });
    const moveDot2Y = gsap.quickTo(".gsap-dot2", "y", { duration: 0.5, ease: "power2.out" });

    const moveImageX = gsap.quickTo(".gsap-image-zoom", "x", { duration: 0.5, ease: "power2.out" });
    const moveImageY = gsap.quickTo(".gsap-image-zoom", "y", { duration: 0.5, ease: "power2.out" });

    const moveParticlesX = gsap.quickTo(".gsap-particles", "x", {
      duration: 1,
      ease: "power2.out",
    });
    const moveParticlesY = gsap.quickTo(".gsap-particles", "y", {
      duration: 1,
      ease: "power2.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      moveDot1X(x * 1.5);
      moveDot1Y(y * 1.5);
      moveDot2X(-x * 2);
      moveDot2Y(-y * 2);
      moveImageX(x * -1.2);
      moveImageY(y * -1.2);
      moveParticlesX(x * 2.5);
      moveParticlesY(y * 2.5);
    };

    const section = sectionRef.current;
    if (section) section.addEventListener("mousemove", onMouseMove);

    return () => {
      if (section) section.removeEventListener("mousemove", onMouseMove);
    };
  }, [totalSlides]);

  // Slide Transitions (Runs on slide change)
  useGSAP(() => {
    if (prevRef.current === current || totalSlides === 0) return;
    const xIn = direction > 0 ? 80 : -80;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Reset initial states dynamically based on direction
    gsap.set(".gsap-image-container", { x: xIn, opacity: 0 });
    gsap.set(".gsap-badge", { y: 20, opacity: 0, scale: 0.8 });
    gsap.set(".gsap-title", { y: 20, opacity: 0 });
    gsap.set(".gsap-subtitle", { y: 20, opacity: 0 });
    gsap.set(".gsap-btn", { y: 20, opacity: 0 });

    // Choreograph the entrance
    tl.to(".gsap-image-container", { x: 0, opacity: 1, duration: 0.8 }, 0)
      .to(".gsap-badge", { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.1)
      .to(".gsap-title", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
      .to(".gsap-subtitle", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3)
      .to(".gsap-btn", { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.4);

    prevRef.current = current;
  }, [current, direction, totalSlides]);

  // Handle empty state gracefully
  if (totalSlides === 0) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-[#FDFCF7]">
        <p className="text-[#8E8E93]">No slides found</p>
      </div>
    );
  }

  const currentSlide = validSlides[current];

  const imageUrl = getMediaUrl(currentSlide.image);

  const subtitleText =
    currentSlide.subtitle ||
    (currentSlide as any).description ||
    (currentSlide as any).tagline ||
    "Premium Quality Paint";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-svh flex items-center bg-[#FDFCF7] overflow-hidden font-sans"
    >
      {/* Floating Particles Layer */}
      <div className="gsap-particles absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <div className="gsap-particle absolute top-[15%] left-[25%] w-4 h-4 rounded-full bg-[#C6A868] opacity-30 blur-[1px]" />
        <div className="gsap-particle absolute top-[65%] left-[10%] w-6 h-6 rounded-full bg-[#E54D4D] opacity-20 blur-[2px]" />
        <div className="gsap-particle absolute top-[35%] right-[20%] w-8 h-8 rounded-full bg-[#161B33] opacity-[0.05] blur-[3px]" />
        <div className="gsap-particle absolute top-[85%] right-[35%] w-3 h-3 rounded-full bg-[#C6A868] opacity-40 blur-[1px]" />
        <div className="gsap-particle absolute top-[45%] left-[55%] w-12 h-12 rounded-full bg-[#E6D5B8] opacity-30 blur-xs" />
        <div className="gsap-particle absolute top-[20%] right-[10%] w-5 h-5 rounded-full bg-[#161B33] opacity-[0.08] blur-[2px]" />
      </div>

      {/* Decorative Dots for Parallax */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-full bg-slate-200/50 hidden lg:block z-0" />
      <div className="gsap-dot1 absolute left-1/2 top-[45%] -translate-x-1/2 w-3 h-3 rounded-full bg-[#C6A868] hidden lg:block z-0" />
      <div className="gsap-dot2 absolute right-[15%] bottom-[25%] w-3.5 h-3.5 rounded-full bg-[#E54D4D] opacity-80 z-0 hidden lg:block" />

      {/* Container */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-8 lg:py-24 flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100svh-80px)] lg:min-h-screen">
        {/* Left Column (Content) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center pr-0 lg:pr-12 relative z-10 order-last lg:order-first mt-6 lg:mt-0">
          <div className="gsap-badge mb-4 lg:mb-6 opacity-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EEDC] border border-[#E6D5B8]">
              <span className="w-5 h-5 rounded-full bg-[#EADDBC] flex items-center justify-center">
                <Palette size={12} className="text-[#967C46]" />
              </span>
              <span className="text-xs font-semibold text-[#5A4F3F]">
                {currentSlide.badgeText || (currentSlide as any).badge || "Premium Collection"}
              </span>
            </div>
          </div>

          <div>
            <h1 className="gsap-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-[#161B33] mb-4 lg:mb-6 opacity-0">
              {(() => {
                const rawTitle =
                  currentSlide.titlePrefix ||
                  (currentSlide as any).title ||
                  (currentSlide as any).name ||
                  "SuperClean Matt";
                const titleText = typeof rawTitle === "string" ? rawTitle.trim() : String(rawTitle);
                
                const words = titleText.split(/\s+/);
                const hasHighlight = !!currentSlide.titleHighlight;

                // 1. If no custom highlight exists, make the last word of the title gold automatically
                if (!hasHighlight && words.length > 1) {
                  const lastWord = words.pop();
                  return (
                    <>
                      {words.join(" ")}{" "}
                      <span className="text-[#C6A868] font-medium">{lastWord}</span>
                    </>
                  );
                }

                // 2. If a custom highlight exists and title > 2 words, break the last word of the prefix
                if (hasHighlight && words.length > 2) {
                  const lastWord = words.pop();
                  return (
                    <>
                      {words.join(" ")}
                      <br />
                      {lastWord}
                    </>
                  );
                }

                return titleText;
              })()}
              {currentSlide.titleHighlight && (
                <>
                  <br />
                  <span className="text-[#C6A868] font-medium">{currentSlide.titleHighlight}</span>
                </>
              )}
            </h1>

            <p className="gsap-subtitle text-base sm:text-lg lg:text-xl text-[#8E8E93] mb-6 lg:mb-10 max-w-md mx-auto lg:mx-0 min-h-12 opacity-0">
              {subtitleText}
            </p>

            <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start items-center">
              {(currentSlide.primaryButtonText || "Explore Range") && (
                <Link
                  href={(currentSlide as any).primaryButtonUrl || "#"}
                  className="gsap-btn group relative inline-flex items-center gap-2 bg-[#161B33] text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full text-xs lg:text-sm font-semibold transition-all hover:bg-[#1f2647] overflow-hidden opacity-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {currentSlide.primaryButtonText || "Explore Range"}{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              )}
              {(currentSlide.secondaryButtonText || "View Palette") && (
                <Link
                  href={(currentSlide as any).secondaryButtonUrl || "#"}
                  className="gsap-btn inline-flex items-center gap-2 bg-transparent border border-[#E0E0E0] text-[#161B33] px-6 py-3 lg:px-8 lg:py-4 rounded-full text-xs lg:text-sm font-semibold transition-all hover:border-[#161B33] opacity-0"
                >
                  {currentSlide.secondaryButtonText || "View Palette"}
                </Link>
              )}
            </div>
          </div>

          {/* Navigation */}
          {totalSlides > 1 && (
            <div className="flex items-center gap-4 lg:gap-6 mt-10 lg:mt-24 justify-center lg:justify-start w-full">
              <button
                onClick={prev}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#161B33] hover:border-[#161B33] hover:bg-slate-50 transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {validSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx, idx > current ? 1 : -1)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      idx === current ? "w-6 lg:w-8 bg-[#161B33]" : "w-2 bg-[#D1D1D6]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#161B33] hover:border-[#161B33] hover:bg-slate-50 transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column (Image) */}
        <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center z-10 order-first lg:order-last pt-4 lg:pt-0">
          <div className="gsap-image-container relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-md xl:max-w-lg flex justify-center opacity-0">
            {/* Soft radial shadow behind the bucket */}
            <div className="absolute inset-0 bg-black/10 blur-[40px] lg:blur-[60px] rounded-full scale-75 translate-y-8 lg:translate-y-12 z-0" />

            {imageUrl && (
              <div className="gsap-image-zoom relative z-10 w-full flex justify-center">
                <img
                  src={imageUrl}
                  alt={currentSlide.titlePrefix || (currentSlide as any).title || "Hero Image"}
                  className="gsap-image w-full max-h-[30vh] sm:max-h-[40vh] lg:max-h-[70vh] object-contain drop-shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
