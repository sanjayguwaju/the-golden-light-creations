"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

type CategoryDetailClientProps = {
  category: any;
  subcategories?: any[];
  products: any[];
};

export const CategoryDetailClient: React.FC<CategoryDetailClientProps> = ({
  category,
  subcategories,
  products,
}) => {
  return (
    <>
      <div className="min-h-screen bg-page-bg">
        <section className="relative bg-reliance-navy pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-reliance-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-reliance-white transition-colors">
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              {category.parentCategory && typeof category.parentCategory === 'object' && (
                <>
                  <Link href={`/products/${category.parentCategory.slug}`} className="hover:text-reliance-white transition-colors">
                    {category.parentCategory.title}
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-reliance-white font-medium">{category.title}</span>
            </div>

            <div className="max-w-2xl text-reliance-white">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {category.title}
              </h1>
              <p className="text-reliance-white/70 text-lg leading-relaxed max-w-xl">
                {category.description ||
                  `Explore our high-quality range of ${category.title} products.`}
              </p>
            </div>
          </div>
        </section>

        <section className="container pt-16 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => {
              const image = prod.images?.[0]?.image;
              const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
              
              return (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="group flex flex-col bg-white rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 text-left relative"
                >
                  {/* Image Section with Gradient Overlay */}
                  <div className="aspect-square bg-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-reliance-navy/5 to-reliance-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={prod.title}
                        fill
                        className="object-contain mix-blend-multiply brightness-105 contrast-105 group-hover:scale-110 transition-transform duration-500 p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 z-10 relative">
                        No Image
                      </div>
                    )}
                    {/* Hover Badge */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-reliance-gold text-white text-xs font-bold px-3 py-1 rounded-none shadow-lg">
                        View Details
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 border-0 bg-white relative z-10 flex-1 flex flex-col">
                    {/* Product Title */}
                    <h3 className="text-xl font-bold text-reliance-navy group-hover:text-reliance-gold transition-colors duration-300 mb-2">
                      {prod.title}
                    </h3>
                    
                    {/* Tagline */}
                    <p className="text-reliance-grey text-sm line-clamp-2 mb-4 min-h-10 flex-1">
                      {prod.tagline}
                    </p>

                    {/* Action Button */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-0">
                      <span className="text-sm font-semibold text-reliance-navy group-hover:text-reliance-gold transition-colors">
                        Explore Product
                      </span>
                      <div className="w-8 h-8 rounded-none bg-slate-50 flex items-center justify-center group-hover:bg-reliance-gold group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </Link>
              );
            })}
            {products.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-none border-0">
                <p className="text-reliance-grey">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
