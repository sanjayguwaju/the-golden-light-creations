"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ImpactBlock as ImpactBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Globe, Award, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";

const defaultIcons = [Users, Heart, Globe, Award, TrendingUp, Calendar];

const bgColorClasses: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted",
  dark: "bg-slate-900 text-white",
};

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export const ImpactBlock: React.FC<ImpactBlockProps> = ({
  title,
  subtitle,
  layout = "stats",
  metrics,
  featuredStory,
  backgroundColor = "primary",
  showYearBadge,
  yearBadgeText,
}) => {
  if (!metrics?.length) return null;

  const bgClass = bgColorClasses[backgroundColor ?? "primary"];
  const isDark = backgroundColor === "dark";

  return (
    <section className={cn("py-16 md:py-24", bgClass)}>
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {showYearBadge && yearBadgeText && (
              <div className="inline-block px-4 py-1 rounded-full bg-accent text-white text-sm font-medium mb-4">
                {yearBadgeText}
              </div>
            )}
            {title && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>}
            {subtitle && (
              <p
                className={cn(
                  "text-lg max-w-2xl mx-auto",
                  isDark ? "text-slate-300" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {(layout === "stats" || layout === "counter") && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const IconComponent = defaultIcons[index % defaultIcons.length];
              const hasNumericValue =
                layout === "counter" && typeof metric.numericValue === "number";

              return (
                <Card
                  key={index}
                  className={cn(
                    "text-center p-6 border-2 transition-all duration-300 hover:scale-105",
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-background/50 border-transparent hover:border-accent/20"
                  )}
                >
                  <CardContent className="p-0">
                    {metric.icon && typeof metric.icon === "object" && metric.icon.url ? (
                      <div className="relative w-12 h-12 mx-auto mb-4">
                        <Image
                          src={metric.icon.url}
                          alt={metric.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    )}

                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {hasNumericValue &&
                      metric.numericValue !== null &&
                      metric.numericValue !== undefined ? (
                        <AnimatedCounter value={metric.numericValue} suffix={metric.suffix || ""} />
                      ) : (
                        <span>
                          {metric.value}
                          {metric.suffix}
                        </span>
                      )}
                    </div>

                    <div className="font-medium text-sm">{metric.label}</div>

                    {metric.description && (
                      <div
                        className={cn(
                          "text-xs mt-2",
                          isDark ? "text-slate-400" : "text-muted-foreground"
                        )}
                      >
                        {metric.description}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {layout === "stories" && (
          <div className="space-y-12">
            {featuredStory && (
              <Card
                className={cn("overflow-hidden", isDark ? "bg-slate-800 border-slate-700" : "")}
              >
                <div className="grid md:grid-cols-2">
                  {featuredStory.image &&
                    typeof featuredStory.image === "object" &&
                    featuredStory.image.url && (
                      <div className="relative h-64 md:h-auto min-h-[300px]">
                        <Image
                          src={featuredStory.image.url}
                          alt={featuredStory.title || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                  <CardContent className="p-8 flex flex-col justify-center">
                    {featuredStory.title && (
                      <h3 className="text-2xl font-bold mb-4">{featuredStory.title}</h3>
                    )}
                    {featuredStory.content && (
                      <div className="prose prose-sm max-w-none mb-6">
                        <RichText data={featuredStory.content} enableGutter={false} />
                      </div>
                    )}
                    {featuredStory.quote && (
                      <blockquote className="border-l-4 border-accent pl-4 italic mb-4">
                        &ldquo;{featuredStory.quote}&rdquo;
                      </blockquote>
                    )}
                    {featuredStory.author && (
                      <div className="font-medium">— {featuredStory.author}</div>
                    )}
                  </CardContent>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];

                return (
                  <div
                    key={index}
                    className={cn(
                      "text-center p-6 rounded-xl",
                      isDark ? "bg-slate-800" : "bg-background/50"
                    )}
                  >
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {metric.value}
                      {metric.suffix}
                    </div>
                    <div className="text-sm font-medium">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {layout === "infographic" && (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-current opacity-20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {metrics.map((metric, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={cn(
                      "relative flex items-center gap-8",
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    <div className={cn("flex-1 md:text-right", !isEven && "md:text-left")}>
                      <Card
                        className={cn(
                          "p-6 inline-block",
                          isDark ? "bg-slate-800 border-slate-700" : ""
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              {metric.value}
                              {metric.suffix}
                            </div>
                            <div className="text-sm font-medium">{metric.label}</div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent" />

                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
