"use client";

import React, { useEffect, useState } from "react";

interface Brand {
  name?: string | null;
  text: string;
  id?: string | null;
}

export const BrandMarquee = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [title, setTitle] = useState("Trusted By Industry Leaders & Retailers Across Nepal");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("/api/pages?where[slug][equals]=home");
        if (res.ok) {
          const data = await res.json();
          const homePage = data.docs?.[0];
          const brandBlock = homePage?.layout?.find(
            (block: any) => block.blockType === "brandMarquee"
          );
          if (brandBlock) {
            if (brandBlock.title) setTitle(brandBlock.title);
            if (brandBlock.brands) setBrands(brandBlock.brands);
          }
        }
      } catch (err) {
        console.error("Failed to fetch brand marquee data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const logos = brands;
  const logoSet = [...logos, ...logos]; // duplicate for seamless loop

  if (logos.length === 0) {
    if (loading) {
      return <div className="py-16 text-center text-sm text-zinc-400">Loading brands...</div>;
    }
    return null;
  }

  return (
    <section className="py-16 bg-white border-t border-zinc-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-reliance-grey">
          {title}
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden select-none">
        <div className="flex animate-marquee gap-8 md:gap-16 whitespace-nowrap">
          {logoSet.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 grayscale hover:grayscale-0 hover:opacity-100 opacity-40 hover:text-reliance-navy transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl font-black tracking-widest text-zinc-400 hover:text-reliance-navy transition-colors">
                {logo.text}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate strip for seamless loop */}
        <div className="flex animate-marquee gap-8 md:gap-16 whitespace-nowrap absolute top-0 left-0">
          {logoSet.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex items-center gap-3 px-6 py-3 grayscale hover:grayscale-0 hover:opacity-100 opacity-40 transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl font-black tracking-widest text-zinc-400">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

