import React from "react";
import type { Media } from "@/payload-types";
import {
  Paintbrush,
  PaintBucket,
  Home,
  Building,
  Trees,
  SprayCan,
  Droplet,
  PaintRoller,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Icon Map ─────────────────
const iconMap: Record<string, React.ElementType> = {
  "paint-brush": Paintbrush,
  "paint-bucket": PaintBucket,
  home: Home,
  building: Building,
  wood: Trees,
  spray: SprayCan,
  drop: Droplet,
  roller: PaintRoller,
  palette: Palette,
};

export const getCategoryIcon = (iconSlug?: string | null) => {
  if (iconSlug && iconMap[iconSlug]) return iconMap[iconSlug];
  return PaintBucket;
};

export interface CategoryCardItem {
  id?: string | null;
  title: string;
  description?: string | null;
  image?: Media | string | null;
  icon?: string | null;
  link?: string | null;
  slug?: string | null;
  productCount?: number | null;
  badge?: string | null;
  displayOrder?: number | null;
}

export const CategoryCard: React.FC<{
  category: CategoryCardItem;
}> = ({ category }) => {
  const Icon = getCategoryIcon(category.icon);

  // Extract media image URL safely
  let imageUrl: string | null = null;
  let imageAlt = category.title;

  if (category.image && typeof category.image === "object" && "url" in category.image) {
    imageUrl = category.image.url || null;
    imageAlt = category.image.alt || category.title;
  } else if (typeof category.image === "string" && category.image.startsWith("http")) {
    imageUrl = category.image;
  }

  const destinationUrl =
    category.link || (category.slug ? `/products/${category.slug}` : "/products");

  const badgeText =
    category.badge ||
    (typeof category.productCount === "number" && category.productCount > 0
      ? `${category.productCount} ${category.productCount === 1 ? "Product" : "Products"}`
      : "Explore Range");

  return (
    <Link
      href={destinationUrl}
      className="block h-full group active:scale-[0.99] transition-transform focus:outline-hidden"
      aria-label={`Explore ${category.title} category`}
    >
      <div className="h-full bg-white rounded-none border border-reliance-navy/15 shadow-[4px_4px_0_0_#0D1B3E] hover:border-reliance-navy hover:shadow-[6px_6px_0_0_#C59B27] transition-all duration-300 flex flex-col overflow-hidden">
        {/* Product Image Area */}
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DF] overflow-hidden flex items-center justify-center p-4">
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
              <div className="w-20 h-20 rounded-full bg-reliance-navy/5 border border-reliance-navy/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-reliance-gold/10 group-hover:text-reliance-gold transition-all duration-500">
                <Icon className="w-10 h-10 text-reliance-navy/40 group-hover:text-reliance-navy transition-colors duration-300" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-reliance-navy/40 mt-3 font-semibold">
                Reliance Paints
              </span>
            </div>
          )}

          {/* Top Badge */}
          <div className="absolute top-3 left-3 bg-reliance-navy/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-none shadow-sm flex items-center gap-1.5 border border-white/20">
            <Icon className="w-3.5 h-3.5 text-reliance-gold" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {badgeText}
            </span>
          </div>

          {/* Quick Indicator Badge */}
          <div className="absolute top-3 right-3 bg-white/90 text-reliance-navy px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider shadow-xs">
            Reliance
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 flex flex-col grow justify-between bg-white space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-reliance-navy group-hover:text-reliance-gold transition-colors">
              {category.title}
            </h3>
            {category.description && (
              <p className="text-reliance-navy/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {category.description}
              </p>
            )}
          </div>

          {/* Explore Button Row */}
          <div className="pt-3 flex items-center justify-between border-t border-reliance-navy/10 text-xs font-bold uppercase tracking-widest text-reliance-navy group-hover:text-reliance-gold transition-colors">
            <span>Explore Collection</span>
            <div className="w-8 h-8 bg-reliance-navy/5 group-hover:bg-reliance-gold group-hover:text-reliance-navy flex items-center justify-center transition-all duration-300">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};


