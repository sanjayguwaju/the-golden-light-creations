"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Media } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface HeroBannerVideoSlideItem {
  id?: string | null;
  video?: string | Media | null;
  videoUrl?: string | null;
  mobileVideo?: string | Media | null;
  mobileVideoUrl?: string | null;
  posterImage?: string | Media | null;
  mobilePosterImage?: string | Media | null;
  title?: string | null;
  subtitle?: string | null;
  link?: string | null;
  buttonText?: string | null;
  buttonStyle?: "gold" | "navy" | "white" | null;
  openInNewTab?: boolean | null;
  muted?: boolean | null;
  loop?: boolean | null;
}

export interface HeroBannerVideoSliderProps {
  slides?: HeroBannerVideoSlideItem[] | null;
  autoplay?: boolean | null;
  autoplaySpeed?: number | null;
  advanceOnVideoEnd?: boolean | null;
  showArrows?: boolean | null;
  showDots?: boolean | null;
  showProgressBar?: boolean | null;
  showSoundBadge?: boolean | null;
  showControls?: boolean | null;
  aspectRatio?: "auto" | "16/9" | "21/9" | "fullscreen" | null;
  disableInnerContainer?: boolean;
}

export const HeroBannerVideoSliderBlock: React.FC<HeroBannerVideoSliderProps> = (props) => {
  const {
    slides = [],
    autoplay = true,
    autoplaySpeed = 8,
    advanceOnVideoEnd = true,
    showArrows = true,
    showDots = true,
    showProgressBar = true,
    showSoundBadge = true,
    showControls = true,
    aspectRatio = "fullscreen",
  } = props;

  const validSlides: HeroBannerVideoSlideItem[] = slides && slides.length > 0 ? slides : [];
  const totalSlides = validSlides.length;

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const progressAnimRef = useRef<number | null>(null);
  const progressStartTimeRef = useRef<number>(0);

  // Touch / Drag Gesture tracking
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  // Helper to play all video elements in a specific slide
  const playSlideVideos = useCallback(
    (slideIndex: number) => {
      if (!isPlaying || !isInView) return;
      const slideEl = slidesRef.current[slideIndex];
      if (!slideEl) return;
      const videos = slideEl.querySelectorAll<HTMLVideoElement>("video");
      videos.forEach((vid) => {
        vid.muted = isMuted;
        vid.defaultMuted = true;
        vid.playsInline = true;
        vid.setAttribute("muted", "");
        vid.setAttribute("playsinline", "");
        vid.setAttribute("webkit-playsinline", "true");
        vid.setAttribute("x5-playsinline", "true");

        if (vid.readyState === 0) {
          vid.load();
        }

        const p = vid.play();
        if (p !== undefined) {
          p.catch(() => {
            // Autoplay policy or low power mode
          });
        }
      });
    },
    [isPlaying, isMuted, isInView]
  );

  // Helper to pause all video elements in a specific slide
  const pauseSlideVideos = useCallback((slideIndex: number) => {
    const slideEl = slidesRef.current[slideIndex];
    if (!slideEl) return;
    const videos = slideEl.querySelectorAll<HTMLVideoElement>("video");
    videos.forEach((vid) => {
      try {
        vid.pause();
      } catch {
        // ignore
      }
    });
  }, []);

  // Animate captions using GSAP staggered reveal
  const animateCaptions = useCallback((slideIndex: number) => {
    const slideEl = slidesRef.current[slideIndex];
    if (!slideEl) return;
    const items = slideEl.querySelectorAll(".slide-caption-item");
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  }, []);

  // Performance Bundle: IntersectionObserver to pause when off-screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          pauseSlideVideos(current);
        } else if (isPlaying) {
          playSlideVideos(current);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [current, isPlaying, pauseSlideVideos, playSlideVideos]);

  // Initial playback and caption animation
  useEffect(() => {
    if (isInView && isPlaying) {
      playSlideVideos(current);
      animateCaptions(current);
    }
  }, [current, isInView, isPlaying, playSlideVideos, animateCaptions]);

  // Real mobile phone touch unlock listener (bypasses Low Power Mode restriction on first interaction)
  useEffect(() => {
    const unlockAutoplay = () => {
      playSlideVideos(current);
    };

    window.addEventListener("touchstart", unlockAutoplay, { passive: true, once: true });
    window.addEventListener("touchend", unlockAutoplay, { passive: true, once: true });
    window.addEventListener("click", unlockAutoplay, { passive: true, once: true });

    return () => {
      window.removeEventListener("touchstart", unlockAutoplay);
      window.removeEventListener("touchend", unlockAutoplay);
      window.removeEventListener("click", unlockAutoplay);
    };
  }, [current, playSlideVideos]);

  // Page visibility listener (tab switch or screen lock)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isPlaying && isInView) {
        playSlideVideos(current);
      } else {
        pauseSlideVideos(current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [current, isPlaying, isInView, playSlideVideos, pauseSlideVideos]);

  // Slide transition function (Cinematic Cross-Fade & Scale)
  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (isAnimatingRef.current || totalSlides <= 1 || targetIndex === current) return;

      const currentSlideEl = slidesRef.current[current];
      const nextSlideEl = slidesRef.current[targetIndex];

      if (!currentSlideEl || !nextSlideEl) {
        setCurrent(targetIndex);
        return;
      }

      isAnimatingRef.current = true;
      setSlideProgress(0);
      progressStartTimeRef.current = Date.now();

      // Setup incoming slide (Cinematic Cross-Fade)
      gsap.set(nextSlideEl, {
        opacity: 0,
        scale: 1.04,
        zIndex: 2,
        visibility: "visible",
      });

      // Outgoing slide fade
      gsap.to(currentSlideEl, {
        opacity: 0,
        scale: 0.98,
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(currentSlideEl, { visibility: "hidden", zIndex: 1, scale: 1 });
          pauseSlideVideos(current);
        },
      });

      // Incoming slide reveal
      gsap.to(nextSlideEl, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrent(targetIndex);
          isAnimatingRef.current = false;
          playSlideVideos(targetIndex);
          animateCaptions(targetIndex);
        },
      });
    },
    [current, totalSlides, playSlideVideos, pauseSlideVideos, animateCaptions]
  );

  const nextSlide = useCallback(() => {
    const target = (current + 1) % totalSlides;
    goToSlide(target);
  }, [current, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const target = (current - 1 + totalSlides) % totalSlides;
    goToSlide(target);
  }, [current, totalSlides, goToSlide]);

  // Autoplay & Progress Bar Controller
  useEffect(() => {
    if (!autoplay || totalSlides <= 1 || isHovered || !isPlaying || !isInView) {
      if (progressAnimRef.current) {
        cancelAnimationFrame(progressAnimRef.current);
      }
      return;
    }

    const durationMs = (autoplaySpeed ?? 8) * 1000;
    progressStartTimeRef.current = Date.now();

    const updateProgress = () => {
      const activeSlideEl = slidesRef.current[current];
      const activeVideo = activeSlideEl?.querySelector<HTMLVideoElement>("video");

      if (activeVideo && activeVideo.duration && !isNaN(activeVideo.duration) && activeVideo.duration > 0) {
        const pct = (activeVideo.currentTime / activeVideo.duration) * 100;
        setSlideProgress(Math.min(pct, 100));
      } else {
        const elapsed = Date.now() - progressStartTimeRef.current;
        const pct = (elapsed / durationMs) * 100;
        setSlideProgress(Math.min(pct, 100));
        if (pct >= 100) {
          nextSlide();
          return;
        }
      }

      progressAnimRef.current = requestAnimationFrame(updateProgress);
    };

    progressAnimRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressAnimRef.current) {
        cancelAnimationFrame(progressAnimRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, current, totalSlides, isHovered, isPlaying, isInView, nextSlide]);

  // Video Ended event
  const handleVideoEnded = () => {
    if (advanceOnVideoEnd && totalSlides > 1 && isPlaying) {
      nextSlide();
    }
  };

  // Toggle Mute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (containerRef.current) {
      const allVideos = containerRef.current.querySelectorAll<HTMLVideoElement>("video");
      allVideos.forEach((vid) => {
        vid.muted = newMuted;
      });
    }
  };

  // Toggle Play / Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      setIsPlaying(false);
      pauseSlideVideos(current);
    } else {
      setIsPlaying(true);
      playSlideVideos(current);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current || !isInView) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isInView]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diffX = touchStartX.current - touchCurrentX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Sizing styles
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case "fullscreen":
        return "h-[75vh] sm:h-[82vh] lg:h-[90vh] xl:h-screen min-h-[500px] max-h-[1080px]";
      case "16/9":
        return "aspect-16/9 w-full max-h-[85vh]";
      case "21/9":
        return "aspect-21/9 w-full max-h-[80vh]";
      case "auto":
      default:
        return "min-h-[400px] sm:min-h-[520px] lg:min-h-[660px] xl:min-h-[780px]";
    }
  };

  if (totalSlides === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      aria-label="Hero Video Banner Carousel"
      className={`relative w-full overflow-hidden bg-slate-950 select-none ${getAspectRatioClasses()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        // Fallback user interaction to initiate playback if browser blocked autoplay
        playSlideVideos(current);
      }}
    >
      {/* Slides Container */}
      <div ref={trackRef} className="relative w-full h-full">
        {validSlides.map((slide, idx) => {
          const isCurrent = idx === current;
          const isNext = idx === (current + 1) % totalSlides;
          const preloadStrategy = isCurrent || isNext ? "auto" : "none";

          const desktopVideoSrc = getMediaUrl(slide.video) || slide.videoUrl || "";
          const mobileVideoSrc = getMediaUrl(slide.mobileVideo) || slide.mobileVideoUrl || "";

          const desktopPosterSrc = getMediaUrl(slide.posterImage) || "";
          const mobilePosterSrc = getMediaUrl(slide.mobilePosterImage) || "";
          const activePosterSrc = (isMobile && mobilePosterSrc) ? mobilePosterSrc : desktopPosterSrc;

          const activeVideoSrc = (isMobile && mobileVideoSrc) ? mobileVideoSrc : desktopVideoSrc || mobileVideoSrc;
          const hasAnyVideo = Boolean(activeVideoSrc);

          // Button styling helper
          const buttonStyle = slide.buttonStyle || "gold";
          const buttonClass =
            buttonStyle === "gold"
              ? "bg-reliance-gold hover:bg-white text-reliance-navy border border-reliance-gold shadow-[3px_3px_0_0_#0D1B3E]"
              : buttonStyle === "navy"
              ? "bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy border border-white/20 shadow-[3px_3px_0_0_#C59B27]"
              : "bg-white/90 hover:bg-white text-reliance-navy border border-white/30 backdrop-blur-md shadow-md";

          const slideContent = (
            <div className="relative w-full h-full">
              {hasAnyVideo ? (
                /* Single Responsive Video Element (Single Hardware Decoder Allocation for Mobile) */
                <video
                  ref={(el) => {
                    if (el) {
                      el.setAttribute("muted", "");
                      el.setAttribute("playsinline", "");
                      el.setAttribute("webkit-playsinline", "true");
                      el.setAttribute("x5-playsinline", "true");
                      el.muted = isMuted;
                      el.defaultMuted = true;
                      el.playsInline = true;
                      if (isCurrent && isPlaying && isInView) {
                        el.play().catch(() => {});
                      }
                    }
                  }}
                  poster={activePosterSrc}
                  autoPlay={isCurrent}
                  muted={isMuted}
                  playsInline
                  preload={preloadStrategy}
                  loop={slide.loop !== false && !advanceOnVideoEnd}
                  onEnded={handleVideoEnded}
                  onLoadedData={(e) => {
                    if (isCurrent && isPlaying && isInView) {
                      e.currentTarget.play().catch(() => {});
                    }
                  }}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  src={activeVideoSrc}
                />
              ) : activePosterSrc ? (
                /* Image Fallback */
                <div className="relative w-full h-full">
                  <Image
                    src={activePosterSrc}
                    alt={slide.title || "Reliance Paints Video Banner"}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-wider">
                    Reliance Paints
                  </span>
                </div>
              )}

              {/* Gradient Overlay & Captions */}
              {(slide.title || slide.subtitle || slide.buttonText) && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-12 lg:p-20 z-10">
                  <div className="max-w-4xl space-y-3 sm:space-y-4">
                    {/* Subtitle */}
                    {slide.subtitle && (
                      <div className="slide-caption-item">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-reliance-gold/20 backdrop-blur-md border border-reliance-gold/40 text-reliance-gold text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3 text-reliance-gold" />
                          {slide.subtitle}
                        </span>
                      </div>
                    )}

                    {/* Main Title */}
                    {slide.title && (
                      <div className="slide-caption-item">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-[1.1] drop-shadow-md">
                          {slide.title}
                        </h2>
                      </div>
                    )}

                    {/* Slide Call to Action Button */}
                    {slide.link && slide.buttonText && (
                      <div className="slide-caption-item pt-2 sm:pt-4">
                        <Link
                          href={slide.link}
                          target={slide.openInNewTab ? "_blank" : undefined}
                          rel={slide.openInNewTab ? "noopener noreferrer" : undefined}
                          className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${buttonClass}`}
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );

          return (
            <div
              key={slide.id || idx}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                visibility: isCurrent ? "visible" : "hidden",
                zIndex: isCurrent ? 2 : 1,
                opacity: isCurrent ? 1 : 0,
              }}
            >
              {slide.link && !slide.buttonText ? (
                <Link
                  href={slide.link}
                  target={slide.openInNewTab ? "_blank" : undefined}
                  rel={slide.openInNewTab ? "noopener noreferrer" : undefined}
                  className="block w-full h-full cursor-pointer"
                >
                  {slideContent}
                </Link>
              ) : (
                slideContent
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Video Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Video Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer active:scale-95"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Video Control Buttons (Top Right: Play/Pause + Sound) */}
      {showControls && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md cursor-pointer"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={(e) => toggleMute(e)}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}

      {/* Interactive UI Bundle: Floating 'Tap for Sound' Unmute Badge */}
      {showSoundBadge && isMuted && (
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30">
          <button
            type="button"
            onClick={(e) => toggleMute(e)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide shadow-lg transition-all animate-pulse hover:animate-none hover:scale-105 cursor-pointer"
            aria-label="Tap to enable sound"
          >
            <VolumeX className="w-3.5 h-3.5 text-reliance-gold" />
            <span>Tap for Sound</span>
          </button>
        </div>
      )}

      {/* Interactive UI Bundle: Dynamic Segmented Progress Timeline */}
      {showProgressBar && totalSlides > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-xl flex items-center gap-2">
          {validSlides.map((_, pIdx) => {
            const isSegmentActive = pIdx === current;
            const isCompleted = pIdx < current;
            const fillWidth = isSegmentActive ? `${slideProgress}%` : isCompleted ? "100%" : "0%";

            return (
              <button
                key={pIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(pIdx);
                }}
                aria-label={`Jump to video slide ${pIdx + 1}`}
                className="flex-1 h-1.5 bg-white/25 hover:bg-white/40 rounded-full overflow-hidden transition-colors cursor-pointer relative"
              >
                <div
                  className="h-full bg-reliance-gold transition-[width] duration-150 ease-linear rounded-full"
                  style={{ width: fillWidth }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fallback Pagination Dots (if progress bar disabled) */}
      {!showProgressBar && showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {validSlides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(dotIdx);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === current ? "w-6 bg-reliance-gold" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
