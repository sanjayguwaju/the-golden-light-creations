"use client";

import React, { useRef } from "react";
import type { Media, Category } from "@/payload-types";
import { Link } from "@/i18n/routing";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface HighlightNewsItem {
  id?: string | number | null;
  title?: string | null;
  slug?: string | null;
  publishedDate?: string | null;
  publishedAt?: string | null;
  category?: Category | string | null;
  categories?: (Category | string | null)[] | null;
  _collection?: string;
  isPinned?: boolean;
  image?: Media | string | null;
  mainDocument?: Media | string | null;
  heroImage?: Media | string | null;
}

interface HighlightsAndNewsClientProps {
  highlights: HighlightNewsItem[];
  news: HighlightNewsItem[];
  highlightsTitle: string;
  newsTitle: string;
}

export const HighlightsAndNewsClient: React.FC<HighlightsAndNewsClientProps> = ({
  highlights,
  news,
  highlightsTitle,
  newsTitle,
}) => {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const highlightItems = containerRef.current.querySelectorAll(".highlight-item");
      const newsItems = containerRef.current.querySelectorAll(".news-item");
      if (highlightItems.length) {
        gsap.from(highlightItems, {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        });
      }
      if (newsItems.length) {
        gsap.from(newsItems, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column: Highlights */}
      <div className="flex flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2 h-7 bg-accent rounded-full" />
          <h2 className="text-xl lg:text-2xl font-bold text-primary uppercase tracking-tight">
            {highlightsTitle || "Company Highlights"}
          </h2>
        </div>

        <div className="flex flex-col">
          {highlights.map((item, index) => {
            const isPost = item._collection === "posts";
            const href = isPost ? `/posts/${item.slug}` : `/list/${item.slug}`;

            return (
              <div
                key={item.id}
                className="highlight-item flex items-center gap-4 py-4 border-b border-border hover:bg-muted/50 -mx-4 px-4 rounded-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="w-1.5 h-10 bg-accent rounded-full shrink-0 group-hover:scale-y-110 transition-transform shadow-[0_4px_12px_rgba(225,29,72,0.2)]" />
                <Link href={href} className="flex-1">
                  <h3 className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                    {item.title}
                  </h3>
                </Link>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
          {highlights.length === 0 && (
            <p className="text-muted-foreground italic py-4">{t("no-highlights")}</p>
          )}
        </div>
      </div>

      {/* Right Column: Latest News */}
      <div className="flex flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2 h-7 bg-primary rounded-full" />
          <h2 className="text-xl lg:text-2xl font-bold text-primary uppercase tracking-tight">
            {newsTitle || "Latest Activities"}
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {news.map((item, index) => {
            const isPost = item._collection === "posts";
            const imageUrl =
              ((item.image || item.heroImage) as Media)?.url ||
              "https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg";
            const href = isPost ? `/posts/${item.slug}` : `/list/${item.slug}`;

            return (
              <div
                key={item.id}
                className="news-item flex items-center gap-4 py-4 border-b border-border hover:bg-muted/50 -mx-4 px-4 rounded-2xl transition-all duration-300 group"
              >
                <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden bg-background border border-border shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={imageUrl || ""}
                    alt={item.title || ""}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={href}>
                    <h3 className="text-[15px] font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 block">
                    {item.publishedDate
                      ? new Date(item.publishedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "Recent"}
                  </span>
                </div>

                {!isPost && item.mainDocument && (
                  <Link
                    href={
                      typeof item.mainDocument === "string"
                        ? item.mainDocument
                        : (item.mainDocument as Media)?.url || "#"
                    }
                    target="_blank"
                    className="shrink-0"
                  >
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 h-10 px-5 rounded-xl text-[11px] font-bold shadow-sm transition-all active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">PDF</span>
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
          {news.length === 0 && (
            <p className="text-muted-foreground italic py-4">{t("no-latest-news")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);
