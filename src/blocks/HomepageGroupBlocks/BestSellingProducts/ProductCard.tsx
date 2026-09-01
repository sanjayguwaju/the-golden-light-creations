import React from "react";
import type { Media } from "@/payload-types";
import { ArrowRight, Star, ShieldCheck, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface BestSellingProductCardItem {
  id?: string | null;
  title: string;
  tagline?: string | null;
  categoryTitle?: string | null;
  image?: Media | string | null;
  slug?: string | null;
  link?: string | null;
  badge?: string | null;
  warranty?: string | null;
  packSizes?: string[] | string | null;
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

export const BestSellingProductCard: React.FC<{
  product: BestSellingProductCardItem;
}> = ({ product }) => {
  // Extract media image URL safely
  let imageUrl: string | null = null;
  let imageAlt = product.title;

  if (product.image && typeof product.image === "object" && "url" in product.image) {
    imageUrl = (product.image as Media).url || null;
    imageAlt = (product.image as Media).alt || product.title;
  } else if (typeof product.image === "string" && product.image.length > 0) {
    imageUrl = product.image;
  }

  const destinationUrl =
    product.link || (product.slug ? `/products/${product.slug}` : "/products");

  const categoryLabel = product.categoryTitle || "Reliance Premium";
  const badgeLabel = product.badge || (product.isComingSoon ? "Coming Soon" : "Best Seller");
  const formattedWarranty = product.warranty ? formatWarrantyLabel(product.warranty) : null;

  // Format pack sizes
  let packSizeList: string[] = [];
  if (Array.isArray(product.packSizes)) {
    packSizeList = product.packSizes.slice(0, 4);
  } else if (typeof product.packSizes === "string" && product.packSizes.length > 0) {
    packSizeList = product.packSizes.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
  }

  return (
    <Link
      href={destinationUrl}
      className="block h-full group active:scale-[0.99] transition-transform focus:outline-hidden"
      aria-label={`View ${product.title} details`}
    >
      <div className="h-full bg-white rounded-none border border-reliance-navy/15 shadow-[4px_4px_0_0_#0D1B3E] hover:border-reliance-navy hover:shadow-[6px_6px_0_0_#C59B27] transition-all duration-300 flex flex-col overflow-hidden">
        {/* Product Image Canvas */}
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DF] overflow-hidden flex items-center justify-center p-6">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
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
            {/* Category / Subcategory subtitle */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-reliance-gold">
                {categoryLabel}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-reliance-navy group-hover:text-reliance-gold transition-colors line-clamp-1">
              {product.title}
            </h3>

            {/* Tagline / Excerpt */}
            {product.tagline && (
              <p className="text-reliance-navy/70 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2rem]">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Available Pack Sizes */}
          {packSizeList.length > 0 && (
            <div className="pt-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono font-semibold uppercase text-reliance-grey mr-1">
                Sizes:
              </span>
              {packSizeList.map((size, idx) => (
                <span
                  key={idx}
                  className="bg-reliance-navy/5 text-reliance-navy border border-reliance-navy/10 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="pt-3 flex items-center justify-between border-t border-reliance-navy/10 text-xs font-bold uppercase tracking-widest text-reliance-navy group-hover:text-reliance-gold transition-colors">
            <span>{product.isComingSoon ? "Learn More" : "View Specifications"}</span>
            <div className="w-8 h-8 bg-reliance-navy/5 group-hover:bg-reliance-gold group-hover:text-reliance-navy flex items-center justify-center transition-all duration-300">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
