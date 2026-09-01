"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, HardHat, PaintRoller, TrendingUp, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { ContractorsProgramBlock } from "@/payload-types";

const iconMap: Record<string, React.FC<any>> = {
  PaintRoller,
  TrendingUp,
  Trophy,
  Users,
};

type Props = {
  data: ContractorsProgramBlock["hero"];
};

export const ContractorsHero = ({ data }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title .char",
          {
            y: 100,
            opacity: 0,
            stagger: 0.02,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-stat",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          },
          "-=0.6"
        );
    },
    { scope: container }
  );

  const titleChars = (data?.title || "Partner With The Best").split("");

  return (
    <section
      ref={container}
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-brand-primary text-brand-surface pt-32 pb-20 px-4 md:px-8 lg:px-16"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-[80%] translate-x-1/3"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 flex flex-col items-start space-y-8">
          <div className="hero-badge inline-flex items-center space-x-2 bg-brand-secondary/20 text-brand-secondary px-4 py-2 uppercase tracking-widest text-sm font-semibold border border-brand-secondary/30">
            <HardHat className="w-4 h-4" />
            <span>{data?.badge || "Reliance Pro Contractors"}</span>
          </div>

          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] uppercase overflow-hidden flex flex-wrap">
            {titleChars.map((char: string, i: number) => (
              <span
                key={i}
                className={char === " " ? "w-[0.3em] inline-block" : "char inline-block"}
              >
                {char}
              </span>
            ))}
          </h1>

          <p className="hero-desc text-lg md:text-2xl text-brand-surface/80 max-w-2xl font-sans font-light leading-relaxed">
            {data?.description}
          </p>

          <div className="hero-btn flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#join"
              className="inline-flex items-center justify-center space-x-2 bg-brand-accent text-brand-surface px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:bg-white hover:text-brand-accent transition-colors duration-300"
            >
              <span>Join the Program</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#benefits"
              className="inline-flex items-center justify-center space-x-2 border border-brand-surface/30 px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:bg-brand-surface/10 transition-colors duration-300"
            >
              <span>Explore Benefits</span>
            </Link>
          </div>
        </div>

        {data?.stats && data.stats.length > 0 && (
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            {data.stats.map((stat: any, i: number) => {
              const Icon = iconMap[stat.icon] || PaintRoller;
              return (
                <div
                  key={i}
                  className="hero-stat bg-brand-surface/5 border border-brand-surface/10 p-6 flex flex-col space-y-4 hover:bg-brand-surface/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-brand-secondary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-sans text-brand-surface/70 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
