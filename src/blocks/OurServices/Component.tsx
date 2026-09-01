import React from "react";
import type { OurServicesBlock as OurServicesBlockProps, ProductCategory } from "@/payload-types";
import { CategoryCard, CategoryCardItem } from "./CategoryCard";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Paintbrush, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Main Dynamic Block ─────────────────
export const OurServicesBlock: React.FC<
  OurServicesBlockProps & {
    isEnabled?: boolean;
    badge?: string;
    populateBy?: "collection" | "selection" | "custom";
    selectedCategories?: (string | ProductCategory)[];
    limit?: number;
    sortBy?: string;
    columns?: "2" | "3" | "4";
    viewAllLink?: {
      showLink?: boolean;
      label?: string;
      url?: string;
    };
  }
> = async ({
  isEnabled = true,
  title = "Products We Offer",
  subtitle = "We offer a wide range of the best quality products.",
  badge = "Catalog Range",
  populateBy = "collection",
  selectedCategories,
  limit = 6,
  sortBy = "-createdAt",
  columns = "3",
  viewAllLink = {
    showLink: true,
    label: "View All Products",
    url: "/products",
  },
  categories,
  isVisibleOnHomepage,
}) => {
  // Support block disablement and legacy isVisibleOnHomepage
  if (isEnabled === false || (isVisibleOnHomepage === false && isEnabled === undefined)) {
    return null;
  }

  const payload = await getPayload({ config: configPromise });
  let categoryCards: CategoryCardItem[] = [];

  try {
    if (populateBy === "custom" && categories && categories.length > 0) {
      // 1. Custom Items Mode
      categoryCards = categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
        description: cat.description,
        image: cat.image,
        icon: cat.icon || "paint-bucket",
        link: cat.link || (cat.title ? `/products/${encodeURIComponent(cat.title)}` : "/products"),
        productCount: null,
        displayOrder: typeof (cat as any).displayOrder === 'number' ? (cat as any).displayOrder : 9999,
      }));
    } else if (
      populateBy === "selection" &&
      selectedCategories &&
      selectedCategories.length > 0
    ) {
      // 2. Manual Selection Mode
      if (typeof selectedCategories[0] === "object" && selectedCategories[0] !== null) {
        categoryCards = (selectedCategories as ProductCategory[]).map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          image: doc.image,
          icon: "paint-bucket",
          slug: doc.slug,
          link: `/products/${doc.slug}`,
          displayOrder: doc.displayOrder,
        }));
      } else {
        const ids = selectedCategories as string[];
        const fetched = await payload.find({
          collection: "product-categories",
          where: {
            id: {
              in: ids,
            },
          },
          depth: 1,
          limit: ids.length,
        });

        // Preserve manual selection order
        categoryCards = ids
          .map((id) => fetched.docs.find((d) => d.id === id))
          .filter((doc): doc is ProductCategory => Boolean(doc))
          .map((doc) => ({
            id: doc.id,
            title: doc.title,
            description: doc.description,
            image: doc.image,
            icon: "paint-bucket",
            slug: doc.slug,
            link: `/products/${doc.slug}`,
            displayOrder: doc.displayOrder,
          }));
      }
    } else {
      // 3. Collection (Auto) Mode
      const fetchLimit = limit && limit > 0 ? limit : 6;
      const sortField = (sortBy === "-createdAt" || !sortBy) ? "displayOrder" : sortBy;

      const fetchedCategories = await payload.find({
        collection: "product-categories",
        depth: 1,
        limit: 100, // Fetch more to allow in-memory sorting of nulls to the bottom
        sort: sortField === "displayOrder" ? undefined : sortField, // Don't let mongo sort if displayOrder, we do it in memory
      });

      let docs = fetchedCategories.docs;

      if (sortField === "displayOrder") {
        docs.sort((a, b) => {
          const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
          const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
          return aOrder - bOrder;
        });
      }

      docs = docs.slice(0, fetchLimit);

      categoryCards = docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        image: doc.image,
        icon: "paint-bucket",
        slug: doc.slug,
        link: `/products/${doc.slug}`,
        displayOrder: doc.displayOrder,
      }));
    }

    // Force global sorting by displayOrder across ALL modes (Manual, Auto, Custom)
    // so it perfectly matches the Categories page
    categoryCards.sort((a, b) => {
      const aOrder = typeof a.displayOrder === 'number' ? a.displayOrder : 9999;
      const bOrder = typeof b.displayOrder === 'number' ? b.displayOrder : 9999;
      return aOrder - bOrder;
    });

  } catch (error) {
    console.error("Error fetching categories in OurServicesBlock:", error);
  }

  // Graceful fallback to legacy categories if DB query returned nothing
  if (categoryCards.length === 0 && categories && categories.length > 0) {
    categoryCards = categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      image: cat.image,
      icon: cat.icon || "paint-bucket",
      link: cat.link || (cat.title ? `/products/${encodeURIComponent(cat.title)}` : "/products"),
    }));
  }

  if (categoryCards.length === 0) return null;

  // Aggregate live product count for each category
  const categoryIds = categoryCards
    .map((c) => c.id)
    .filter((id): id is string => Boolean(id));

  if (categoryIds.length > 0) {
    try {
      const productsRes = await payload.find({
        collection: "products",
        where: {
          category: { in: categoryIds },
        },
        depth: 0,
        limit: 1000,
        select: {
          category: true,
        },
      });

      const counts: Record<string, number> = {};
      productsRes.docs.forEach((p) => {
        const cat = p.category;
        const catId = typeof cat === "object" && cat !== null ? (cat as { id: string }).id : (cat as string);
        if (catId) {
          counts[catId] = (counts[catId] || 0) + 1;
        }
      });

      categoryCards.forEach((c) => {
        if (c.id && counts[c.id] !== undefined) {
          c.productCount = counts[c.id];
        }
      });
    } catch (err) {
      console.error("Error aggregating category product counts:", err);
    }
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
        {/* Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 text-center space-y-2.5 sm:space-y-3">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-reliance-gold/15 border border-reliance-gold/30 text-reliance-navy text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <Paintbrush className="w-3.5 h-3.5 text-reliance-gold" />
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

        {/* Categories Grid */}
        <div className={`grid ${gridColsClass} gap-5 sm:gap-6 md:gap-8`}>
          {categoryCards.map((category, index) => (
            <CategoryCard key={category.id || category.slug || index} category={category} />
          ))}
        </div>

        {/* View All CTA */}
        {viewAllLink && viewAllLink.showLink !== false && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href={viewAllLink.url || "/products"}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-reliance-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-reliance-gold hover:text-reliance-navy transition-all duration-300 shadow-[4px_4px_0_0_#0D1B3E] hover:shadow-[6px_6px_0_0_#C59B27]"
            >
              <span>{viewAllLink.label || "View All Products"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

