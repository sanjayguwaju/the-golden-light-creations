import React from "react";
import type { Post } from "@/payload-types";
import { Media } from "@/components/Media";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Clock3, Hash } from "lucide-react";
import { formatDateTime } from "src/utilities/formatDateTime";
import { formatAuthors } from "@/utilities/formatAuthors";
import { cn } from "@/utilities/ui";

export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== "";

  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const hasHeroImage = heroImage && typeof heroImage !== "string";
  const authorName = hasAuthors ? formatAuthors(populatedAuthors) : "";

  const metadataItems = [
    {
      key: "author",
      content: (
        <span className="flex items-center gap-2">
          <User className="w-4 h-4 shrink-0 text-reliance-gold" />
          <span>{authorName}</span>
        </span>
      ),
    },
    ...(publishedAt
      ? [
          {
            key: "date",
            content: (
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 shrink-0 text-reliance-gold" />
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </span>
            ),
          },
        ]
      : []),
    {
      key: "readTime",
      content: (
        <span className="flex items-center gap-2">
          <Clock3 className="w-4 h-4 shrink-0 text-reliance-gold" />
          <span>5 min read</span>
        </span>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* Background with Image or Gradient */}
      <div
        className={cn(
          "relative overflow-hidden",
          hasHeroImage ? "min-h-[70vh]" : "bg-[#0D1B3E] pt-24 pb-16"
        )}
      >
        {hasHeroImage ? (
          <>
            {/* Full-bleed hero image */}
            <div className="absolute inset-0">
              <Media fill priority imgClassName="object-cover" resource={heroImage} />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            {/* Content over image */}
            <div className="relative z-10 container max-w-4xl mx-auto px-4 min-h-[70vh] flex flex-col justify-end pb-16">
              {/* Categories */}
              {hasCategories && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(categories as { title?: string }[]).map((cat, i) =>
                    typeof cat === "object" && cat.title ? (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-white/20 text-white border-0 rounded-none backdrop-blur-sm hover:bg-white/30 text-xs px-3 py-1"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {cat.title}
                      </Badge>
                    ) : null
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
                {title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-white/70">
                {metadataItems.map((item, index) => (
                  <React.Fragment key={item.key}>
                    {index > 0 && <span className="text-white/45">•</span>}
                    <span className="flex items-center gap-2">{item.content}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* No hero image - gradient background */
          <>
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute top-10 left-10 w-32 h-32 border-0 rounded-none" />
            <div className="absolute bottom-10 right-20 w-48 h-48 border-0 rounded-none" />

            <div className="relative container max-w-4xl mx-auto px-4">
              {/* Categories */}
              {hasCategories && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {(categories as { title?: string }[]).map((cat, i) =>
                    typeof cat === "object" && cat.title ? (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-white/15 text-white border-0 rounded-none hover:bg-white/25 text-xs px-3 py-1"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {cat.title}
                      </Badge>
                    ) : null
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
                {title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-white/70">
                {metadataItems.map((item, index) => (
                  <React.Fragment key={item.key}>
                    {index > 0 && <span className="text-white/45">•</span>}
                    <span className="flex items-center gap-2">{item.content}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom curve decoration */}
      {hasHeroImage && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L1440 120L1440 60C1440 60 1140 0 720 0C300 0 0 60 0 60L0 120Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
