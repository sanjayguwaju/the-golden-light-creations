"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Media } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface BeforeAfterSplitProps {
  isEnabled?: boolean | null;
  heading: string;
  subheading?: string | null;
  description?: string | null;
  beforeImage: string | Media;
  afterImage: string | Media;
  ctaText?: string | null;
  ctaLink?: string | null;
}

export const BeforeAfterSplit: React.FC<BeforeAfterSplitProps> = (props) => {
  const { isEnabled, heading, subheading, description, beforeImage, afterImage, ctaText, ctaLink } =
    props;

  const [position, setPosition] = useState(50);

  const sectionRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      if (textRef.current && sliderRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }
        ).fromTo(
          sliderRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.5"
        );
      }
    },
    { scope: sectionRef }
  );

  if (isEnabled === false) return null;

  const getImageUrl = (image: string | Media | null | undefined) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image.url || "";
  };

  const beforeUrl = getImageUrl(beforeImage);
  const afterUrl = getImageUrl(afterImage);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#161B33] text-white overflow-hidden py-24"
    >
      <div className="w-full max-w-350 mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div
          ref={textRef}
          className="w-full lg:w-5/12 flex flex-col justify-center relative z-10 opacity-0"
        >
          {subheading && (
            <span className="text-[#D8B962] font-semibold text-sm uppercase tracking-widest mb-4 inline-block">
              {subheading}
            </span>
          )}
          <h2 className="gsap-title text-3xl md:text-4xl lg:text-5xl mb-4">{heading}</h2>
          {description && (
            <p className="text-[#8E8E93] text-lg mb-10 max-w-md leading-relaxed">{description}</p>
          )}

          {ctaLink && ctaText && (
            <div>
              <Link
                href={ctaLink}
                className="group relative inline-flex items-center gap-2 bg-[#D8B962] text-slate-950 px-8 py-4 rounded-full text-sm font-bold transition-all hover:bg-[#C6A868] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Right Content - Interactive Slider */}
        <div
          ref={sliderRef}
          className="w-full lg:w-7/12 relative flex justify-center lg:justify-end opacity-0"
        >
          <div className="relative w-full max-w-175 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            {/* After Image (Base) */}
            <img
              src={afterUrl}
              alt="After Paint"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src={beforeUrl}
                alt="Before Paint"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
              />
            </div>

            {/* Slider Handle & Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize select-none z-20 pointer-events-none"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-[#161B33]">
                <MoveHorizontal size={24} />
              </div>
            </div>

            {/* Invisible Range Input for Interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0 touch-none"
            />

            {/* Labels */}
            <div className="absolute bottom-6 left-6 z-10 bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase pointer-events-none">
              Before
            </div>
            <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase pointer-events-none">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
