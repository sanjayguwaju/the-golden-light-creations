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

export function StudioHero() {
  const [streaks, setStreaks] = useState<Streak[]>([]);

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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4"
    >
      {/* Background Image with slow cinematic zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out animate-pulse"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.52) 40%, rgba(10,10,10,0.88) 100%), url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          animation: "heroPan 22s ease-in-out infinite alternate",
        }}
      />

      {/* Radial Gold Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 60%, rgba(245,179,1,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Magic UI Interactive Golden Light Particles */}
      <Particles
        className="absolute inset-0 z-[2] pointer-events-none"
        quantity={65}
        ease={80}
        color="#F5B301"
        size={0.6}
        staticity={40}
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
                "linear-gradient(180deg, transparent, rgba(245,179,1,0.7), transparent)",
              animation: `streakFall ${streak.duration}s linear ${streak.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Magic UI Shimmering Eyebrow Badge */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8 px-4 py-1.5 border border-[#F5B301]/25 bg-[#0A0A0A]/60 backdrop-blur-md rounded-full shadow-lg shadow-[#F5B301]/5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B301] animate-pulse" />
          <AnimatedGradientText
            colorFrom="#F5B301"
            colorTo="#FFD04A"
            className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase"
          >
            Nepal&apos;s Finest Creative Studio
          </AnimatedGradientText>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B301] animate-pulse" />
        </div>

        {/* Master Headline */}
        <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.02em] leading-[0.95] sm:leading-[0.92] text-white uppercase mb-5 sm:mb-6">
          We Don&apos;t Just Shoot —
          <em className="text-[#F5B301] not-italic block mt-1 drop-shadow-[0_0_45px_rgba(245,179,1,0.35)]">
            We Create Emotions.
          </em>
        </h1>

        {/* Subtitle */}
        <p className="font-poppins font-light text-xs sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed tracking-wide mb-8 sm:mb-10 px-2">
          Luxury Photography, Cinematic Films &amp; Digital Branding Services in Nepal. Crafting
          timeless visual stories since 2019.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none">
          <Link
            href="/portfolio"
            className="w-full sm:w-auto text-center group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-[#F5B301] text-[#0A0A0A] font-montserrat font-bold text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-300 hover:bg-[#FFD04A] hover:shadow-[0_0_25px_rgba(245,179,1,0.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="relative z-10">View Portfolio</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-8 sm:px-10 py-3.5 sm:py-4 border border-white/40 text-white font-montserrat font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:border-[#F5B301] hover:text-[#F5B301] hover:bg-[#F5B301]/5 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Your Shoot
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-white/50">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#F5B301] via-[#F5B301]/60 to-transparent animate-pulse" />
      </div>

      {/* Keyframe Styles for Streak & Particle Animations */}
      <style jsx>{`
        @keyframes heroPan {
          0% {
            transform: scale(1.06) translateX(-1.5%);
          }
          100% {
            transform: scale(1.06) translateX(1.5%);
          }
        }
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
