"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

const socialImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80",
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80",
];

export function StudioSocial() {
  return (
    <section id="social" className="bg-[#0A0A0A] py-24 sm:py-32 px-6 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#F5B301] uppercase">
              Follow the Journey
            </span>
            <span className="w-10 h-[1px] bg-[#F5B301]/60" />
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-[0.02em] text-white uppercase leading-none">
            Find Us On
          </h2>
          <a
            href="https://instagram.com/the_golden_creations"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bebas text-3xl sm:text-5xl md:text-6xl tracking-[0.05em] text-[#F5B301] hover:text-[#FFD04A] transition-colors inline-block mt-2"
          >
            @the_golden_creations
          </a>
        </div>

        {/* 12-Square Curated Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {socialImages.map((src, idx) => (
            <a
              key={idx}
              href="https://instagram.com/the_golden_creations"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#111111] border border-white/5"
            >
              <img
                src={src}
                alt={`Instagram highlight ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              {/* Gold Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#F5B301]/60 to-[#0A0A0A]/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-bebas text-2xl text-white tracking-[0.1em] uppercase">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Platform Direct Channels */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <a
            href="https://instagram.com/the_golden_creations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/20 hover:border-[#F5B301] text-white/80 hover:text-[#F5B301] px-6 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 bg-white/[0.02]"
          >
            <Instagram className="w-4 h-4 text-[#F5B301]" />
            <span>Instagram</span>
          </a>
          <a
            href="https://youtube.com/@thegoldenlightcreations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/20 hover:border-[#F5B301] text-white/80 hover:text-[#F5B301] px-6 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 bg-white/[0.02]"
          >
            <Youtube className="w-4 h-4 text-[#F5B301]" />
            <span>YouTube</span>
          </a>
          <a
            href="https://tiktok.com/@thegoldencreations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/20 hover:border-[#F5B301] text-white/80 hover:text-[#F5B301] px-6 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 bg-white/[0.02]"
          >
            <span className="text-[#F5B301] text-sm">🎵</span>
            <span>TikTok</span>
          </a>
          <a
            href="https://facebook.com/thegoldenlightcreations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/20 hover:border-[#F5B301] text-white/80 hover:text-[#F5B301] px-6 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 bg-white/[0.02]"
          >
            <Facebook className="w-4 h-4 text-[#F5B301]" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </section>
  );
}
