"use client";

import React from "react";
import type { BrandMarqueeBlock as BrandMarqueeBlockProps } from "@/payload-types";
import { GsapMarquee } from "@/components/ui/gsap-marquee";

export const BrandMarqueeBlock: React.FC<BrandMarqueeBlockProps> = ({
  title,
  brands,
}) => {
  const logos = brands || [];

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white border-t border-zinc-100 overflow-hidden w-full">
      {title && (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            {title}
          </p>
        </div>
      )}

      {/* GSAP Marquee track */}
      <GsapMarquee pauseOnHover speed={0.5} repeat={4} className="gap-16">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 px-6 py-3 grayscale hover:grayscale-0 hover:opacity-100 opacity-40 hover:text-[#F5B301] transition-all duration-300 cursor-pointer"
          >
            <span className="text-xl font-black tracking-widest text-zinc-400 hover:text-[#F5B301] transition-colors">
              {logo.text}
            </span>
          </div>
        ))}
      </GsapMarquee>
    </section>
  );
};

