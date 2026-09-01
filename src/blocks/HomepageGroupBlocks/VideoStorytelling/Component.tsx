"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VideoStorytellingBlock, Media } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const VideoStorytellingComponent: React.FC<VideoStorytellingBlock> = (props) => {
  const {
    isEnabled,
    heading,
    subheading,
    description,
    videoMedia,
    posterImage,
    layoutReversed,
    ctaText,
    ctaLink,
  } = props;

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const textX = layoutReversed ? 75 : -75;
      const mediaX = layoutReversed ? -75 : 75;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      if (textRef.current && mediaRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: textX },
          { opacity: 1, x: 0, duration: 1, ease: "power4.out" }
        ).fromTo(
          mediaRef.current,
          { opacity: 0, x: mediaX, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "back.out(1.2)" },
          "-=0.7"
        );
      }
    },
    { scope: sectionRef }
  );

  if (!isEnabled) return null;

  const poster = posterImage as Media | undefined;
  const posterUrl = poster?.url || "";

  const video = videoMedia as Media | undefined;
  const videoUrl = video?.url || "";

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
            layoutReversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center opacity-0">
            {subheading && (
              <span className="text-theme-primary font-bold uppercase tracking-wider text-sm mb-4 block">
                {subheading}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4 text-theme-text">
                {heading}
              </h2>
            )}

            {description && (
              <div className="text-lg text-theme-text/80 mb-10 prose prose-lg prose-theme">
                <RichText data={description} />
              </div>
            )}

            {ctaText && ctaLink && (
              <div>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-theme-primary rounded-full hover:bg-theme-primary/90 transition-all shadow-lg hover:shadow-theme-primary/50"
                >
                  {ctaText}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div ref={mediaRef} className="w-full lg:w-1/2 opacity-0">
            <div className="relative aspect-4/5 md:aspect-video lg:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group bg-gray-100">
              {/* Cover Image Fallback */}
              {posterUrl && !videoUrl && (
                <Image
                  src={posterUrl}
                  alt={poster?.alt || heading || "Video thumbnail"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}

              {/* Video Player */}
              {videoUrl && (
                <video
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={posterUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
