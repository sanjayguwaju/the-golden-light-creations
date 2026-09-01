"use client";

import React from "react";
import type { SuccessStoriesBlock as SuccessStoriesProps } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Quote, ArrowRight } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import RichText from "@/components/RichText";

export const SuccessStoriesBlock: React.FC<SuccessStoriesProps> = ({
  title,
  subtitle,
  stories,
  layout = "cards",
  showImages = true,
  showQuotes = true,
}) => {
  if (!stories?.length) return null;

  const renderStoryCard = (story: (typeof stories)[0], isFeatured = false) => {
    const hasImage = showImages && story.image && typeof story.image === "object";

    return (
      <Card
        className={cn(
          "overflow-hidden border-border hover:shadow-lg transition-all duration-300",
          isFeatured && "md:col-span-2"
        )}
      >
        <div className={cn("flex", isFeatured ? "flex-col md:flex-row" : "flex-col")}>
          {hasImage &&
            story.image !== null &&
            typeof story.image === "object" &&
            "url" in story.image && (
              <div
                className={cn(
                  "relative overflow-hidden",
                  isFeatured ? "md:w-1/2 h-64 md:h-auto" : "h-48"
                )}
              >
                <Image
                  src={story.image?.url || ""}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
                {story.program && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {story.program}
                  </div>
                )}
              </div>
            )}

          <CardContent
            className={cn("flex-1 p-6", isFeatured && "md:p-8 flex flex-col justify-center")}
          >
            <Quote className="w-8 h-8 text-primary/20 mb-4" />

            {showQuotes && story.quote && (
              <div className="prose prose-lg max-w-none mb-4 italic text-muted-foreground">
                <RichText data={story.quote} enableGutter={false} />
              </div>
            )}

            <div className="mt-auto">
              <h4 className="font-bold text-lg">{story.name}</h4>
              {story.title && <p className="text-sm text-muted-foreground">{story.title}</p>}
              {story.outcome && (
                <p className="text-sm text-primary mt-2 font-medium">{story.outcome}</p>
              )}

              {story.link && (
                <Link
                  href={story.link}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4"
                >
                  Read Full Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </CardContent>
        </div>
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

        {/* Cards Layout */}
        {layout === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <div key={index}>{renderStoryCard(story)}</div>
            ))}
          </div>
        )}

        {/* Featured Grid Layout */}
        {layout === "featuredGrid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, index) => (
              <div key={index}>{renderStoryCard(story, index === 0)}</div>
            ))}
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
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {stories.map((story, index) => (
                <SwiperSlide key={index} className="h-auto">
                  {renderStoryCard(story)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};
