"use client";

import React from "react";
import type { HeroSectionBlock as HeroSectionProps } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export const HeroSectionBlock: React.FC<HeroSectionProps> = ({
  layout = "centered",
  pretitle,
  title,
  subtitle,
  backgroundImage,
  foregroundImage,
  primaryCTA,
  secondaryCTA,
  stats,
  overlayOpacity = "50",
}) => {
  const hasBackgroundImage = backgroundImage && typeof backgroundImage === "object";
  const hasForegroundImage = foregroundImage && typeof foregroundImage === "object";

  return (
    <section
      className={cn(
        "relative min-h-[600px] md:min-h-[700px] flex items-center",
        layout === "fullscreen" && "min-h-screen",
      )}
    >
      {/* Background Image */}
      {hasBackgroundImage && backgroundImage.url && (
        <>
          <Image
            src={backgroundImage.url}
            alt={title || ""}
            fill
            className="object-cover"
            priority
          />
          <div
            className={cn(
              "absolute inset-0 bg-black",
              overlayOpacity === "0" && "opacity-0",
              overlayOpacity === "30" && "opacity-30",
              overlayOpacity === "50" && "opacity-50",
              overlayOpacity === "70" && "opacity-70",
            )}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container py-16 md:py-24">
        <div
          className={cn(
            "flex items-center gap-12",
            layout === "split" && "flex-col md:flex-row",
            layout === "centered" && "flex-col text-center",
            layout === "fullscreen" && "flex-col text-center",
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              "flex-1",
              layout === "split" && "md:w-1/2",
              (layout === "centered" || layout === "fullscreen") && "max-w-3xl mx-auto",
            )}
          >
            {pretitle && (
              <span className="inline-block text-sm md:text-base font-medium text-primary mb-4 tracking-wider uppercase">
                {pretitle}
              </span>
            )}

            <h1
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
                (layout === "centered" || layout === "fullscreen" || hasBackgroundImage) &&
                  "text-white",
              )}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className={cn(
                  "text-lg md:text-xl mb-8 max-w-2xl",
                  (layout === "centered" || layout === "fullscreen" || hasBackgroundImage) &&
                    "text-white/90",
                  !hasBackgroundImage && "text-muted-foreground",
                  layout === "centered" && "mx-auto",
                )}
              >
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            <div
              className={cn(
                "flex flex-wrap gap-4",
                layout === "centered" && "justify-center",
                layout === "fullscreen" && "justify-center",
              )}
            >
              {primaryCTA?.label && primaryCTA?.link && (
                <Link href={primaryCTA.link}>
                  <Button size="lg" variant={primaryCTA.variant || "default"}>
                    {primaryCTA.label}
                  </Button>
                </Link>
              )}
              {secondaryCTA?.label && secondaryCTA?.link && (
                <Link href={secondaryCTA.link}>
                  <Button size="lg" variant={secondaryCTA.variant || "outline"}>
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div
                className={cn(
                  "grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12",
                  (layout === "centered" || layout === "fullscreen" || hasBackgroundImage) &&
                    "border-t border-white/20",
                  !hasBackgroundImage && "border-t border-border",
                )}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={cn(
                        "text-3xl md:text-4xl font-bold mb-1",
                        (layout === "centered" || layout === "fullscreen" || hasBackgroundImage) &&
                          "text-white",
                        !hasBackgroundImage && "text-primary",
                      )}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={cn(
                        "text-sm",
                        (layout === "centered" || layout === "fullscreen" || hasBackgroundImage) &&
                          "text-white/80",
                        !hasBackgroundImage && "text-muted-foreground",
                      )}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Foreground Image (Split Layout) */}
          {layout === "split" && hasForegroundImage && foregroundImage.url && (
            <div className="md:w-1/2 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={foregroundImage.url}
                  alt={title || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
