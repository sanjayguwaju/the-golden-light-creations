"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { PeelingTapeFeaturesBlock as PeelingTapeFeaturesBlockProps } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_FEATURES = [
  { heading: "Zero VOCs", description: "Breathe easy with our environmentally friendly, low-odor formula." },
  { heading: "Scrubbable Finish", description: "Tough on stains, easy to clean. Perfect for high-traffic areas." },
  { heading: "1-Coat Coverage", description: "Save time and money with industry-leading opacity and spread rate." },
];

export const PeelingTapeFeaturesBlock: React.FC<PeelingTapeFeaturesBlockProps> = ({
  title,
  features,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const displayFeatures = features && features.length > 0 ? features : FALLBACK_FEATURES;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = gsap.utils.toArray<HTMLDivElement>(".tape-item");

      items.forEach((item) => {
        const tape = item.querySelector(".tape-strip");
        if (!tape) return;

        // Peel animation
        gsap.to(tape, {
          rotation: -25, // peel back
          y: 50,
          x: -20,
          scaleY: 0,
          opacity: 0,
          transformOrigin: "top left",
          ease: "power2.in",
          scrollTrigger: {
            trigger: item,
            start: "top 75%", // when item is 75% down the viewport
            end: "top 45%",
            scrub: 1, // tie to scroll
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-[#F5F2ED] text-reliance-navy overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayFeatures.map((feat, i) => (
            <div key={i} className="tape-item relative bg-white p-8 shadow-sm border border-black/5">
              
              {/* The Blue Painter's Tape (positioned over the text initially) */}
              <div 
                className="tape-strip absolute inset-0 z-10 opacity-90 shadow-md backdrop-blur-sm flex items-center justify-center p-6"
                style={{ 
                  backgroundColor: "#2B5C8F", // Blue painter's tape color
                  clipPath: "polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)", // slightly jagged edges
                }}
              >
                <span className="text-white font-mono text-sm uppercase tracking-widest opacity-50 rotate-[-5deg]">
                  Reliance Painters Tape
                </span>
              </div>

              {/* The hidden feature content */}
              <div className="relative z-0">
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-4 text-reliance-gold">
                  {feat.heading}
                </h3>
                <p className="text-lg opacity-80 leading-relaxed">
                  {feat.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
