"use client";

import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utilities/ui";

export const MinimalHero: React.FC<Page["hero"]> = ({ links, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("light");
  }, [setHeaderTheme]);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-block mb-6">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground border-b-2 border-accent pb-1">
              Nonprofit Organization
            </span>
          </div>

          {/* Rich Text */}
          {richText && (
            <RichText
              className="prose prose-slate max-w-none [&_h1]:text-5xl md:[&_h1]:text-7xl lg:[&_h1]:text-8xl [&_h1]:font-light [&_h1]:tracking-tight [&_h1]:mb-8 [&_h1]:leading-[1.1] [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-muted-foreground [&_p]:font-light [&_p]:leading-relaxed [&_p]:max-w-2xl [&_p]:mx-auto"
              data={richText}
              enableGutter={false}
            />
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="h-px w-16 bg-border" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="h-px w-16 bg-border" />
          </div>

          {/* Links */}
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={cn(
                    "group inline-flex items-center gap-2 text-lg font-medium transition-all duration-300",
                    i === 0
                      ? "text-accent hover:text-accent/80"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  <span className="border-b-2 border-current pb-1">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </CMSLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-border/50" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-border/50" />
    </div>
  );
};
