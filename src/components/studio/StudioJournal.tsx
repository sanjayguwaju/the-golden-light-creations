"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, BookOpen, Clock, CalendarDays, ArrowRight } from "lucide-react";
import type { FallbackPostItem } from "@/utilities/studioDefaults";
import { defaultPosts } from "@/utilities/studioDefaults";

interface StudioJournalProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  posts?: FallbackPostItem[];
}

export function StudioJournal({
  eyebrow = "Studio Journal",
  title = "Stories, Craft &",
  highlight = "Perspectives",
  description = "Behind the lens narratives, technical lighting breakdowns, destination wedding diaries, and creative inspirations from Nepal's finest visual team.",
  posts,
}: StudioJournalProps) {
  const postsToRender = posts && posts.length > 0 ? posts : defaultPosts;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FFFDFD] border-b border-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
                {eyebrow}
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#C0171E]/60" />
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] uppercase leading-[0.95]">
              {title} {highlight && <em className="text-[#C0171E] not-italic">{highlight}</em>}
            </h2>

            {description && (
              <p className="font-poppins text-xs sm:text-base text-[#0A0A0A]/70 font-light leading-relaxed max-w-2xl mt-3">
                {description}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#C0171E]/30 bg-white hover:bg-[#C0171E] hover:text-white text-[#C0171E] font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md group"
            >
              <span>View All Journal Entries</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 3 Editorial Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {postsToRender.slice(0, 3).map((post, idx) => (
            <Link
              key={post.id || idx}
              href={`/posts/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-[#C0171E]/15 hover:border-[#C0171E]/40 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full bg-[#FFF5F5] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#C0171E]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Pill */}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/95 backdrop-blur-md border border-[#C0171E]/20 text-[#0A0A0A] font-montserrat font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-md shadow-xs">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
                <div>
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] font-montserrat uppercase tracking-wider text-[#0A0A0A]/50 mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5 text-[#C0171E]" />
                      <span>{post.date}</span>
                    </span>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C0171E]" />
                          <span>{post.readTime}</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-base sm:text-lg text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors leading-snug line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-[#C0171E]/10 flex items-center justify-between text-xs font-montserrat font-bold uppercase tracking-wider text-[#C0171E] group-hover:text-[#A01018] transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
