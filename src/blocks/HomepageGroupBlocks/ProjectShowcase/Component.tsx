"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  ArrowRight,
  Palette,
  Calculator,
  ExternalLink,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectShowcaseBlock, Media } from "@/payload-types";
import { cn } from "@/utilities/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const fallbackProjectImages: Record<string, string> = {
  interior:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
  exterior:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  commercial:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
};

export const ProjectShowcaseComponent: React.FC<ProjectShowcaseBlock> = (props) => {
  const {
    isEnabled = true,
    title = "Inspiration Gallery",
    subtitle = "Living Spaces & Architecture",
    projects,
  } = props;

  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  // Handle card click with drag distance threshold so mobile swiping doesn't trigger modal
  const handleCardClick = useCallback(
    (project: any, imageUrl: string, e: React.MouseEvent) => {
      const deltaX = Math.abs(e.clientX - pointerStartRef.current.x);
      const deltaY = Math.abs(e.clientY - pointerStartRef.current.y);
      if (deltaX > 8 || deltaY > 8) return;
      setSelectedProject({ ...project, imageUrl });
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProject, closeModal]);

  // Safe body scroll lock with cleanup
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [selectedProject]);

  // Section entrance animations
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      if (headerRef.current && controlsRef.current && carouselRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
          .fromTo(
            controlsRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            carouselRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );
      }
    },
    { scope: sectionRef }
  );

  if (isEnabled === false || !projects || projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-28 bg-[#FAF8F5] text-reliance-navy selection:bg-reliance-gold selection:text-reliance-navy border-y border-reliance-navy/10 overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-5">
          <div ref={headerRef} className="max-w-2xl space-y-2.5 sm:space-y-3">
            {subtitle && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-reliance-gold/15 border border-reliance-gold/30 text-reliance-navy text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-reliance-gold" />
                {subtitle}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
              {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-reliance-navy/70 leading-relaxed font-sans max-w-xl">
              Explore real-world architecture, modern residences, and commercial developments coated with Reliance Paints.
            </p>
          </div>

          {/* Desktop Navigation Controls */}
          <div ref={controlsRef} className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-auto">
            <Link
              href="/inspiration"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-reliance-navy border border-reliance-navy/20 hover:bg-reliance-navy hover:text-white transition-all mr-2"
            >
              Full Gallery
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-reliance-navy/20 bg-white flex items-center justify-center text-reliance-navy hover:bg-reliance-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-reliance-navy/20 bg-white flex items-center justify-center text-reliance-navy hover:bg-reliance-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="embla w-full">
          <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
            <div className="embla__container flex gap-4 sm:gap-6 lg:gap-8 -ml-0 select-none">
              {projects.map((project, index) => {
                const image = project.image as Media | undefined;
                const cat = (project.category || "interior").toLowerCase();
                const imageUrl =
                  (image && typeof image === "object" && image.url) ||
                  fallbackProjectImages[cat] ||
                  fallbackProjectImages.interior;

                const categoryColors: Record<string, string> = {
                  interior: "bg-blue-600 text-white",
                  exterior: "bg-emerald-600 text-white",
                  commercial: "bg-purple-600 text-white",
                };

                const catStyle = categoryColors[cat] || "bg-reliance-navy text-white";

                return (
                  <div
                    key={project.id || index}
                    className="embla__slide flex-[0_0_88%] sm:flex-[0_0_70%] md:flex-[0_0_48%] lg:flex-[0_0_31%] shrink-0 min-w-0"
                  >
                    <div
                      onPointerDown={handlePointerDown}
                      onClick={(e) => handleCardClick(project, imageUrl, e)}
                      className="group bg-white border border-reliance-navy/15 shadow-[4px_4px_0_0_#0D1B3E] hover:border-reliance-navy hover:shadow-[6px_6px_0_0_#C59B27] transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer active:scale-[0.99]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedProject({ ...project, imageUrl });
                        }
                      }}
                      aria-label={`View details for ${project.title}`}
                    >
                      {/* Image Area */}
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
                        <Image
                          src={imageUrl}
                          alt={(image && typeof image === "object" && image.alt) || project.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={cn(
                              "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none shadow-sm",
                              catStyle
                            )}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Quick View Button */}
                        <div className="absolute top-3 right-3 bg-reliance-navy/80 backdrop-blur-xs text-white p-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs">
                          <Eye className="w-3.5 h-3.5 text-reliance-gold" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex flex-col grow justify-between bg-white space-y-3">
                        <div className="space-y-1.5">
                          <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-reliance-navy group-hover:text-reliance-gold transition-colors truncate">
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="text-reliance-navy/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          )}
                        </div>

                        {/* Footer Action */}
                        <div className="pt-2 flex items-center justify-between border-t border-reliance-navy/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-reliance-navy group-hover:text-reliance-gold transition-colors">
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-reliance-gold" />
                            View Space Details
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Slide Dots / Navigation Indicator */}
        <div className="flex sm:hidden items-center justify-between pt-6">
          <div className="flex items-center gap-1.5">
            {scrollSnaps.map((_, snapIndex) => (
              <button
                key={snapIndex}
                onClick={() => scrollTo(snapIndex)}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full cursor-pointer",
                  selectedIndex === snapIndex
                    ? "w-6 bg-reliance-gold"
                    : "w-2 bg-reliance-navy/20"
                )}
                aria-label={`Go to slide ${snapIndex + 1}`}
              />
            ))}
          </div>

          <Link
            href="/inspiration"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-reliance-navy"
          >
            All Spaces
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal (Portal Mounted directly on document.body for flawless mobile support) */}
      {mounted &&
        selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xs overscroll-contain animate-in fade-in duration-200"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#FAF8F5] border-2 border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] overflow-hidden animate-in zoom-in-95 duration-200 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Top Right (Prominent & Mobile Reachable) */}
              <button
                className="absolute top-3 right-3 z-30 p-2 sm:p-2.5 bg-reliance-navy/90 hover:bg-reliance-gold text-white hover:text-reliance-navy transition-colors shadow-md rounded-none flex items-center justify-center cursor-pointer active:scale-95"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Area */}
              <div className="relative w-full md:w-7/12 h-52 sm:h-72 md:h-auto min-h-0 bg-slate-900 overflow-hidden shrink-0">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Modal Details Scrollable Panel */}
              <div className="w-full md:w-5/12 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-white space-y-5 overflow-y-auto overscroll-contain max-h-[calc(90vh-13rem)] sm:max-h-[calc(90vh-18rem)] md:max-h-none">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider inline-block",
                        selectedProject.category === "interior"
                          ? "bg-blue-600 text-white"
                          : selectedProject.category === "exterior"
                          ? "bg-emerald-600 text-white"
                          : "bg-purple-600 text-white"
                      )}
                    >
                      {selectedProject.category} Showcase
                    </span>
                  </div>

                  <h3
                    id="project-modal-title"
                    className="text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight text-reliance-navy leading-tight"
                  >
                    {selectedProject.title}
                  </h3>

                  {selectedProject.description && (
                    <p className="text-xs sm:text-sm text-reliance-navy/70 leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  )}

                  {/* Coating Spec Box */}
                  {(selectedProject.recommendedProduct || selectedProject.recommendedColor) && (
                    <div className="bg-[#FAF8F5] border border-reliance-navy/15 p-4 space-y-3">
                      {selectedProject.recommendedColor && typeof selectedProject.recommendedColor === 'object' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-reliance-navy/60">
                              Primary Shade
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 border border-reliance-navy/20 shadow-inner shrink-0"
                              style={{ backgroundColor: selectedProject.recommendedColor.hexCode }}
                            />
                            <div>
                              <p className="text-sm font-bold text-reliance-navy">
                                {selectedProject.recommendedColor.name}
                              </p>
                              <p className="text-[10px] font-mono text-reliance-navy/70 uppercase">
                                {selectedProject.recommendedColor.hexCode}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedProject.recommendedColor && selectedProject.recommendedProduct && (
                        <div className="h-px bg-reliance-navy/10 w-full my-2" />
                      )}

                      {selectedProject.recommendedProduct && typeof selectedProject.recommendedProduct === 'object' && (
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-reliance-navy/60 mb-1">
                            <Sparkles className="w-3 h-3 text-reliance-gold" />
                            Recommended Paint
                          </div>
                          <Link 
                            href={`/products/${selectedProject.recommendedProduct.slug}`}
                            className="text-xs font-bold text-reliance-navy hover:text-reliance-gold transition-colors block"
                          >
                            {selectedProject.recommendedProduct.title}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/visualiser?color=${encodeURIComponent(selectedProject.title)}`}
                    onClick={closeModal}
                    className="inline-flex items-center justify-center gap-2 bg-reliance-gold hover:bg-reliance-gold/90 text-reliance-navy px-4 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-widest transition-all shadow-xs active:scale-[0.99]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Try in 3D Visualizer
                  </Link>

                  <Link
                    href="/calculator"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-reliance-navy hover:text-white border border-reliance-navy/20 text-reliance-navy px-4 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.99]"
                  >
                    <Calculator className="w-4 h-4" />
                    Estimate Paint Cost
                  </Link>

                  {selectedProject.link && (
                    <Link
                      href={selectedProject.link}
                      onClick={closeModal}
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-reliance-navy/70 hover:text-reliance-navy py-1 transition-colors"
                    >
                      <span>Explore Project Story</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

