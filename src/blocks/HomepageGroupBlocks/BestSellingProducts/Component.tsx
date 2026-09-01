import React from "react";
import type {
  BestSellingProductsBlock as BestSellingProductsBlockProps,
  Product,
  ProductCategory,
  Media,
} from "@/payload-types";
import { BestSellingProductCard, BestSellingProductCardItem } from "./ProductCard";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { isProductComingSoon } from "@/utilities/productUtils";

export const BestSellingProductsBlock: React.FC<
  BestSellingProductsBlockProps & {
    isEnabled?: boolean;
    badge?: string;
    populateBy?: "collection" | "selection" | "custom";
    selectedProducts?: (string | Product)[];
    limit?: number;
    columns?: "2" | "3" | "4";
    viewAllLink?: {
      showLink?: boolean;
      label?: string;
      url?: string;
    };
  }
> = async ({
  isEnabled = true,
  title = "Our Best Selling Paints",
  subtitle = "Our most sought-after coatings and primers, engineered for ultimate coverage, brilliant durability, and vibrant color retention across all seasons.",
  badge = "Best Sellers",
  populateBy = "collection",
  selectedProducts,
  category,
  limit = 6,
  columns = "3",
  viewAllLink = {
    showLink: true,
    label: "View All Products",
    url: "/products",
  },
  customProducts,
}) => {
  if (isEnabled === false) {
    return null;
  }

  const payload = await getPayload({ config: configPromise });
  let productCards: BestSellingProductCardItem[] = [];

  try {
    if (populateBy === "custom" && customProducts && customProducts.length > 0) {
      // 1. Custom Items Mode
      productCards = customProducts.map((p) => ({
        title: p.title,
        tagline: p.tagline,
        categoryTitle: p.categoryTitle || "Reliance Premium",
        image: p.image,
        badge: p.badge || "Best Seller",
        warranty: p.warranty,
        link: p.link || "/products",
        packSizes: p.packSizes || "1L, 4L, 10L, 20L",
        isComingSoon: false,
      }));
    } else if (
      populateBy === "selection" &&
      selectedProducts &&
      selectedProducts.length > 0
    ) {
      // 2. Manual Selection Mode
      if (typeof selectedProducts[0] === "object" && selectedProducts[0] !== null) {
        productCards = (selectedProducts as Product[]).map((doc) => {
          const firstImage = (doc.images as { image: string | Media }[] | undefined)?.[0]?.image;
          const cat = typeof doc.category === "object" && doc.category ? (doc.category as ProductCategory).title : null;
          const packSizes = Array.isArray(doc.packSizes) ? doc.packSizes.map((s) => s.size) : null;
          const comingSoon = isProductComingSoon(doc);

          return {
            id: doc.id,
            title: doc.title,
            tagline: doc.tagline,
            categoryTitle: cat || "Reliance Premium",
            image: firstImage,
            slug: doc.slug,
            link: `/products/${doc.slug}`,
            badge: comingSoon ? "Coming Soon" : "Top Formulation",
            warranty: doc.durability || (doc as any).warranty || null,
            packSizes: packSizes,
            isComingSoon: comingSoon,
          };
        });
      } else {
        const ids = selectedProducts as string[];
        const fetched = await payload.find({
          collection: "products",
          where: {
            id: {
              in: ids,
            },
          },
          depth: 1,
          limit: ids.length,
        });

        // Preserve manual selection order
        productCards = ids
          .map((id) => fetched.docs.find((d) => d.id === id))
          .filter((doc): doc is Product => Boolean(doc))
          .map((doc) => {
            const firstImage = (doc.images as { image: string | Media }[] | undefined)?.[0]?.image;
            const cat = typeof doc.category === "object" && doc.category ? (doc.category as ProductCategory).title : null;
            const packSizes = Array.isArray(doc.packSizes) ? doc.packSizes.map((s) => s.size) : null;
            const comingSoon = isProductComingSoon(doc);

            return {
              id: doc.id,
              title: doc.title,
              tagline: doc.tagline,
              categoryTitle: cat || "Reliance Premium",
              image: firstImage,
              slug: doc.slug,
              link: `/products/${doc.slug}`,
              badge: comingSoon ? "Coming Soon" : "Top Formulation",
              warranty: doc.durability || (doc as any).warranty || null,
              packSizes: packSizes,
              isComingSoon: comingSoon,
            };
          });
      }
    } else {
      // 3. Automatic Collection Mode (Top Products)
      const categoryId = category
        ? typeof category === "string"
          ? category
          : category.id
        : undefined;

      const queryOptions: any = {
        collection: "products",
        limit: limit || 6,
        depth: 1,
        sort: "-updatedAt",
      };

      if (categoryId) {
        queryOptions.where = { category: { equals: categoryId } };
      }

      const result = await payload.find(queryOptions);
      const docs = result.docs as Product[];

      productCards = docs.map((doc, idx) => {
        const firstImage = (doc.images as { image: string | Media }[] | undefined)?.[0]?.image;
        const cat = typeof doc.category === "object" && doc.category ? (doc.category as ProductCategory).title : null;
        const packSizes = Array.isArray(doc.packSizes) ? doc.packSizes.map((s) => s.size) : null;
        const comingSoon = isProductComingSoon(doc);

        return {
          id: doc.id,
          title: doc.title,
          tagline: doc.tagline,
          categoryTitle: cat || "Reliance Premium",
          image: firstImage,
          slug: doc.slug,
          link: `/products/${doc.slug}`,
          badge: comingSoon ? "Coming Soon" : idx === 0 ? "★ #1 Best Seller" : "Best Seller",
          warranty: doc.durability || (doc as any).warranty || null,
          packSizes: packSizes,
          isComingSoon: comingSoon,
        };
      });
    }
  } catch (error) {
    console.error("Error loading BestSellingProductsBlock:", error);
  }

  // Fallback demo items if no products exist
  if (productCards.length === 0) {
    productCards = [
      {
        title: "Reliance Super Premium Emulsion Shine",
        tagline: "Luxurious sheen with high washability and stain-resistant acrylic formula.",
        categoryTitle: "Interior Emulsion",
        slug: "reliance-super-premium-emulsion-shine",
        link: "/products/reliance-super-premium-emulsion-shine",
        badge: "★ #1 Best Seller",
        warranty: "7-10 Yrs",
        packSizes: ["1L", "4L", "10L", "20L"],
        isComingSoon: false,
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
        isComingSoon: false,
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
        isComingSoon: false,
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
        isComingSoon: false,
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
        isComingSoon: false,
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
        isComingSoon: false,
      },
    ];
  }

  // Column layout classes
  let gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (columns === "2") {
    gridColsClass = "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  } else if (columns === "4") {
    gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }

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
        <div className={`grid ${gridColsClass} gap-5 sm:gap-6 md:gap-8`}>
          {productCards.map((card, idx) => (
            <div key={card.id || card.slug || idx} className="h-full">
              <BestSellingProductCard product={card} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        {viewAllLink && viewAllLink.showLink !== false && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href={viewAllLink.url || "/products"}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-reliance-gold hover:text-reliance-navy transition-all duration-300 shadow-[4px_4px_0_0_#0D1B3E] hover:shadow-[6px_6px_0_0_#C59B27] rounded-none group"
            >
              <span>{viewAllLink.label || "View All Products"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
