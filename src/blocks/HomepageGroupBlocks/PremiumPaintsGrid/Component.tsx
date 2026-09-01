import React from "react";
import type {
  PremiumPaintsGridBlock as PremiumPaintsGridBlockProps,
  Media,
  Product,
} from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";
import { PremiumPaintsGrid } from "@/components/home/PremiumPaintsGrid";
import type { GridCard } from "@/components/home/PremiumPaintsGrid";

// Span class mapping (with mobile responsiveness to prevent overflow)
const SPAN_CLASS: Record<string, string> = {
  tall: "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
  wide: "col-span-1 md:col-span-2 row-span-1",
  large: "col-span-1 md:col-span-2 row-span-2",
};

function resolveImageUrl(media: string | Media | null | undefined): string {
  if (!media) return "/hero-2.png";
  if (typeof media === "string") return media;
  return (media as Media).url ?? "/hero-2.png";
}


export const PremiumPaintsGridBlock: React.FC<PremiumPaintsGridBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config });
  let cards: GridCard[] = [];

  // ── Auto mode: fetch by category ─────────────────────────────────────────
  if (props.populateBy === "category") {
    const categoryId = props.category
      ? typeof props.category === "string"
        ? props.category
        : props.category.id
      : undefined;

    const queryOptions: any = {
      collection: "products",
      limit: props.limit ?? 4,
      depth: 1,
    };

    if (categoryId) {
      queryOptions.where = { category: { equals: categoryId } };
    }

    const result = await payload.find(queryOptions);
    const docs = result.docs as Product[];

    const SPANS = ["tall", "square", "wide", "tall"] as const;

    cards = docs.map((product, i) => {
      const firstImage = (product.images as { image: string | Media }[] | undefined)?.[0]?.image;

      let surface = product.tagline ?? "";
      if (
        !surface &&
        product.category &&
        typeof product.category === "object" &&
        "title" in product.category
      ) {
        surface = (product.category as any).title ?? "";
      }

      return {
        title: product.title,
        surface,
        image: resolveImageUrl(firstImage as string | Media | undefined),
        spanClass: SPAN_CLASS[SPANS[i % SPANS.length]],
        linkUrl: `/products/${product.slug}`,
      };
    });
  } else {
    // ── Manual mode ────────────────────────────────────────────────────────
    if (props.cards && props.cards.length > 0) {
      cards = await Promise.all(
        props.cards.map(async (card) => {
          let product: Product | null = null;

          if (card.product) {
            if (typeof card.product === "string") {
              try {
                product = await payload.findByID({
                  collection: "products",
                  id: card.product,
                  depth: 1,
                });
              } catch {
                product = null;
              }
            } else {
              product = card.product as Product;
            }
          }

          const firstProductImage = (
            product?.images as { image: string | Media }[] | undefined
          )?.[0]?.image;

          const title = card.overrideTitle ?? product?.title ?? "Paint Product";

          let surface = card.overrideSurface ?? product?.tagline ?? "";
          if (
            !surface &&
            product?.category &&
            typeof product.category === "object" &&
            "title" in product.category
          ) {
            surface = (product.category as any).title ?? "";
          }

          let defaultImage = "/hero-2.png";
          if (title === "WeatherShield") {
            defaultImage = "/hero-1.png";
          } else if (title === "WoodPro X") {
            defaultImage = "/hero-slide2.png";
          } else if (title === "SuperClean Matt") {
            defaultImage = "/hero-slide3.png";
          }

          const image = card.overrideImage
            ? resolveImageUrl(card.overrideImage as string | Media)
            : firstProductImage
              ? resolveImageUrl(firstProductImage as string | Media)
              : defaultImage;
          const linkUrl = card.linkUrl ?? (product?.slug ? `/products/${product.slug}` : "#");
          const spanClass = SPAN_CLASS[card.span ?? "tall"];

          return { title, surface, image, spanClass, linkUrl };
        })
      );
    } else {
      // Dynamic fallback: fetch the first 4 products when no manual cards are specified
      const result = await payload.find({
        collection: "products",
        limit: 4,
        depth: 1,
      });
      const docs = result.docs as Product[];

      const SPANS = ["tall", "square", "wide", "tall"] as const;

      cards = docs.map((product, i) => {
        const firstImage = (product.images as { image: string | Media }[] | undefined)?.[0]?.image;

        let surface = product.tagline ?? "";
        if (
          !surface &&
          product.category &&
          typeof product.category === "object" &&
          "title" in product.category
        ) {
          surface = (product.category as any).title ?? "";
        }

        return {
          title: product.title,
          surface,
          image: resolveImageUrl(firstImage as string | Media | undefined),
          spanClass: SPAN_CLASS[SPANS[i % SPANS.length]],
          linkUrl: `/products/${product.slug}`,
        };
      });
    }
  }

  const finalCards = cards;

  return (
    <PremiumPaintsGrid
      heading={props.heading}
      subheading={props.subheading ?? undefined}
      cards={finalCards}
      viewAllLink={props.viewAllLink ?? undefined}
    />
  );
};
