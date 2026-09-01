"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

export const HighImpactHero: React.FC<Page["hero"]> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderTheme("dark");
  });

  useGSAP(() => {
    const tl = gsap.timeline();

    // Set initial states
    if (mediaRef.current) {
      gsap.set(mediaRef.current, { scale: 1.1 }); // Slight zoom in initially
    }
    
    if (textRef.current) {
      // Find children elements to animate
      const textElements = textRef.current.children;
      gsap.set(textElements, { y: 30, opacity: 0 });
      
      // Animate media zoom out slightly
      if (mediaRef.current) {
        tl.to(mediaRef.current, {
          scale: 1,
          duration: 2.5,
          ease: "power2.out"
        }, 0);
      }

      // Stagger in the text elements
      tl.to(textElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, 0.5); // Start slightly after media animation begins
    }

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative -mt-[10.4rem] flex items-center justify-center text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-146 md:text-center" ref={textRef}>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none absolute inset-0 w-full h-full -z-10" ref={mediaRef}>
        {media && typeof media === "object" && (
          <Media fill imgClassName="object-cover w-full h-full" priority resource={media} />
        )}
      </div>
    </div>
  );
};
