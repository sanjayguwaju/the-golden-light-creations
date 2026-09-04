"use client";

import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";

export const SplitHero: React.FC<Page["hero"] & { layout?: "left" | "right" }> = ({
  links,
  media,
  richText,
  layout = "left",
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme(layout === "left" ? "light" : "dark");
  }, [setHeaderTheme, layout]);

  const contentSide = layout === "left" ? "order-1" : "order-2";
  const imageSide = layout === "left" ? "order-2" : "order-1";
  const bgClass = layout === "left" ? "bg-background" : "bg-[#C0171E]";
  const textClass = layout === "left" ? "text-foreground" : "text-white";

  return (
    <div className={cn("relative min-h-screen flex items-center", bgClass)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Content Side */}
          <div className={cn("py-12 lg:py-0", contentSide)}>
            {richText && (
              <RichText
                className={cn(
                  "prose max-w-none",
                  layout === "left" ? "prose-slate" : "prose-invert",
                  "[&_h1]:text-4xl md:[&_h1]:text-5xl lg:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-6",
                  "[&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6",
                  textClass
                )}
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      i === 0
                        ? layout === "left"
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-accent text-white hover:bg-accent/90"
                        : layout === "left"
                          ? "border border-border hover:bg-muted"
                          : "border border-white/20 text-white hover:bg-white/10"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Image Side */}
          <div className={cn("relative h-[50vh] lg:h-[80vh]", imageSide)}>
            {media && typeof media === "object" && (
              <>
                <Media fill imgClassName="object-cover rounded-2xl" priority resource={media} />
                {/* Decorative Frame */}
                <div
                  className={cn(
                    "absolute -inset-4 border-2 rounded-3xl -z-10",
                    layout === "left" ? "border-accent/20" : "border-white/10"
                  )}
                />
              </>
            )}

            {/* Floating Badge */}
            <div
              className={cn(
                "absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0",
                "px-6 py-4 rounded-xl shadow-xl backdrop-blur-sm",
                layout === "left" ? "bg-white" : "bg-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      layout === "left" ? "text-muted-foreground" : "text-white/70"
                    )}
                  >
                    Making Impact Since
                  </div>
                  <div
                    className={cn(
                      "text-xl font-bold",
                      layout === "left" ? "text-foreground" : "text-white"
                    )}
                  >
                    2010
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
