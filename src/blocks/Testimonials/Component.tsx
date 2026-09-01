"use client";

import React, { useState } from "react";
import type { TestimonialsBlock as TestimonialsBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GsapMarquee } from "@/components/ui/gsap-marquee";
import { Quote, Play, Heart, Users, HandHeart, Building2 } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";

const typeIcons = {
  beneficiary: Heart,
  donor: HandHeart,
  volunteer: Users,
  partner: Building2,
};

const typeLabels = {
  beneficiary: "Beneficiaries",
  donor: "Donors",
  volunteer: "Volunteers",
  partner: "Partners",
};

const typeColors: Record<string, string> = {
  beneficiary: "bg-rose-100 text-rose-600 border-rose-200",
  donor: "bg-amber-100 text-amber-600 border-amber-200",
  volunteer: "bg-emerald-100 text-emerald-600 border-emerald-200",
  partner: "bg-blue-100 text-blue-600 border-blue-200",
};

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  subtitle,
  testimonials,
  layout = "carousel",
  showTypeFilter = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | "all">("all");

  if (!testimonials?.length) return null;

  const filteredTestimonials =
    activeFilter === "all" ? testimonials : testimonials.filter((t) => t.type === activeFilter);

  const types = [...new Set(testimonials.map((t) => t.type))];

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-background to-muted/50">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {showTypeFilter && types.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All Stories
            </Button>
            {types.map((type) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              return (
                <Button
                  key={type}
                  variant={activeFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(type ?? "all")}
                  className="gap-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {typeLabels[type as keyof typeof typeLabels] || type}
                </Button>
              );
            })}
          </div>
        )}

        {layout === "carousel" && (
          <div className="w-full relative px-4 md:px-12 overflow-hidden">
            {/* Top/Bottom gradient masks for horizontal fading (optional, MagicUI style) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-linear-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-linear-to-l from-background to-transparent z-10" />

            <GsapMarquee pauseOnHover speed={0.8} repeat={3} className="py-4">
              {filteredTestimonials.map((testimonial, index) => {
                const Icon = typeIcons[testimonial.type as keyof typeof typeIcons];
                return (
                  <div key={index} className="w-[320px] md:w-[400px] shrink-0 mx-3">
                    <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden hover:bg-muted/50 transition-colors">
                      {testimonial.featuredImage &&
                        typeof testimonial.featuredImage === "object" &&
                        testimonial.featuredImage.url && (
                          <div className="relative h-48">
                            <Image
                              src={testimonial.featuredImage.url}
                              alt={testimonial.authorName}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            {testimonial.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                  <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Quote className="w-8 h-8 text-accent/50 shrink-0" />
                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium capitalize",
                              typeColors[testimonial.type || "beneficiary"]
                            )}
                          >
                            {Icon && <Icon className="w-3 h-3 inline mr-1" />}
                            {testimonial.type}
                          </div>
                        </div>

                        {testimonial.quote && (
                          <div className="prose prose-sm max-w-none mb-6 text-foreground/90">
                            <RichText data={testimonial.quote} enableGutter={false} />
                          </div>
                        )}

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                          {testimonial.authorImage &&
                            typeof testimonial.authorImage === "object" &&
                            testimonial.authorImage.url && (
                              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-border">
                                <Image
                                  src={testimonial.authorImage.url}
                                  alt={testimonial.authorName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          <div>
                            <div className="font-semibold text-foreground">
                              {testimonial.authorName}
                            </div>
                            {(testimonial.authorTitle || testimonial.location) && (
                              <div className="text-sm text-muted-foreground">
                                {testimonial.authorTitle}
                                {testimonial.authorTitle && testimonial.location && " · "}
                                {testimonial.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </GsapMarquee>
          </div>
        )}

        {layout === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <Card key={index} className="border-border overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-6 h-6 text-accent/50" />
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        typeColors[testimonial.type || "beneficiary"]
                      )}
                    >
                      {testimonial.type}
                    </div>
                  </div>

                  {testimonial.quote && (
                    <div className="prose prose-sm max-w-none mb-4 text-foreground/90">
                      <RichText data={testimonial.quote} enableGutter={false} />
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {testimonial.authorImage &&
                      typeof testimonial.authorImage === "object" &&
                      testimonial.authorImage.url && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={testimonial.authorImage.url}
                            alt={testimonial.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    <div>
                      <div className="font-medium text-foreground">{testimonial.authorName}</div>
                      {testimonial.authorTitle && (
                        <div className="text-xs text-muted-foreground">
                          {testimonial.authorTitle}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {layout === "masonry" && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredTestimonials.map((testimonial, index) => (
              <Card key={index} className="break-inside-avoid border-border overflow-hidden">
                {testimonial.featuredImage &&
                  typeof testimonial.featuredImage === "object" &&
                  testimonial.featuredImage.url && (
                    <div className="relative h-48">
                      <Image
                        src={testimonial.featuredImage.url}
                        alt={testimonial.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-5 h-5 text-accent/50" />
                    <div
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                        typeColors[testimonial.type || "beneficiary"]
                      )}
                    >
                      {testimonial.type}
                    </div>
                  </div>

                  {testimonial.quote && (
                    <div className="prose prose-sm max-w-none mb-4">
                      <RichText data={testimonial.quote} enableGutter={false} />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{testimonial.authorName}</div>
                    {testimonial.location && (
                      <div className="text-xs text-muted-foreground">({testimonial.location})</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
