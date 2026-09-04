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
  Sparkles,
  Hash,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/Media";
import type { Post } from "@/payload-types";
import { cn } from "@/utilities/ui";

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
  const [featuredPost, ...rest] = allPosts.docs as unknown as PostDoc[];
  const docs = isFirstPage && featuredPost ? [featuredPost, ...rest] : (allPosts.docs as unknown as PostDoc[]);
  const totalDocs = allPosts.totalDocs;

  // Calculate total pages consistently: page 1 shows 7 items, pages 2+ show 6 items
  const totalPages = 1 + Math.ceil(Math.max(0, totalDocs - FIRST_PAGE_LIMIT) / ARCHIVE_POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <PageClient />

      {/* ── Studio Hero ── */}
      <section className="relative bg-[#050505] pt-28 pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,179,1,0.06),transparent_60%)]" />

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs tracking-wider uppercase mb-6">
            <Link href="/" className="hover:text-[#F5B301] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F5B301]">Journal & Stories</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#F5B301]/10 border border-[#F5B301]/20 rounded-full px-4 py-1 text-[#F5B301] text-xs uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Journal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
              Stories, Craft & <span className="font-serif italic text-[#F5B301]">Perspectives</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Behind the lens narratives, technical lighting breakdowns, destination wedding diaries, and creative inspirations from Nepal&apos;s finest visual team.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6 text-white/50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F5B301]" />
              <span className="text-sm font-light">{totalDocs} Stories Published</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/20" />
            <span className="text-sm font-light text-white/40">Updated Regularly</span>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Empty State */}
        {docs.length === 0 && (
          <Card className="border-white/10 bg-white/5 max-w-md mx-auto">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white/40" />
              </div>
              <h2 className="text-lg font-medium text-white mb-2">No stories yet</h2>
              <p className="text-white/50 text-sm font-light">
                Check back soon for stories, photo essays, and studio insights.
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
                    className="inline-flex items-center gap-1.5 rounded-full border-[#F5B301]/40 bg-[#F5B301]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#F5B301]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured Story
                  </Badge>

                  <Separator className="flex-1 bg-white/10" />
                </div>

                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="group block rounded-xl border border-white/10 bg-[#121212] overflow-hidden shadow-2xl hover:border-[#F5B301]/40 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-black overflow-hidden">
                      {featuredPost.meta?.image && typeof featuredPost.meta.image !== "string" ? (
                        <Media
                          resource={featuredPost.meta.image}
                          size="(max-width:768px) 100vw, 50vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-16 h-16 text-white/20" />
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
                                  className="bg-black/70 text-white backdrop-blur-md border border-white/10 text-xs px-3 py-1"
                                >
                                  <Hash className="w-3 h-3 mr-1 text-[#F5B301]" />
                                  {cat.title}
                                </Badge>
                              ) : null
                            )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center p-8 md:p-12 gap-4">
                      {featuredPost.publishedAt && (
                        <div className="flex items-center gap-2 text-xs text-white/50 tracking-wider uppercase">
                          <CalendarDays className="w-3.5 h-3.5 text-[#F5B301]" />
                          <time dateTime={featuredPost.publishedAt}>
                            {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#F5B301] transition-colors leading-tight">
                        {featuredPost.title || "Untitled"}
                      </h2>
                      {featuredPost.meta?.description && (
                        <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed line-clamp-3">
                          {featuredPost.meta.description}
                        </p>
                      )}
                      <div className="pt-4 flex items-center gap-2 text-sm font-medium text-[#F5B301] group-hover:gap-3 transition-all">
                        <span>Read Full Story</span>
                        <ArrowUpRight className="w-4 h-4 text-[#F5B301] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
                  <div className="w-8 h-8 rounded-full bg-[#F5B301]/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#F5B301]" />
                  </div>

                  <h2 className="text-lg font-light text-white">More Stories & Insights</h2>

                  <Separator className="flex-1 bg-white/10" />

                  <span className="text-xs text-white/40 tracking-wider uppercase">
                    {rest.length} articles
                  </span>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, index) => {
                    const { slug, categories, meta, title, publishedAt } = post;
                    const href = `/posts/${slug}`;
                    const hasCategories = Array.isArray(categories) && categories.length > 0;

                    return (
                      <Link
                        key={index}
                        href={href}
                        className={cn(
                          "group relative flex flex-col rounded-xl border border-white/10 bg-[#121212] overflow-hidden shadow-sm",
                          "hover:border-[#F5B301]/40 hover:-translate-y-1 transition-all duration-300"
                        )}
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                          {meta?.image && typeof meta.image !== "string" ? (
                            <Media
                              resource={meta.image}
                              size="(max-width:768px) 100vw, 33vw"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileText className="w-10 h-10 text-white/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Categories */}
                          {hasCategories && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                              {(categories as { title?: string }[]).slice(0, 2).map((cat, i) =>
                                typeof cat === "object" && cat.title ? (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-black/70 text-white backdrop-blur-md border border-white/10 text-[10px] px-2 py-0.5"
                                  >
                                    {cat.title}
                                  </Badge>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          {/* Date */}
                          {publishedAt && (
                            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3 tracking-wider uppercase">
                              <Clock className="w-3.5 h-3.5 text-[#F5B301]" />
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
                          <h3 className="font-light text-lg text-white group-hover:text-[#F5B301] transition-colors line-clamp-2 mb-2 leading-snug">
                            {title || "Untitled"}
                          </h3>

                          {/* Description */}
                          {meta?.description && (
                            <p className="text-sm text-white/50 font-light line-clamp-2 leading-relaxed flex-1">
                              {meta.description}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between transition-all duration-300">
                            <span className="text-xs uppercase tracking-wider font-medium text-white/70 transition-colors duration-300 group-hover:text-[#F5B301]">
                              Read Story
                            </span>

                            <ArrowUpRight className="w-4 h-4 text-[#F5B301] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
              <div className="pt-4 flex justify-center">
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/${locale}/posts`}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `The Golden Light Creations | Journal & Stories`,
    description: `Explore behind-the-scenes stories, cinematography insights, and photo essays from The Golden Light Creations.`,
  };
}
