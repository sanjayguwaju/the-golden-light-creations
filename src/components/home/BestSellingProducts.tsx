"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Star, ShieldCheck, Sparkles, Clock } from "lucide-react";

export interface BestSellingProductItem {
  id?: string;
  title: string;
  tagline?: string;
  categoryTitle?: string;
  image?: string;
  slug?: string;
  link?: string;
  badge?: string;
  warranty?: string;
  packSizes?: string[];
  isComingSoon?: boolean;
}

function formatWarrantyLabel(warranty: string): string {
  if (!warranty) return "";
  const trimmed = warranty.trim();
  const match = trimmed.match(/(\d+[\s-]*(?:years?|yrs?))/i);
  if (match && trimmed.toLowerCase().includes("warranty")) {
    return `${match[1].replace(/years?/i, "Yrs")} Warranty`;
  }
  return trimmed;
}

const defaultBestSellers: BestSellingProductItem[] = [
  {
    title: "Reliance Super Premium Emulsion Shine",
    tagline: "Luxurious sheen with high washability and stain-resistant acrylic formula.",
    categoryTitle: "Interior Emulsion",
    slug: "reliance-super-premium-emulsion-shine",
    link: "/products/reliance-super-premium-emulsion-shine",
    badge: "★ #1 Best Seller",
    warranty: "7-10 Yrs",
    packSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/reliance-super-premium-emulsion-shine.png",
  },
  {
    title: "Elega Luxury Emulsion",
    tagline: "Velvety smooth matt finish with high opacity for sophisticated living spaces.",
    categoryTitle: "Interior Emulsion",
    slug: "elega-luxury-emulsion",
    link: "/products/elega-luxury-emulsion",
    badge: "Best Seller",
    warranty: "5-7 Yrs",
    packSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/elega-luxury-emulsion.png",
  },
  {
    title: "Ultra Protec Exterior Emulsion Paint",
    tagline: "Heavy-duty weather protection resisting torrential rains, UV heat, and algae.",
    categoryTitle: "Exterior Emulsion",
    slug: "ultra-protec-exterior-emulsion-paint",
    link: "/products/ultra-protec-exterior-emulsion-paint",
    badge: "Best Seller",
    warranty: "10-12 Yrs",
    packSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/ultra-protec-exterior-emulsion-paint.png",
  },
  {
    title: "Reliance Double Dfence",
    tagline: "Advanced elastomeric waterproof coating bridging micro-cracks on exterior walls.",
    categoryTitle: "Waterproofing",
    slug: "reliance-double-dfence",
    link: "/products/reliance-double-dfence",
    badge: "Top Protection",
    warranty: "8-10 Yrs",
    packSizes: ["4L", "10L", "20L"],
    image: "/products/reliance-double-dfence.png",
  },
  {
    title: "Glamour Interior Cement Primer",
    tagline: "Deep penetrating water-based primer neutralizing wall alkalinity.",
    categoryTitle: "Primers & Undercoats",
    slug: "glamour-interior-cement-primer",
    link: "/products/glamour-interior-cement-primer",
    badge: "Essential Base",
    warranty: "5 Yrs",
    packSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/glamour-interior-cement-primer.png",
  },
  {
    title: "Reliance Premium Gloss Enamel",
    tagline: "High-gloss mirror finish for interior and exterior wood, metal, and grills.",
    categoryTitle: "Enamels",
    slug: "reliance-premium-gloss-enamel",
    link: "/products/reliance-premium-gloss-enamel",
    badge: "Mirror Gloss",
    warranty: "5-7 Yrs",
    packSizes: ["500ml", "1L", "4L", "20L"],
    image: "/products/reliance-premium-gloss-enamel.png",
  },
];

export const BestSellingProducts: React.FC<{
  products?: BestSellingProductItem[];
  badge?: string;
  title?: string;
  subtitle?: string;
  viewAllUrl?: string;
  viewAllText?: string;
}> = ({
  products = defaultBestSellers,
  badge = "Best Sellers",
  title = "Our Best Selling Paints",
  subtitle = "Our most sought-after coatings and primers, engineered for ultimate coverage, brilliant durability, and vibrant color retention across all seasons.",
  viewAllUrl = "/products",
  viewAllText = "View All Products",
}) => {
  return (
    <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 md:py-28 border-y border-reliance-navy/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header (Centered consistent with other homepage blocks) */}
        <div className="mb-10 sm:mb-14 md:mb-16 text-center space-y-2.5 sm:space-y-3">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-gold/15 border border-reliance-gold/30 text-reliance-navy text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-reliance-gold" />
              <span>{badge}</span>
            </div>
          )}

          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-reliance-navy">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-reliance-navy/70 max-w-2xl mx-auto font-sans leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {products.slice(0, 6).map((product, idx) => {
            const destUrl = product.link || `/products/${product.slug || ""}`;
            const badgeLabel = product.badge || (product.isComingSoon ? "Coming Soon" : idx === 0 ? "★ #1 Best Seller" : "Best Seller");
            const formattedWarranty = product.warranty ? formatWarrantyLabel(product.warranty) : null;

            return (
              <Link
                key={product.id || product.slug || idx}
                href={destUrl}
                className="block h-full group active:scale-[0.99] transition-transform focus:outline-hidden"
                aria-label={`View ${product.title} details`}
              >
                <div className="h-full bg-white rounded-none border border-reliance-navy/15 shadow-[4px_4px_0_0_#0D1B3E] hover:border-reliance-navy hover:shadow-[6px_6px_0_0_#C59B27] transition-all duration-300 flex flex-col overflow-hidden">
                  {/* Product Image Canvas */}
                  <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DF] overflow-hidden flex items-center justify-center p-6">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-reliance-navy/30 relative">
                        <div className="w-20 h-20 rounded-none bg-reliance-navy/5 border border-reliance-navy/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-reliance-gold/10 group-hover:text-reliance-gold transition-all duration-500">
                          <Sparkles className="w-9 h-9 text-reliance-navy/40 group-hover:text-reliance-navy transition-colors duration-300" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-reliance-navy/40 mt-3 font-semibold">
                          Reliance Paints
                        </span>
                      </div>
                    )}

                    {/* Top Badge Header Row (Single Flex Container — Prevents Overlap) */}
                    <div className="absolute top-0 inset-x-0 p-2.5 sm:p-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
                      {/* Left Badge: Status / Top Seller */}
                      <div className="shrink-0 bg-reliance-navy/90 backdrop-blur-xs text-white px-2 sm:px-2.5 py-1 rounded-none shadow-xs flex items-center gap-1.5 border border-white/20">
                        {product.isComingSoon ? (
                          <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                        ) : (
                          <Star className="w-3 h-3 fill-reliance-gold text-reliance-gold shrink-0" />
                        )}
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                          {badgeLabel}
                        </span>
                      </div>

                      {/* Right Badge: Warranty / Durability / Brand */}
                      {product.warranty ? (
                        <div
                          title={product.warranty}
                          className="min-w-0 max-w-[55%] sm:max-w-[60%] bg-white/95 text-reliance-navy px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs flex items-center gap-1 border border-reliance-navy/10 rounded-none shrink"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{formattedWarranty}</span>
                        </div>
                      ) : (
                        <div className="shrink-0 bg-white/90 text-reliance-navy px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider shadow-xs border border-reliance-navy/10 rounded-none">
                          Reliance
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 flex flex-col grow justify-between bg-white space-y-4">
                    <div className="space-y-2">
                      {/* Category Label */}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-reliance-gold">
                        {product.categoryTitle || "Reliance Premium"}
                      </span>

                      {/* Product Title */}
                      <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-reliance-navy group-hover:text-reliance-gold transition-colors line-clamp-1">
                        {product.title}
                      </h3>

                      {/* Tagline */}
                      {product.tagline && (
                        <p className="text-reliance-navy/70 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2rem]">
                          {product.tagline}
                        </p>
                      )}
                    </div>

                    {/* Pack Sizes */}
                    {product.packSizes && product.packSizes.length > 0 && (
                      <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-mono font-semibold uppercase text-reliance-grey mr-1">
                          Sizes:
                        </span>
                        {product.packSizes.map((size, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-reliance-navy/5 text-reliance-navy border border-reliance-navy/10 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Row */}
                    <div className="pt-3 flex items-center justify-between border-t border-reliance-navy/10 text-xs font-bold uppercase tracking-widest text-reliance-navy group-hover:text-reliance-gold transition-colors">
                      <span>View Specifications</span>
                      <div className="w-8 h-8 bg-reliance-navy/5 group-hover:bg-reliance-gold group-hover:text-reliance-navy flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href={viewAllUrl}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-reliance-gold hover:text-reliance-navy transition-all duration-300 shadow-[4px_4px_0_0_#0D1B3E] hover:shadow-[6px_6px_0_0_#C59B27] rounded-none group"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
