"use client";

import React from "react";
import type { ProgramsBlock as ProgramsBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export const ProgramsBlock: React.FC<ProgramsBlockProps> = ({
  title,
  subtitle,
  programs,
  layout = "grid",
  columns = "3",
  showViewAllButton,
  viewAllLink,
}) => {
  if (!programs?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
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

        {layout === "grid" && (
          <div className={cn("grid gap-6", columnClasses[columns ?? "3"])}>
            {programs.map((program, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {program.image && typeof program.image === "object" && program.image.url && (
                    <Image
                      src={program.image.url}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  {program.icon && typeof program.icon === "object" && program.icon.url && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full p-2 shadow-lg">
                      <Image src={program.icon.url} alt="" fill className="object-contain p-1" />
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  {program.summary && (
                    <p className="text-muted-foreground mb-4 line-clamp-2">{program.summary}</p>
                  )}

                  {program.stats && program.stats.length > 0 && (
                    <div className="flex gap-4 mb-4 pt-4 border-t border-border">
                      {program.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {program.link?.url && (
                    <Link
                      href={program.link.url}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      {program.link.label || "Learn More"}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
              {programs.map((program, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-48">
                      {program.image && typeof program.image === "object" && program.image.url && (
                        <Image
                          src={program.image.url}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                      {program.summary && (
                        <p className="text-muted-foreground text-sm">{program.summary}</p>
                      )}
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {layout === "accordion" && (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {programs.map((program, index) => (
              <AccordionItem
                key={index}
                value={`program-${index}`}
                className="border rounded-lg px-6 bg-background"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    {program.image && typeof program.image === "object" && program.image.url && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={program.image.url}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{program.title}</h3>
                      {program.summary && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {program.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pl-20">
                    {program.description && (
                      <div className="prose prose-sm max-w-none mb-4">
                        <RichText data={program.description} enableGutter={false} />
                      </div>
                    )}
                    {program.link?.url && (
                      <Link
                        href={program.link.url}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        {program.link.label || "Learn More"}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {showViewAllButton && viewAllLink && (
          <div className="text-center mt-12">
            <Link href={viewAllLink}>
              <Button variant="outline" size="lg">
                View All Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
