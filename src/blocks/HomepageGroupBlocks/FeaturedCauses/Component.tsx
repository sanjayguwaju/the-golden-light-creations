"use client";

import React from "react";
import type { FeaturedCausesBlock as FeaturedCausesProps, Media } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import RichText from "@/components/RichText";

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export const FeaturedCausesBlock: React.FC<FeaturedCausesProps> = ({
  title,
  subtitle,
  causes,
  layout = "grid",
  columns = "3",
  showViewAll,
  viewAllLink,
}) => {
  if (!causes?.length) return null;

  const featuredCause = causes.find((c) => c.featured);
  const regularCauses =
    layout === "featuredGrid" && featuredCause ? causes.filter((c) => c !== featuredCause) : causes;

  const renderCauseCard = (cause: (typeof causes)[0], isFeatured = false) => {
    const hasImage = cause.image && typeof cause.image === "object" && "url" in cause.image;
    const hasIcon =
      cause.icon && typeof cause.icon === "object" && cause.icon !== null && "url" in cause.icon;
    const progressPercentage = cause.progress?.goal
      ? Math.min(100, Math.round(((cause.progress.raised || 0) / cause.progress.goal) * 100))
      : 0;

    return (
      <Card
        className={cn(
          "group overflow-hidden border-border hover:shadow-xl transition-all duration-300",
          isFeatured && "md:col-span-2 lg:col-span-2"
        )}
      >
        <div className={cn("relative overflow-hidden", isFeatured ? "h-64" : "h-48")}>
          {hasImage && (cause.image as Media).url && (
            <Image
              src={(cause.image as Media).url!}
              alt={cause.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          {hasIcon && (cause.icon as Media).url && (
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full p-2 shadow-lg">
              <Image src={(cause.icon as Media).url!} alt="" fill className="object-contain p-1" />
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={cn("font-bold text-white", isFeatured ? "text-2xl" : "text-xl")}>
              {cause.title}
            </h3>
          </div>
        </div>

        <CardContent className="p-6">
          {cause.description && (
            <div className="prose prose-sm max-w-none mb-4 text-muted-foreground">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <RichText data={cause.description as any} enableGutter={false} />
            </div>
          )}

          {cause.progress?.goal && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Raised:{" "}
                  <span className="font-semibold text-foreground">
                    {cause.progress.currency || "$"}
                    {cause.progress.raised?.toLocaleString() || 0}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Goal: {cause.progress.currency || "$"}
                  {cause.progress.goal.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {progressPercentage}% funded
              </div>
            </div>
          )}

          {cause.link?.url && (
            <Link
              href={cause.link.url}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <Heart className="w-4 h-4" />
              {cause.link.label || "Donate Now"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        {layout === "grid" && (
          <div className={cn("grid gap-6", columnClasses[columns || "3"])}>
            {causes.map((cause, index) => (
              <div key={index}>{renderCauseCard(cause)}</div>
            ))}
          </div>
        )}

        {/* Featured + Grid Layout */}
        {layout === "featuredGrid" && featuredCause && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">{renderCauseCard(featuredCause, true)}</div>
              <div className="grid grid-cols-1 gap-6">
                {regularCauses.slice(0, 2).map((cause, index) => (
                  <div key={index}>{renderCauseCard(cause)}</div>
                ))}
              </div>
            </div>
            {regularCauses.length > 2 && (
              <div className={cn("grid gap-6", columnClasses[columns || "3"])}>
                {regularCauses.slice(2).map((cause, index) => (
                  <div key={index}>{renderCauseCard(cause)}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Carousel Layout */}
        {layout === "carousel" && (
          <div className="w-full relative px-4 md:px-12">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {causes.map((cause, index) => (
                <SwiperSlide key={index} className="h-auto">
                  {renderCauseCard(cause)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* View All Button */}
        {showViewAll && viewAllLink && (
          <div className="text-center mt-12">
            <Link href={viewAllLink}>
              <Button variant="outline" size="lg">
                View All Causes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
