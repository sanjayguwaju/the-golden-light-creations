"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TexturesGridBlock, Media } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const TexturesGridComponent: React.FC<TexturesGridBlock> = (props) => {
  const { isEnabled, title, subtitle, finishes } = props;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
        );
      }

      tl.fromTo(
        ".texture-item",
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          delay: 0.1,
        },
        "-=0.5"
      );
    },
    { scope: sectionRef }
  );

  if (!isEnabled || !finishes || finishes.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 opacity-0">
          {subtitle && (
            <span className="text-theme-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4 text-theme-text">
            {title}
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-62.5 md:auto-rows-75"
        >
          {finishes.map((finish, index) => {
            const image = finish.image as Media | undefined;
            const imageUrl = image?.url || "";

            const isFeatured = finish.isFeatured;

            // Layout classes for bento grid
            // Featured items span 2 cols and 2 rows on desktop
            const gridClass = isFeatured
              ? "texture-item md:col-span-2 md:row-span-2 opacity-0"
              : "texture-item col-span-1 row-span-1 opacity-0";

            const itemContent = (
              <div className="relative w-full h-full rounded-3xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Background Image */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={image?.alt || finish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={
                      isFeatured
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 25vw"
                    }
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3
                    className={`font-bold mb-2 ${isFeatured ? "text-3xl lg:text-4xl" : "text-2xl"}`}
                  >
                    {finish.name}
                  </h3>

                  {/* Features List (Hidden by default, shown on hover/large screens if featured) */}
                  {finish.features && finish.features.length > 0 && (
                    <div
                      className={`mt-2 overflow-hidden transition-all duration-500 delay-75 ${isFeatured ? "max-h-40 opacity-100" : "max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100"}`}
                    >
                      <ul className="space-y-1 mt-2">
                        {finish.features.slice(0, isFeatured ? 4 : 2).map((feat, i) => (
                          <li key={i} className="flex items-center text-white/90 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-theme-primary mr-2 shrink-0" />
                            {feat.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Arrow Icon */}
                  {finish.link && (
                    <div className="absolute bottom-6 lg:bottom-8 right-6 lg:right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-150">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <div key={finish.id || index} className={gridClass}>
                {finish.link ? (
                  <Link href={finish.link} className="block w-full h-full cursor-pointer">
                    {itemContent}
                  </Link>
                ) : (
                  itemContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
