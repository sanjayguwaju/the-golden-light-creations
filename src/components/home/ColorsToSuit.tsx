"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import Link from "next/link";

interface ColorsToSuitProps {
  title?: string;
  chips?: Array<{
    name: string;
    hex: string;
    shadeName: string;
    image: string;
  }>;
}

const DEFAULT_CHIPS = [
  { name: "Living Room", hex: "#F5F2ED", image: "/hero-1.png", shadeName: "Off-White" },
  { name: "Bedroom", hex: "#8E8E8E", image: "/hero-2.png", shadeName: "Warm Grey" },
  { name: "Kitchen", hex: "#0D1B3E", image: "/hero-slide3.png", shadeName: "Deep Navy" },
  { name: "Dining", hex: "#D94040", image: "/hero-slide2.png", shadeName: "Danger Red" },
  { name: "Bathroom", hex: "#C9A84C", image: "/hero-1.png", shadeName: "Accent Gold" },
  { name: "Study", hex: "#1B3A6E", image: "/hero-2.png", shadeName: "Classic Blue" },
  { name: "Nursery", hex: "#E8C4B0", image: "/hero-slide3.png", shadeName: "Desert Blush" },
  { name: "Patio", hex: "#C4D4BE", image: "/hero-slide2.png", shadeName: "Sage Garden" },
];

export const ColorsToSuit: React.FC<ColorsToSuitProps> = ({ title, chips }) => {
  const actualChips = chips && chips.length > 0 ? chips : DEFAULT_CHIPS;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeChip = actualChips[activeIdx] || actualChips[0] || DEFAULT_CHIPS[0];

  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in image and overlay on active change
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-16 text-center">
          {title || "Colors to Suit Your Palette"}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left: Editorial Room Photo (2/3 width) */}
          <div className="lg:col-span-8 relative h-[600px] overflow-hidden border border-reliance-navy">
            <img 
              ref={imgRef}
              src={activeChip.image} 
              alt={activeChip.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay to simulate color tint */}
            <div 
              ref={overlayRef}
              className="absolute inset-0 mix-blend-multiply"
              style={{ backgroundColor: activeChip.hex, opacity: 0.4 }}
            />

            <div className="absolute bottom-0 left-0 bg-white px-8 py-6 border-t border-r border-reliance-navy">
              <p className="text-sm font-bold text-reliance-navy mb-1 uppercase tracking-widest">{activeChip.name}</p>
              <p className="text-2xl text-reliance-navy uppercase">{activeChip.shadeName}</p>
            </div>
          </div>

          {/* Right: Color Chip Grid (1/3 width) */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-px bg-reliance-navy/10 border border-reliance-navy/10 mb-12">
              {actualChips.map((chip, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group bg-white p-4"
                >
                  <div 
                    className={`h-24 w-full mb-4 border border-reliance-navy/10 transition-transform duration-300 ${activeChip.hex === chip.hex ? 'ring-2 ring-reliance-navy ring-offset-4' : 'group-hover:scale-105'}`}
                    style={{ backgroundColor: chip.hex }}
                  />
                  <div>
                    <p className="text-xs font-bold text-reliance-navy uppercase tracking-widest">{chip.name}</p>
                    <p className="text-xs font-mono text-reliance-grey mt-1">{chip.hex}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/colors" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-reliance-navy hover:text-reliance-gold transition-colors group">
              Browse All 2,500+ Shades
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
