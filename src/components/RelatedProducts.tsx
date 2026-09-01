"use client";

import React from "react";
import Link from "next/link";
import { Media } from "@/components/Media";
import { ArrowRight, Clock } from "lucide-react";
import { isProductComingSoon } from "@/utilities/productUtils";

type RelatedProductsProps = {
  products: any[];
  title?: string;
};

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = "You May Also Like",
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-0 pt-10 pb-16">
      <div className="container">
        <h2 className="text-2xl font-bold text-reliance-navy mb-6">{title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isComingSoon = isProductComingSoon(product);

            return (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="group flex flex-col bg-white rounded-none overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 text-left relative"
              >
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  {product.images?.[0]?.image &&
                    typeof product.images[0].image !== "string" && (
                      <Media
                        resource={product.images[0].image}
                        fill
                        pictureClassName="w-full h-full block p-2"
                        imgClassName="object-contain mix-blend-multiply brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                  {isComingSoon && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-slate-950" />
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 border-0 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-reliance-navy group-hover:text-reliance-gold transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-3 flex items-center text-reliance-gold text-xs font-bold">
                    {isComingSoon ? "Explore Product" : "View Details"} <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
