"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { defaultStudioSettings } from "@/utilities/studioDefaults";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

function AnimatedStat({ end, suffix = "+", label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={elRef} className="flex flex-col">
      <div className="font-bebas text-4xl sm:text-6xl text-[#F5B301] tracking-tight leading-none">
        {count}
        {suffix}
      </div>
      <div className="w-full h-[1px] bg-[#F5B301]/25 my-3" />
      <div className="font-montserrat text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {label}
      </div>
    </div>
  );
}

interface StudioStoryProps {
  headline?: string;
  quote?: string;
  paragraph1?: string;
  paragraph2?: string;
  stats?: {
    projectsCount?: number;
    clientsCount?: number;
    socialReach?: string;
    yearsExperience?: number;
  };
  isHomepagePreview?: boolean;
}

export function StudioStory({
  headline = defaultStudioSettings.story.headline,
  quote = defaultStudioSettings.story.quote,
  paragraph1 = defaultStudioSettings.story.paragraph1,
  paragraph2 = defaultStudioSettings.story.paragraph2,
  stats = defaultStudioSettings.stats,
  isHomepagePreview = false,
}: StudioStoryProps) {
  return (
    <section id="about" className="bg-[#0A0A0A] py-24 sm:py-32 px-6 sm:px-8 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Image with Luxury Gold Accent Frame */}
          <div className="relative">
            {/* Background Accent Box */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#F5B301]/30 hidden sm:block pointer-events-none" />

            {/* Team / Story Image */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1000&q=85"
                alt="The Golden Light Creations Studio Team"
                className="w-full h-full object-cover brightness-90 contrast-105"
              />
            </div>

            {/* Floating Glassmorphic Badge */}
            <div className="absolute bottom-6 left-6 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#F5B301]/40 px-6 py-4 shadow-2xl">
              <span className="font-bebas text-3xl sm:text-4xl text-[#F5B301] block leading-none">
                {stats.yearsExperience}+
              </span>
              <p className="font-montserrat text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90 mt-1">
                Years of Cinematic Excellence
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Brand Narrative */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
                Our Story
              </span>
              <span className="w-10 h-[1px] bg-[#F5B301]/60" />
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-[0.95] mb-6">
              {headline}
            </h2>

            <blockquote className="font-bebas text-2xl sm:text-4xl text-[#F5B301] tracking-wide uppercase leading-tight mb-6 border-l-2 border-[#F5B301] pl-4 sm:pl-6">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <p className="font-poppins text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
              {paragraph1}
            </p>

            <p className="font-poppins text-sm sm:text-base text-white/70 font-light leading-relaxed mb-10">
              {paragraph2}
            </p>

            {/* 4 Animated Numerical Stats */}
            <div className="grid grid-cols-2 gap-8 sm:gap-10 mb-8">
              <AnimatedStat end={stats.projectsCount || 500} suffix="+" label="Projects Completed" />
              <AnimatedStat end={stats.clientsCount || 300} suffix="+" label="Happy Clients" />
              <AnimatedStat end={parseInt(stats.socialReach || "20") || 20} suffix="M+" label="Social Media Reach" />
              <AnimatedStat end={stats.yearsExperience || 5} suffix="+" label="Years Experience" />
            </div>

            {isHomepagePreview && (
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-[#F5B301] hover:text-[#FFD04A] transition-colors"
              >
                <span>Read Full Studio Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
