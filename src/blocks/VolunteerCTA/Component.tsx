"use client";

import React from "react";
import type { VolunteerCtaBlock as VolunteerCtaBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Star, Clock } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const defaultIcons = [Heart, Users, Star, Clock];

const bgColorClasses: Record<string, string> = {
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
  muted: "bg-muted",
  dark: "bg-slate-900 text-white",
};

export const VolunteerCtaBlock: React.FC<VolunteerCtaBlockProps> = ({
  style = "split",
  title,
  description,
  image,
  benefits,
  primaryButton,
  secondaryButton,
  backgroundColor = "accent",
  showStats,
  stats,
}) => {
  const bgClass = bgColorClasses[backgroundColor ?? "accent"];
  const isDark = backgroundColor === "dark";
  const isAccentOrPrimary =
    backgroundColor === "accent" || backgroundColor === "primary";

  if (style === "cards") {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
              {description && (
                <div className="max-w-2xl mx-auto prose prose-slate">
                  <RichText data={description} enableGutter={false} />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits?.map((benefit, index) => {
              const IconComponent = defaultIcons[index % defaultIcons.length];

              return (
                <Card
                  key={index}
                  className="group border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    {benefit.icon && typeof benefit.icon === "object" && benefit.icon.url ? (
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image
                          src={benefit.icon.url}
                          alt={benefit.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <IconComponent className="w-8 h-8 text-accent group-hover:text-white" />
                      </div>
                    )}

                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    {benefit.description && (
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10 flex gap-4 justify-center">
            {primaryButton?.url && (
              <Link href={primaryButton.url}>
                <Button size="lg" className="gap-2">
                  {primaryButton.label || "Become a Volunteer"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {secondaryButton?.url && (
              <Link href={secondaryButton.url}>
                <Button variant="outline" size="lg">
                  {secondaryButton.label || "Learn More"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (style === "banner") {
    return (
      <section className={cn("py-12 md:py-16", bgClass)}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex-1">
              {title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
              )}
              {description && (
                <div
                  className={cn(
                    "prose prose-sm max-w-none",
                    isDark || isAccentOrPrimary ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  <RichText data={description} enableGutter={false} />
                </div>
              )}
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              {primaryButton?.url && (
                <Link href={primaryButton.url}>
                  <Button
                    size="lg"
                    variant={isDark || isAccentOrPrimary ? "secondary" : "default"}
                    className="gap-2"
                  >
                    {primaryButton.label || "Get Involved"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (style === "centered") {
    return (
      <section className={cn("py-16 md:py-24", bgClass)}>
        <div className="container max-w-3xl text-center">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {title}
            </h2>
          )}

          {description && (
            <div className="prose prose-lg max-w-none mx-auto mb-8">
              <RichText data={description} enableGutter={false} />
            </div>
          )}

          {showStats && stats && stats.length > 0 && (
            <div className="flex justify-center gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            {primaryButton?.url && (
              <Link href={primaryButton.url}>
                <Button
                  size="lg"
                  variant={isDark || isAccentOrPrimary ? "secondary" : "default"}
                  className="gap-2"
                >
                  {primaryButton.label || "Join Now"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {secondaryButton?.url && (
              <Link href={secondaryButton.url}>
                <Button
                  size="lg"
                  variant={isDark || isAccentOrPrimary ? "outline" : "outline"}
                  className={isDark || isAccentOrPrimary ? "border-white/30" : ""}
                >
                  {secondaryButton.label || "Learn More"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={cn("rounded-2xl overflow-hidden", isDark ? "order-2" : "")}>
            {image && typeof image === "object" && image.url ? (
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src={image.url}
                  alt={title || ""}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-[400px] lg:h-[500px] bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-24 h-24 text-accent/50" />
              </div>
            )}
          </div>

          <div className={isDark ? "order-1" : ""}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {title}
              </h2>
            )}

            {description && (
              <div className="prose prose-slate max-w-none mb-8">
                <RichText data={description} enableGutter={false} />
              </div>
            )}

            {benefits && benefits.length > 0 && (
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = defaultIcons[index % defaultIcons.length];

                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        {benefit.icon && typeof benefit.icon === "object" && benefit.icon.url ? (
                          <div className="relative w-5 h-5">
                            <Image
                              src={benefit.icon.url}
                              alt={benefit.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <IconComponent className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        {benefit.description && (
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              {primaryButton?.url && (
                <Link href={primaryButton.url}>
                  <Button size="lg" className="gap-2">
                    {primaryButton.label || "Volunteer With Us"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {secondaryButton?.url && (
                <Link href={secondaryButton.url}>
                  <Button variant="outline" size="lg">
                    {secondaryButton.label || "Learn More"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
