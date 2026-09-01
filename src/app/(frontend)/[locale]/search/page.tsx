import type { Metadata } from "next/types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { Search } from "@/search/Component";
import PageClient from "./page.client";
import type { Post } from "@/payload-types";

type SearchPostData = Pick<Post, "slug" | "categories" | "meta" | "title" | "publishedAt">;
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, FileText, Star, ArrowRight, Clock, Hash } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "search",
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { "meta.description": { like: query } },
              { "meta.title": { like: query } },
              { slug: { like: query } },
            ],
          },
        }
      : {}),
  });

  const results = posts.docs as unknown as SearchPostData[];
  const hasResults = results.length > 0;
  const hasQuery = Boolean(query);

  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      {/* ── Hero Search Section ── */}
      <section className="relative bg-[#0D1B3E] pt-12 pb-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-10 left-10 w-32 h-32 border-0 rounded-none" />
        <div className="absolute bottom-10 right-20 w-48 h-48 border-0 rounded-none" />

        <div className="container max-w-3xl mx-auto px-4 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Search</span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
              What are you looking for?
            </h1>
            <p className="text-white/70 text-lg">Search through posts, news, and articles</p>
          </div>

          {/* Search Input */}
          <Card className="bg-[#FFFFFF] backdrop-blur-md border-0 rounded-none shadow-2xl">
            <CardContent className="p-2">
              <Search />
            </CardContent>
          </Card>

          {/* Query pill */}
          {hasQuery && (
            <div className="mt-6 flex items-center justify-center gap-3 text-white/80">
              <span className="text-sm">Results for</span>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 hover:bg-white/30 text-sm px-3 py-1 rounded-none"
              >
                <Hash className="w-3 h-3 mr-1" />
                {query}
              </Badge>
              <span className="text-white/60 text-sm">
                {hasResults ? `${results.length} found` : "No matches"}
              </span>
            </div>
          )}

          {/* Popular Searches */}
          {!hasQuery && (
            <div className="mt-8 text-center">
              <span className="text-white/50 text-sm mr-3">Popular:</span>
              {["Health", "News", "Services", "Events"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${term}`}
                  className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-none mr-2 transition-all"
                >
                  <Star className="w-3 h-3" />
                  {term}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Results Section ── */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        {/* Initial State */}
        {!hasQuery && (
          <Card className="border-0 rounded-none">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto rounded-none bg-primary/5 flex items-center justify-center mb-6">
                <SearchIcon className="w-10 h-10 text-primary/60" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Start your search</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter keywords above to find posts, articles, and news from our archive.
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {hasQuery && !hasResults && (
          <Card className="border-0 rounded-none">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto rounded-none bg-muted flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">No results found</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn&apos;t find any posts matching &quot;<strong>{query}</strong>&quot;.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-sm text-muted-foreground">Try:</span>
                {["Products", "Company News", "Services"].map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/search?q=${suggestion}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Grid */}
        {hasQuery && hasResults && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">Search Results</h2>
                <Badge variant="secondary" className="text-sm">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </Badge>
              </div>
              <Separator className="flex-1 ml-6" />
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post, index) => {
                const { slug, categories, meta, title, publishedAt } = post;
                const { description, image: metaImage } = meta || {};
                const href = `/posts/${slug}`;
                const hasCategories = Array.isArray(categories) && categories.length > 0;
                const isLarge = index === 0 && results.length > 2;

                return (
                  <Link
                    key={index}
                    href={href}
                    className={cn(
                      "group relative flex flex-col rounded-none border-0 bg-card overflow-hidden",
                      "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                      isLarge && "md:col-span-2 lg:col-span-1 lg:row-span-2"
                    )}
                  >
                    {/* Image */}
                    <div
                      className={cn(
                        "relative w-full bg-muted overflow-hidden",
                        isLarge ? "aspect-[16/10]" : "aspect-[16/9]"
                      )}
                    >
                      {metaImage && typeof metaImage !== "string" ? (
                        <Media
                          resource={metaImage}
                          size="(max-width:768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Categories */}
                      {hasCategories && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {(categories as { title?: string }[])
                            .slice(0, isLarge ? 3 : 2)
                            .map((cat, i) =>
                              typeof cat === "object" && cat.title ? (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-background/90 text-foreground backdrop-blur-sm text-xs px-2 py-1"
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
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        className={cn(
                          "font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug mb-3",
                          isLarge ? "text-xl" : "text-base"
                        )}
                      >
                        {title || "Untitled"}
                      </h3>

                      {/* Description */}
                      {description && (
                        <p
                          className={cn(
                            "text-muted-foreground leading-relaxed flex-1",
                            isLarge ? "text-sm line-clamp-3" : "text-sm line-clamp-2"
                          )}
                        >
                          {description}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-0 flex items-center justify-between">
                        <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          Read article
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Reliance Paints | Search`,
    description: `Search results for Reliance Paints`,
  };
}
