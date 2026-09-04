import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import RichText from "@/components/RichText";

import type { Post } from "@/payload-types";

import { PostHero } from "@/heros/PostHero";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Hash, ChevronLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { ActionButtons } from "./ActionButtons";

export const revalidate = 600;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  });

  return posts.docs.map(({ slug }) => ({ slug }));
}

type Args = {
  params: Promise<{
    slug?: string;
    locale: TypedLocale;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "", locale } = await paramsPromise;
  const decodedSlug = decodeURIComponent(slug);
  const url = "/posts/" + decodedSlug;
  const post = await queryPostBySlug({ slug: decodedSlug, locale });

  if (!post) return <PayloadRedirects url={url} />;

  const hasRelated = post.relatedPosts && post.relatedPosts.length > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.meta?.image && typeof post.meta.image !== 'string' ? post.meta.image.url : undefined,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'The Golden Light Creations' }
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* ── Article Header ── */}
      <PostHero post={post} />

      {/* ── Article Content ── */}
      <main className="container max-w-4xl mx-auto px-4">
        {/* Breadcrumb & Meta Bar */}
        <div className="pt-12 pb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2 py-2 text-base font-medium text-[#0A0A0A]/70 transition-all duration-300 hover:text-[#C0171E]"
          >
            <ChevronLeft className="w-4 h-4 text-[#0A0A0A]/50 transition-all duration-300 group-hover:text-[#C0171E] group-hover:-translate-x-1" />
            <span className="transition-all duration-300 group-hover:text-[#C0171E]">
              Back to Stories
            </span>
          </Link>

          <ActionButtons />
        </div>

        {/* Article Body */}
        <article
          className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-bold
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold
          prose-p:text-foreground/80 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[17px]
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
          prose-strong:text-foreground prose-strong:font-bold
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:rounded-none prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic
          prose-img:rounded-none prose-img:shadow-lg prose-img:my-8
          prose-figure:my-8
          prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-0.5 prose-code:rounded-none prose-code:text-sm prose-code:font-medium
          prose-pre:bg-slate-950 prose-pre:rounded-none prose-pre:shadow-lg prose-pre:my-8
          prose-li:text-foreground/80 prose-li:leading-relaxed prose-li:my-2
          prose-ul:my-6 prose-ol:my-6
        "
        >
          <RichText data={post.content} enableGutter={false} />
        </article>

        {/* Article Footer */}
        <div className="py-12 border-0 mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-normal text-white/50">Published on</span>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#F5B301]" />
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm font-medium text-white/80"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </div>

            {Array.isArray(post.categories) && post.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Categories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(post.categories as { title?: string }[]).map((cat, i) =>
                    typeof cat === "object" && cat.title ? (
                        <Badge key={i} variant="outline" className="text-xs">
                        <Hash className="w-3 h-3 mr-1 text-[#F5B301]" />
                        {cat.title}
                      </Badge>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Posts ── */}
        {hasRelated && (
          <section className="py-12 border-0">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-[#F5B301]" />
              <h2 className="text-lg font-semibold text-foreground">Related Stories</h2>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post
                .relatedPosts!.filter((p): p is Post => typeof p === "object")
                .slice(0, 3)
                .map((relatedPost, i) => {
                  const { slug, meta, title, categories, publishedAt } = relatedPost;
                  const hasCategories = Array.isArray(categories) && categories.length > 0;
                  return (
                    <Link
                      key={i}
                      href={`/posts/${slug}`}
                      className="group flex flex-col rounded-none border-0 bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {meta?.image && typeof meta.image !== "string" && (
                        <div className="relative aspect-16/10 w-full bg-muted overflow-hidden">
                          <img
                            src={(meta.image as { url?: string }).url ?? ""}
                            alt={title ?? ""}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {hasCategories && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {(categories as { title?: string }[]).slice(0, 1).map((cat, ci) =>
                                typeof cat === "object" && cat.title ? (
                                  <Badge
                                    key={ci}
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
                      )}
                      <div className="flex flex-col flex-1 p-5">
                        {publishedAt && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
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
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                          {title || "Untitled"}
                        </h3>
                        {meta?.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                            {meta.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "", locale } = await paramsPromise;
  const decodedSlug = decodeURIComponent(slug);
  const post = await queryPostBySlug({ slug: decodedSlug, locale });
  return generateMeta({ doc: post });
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale,
    where: { slug: { equals: slug } },
  });

  return result.docs?.[0] || null;
});
