"use client";

import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Heart, ArrowRight } from "lucide-react";
import { cn } from "@/utilities/ui";

export const MissionHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-theme="dark"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === "object" && (
          <Media
            fill
            imgClassName="object-cover"
            priority
            resource={media}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-20 w-48 h-48 border border-white/5 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-ping" />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent mb-6">
            <Heart className="w-4 h-4 fill-accent" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Our Mission
            </span>
          </div>

          {/* Rich Text */}
          {richText && (
            <div className="mb-8">
              <RichText
                className="prose prose-invert prose-lg max-w-none [&_h1]:text-5xl md:[&_h1]:text-7xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-6 [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-white/90 [&_p]:leading-relaxed"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}

          {/* Links */}
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300",
                    i === 0
                      ? "bg-accent text-white hover:bg-accent/90 hover:scale-105"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  );
};
