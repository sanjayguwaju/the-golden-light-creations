"use client";

import React from "react";
import type { LatestNewsBlock as LatestNewsProps, Post, Media } from "@/payload-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight, Calendar, User } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

interface NewsCardProps {
  post: Post;
  showImages?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  showReadMore?: boolean;
  isFeatured?: boolean;
}

function NewsCard({
  post,
  showImages,
  showExcerpt,
  showDate,
  showAuthor,
  showReadMore,
  isFeatured = false,
}: NewsCardProps) {
  const heroImage = post.heroImage;
  const hasImage = showImages && heroImage != null && typeof heroImage === "object";
  const imageUrl = hasImage ? (heroImage as Media).url : null;
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null;
  const author = post.populatedAuthors?.[0];

  return (
    <Card
      className={cn(
        "group overflow-hidden border-border hover:shadow-lg transition-all duration-300",
        isFeatured && "md:col-span-2"
      )}
    >
      <div className="flex flex-col h-full">
        {hasImage && imageUrl && (
          <div className={cn("relative overflow-hidden", isFeatured ? "h-64" : "h-48")}>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className={cn("flex flex-col flex-1 p-6")}>
          {/* Meta */}
          {(showDate || showAuthor) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              {showDate && publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {publishedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {showAuthor && author && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {author.name}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className={cn("font-bold mb-2 line-clamp-2", isFeatured ? "text-2xl" : "text-xl")}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.meta?.description && (
            <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
              {post.meta.description}
            </p>
          )}

          {/* Read More */}
          {showReadMore && (
            <Link
              href={`/news/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-auto"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

export const LatestNewsBlock: React.FC<LatestNewsProps> = ({
  title,
  subtitle,
  posts,
  layout = "grid",
  columns = "3",
  showImages = true,
  showExcerpt = true,
  showDate = true,
  showAuthor = true,
  showReadMore = true,
  viewAllLink = "/news",
}) => {
  const displayPosts = (posts ?? []).filter(
    (post): post is Post => post != null && typeof post === "object" && "title" in post
  );

  if (!displayPosts.length) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
          </div>
          <p className="text-center text-muted-foreground">No news posts available.</p>
        </div>
      </section>
    );
  }

  const featuredPost = layout === "featuredList" ? displayPosts[0] : null;
  const remainingPosts = layout === "featuredList" ? displayPosts.slice(1) : displayPosts;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        {layout === "grid" && (
          <div className={cn("grid gap-6", columnClasses[columns ?? "3"])}>
            {displayPosts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                showImages={showImages ?? true}
                showExcerpt={showExcerpt ?? true}
                showDate={showDate ?? true}
                showAuthor={showAuthor ?? true}
                showReadMore={showReadMore ?? true}
              />
            ))}
          </div>
        )}

        {/* List Layout */}
        {layout === "list" && (
          <div className="space-y-4">
            {displayPosts.map((post) => {
              const heroImage = post.heroImage;
              const hasImage = showImages && heroImage != null && typeof heroImage === "object";
              const imageUrl = hasImage ? (heroImage as Media).url : null;

              return (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {hasImage && imageUrl && (
                      <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                        <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <CardContent className="flex-1 p-6">
                      <NewsCard
                        post={post}
                        showImages={false}
                        showExcerpt={showExcerpt ?? true}
                        showDate={showDate ?? true}
                        showAuthor={showAuthor ?? true}
                        showReadMore={showReadMore ?? true}
                      />
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Featured + List Layout */}
        {layout === "featuredList" && featuredPost && (
          <div className="space-y-6">
            <NewsCard
              post={featuredPost}
              showImages={showImages ?? true}
              showExcerpt={showExcerpt ?? true}
              showDate={showDate ?? true}
              showAuthor={showAuthor ?? true}
              showReadMore={showReadMore ?? true}
              isFeatured
            />
            <div className={cn("grid gap-6", columnClasses[columns ?? "3"])}>
              {remainingPosts.map((post) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  showImages={showImages ?? true}
                  showExcerpt={showExcerpt ?? true}
                  showDate={showDate ?? true}
                  showAuthor={showAuthor ?? true}
                  showReadMore={showReadMore ?? true}
                />
              ))}
            </div>
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
              {displayPosts.map((post) => (
                <SwiperSlide key={post.id} className="h-auto">
                  <NewsCard
                    post={post}
                    showImages={showImages ?? true}
                    showExcerpt={showExcerpt ?? true}
                    showDate={showDate ?? true}
                    showAuthor={showAuthor ?? true}
                    showReadMore={showReadMore ?? true}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* View All Link */}
        {viewAllLink && (
          <div className="text-center mt-12">
            <Link href={viewAllLink}>
              <Button variant="outline" size="lg">
                View All News
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
