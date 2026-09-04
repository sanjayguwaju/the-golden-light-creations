import type { Metadata } from "next/types";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import PageClient from "./page.client";
import { notFound } from "next/navigation";
import { Media } from "@/components/Media";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/utilities/ui";

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale } = await paramsPromise;
  const payload = await getPayload({ config: configPromise });

  const sanitizedPageNumber = Number(pageNumber);

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound();

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    locale,
    sort: "-publishedAt",
  });

  if (!posts.docs || (posts.docs.length === 0 && sanitizedPageNumber > 1)) {
    notFound();
  }

  const { docs, totalDocs, totalPages } = posts;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <PageClient />

      {/* ── Hero Header ── */}
      <section className="bg-[#C0171E] text-white pt-32 pb-14 sm:pb-16 px-4 sm:px-8 border-b border-[#A01018]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-white/70 uppercase mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <Link href="/posts" className="hover:text-white transition-colors">
              Journal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white font-bold">Page {sanitizedPageNumber}</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#FFD04A] uppercase">
              Studio Journal
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#FFD04A]/60" />
          </div>

          {/* Title */}
          <h1 className="font-bebas text-4xl sm:text-7xl md:text-8xl tracking-[0.02em] uppercase leading-none mb-3 sm:mb-4 text-white">
            Stories, Craft & <em className="text-[#FFD04A] not-italic">Perspectives</em>
          </h1>

          {/* Description */}
          <p className="font-poppins text-xs sm:text-base text-white/90 max-w-2xl font-light leading-relaxed mb-6 sm:mb-8">
            Behind the lens narratives, technical lighting breakdowns, destination wedding diaries, and creative inspirations from Nepal&apos;s finest visual team.
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 text-white/80 font-montserrat text-xs tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FFD04A]" />
              <span className="font-semibold text-white">Page {sanitizedPageNumber} of {totalPages}</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/25" />
            <span className="text-white/70">{totalDocs} Total Stories</span>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {docs.length === 0 ? (
          <Card className="border-[#C0171E]/15 bg-[#FFF5F5] max-w-md mx-auto">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <FileText className="w-8 h-8 text-[#C0171E]/60" />
              </div>
              <h2 className="font-bebas text-2xl tracking-wide uppercase text-[#0A0A0A] mb-2">No stories yet</h2>
              <p className="font-poppins text-[#0A0A0A]/60 text-sm font-light">
                Check back soon for stories, photo essays, and studio insights.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#C0171E]/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#C0171E]" />
                </div>

                <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide uppercase text-[#0A0A0A]">
                  Articles — Page {sanitizedPageNumber}
                </h2>

                <Separator className="flex-1 bg-[#C0171E]/15" />

                <span className="font-montserrat text-xs text-[#0A0A0A]/60 tracking-wider uppercase font-semibold">
                  {docs.length} articles
                </span>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((post, index) => {
                  const { slug, categories, meta, title, publishedAt } = post;
                  const href = `/posts/${slug}`;
                  const hasCategories = Array.isArray(categories) && categories.length > 0;

                  return (
                    <Link
                      key={index}
                      href={href}
                      className={cn(
                        "group relative flex flex-col rounded-xl border border-[#C0171E]/15 bg-white overflow-hidden shadow-sm",
                        "hover:border-[#C0171E]/40 hover:-translate-y-1 transition-all duration-300"
                      )}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full bg-[#FFF5F5] overflow-hidden">
                        {meta?.image && typeof meta.image !== "string" ? (
                          <Media
                            resource={meta.image}
                            size="(max-width:768px) 100vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="w-10 h-10 text-[#C0171E]/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#C0171E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Categories */}
                        {hasCategories && (
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                            {(categories as { title?: string }[]).slice(0, 2).map((cat, i) =>
                              typeof cat === "object" && cat.title ? (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-white/95 text-[#0A0A0A] font-montserrat font-bold uppercase tracking-wider backdrop-blur-md border border-[#C0171E]/20 text-[10px] px-2 py-0.5 shadow-sm"
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
                          <div className="flex items-center gap-1.5 font-montserrat text-xs text-[#0A0A0A]/50 mb-3 tracking-wider uppercase font-medium">
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

                        {/* Title */}
                        <h3 className="font-montserrat font-bold text-base sm:text-lg text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors line-clamp-2 mb-2 leading-snug">
                          {title || "Untitled"}
                        </h3>

                        {/* Description */}
                        {meta?.description && (
                          <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light line-clamp-2 leading-relaxed flex-1">
                            {meta.description}
                          </p>
                        )}

                        {/* CTA */}
                        <div className="mt-4 pt-3 border-t border-[#C0171E]/10 flex items-center justify-between transition-all duration-300">
                          <span className="font-montserrat text-xs uppercase tracking-wider font-bold text-[#0A0A0A]/70 transition-colors duration-300 group-hover:text-[#C0171E]">
                            Read Story
                          </span>

                          <ArrowUpRight className="w-4 h-4 text-[#C0171E] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4 flex justify-center">
                <Pagination
                  page={sanitizedPageNumber}
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise;
  return {
    title: `The Golden Light Creations | Stories Page ${pageNumber || ""}`,
    description: `Explore stories, insights, and behind-the-scenes from The Golden Light Creations.`,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { totalDocs } = await payload.count({
    collection: "posts",
    overrideAccess: false,
  });

  const totalPages = Math.ceil(totalDocs / 12);

  const pages: { pageNumber: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) });
  }

  return pages;
}
