import type { Metadata } from "next/types";

import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import PageClient from "./page.client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  CalendarDays,
  ChevronRight,
  ArrowUpRight,
  Star,
  Hash,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/Media";
import type { Post } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { InspirationTab } from "@/components/InspirationTab";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type PostDoc = Pick<Post, "id" | "slug" | "categories" | "meta" | "title" | "publishedAt">;

export default async function Page({ params, searchParams }: Args) {
  const [{ locale }, resolvedSearchParams] = (await Promise.all([
    params,
    searchParams ?? Promise.resolve({}),
  ])) as [
    { locale: TypedLocale },
    Record<string, string | string[] | undefined>,
  ];
  const payload = await getPayload({ config: configPromise });

  const rawPage = resolvedSearchParams.page;
  const parsedPage = Number(Array.isArray(rawPage) ? rawPage[0] : rawPage);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const isFirstPage = currentPage === 1;
  
  const rawTab = resolvedSearchParams.tab;
  const activeTab = Array.isArray(rawTab) ? rawTab[0] : rawTab || "articles";

  const ARCHIVE_POSTS_PER_PAGE = 6;
  const FIRST_PAGE_LIMIT = ARCHIVE_POSTS_PER_PAGE + 1; // 7 on page 1, 6 on others

  const allPosts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: isFirstPage ? FIRST_PAGE_LIMIT : ARCHIVE_POSTS_PER_PAGE,
    page: currentPage,
    overrideAccess: false,
    locale,
    sort: "-publishedAt",
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  });

  // On first page, use first post as featured, rest as archive
  const [featuredPost, ...rest] = (allPosts.docs as unknown as PostDoc[]);
  const docs = isFirstPage && featuredPost ? [featuredPost, ...rest] : allPosts.docs as unknown as PostDoc[];
  const totalDocs = allPosts.totalDocs;

  // Calculate total pages consistently: page 1 shows 7 items, pages 2+ show 6 items
  const totalPages = 1 + Math.ceil(Math.max(0, totalDocs - FIRST_PAGE_LIMIT) / ARCHIVE_POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-page-bg">
      <PageClient />

      {/* ── Elegant Hero ── */}
      <section className="relative bg-[#0D1B3E] pt-12 pb-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-8 left-8 w-24 h-24 border-0 rounded-none" />
        <div className="absolute bottom-8 right-16 w-32 h-32 border-0 rounded-none" />

        <div className="container max-w-5xl mx-auto px-4 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blogs</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-none px-4 py-1.5 text-reliance-gold text-sm mb-6 border-0">
              <Star className="w-4 h-4" />
              <span>Explore Our Range</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {activeTab === "inspiration" ? "Discover Beautiful Spaces" : "Latest from Reliance Paints"}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              {activeTab === "inspiration" 
                ? "Explore our collection of beautifully designed interiors, exteriors, and living spaces to discover color combinations." 
                : "Discover news, insights, and stories about our mission to create positive change in Nepal."}
            </p>
          </div>

          {/* Stats */}
          {activeTab === "articles" && (
            <div className="mt-8 flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-reliance-gold" />
                <span className="text-sm">{totalDocs} articles</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <span className="text-sm">Updated regularly</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-6 border-b border-border mb-10">
          <Link 
            href="?tab=articles" 
            className={cn(
              "pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative",
              activeTab === "articles" ? "text-reliance-navy" : "text-muted-foreground hover:text-reliance-navy"
            )}
            scroll={false}
          >
            Articles
            {activeTab === "articles" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-reliance-gold" />
            )}
          </Link>
          <Link 
            href="?tab=inspiration" 
            className={cn(
              "pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative",
              activeTab === "inspiration" ? "text-reliance-navy" : "text-muted-foreground hover:text-reliance-navy"
            )}
            scroll={false}
          >
            Inspiration
            {activeTab === "inspiration" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-reliance-gold" />
            )}
          </Link>
        </div>

        {activeTab === "inspiration" ? (
          <InspirationTab locale={locale} />
        ) : (
          <>
            {/* Empty State */}
            {docs.length === 0 && (
              <Card className="border-dashed max-w-md mx-auto">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 mx-auto rounded-none bg-muted flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">No posts yet</h2>
                  <p className="text-muted-foreground text-sm">
                    Check back soon for the latest updates and stories.
                  </p>
                </CardContent>
              </Card>
            )}

        {docs.length > 0 && (
          <div className="space-y-12">
            {/* ── Featured Post ── */}
            {isFirstPage && featuredPost && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-1.5 rounded-full border-reliance-gold/25 bg-reliance-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-reliance-gold"
                  >
                    <Star className="h-3.5 w-3.5" />
                    Featured
                  </Badge>

                  <Separator className="flex-1 bg-border/60" />
                </div>

                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="group block rounded-none border-0 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-muted overflow-hidden">
                      {featuredPost.meta?.image && typeof featuredPost.meta.image !== "string" ? (
                        <Media
                          resource={featuredPost.meta.image}
                          size="(max-width:768px) 100vw, 50vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      {/* Category overlay */}
                      {Array.isArray(featuredPost.categories) && featuredPost.categories.length > 0 && (
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                          {(featuredPost.categories as { title?: string }[])
                            .slice(0, 2)
                            .map((cat, i) =>
                              typeof cat === "object" && cat.title ? (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-background/90 text-foreground backdrop-blur-sm text-xs px-3 py-1"
                                >
                                  <Hash className="w-3 h-3 mr-1" />
                                  {cat.title}
                                </Badge>
                              ) : null
                            )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center p-8 md:p-10 gap-4">
                      {featuredPost.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 text-reliance-gold" />
                          <time dateTime={featuredPost.publishedAt}>
                            {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bold text-reliance-navy group-hover:text-primary transition-colors leading-tight">
                        {featuredPost.title || "Untitled"}
                      </h2>
                      {featuredPost.meta?.description && (
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {featuredPost.meta.description}
                        </p>
                      )}
                      <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-reliance-gold group-hover:gap-3 transition-all">
                        Read full article
                        <ArrowUpRight
                          className="w-4 h-4 text-reliance-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ── Posts Grid ── */}
            {rest.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-none bg-reliance-gold/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-reliance-gold" />
                  </div>

                  <h2 className="text-lg font-semibold text-reliance-navy">
                    More Articles
                  </h2>

                  <Separator className="flex-1" />

                  <span className="text-sm text-reliance-grey">
                    {rest.length} articles
                  </span>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, index) => {
                    const { slug, categories, meta, title, publishedAt } = post;
                    const href = `/posts/${slug}`;
                    const hasCategories = Array.isArray(categories) && categories.length > 0;
                    const isLarge = index === 0 || index === 1;

                    return (
                      <Link
                        key={index}
                        href={href}
                        className={cn(
                          "group relative flex flex-col rounded-none border-0 bg-white overflow-hidden shadow-sm",
                          "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                          isLarge && "md:col-span-1"
                        )}
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                          {meta?.image && typeof meta.image !== "string" ? (
                            <Media
                              resource={meta.image}
                              size="(max-width:768px) 100vw, 33vw"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileText className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Categories */}
                          {hasCategories && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                              {(categories as { title?: string }[]).slice(0, 2).map((cat, i) =>
                                typeof cat === "object" && cat.title ? (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-background/90 text-foreground backdrop-blur-sm text-[10px] px-2 py-0.5"
                                  >
                                    {cat.title}
                                  </Badge>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-5">
                          {/* Date */}
                          {publishedAt && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                              <Clock className="w-3.5 h-3.5 text-reliance-gold" />
                              <time dateTime={publishedAt}>
                                {new Date(publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </time>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="font-semibold text-reliance-navy text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                            {title || "Untitled"}
                          </h3>

                          {/* Description */}
                          {meta?.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                              {meta.description}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="mt-4 pt-3 flex items-center justify-between transition-all duration-300">
                            <span className="text-sm font-semibold text-reliance-navy transition-colors duration-300 group-hover:text-reliance-gold">
                              Read article
                            </span>

                            <ArrowUpRight className="w-4 h-4 text-reliance-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="pt-2">
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/${locale}/posts`}
                />
              </div>
            )}
          </div>
        )}
        </>
        )}
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Reliance Paints | Posts`,
    description: `Explore the latest posts from Reliance Paints`,
  };
}
