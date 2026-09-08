import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface V5PortfolioItem {
  title: string;
  image?: any;
  imageUrl?: string;
  size?: "standard" | "tall";
  link?: string;
}

export interface V5PortfolioBlockProps {
  eyebrow?: string;
  title?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: V5PortfolioItem[];
}

const defaultPortfolioList: V5PortfolioItem[] = [
  {
    title: "Wedding — Kathmandu",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
    size: "tall",
  },
  {
    title: "Bride Portrait — Pokhara",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85",
    size: "standard",
  },
  {
    title: "Corporate Gala",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85",
    size: "standard",
  },
  {
    title: "Fashion Editorial",
    imageUrl:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
    size: "tall",
  },
  {
    title: "Couple Session — Nagarkot",
    imageUrl:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85",
    size: "standard",
  },
  {
    title: "Concert Coverage",
    imageUrl:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&q=85",
    size: "standard",
  },
];

export function V5PortfolioBlockComponent({
  eyebrow = "Our Work",
  title = "A visual portfolio, shaped by light",
  ctaText = "Explore Full Portfolio",
  ctaLink = "/portfolio",
  items = defaultPortfolioList,
}: V5PortfolioBlockProps) {
  const portfolioItems = items && items.length > 0 ? items : defaultPortfolioList;

  return (
    <section
      id="portfolio"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-white text-[#1A1414] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
              {eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#1A1414]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {title}
            </h2>
          </div>
          {ctaText && (
            <Link
              href={ctaLink || "/portfolio"}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A1414] bg-white border border-[#1A1414] px-7 py-3.5 rounded-[2px] transition-all duration-200 hover:border-[#A31621] hover:text-[#A31621] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)] self-start sm:self-auto"
            >
              {ctaText}
            </Link>
          )}
        </div>

        {/* Portfolio Dynamic Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[230px] gap-3.5">
          {portfolioItems.map((item, idx) => {
            const isTall = item.size === "tall";
            const imageSrc =
              (typeof item.image === "object" && item.image?.url)
                ? item.image.url
                : item.imageUrl || defaultPortfolioList[idx % defaultPortfolioList.length].imageUrl;

            const tile = (
              <figure
                key={idx}
                className={`group relative overflow-hidden rounded-md shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)] transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] bg-[#1A1414] ${
                  isTall ? "row-span-2" : "row-span-1"
                }`}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={item.title || "Portfolio work"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 p-4.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-[13px] font-medium opacity-0 translate-y-1.5 transition-all duration-250 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  {item.title}
                </figcaption>
              </figure>
            );

            return item.link ? (
              <Link key={idx} href={item.link} className={isTall ? "row-span-2" : "row-span-1"}>
                {tile}
              </Link>
            ) : (
              tile
            );
          })}
        </div>
      </div>
    </section>
  );
}
