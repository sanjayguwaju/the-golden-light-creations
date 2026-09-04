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
import { BookOpen, Clock, Hash, ChevronLeft, CalendarDays, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
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
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* ── Article Header ── */}
      <PostHero post={post} />

      {/* ── Article Content ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb & Meta Bar */}
        <div className="pt-10 pb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#C0171E]/10">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2.5 px-4 py-2 bg-[#FFF5F5] border border-[#C0171E]/20 text-[#C0171E] hover:bg-[#C0171E] hover:text-white transition-all text-xs font-montserrat font-bold tracking-wider uppercase rounded-full shadow-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Journal</span>
          </Link>

          <ActionButtons />
        </div>

        {/* Article Body */}
        <article
          className="prose max-w-none py-10
          prose-headings:font-bold prose-headings:text-[#0A0A0A]
          prose-h2:font-bebas prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:tracking-wide prose-h2:text-[#0A0A0A] prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[#C0171E]/15 prose-h2:pb-3
          prose-h3:font-montserrat prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-[#0A0A0A] prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-[#0A0A0A]/85 prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-base sm:prose-p:text-lg font-light
          prose-a:text-[#C0171E] prose-a:font-semibold hover:prose-a:text-[#A01018] hover:prose-a:underline
          prose-strong:text-[#0A0A0A] prose-strong:font-bold
          prose-blockquote:border-l-4 prose-blockquote:border-[#C0171E] prose-blockquote:bg-[#FFF8F8] prose-blockquote:text-[#0A0A0A] prose-blockquote:py-5 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-lg sm:prose-blockquote:text-xl
          prose-img:rounded-xl prose-img:shadow-md prose-img:my-8 prose-img:border prose-img:border-[#C0171E]/10
          prose-figure:my-8
          prose-code:text-[#C0171E] prose-code:bg-[#FFF5F5] prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-li:text-[#0A0A0A]/85 prose-li:leading-relaxed prose-li:my-2
          prose-ul:my-6 prose-ol:my-6
        "
        >
          <RichText data={post.content} enableGutter={false} />
        </article>

        {/* Article Footer & Meta */}
        <div className="py-8 border-t border-b border-[#C0171E]/15 my-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-montserrat uppercase tracking-wider text-[#0A0A0A]/60">Published on</span>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#C0171E]" />
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm font-semibold text-[#0A0A0A]"
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
                <span className="text-xs font-montserrat uppercase tracking-wider text-[#0A0A0A]/60">Categories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(post.categories as { title?: string }[]).map((cat, i) =>
                    typeof cat === "object" && cat.title ? (
                      <Badge key={i} variant="outline" className="text-xs font-montserrat border-[#C0171E]/30 bg-[#FFF5F5] text-[#C0171E]">
                        <Hash className="w-3 h-3 mr-1 text-[#C0171E]" />
                        {cat.title}
                      </Badge>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Author Profile Box ── */}
        <div className="my-10 p-6 sm:p-8 bg-[#FFF8F8] border border-[#C0171E]/15 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#C0171E] text-white flex items-center justify-center font-bebas text-2xl tracking-widest shrink-0 shadow-md border-2 border-[#FFD04A]">
            GL
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h4 className="font-bebas text-2xl tracking-wide text-[#0A0A0A]">
                The Golden Light Creations Editorial
              </h4>
              <span className="text-[10px] font-montserrat uppercase tracking-wider font-bold text-[#C0171E] bg-white px-3 py-1 rounded-full border border-[#C0171E]/20 self-center sm:self-auto">
                Official Studio Storytellers
              </span>
            </div>
            <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed font-light mb-4">
              Based in Kathmandu, Nepal. Our visual storytellers combine cinema-grade hardware, natural light mastery, and human emotion to capture timeless luxury weddings, cinematic reels, and editorial narratives across South Asia.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-[#C0171E] hover:text-[#A01018]"
              >
                <span>Book A Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[#0A0A0A]/30">•</span>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-[#0A0A0A]/70 hover:text-[#C0171E]"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Call To Action Conversion Banner ── */}
        <div className="my-12 p-8 sm:p-12 bg-[#C0171E] text-white rounded-2xl relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block text-[10px] sm:text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#FFD04A] mb-3">
              Ready to Immortalise Your Story?
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white leading-tight mb-3">
              Capture Your Moment in Golden Light
            </h3>
            <p className="font-poppins text-xs sm:text-sm text-white/85 font-light leading-relaxed">
              From intimate Himalayan elopements to grand multi-day celebrations and editorial fashion campaigns, we are ready to bring your vision to life.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#C0171E] hover:bg-[#FFD04A] hover:text-[#0A0A0A] transition-all font-montserrat text-xs font-bold tracking-widest uppercase rounded-full shadow-lg hover:scale-105"
            >
              Inquire Now
            </Link>
          </div>
        </div>

        {/* ── Related Posts ── */}
        {hasRelated && (
          <section className="py-12 border-t border-[#C0171E]/15">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-[#C0171E]" />
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#0A0A0A]">Related Stories</h2>
              <Separator className="flex-1 bg-[#C0171E]/15" />
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
                      className="group flex flex-col rounded-xl border border-[#C0171E]/15 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C0171E]/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      {meta?.image && typeof meta.image !== "string" && (
                        <div className="relative aspect-16/10 w-full bg-[#FFF5F5] overflow-hidden">
                          <img
                            src={(meta.image as { url?: string }).url ?? ""}
                            alt={title ?? ""}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#C0171E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {hasCategories && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {(categories as { title?: string }[]).slice(0, 1).map((cat, ci) =>
                                typeof cat === "object" && cat.title ? (
                                  <Badge
                                    key={ci}
                                    variant="secondary"
                                    className="bg-white/95 text-[#0A0A0A] border border-[#C0171E]/20 text-[10px] px-2 py-0.5"
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
                          <div className="flex items-center gap-1.5 text-xs text-[#0A0A0A]/50 mb-2">
                            <Clock className="w-3.5 h-3.5 text-[#C0171E]" />
                            <time dateTime={publishedAt}>
                              {new Date(publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                        )}
                        <h3 className="font-montserrat font-bold text-sm sm:text-base text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors line-clamp-2 leading-snug mb-2">
                          {title || "Untitled"}
                        </h3>
                        {meta?.description && (
                          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 line-clamp-2 leading-relaxed flex-1">
                            {meta.description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-1 text-xs font-montserrat font-bold text-[#C0171E] group-hover:gap-2 transition-all">
                          <span>Read Story</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
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
