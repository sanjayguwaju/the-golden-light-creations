"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { Particles, AnimatedGradientText } from "@/components/magicui";

interface Streak {
  id: number;
  left: number;
  height: number;
  duration: number;
  delay: number;
}

export interface StudioHeroProps {
  eyebrow?: string | null;
  headlinePart1?: string | null;
  headlinePart2?: string | null;
  subheadline?: string | null;
  video?: any;
  videoUrl?: string | null;
  poster?: any;
  posterUrl?: string | null;
  mobileVideo?: any;
  mobileVideoUrl?: string | null;
  mobilePoster?: any;
  mobilePosterUrl?: string | null;
}

function getVideoMimeType(url: string) {
  const lower = url.toLowerCase();
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

export function StudioHero({
  eyebrow,
  headlinePart1,
  headlinePart2,
  subheadline,
  video,
  videoUrl,
  poster,
  posterUrl,
  mobileVideo,
  mobileVideoUrl,
  mobilePoster,
  mobilePosterUrl,
}: StudioHeroProps = {}) {
  const displayEyebrow = eyebrow || "Nepal's Finest Creative Studio";
  const displayHeadline1 = headlinePart1 || "We Don't Just Shoot —";
  const displayHeadline2 = headlinePart2 || "We Create Emotions.";
  const displaySubheadline =
    subheadline ||
    "Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.";

  const [streaks, setStreaks] = useState<Streak[]>([]);

  // Resolve desktop video URL & poster
  const resolvedVideoUrl =
    typeof video === "object" && video?.url
      ? video.url
      : videoUrl || "/hero-video.mp4";

  const resolvedPosterUrl =
    typeof poster === "object" && poster?.url
      ? poster.url
      : posterUrl || "/hero-poster.jpg";

  // Resolve mobile video URL & poster (falls back to desktop if not set)
  const resolvedMobileVideoUrl =
    typeof mobileVideo === "object" && mobileVideo?.url
      ? mobileVideo.url
      : mobileVideoUrl || "";

  const resolvedMobilePosterUrl =
    typeof mobilePoster === "object" && mobilePoster?.url
      ? mobilePoster.url
      : mobilePosterUrl || resolvedPosterUrl;

  const hasSeparateMobileVideo = Boolean(
    resolvedMobileVideoUrl && resolvedMobileVideoUrl !== resolvedVideoUrl
  );

  useEffect(() => {
    const s: Streak[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: 70 + Math.random() * 120,
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
    setStreaks(s);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 px-4"
    >
      {/* Full Viewport Background Videos with Instant Poster Still */}
      {hasSeparateMobileVideo ? (
        <>
          {/* Mobile Video (portrait 9:16, active on < 768px) */}
          <video
            key={`mobile-${resolvedMobileVideoUrl}`}
            autoPlay
            loop
            muted
            playsInline
            poster={resolvedMobilePosterUrl}
            preload="auto"
            className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          >
            <source
              src={resolvedMobileVideoUrl}
              type={getVideoMimeType(resolvedMobileVideoUrl)}
            />
          </video>

          {/* Desktop Video (widescreen 16:9, active on >= 768px) */}
          <video
            key={`desktop-${resolvedVideoUrl}`}
            autoPlay
            loop
            muted
            playsInline
            poster={resolvedPosterUrl}
            preload="auto"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          >
            <source
              src={resolvedVideoUrl}
              type={getVideoMimeType(resolvedVideoUrl)}
            />
            {resolvedVideoUrl !== "/hero-video.mp4" && (
              <source src="/hero-video.mp4" type="video/mp4" />
            )}
          </video>
        </>
      ) : (
        /* Universal Video (when no separate mobile video is configured) */
        <video
          key={`universal-${resolvedVideoUrl}`}
          autoPlay
          loop
          muted
          playsInline
          poster={resolvedPosterUrl}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source
            src={resolvedVideoUrl}
            type={getVideoMimeType(resolvedVideoUrl)}
          />
          {resolvedVideoUrl !== "/hero-video.mp4" && (
            <source src="/hero-video.mp4" type="video/mp4" />
          )}
        </video>
      )}

      {/* Cinematic Dual-Tone Overlay for Luxury Tone & High Text Legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(192,23,30,0.72) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Radial Gold Lighting Accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 60%, rgba(255,208,74,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Magic UI Interactive Light Particles */}
      <Particles
        className="absolute inset-0 z-[2] pointer-events-none"
        quantity={65}
        ease={80}
        color="#FFFFFF"
        size={0.6}
        staticity={50}
      />

      {/* Falling Gold Streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        {streaks.map((streak) => (
          <div
            key={streak.id}
            className="absolute w-[1px] opacity-70"
            style={{
              left: `${streak.left}%`,
              height: `${streak.height}px`,
              background:
                "linear-gradient(180deg, transparent, rgba(255,208,74,0.6), transparent)",
              animation: `streakFall ${streak.duration}s linear ${streak.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Magic UI Shimmering Eyebrow Badge */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8 px-4 py-1.5 border border-white/30 bg-white/10 backdrop-blur-md rounded-full shadow-lg shadow-black/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD04A] animate-pulse" />
          <AnimatedGradientText
            colorFrom="#FFFFFF"
            colorTo="#FFD04A"
            className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase text-white"
          >
            {displayEyebrow}
          </AnimatedGradientText>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD04A] animate-pulse" />
        </div>

        {/* Master Headline */}
        <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.02em] leading-[0.95] sm:leading-[0.92] text-white uppercase mb-5 sm:mb-6">
          {displayHeadline1}{" "}
          {displayHeadline2 && (
            <em className="text-[#FFD04A] not-italic block mt-1 drop-shadow-[0_0_45px_rgba(255,208,74,0.35)]">
              {displayHeadline2}
            </em>
          )}
        </h1>

        {/* Subtitle */}
        {displaySubheadline && (
          <p className="font-poppins font-light text-xs sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed tracking-wide mb-8 sm:mb-10 px-2">
            {displaySubheadline}
          </p>
        )}

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none">
          <Link
            href="/portfolio"
            className="w-full sm:w-auto text-center group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#C0171E] font-montserrat font-bold text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-300 hover:bg-[#FFF5F5] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 shadow-2xl"
          >
            <span className="relative z-10">View Portfolio</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white text-white font-montserrat font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-[#C0171E] hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Your Shoot
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-white/70">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFD04A] via-[#FFD04A]/60 to-transparent animate-pulse" />
      </div>

      {/* Keyframe Styles for Streak Animations */}
      <style jsx>{`
        @keyframes streakFall {
          0% {
            transform: translateY(-120%);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
