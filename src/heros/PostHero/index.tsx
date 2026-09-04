import React from "react";
import type { Post } from "@/payload-types";
import { Media } from "@/components/Media";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Clock3, Hash, ChevronRight } from "lucide-react";
import { formatDateTime } from "src/utilities/formatDateTime";
import { formatAuthors } from "@/utilities/formatAuthors";
import { Link } from "@/i18n/routing";

export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== "";

  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const hasHeroImage = heroImage && typeof heroImage !== "string";
  const authorName = hasAuthors ? formatAuthors(populatedAuthors) : "The Golden Light Creations";

  const metadataItems = [
    {
      key: "author",
      content: (
        <span className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 shrink-0 text-[#FFD04A]" />
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
                <CalendarDays className="w-3.5 h-3.5 shrink-0 text-[#FFD04A]" />
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
          <Clock3 className="w-3.5 h-3.5 shrink-0 text-[#FFD04A]" />
          <span>5 min read</span>
        </span>
      ),
    },
  ];

  return (
    <div className="relative w-full bg-[#C0171E] text-white">
      {hasHeroImage ? (
        <div className="relative min-h-[550px] md:min-h-[640px] flex flex-col justify-between overflow-hidden">
          {/* Full-bleed hero image */}
          <div className="absolute inset-0">
            <Media fill priority imgClassName="object-cover" resource={heroImage} />
            {/* Rich crimson gradient overlay for 100% contrast & zero black */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#C0171E] via-[#C0171E]/85 to-[#A01018]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,208,74,0.15),transparent_60%)]" />
          </div>

          {/* Breadcrumb row */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-32 w-full">
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase">
              <Link href="/" className="hover:text-[#FFD04A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#FFD04A]" />
              <Link href="/posts" className="hover:text-[#FFD04A] transition-colors">
                Journal
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/90 truncate max-w-[200px] sm:max-w-xs">{title}</span>
            </div>
          </div>

          {/* Title & Metadata over Crimson */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pb-14 sm:pb-16 w-full">
            {/* Categories */}
            {hasCategories && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(categories as { title?: string }[]).map((cat, i) =>
                  typeof cat === "object" && cat.title ? (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-white/20 text-white border border-white/30 backdrop-blur-md text-[11px] font-montserrat font-bold tracking-wider uppercase px-3 py-1"
                    >
                      <Hash className="w-3 h-3 mr-1 text-[#FFD04A]" />
                      {cat.title}
                    </Badge>
                  ) : null
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wide text-white leading-[1.05] mb-6 drop-shadow-md">
              {title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-montserrat font-medium text-white/85">
              {metadataItems.map((item, index) => (
                <React.Fragment key={item.key}>
                  {index > 0 && <span className="text-white/40">•</span>}
                  <span className="flex items-center gap-2">{item.content}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* No Hero Image - Rich Crimson Studio Header */
        <div className="relative pt-36 pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,208,74,0.18),transparent_60%)]" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-6">
              <Link href="/" className="hover:text-[#FFD04A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#FFD04A]" />
              <Link href="/posts" className="hover:text-[#FFD04A] transition-colors">
                Journal
              </Link>
            </div>

            {/* Categories */}
            {hasCategories && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(categories as { title?: string }[]).map((cat, i) =>
                  typeof cat === "object" && cat.title ? (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-white/20 text-white border border-white/30 backdrop-blur-md text-[11px] font-montserrat font-bold tracking-wider uppercase px-3 py-1"
                    >
                      <Hash className="w-3 h-3 mr-1 text-[#FFD04A]" />
                      {cat.title}
                    </Badge>
                  ) : null
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wide text-white leading-[1.05] mb-6">
              {title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-montserrat font-medium text-white/85">
              {metadataItems.map((item, index) => (
                <React.Fragment key={item.key}>
                  {index > 0 && <span className="text-white/40">•</span>}
                  <span className="flex items-center gap-2">{item.content}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtle border between hero and white article body */}
      <div className="h-1 bg-gradient-to-r from-[#FFD04A]/60 via-white/30 to-[#FFD04A]/60" />
    </div>
  );
};
