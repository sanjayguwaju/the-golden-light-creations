"use client";

import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Quote } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";

export const StoryHero: React.FC<
  Page["hero"] & {
    story?: {
      quote?: string;
      author?: string;
      authorTitle?: string;
      authorImage?: string | object;
    };
  }
> = ({ links, media, richText, story }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("light");
  }, [setHeaderTheme]);

  return (
    <div className="relative min-h-screen flex items-center bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left: Featured Story */}
          <div className="relative">
            {/* Quote Card */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {story?.quote ? (
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              ) : (
                richText && (
                  <div className="mb-8">
                    <RichText
                      className="prose prose-lg max-w-none [&_p]:text-xl [&_p]:leading-relaxed"
                      data={richText}
                      enableGutter={false}
                    />
                  </div>
                )
              )}

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                {story?.authorImage &&
                typeof story.authorImage === "object" &&
                "url" in story.authorImage ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={story.authorImage.url as string}
                      alt={story.author || "Story author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl">
                    👤
                  </div>
                )}
                <div>
                  <div className="font-bold text-foreground text-lg">
                    {story?.author || "Beneficiary Name"}
                  </div>
                  <div className="text-muted-foreground">
                    {story?.authorTitle || "Program Participant"}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-accent/10 rounded-3xl" />
          </div>

          {/* Right: Image + CTA */}
          <div className="relative">
            <div className="relative h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden">
              {media && typeof media === "object" && (
                <Media fill imgClassName="object-cover" priority resource={media} />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-xs text-muted-foreground">Stories Shared</div>
                </div>
                <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-xs text-muted-foreground">Lives Changed</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            {Array.isArray(links) && links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      i === 0
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "border border-border hover:bg-muted"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
