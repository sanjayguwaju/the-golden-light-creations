"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

interface FinishCardsProps {
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  finishes?: Array<{
    name: string;
    image: string;
    desc: string;
    texture?: string;
  }>;
}

const DEFAULT_FINISHES = [
  {
    name: "Matte",
    image: "/hero-1.png",
    desc: "Rich, velvety flat finish that absorbs light. Perfect for creating cozy, intimate spaces.",
    texture: "bg-zinc-200",
  },
  {
    name: "Silk",
    image: "/hero-2.png",
    desc: "Smooth, lustrous finish with a subtle sheen. The ideal balance of washability and elegance.",
    texture: "bg-zinc-300",
  },
  {
    name: "Gloss",
    image: "/hero-slide2.png",
    desc: "High-shine mirror-bright finish. Ideal for trim, doors, and accent features that command attention.",
    texture: "bg-zinc-100",
  },
  {
    name: "Eggshell",
    image: "/hero-slide3.png",
    desc: "Gentle low-sheen finish with the look of eggshell. Durable, easy-clean, and universally loved.",
    texture: "bg-stone-200",
  },
  {
    name: "Satin",
    image: "/hero-1.png",
    desc: "Soft, pearlescent finish between matte and gloss. Great for kitchens, bathrooms, and children's rooms.",
    texture: "bg-amber-50",
  },
];

export const FinishCards: React.FC<FinishCardsProps> = ({ sectionLabel, title, subtitle, finishes }) => {
  const [active, setActive] = useState(1);
  const actualFinishes = finishes && finishes.length > 0 ? finishes : DEFAULT_FINISHES;

  return (
    <section className="py-12 md:py-24 bg-reliance-offwhite overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
            {sectionLabel || "Surface Finishes"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">
            {title || "Choose the Perfect Finish"}
          </h2>
          <p className="text-lg text-reliance-grey">
            {subtitle || "Each finish is engineered for a specific ambience."}
          </p>
        </div>

        {/* Scrollable card row */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6">
          {actualFinishes.map((f, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`snap-start shrink-0 w-[280px] sm:w-[320px] overflow-hidden cursor-pointer transition-all duration-300 relative border ${
                active === i
                  ? "border-reliance-gold scale-[1.02]"
                  : "border-reliance-navy hover:border-reliance-gold hover:-translate-y-1"
              }`}
            >
              <div className="h-56 relative overflow-hidden border-b border-reliance-navy">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-reliance-navy/50" />
                <h3 className="absolute bottom-4 left-5 text-2xl uppercase tracking-tight text-white">{f.name}</h3>

                {active === i && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-reliance-gold flex items-center justify-center border border-reliance-navy">
                    <Check size={16} className="text-reliance-navy font-black" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-reliance-navy leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="text-reliance-navy text-xs font-bold uppercase tracking-widest hover:text-reliance-gold transition-colors inline-flex items-center gap-2">
            Learn About All Finishes <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
