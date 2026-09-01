"use client";

import React from "react";
import { Check, X } from "lucide-react";
import type { Product } from "@/payload-types";
import Link from "next/link";

interface ComparisonTableProps {
  title?: React.ReactNode;
  subheading?: string;
  products?: Product[];
  isModal?: boolean;
  onRemoveProduct?: (id: string) => void;
  logoUrl?: string;
}

function Cell({ val }: { val: boolean | string | null | undefined }) {
  if (typeof val === "boolean") {
    return val ? (
      <Check size={18} className="text-emerald-500 mx-auto" strokeWidth={2.5} />
    ) : (
      <X size={18} className="text-zinc-300 mx-auto" strokeWidth={2.5} />
    );
  }
  return <span className="font-semibold text-reliance-navy">{val || "-"}</span>;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title = "Find the Right Paint",
  subheading = "Compare features across our most popular paint ranges.",
  products = [],
  isModal = false,
  onRemoveProduct,
  logoUrl = "/reliance-logo2.png",
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  if (!products || products.length === 0) {
    return null;
  }

  const featureDefinitions = [
    {
      name: "Durability",
      getValue: (p: Product) => p.comparison?.durability ?? "★★★",
    },
    {
      name: "Washability",
      getValue: (p: Product) => p.comparison?.washability ?? false,
    },
    {
      name: "Matte Finish",
      getValue: (p: Product) => p.comparison?.matteFinish ?? false,
    },
    {
      name: "Low VOC",
      getValue: (p: Product) => p.comparison?.lowVOC ?? false,
    },
    {
      name: "Coverage",
      getValue: (p: Product) => p.coverage ?? "N/A",
    },
    {
      name: "Warranty",
      getValue: (p: Product) => (p.isWarrantyAvailable ? (p.durability || p.comparison?.warranty || "Available") : "None"),
    },
    {
      name: "Anti-Fungal",
      getValue: (p: Product) => p.comparison?.antiFungal ?? false,
    },
    {
      name: "UV Resistant",
      getValue: (p: Product) => p.comparison?.uvResistant ?? false,
    },
  ];

  const slots = [0, 1, 2];

  // Dynamic grid setup
  const gridStyle = {
    gridTemplateColumns: isModal ? `minmax(180px, 250px) repeat(3, minmax(250px, 1fr))` : `1.5fr repeat(3, 1fr)`,
  };

  return (
    <section className={`bg-reliance-offwhite ${isModal ? 'py-6 px-4 md:px-8 bg-white' : 'py-12 md:py-24'}`} id="products">
      <div className={`mx-auto ${isModal ? 'max-w-full' : 'max-w-300 px-6 lg:px-16'}`}>
        {!isModal ? (
          <div className="text-center mb-10 md:mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
              Compare <br /> Products
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">
              {title === "Compare Products" ? (
                <>Compare <br /> Products</>
              ) : (
                title
              )}
            </h2>
            <p className="text-lg text-reliance-grey max-w-xl mx-auto">
              {subheading}
            </p>
          </div>
        ) : (
          <div className="mb-10 flex justify-between items-start pr-4 md:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy font-light tracking-tight">
              {title === "Compare Products" ? (
                <>Compare <br /> Products</>
              ) : (
                title
              )}
            </h2>
            <img src={logoUrl} alt="Reliance Paints" className="h-10 md:h-12 w-auto object-contain mt-2 hidden sm:block" />
          </div>
        )}

        {/* MOBILE VIEW (CARDS) */}
        {!isModal && (
          <div className="block lg:hidden space-y-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white border border-reliance-navy">
              <div className="bg-reliance-navy text-center py-4 px-6 border-b border-reliance-navy">
                <Link href={`/products/${p.slug}`} className="text-reliance-gold hover:underline font-bold tracking-widest uppercase text-sm block">
                  {p.title}
                </Link>
              </div>
              <div className="divide-y divide-reliance-navy/10">
                {featureDefinitions.map((f, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-4 hover:bg-[#F3F0E6] transition-colors">
                    <span className="font-bold text-reliance-navy uppercase tracking-widest text-xs">{f.name}</span>
                    <span className="flex items-center justify-end"><Cell val={f.getValue(p)} /></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        )}

        {/* DESKTOP VIEW (GRID TABLE) */}
        <div className={`${isModal ? 'block' : 'hidden lg:block'} overflow-x-auto scrollbar-hide w-full`}>
          <div className={`${isModal ? 'min-w-[800px] w-full' : 'bg-white border border-reliance-navy min-w-[700px] w-full'}`}>
            
            {/* Header (Product Cards) */}
            {isModal && (
              <div className="grid mb-6 relative" style={gridStyle}>
                <div></div> {/* Empty top-left cell */}
                {slots.map((i) => {
                  const p = products[i];
                  if (!p) {
                    return (
                      <div key={`empty-${i}`} className="relative bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center pt-8 pb-4 px-4 mx-1 md:mx-2 min-h-[220px]">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <span className="text-slate-400 font-medium text-sm">Add a product<br/>to compare</span>
                      </div>
                    );
                  }

                  const image = p.images?.[0]?.image;
                  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
                  
                  return (
                    <div key={p.id} className="relative bg-white border border-slate-100 shadow-sm flex flex-col pt-8 pb-4 px-4 mx-1 md:mx-2 items-center text-center min-h-[220px]">
                      {onRemoveProduct && (
                        <button 
                          onClick={() => onRemoveProduct(p.id as string)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      )}
                      {imageUrl && (
                        <img src={imageUrl} alt={p.title} className="w-32 h-32 object-contain mb-4" />
                      )}
                      <h3 className="text-reliance-navy font-medium text-lg flex-1">{p.title}</h3>
                      <Link 
                        href={`/products/${p.slug}`}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-slate-50 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors border-t border-l border-slate-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {isModal && (
              <div className="bg-[#002060] text-white py-4 px-8 text-xl font-light rounded-sm mb-4">
                Specifications
              </div>
            )}

            {/* Header (Original style for non-modal) */}
            {!isModal && (
              <div
                className="grid bg-reliance-navy text-white text-xs font-bold uppercase tracking-widest relative"
                style={gridStyle}
              >
                <div className="py-5 px-6 flex items-center sticky left-0 bg-reliance-navy border-r border-white/20 z-10">Feature</div>
                {slots.map((i) => {
                  const p = products[i];
                  return (
                    <div key={`header-${i}`} className="py-5 px-4 text-center flex items-center justify-center">
                      {p ? (
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-reliance-gold hover:underline transition-all block"
                        >
                          {p.title}
                        </Link>
                      ) : (
                        <span className="text-white/30 text-xs">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Rows */}
            <div className={isModal ? 'divide-y divide-slate-100' : ''}>
              {featureDefinitions.map((f, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`grid text-sm transition-colors duration-200 ${
                    !isModal ? 'border-t border-reliance-navy' : ''
                  } ${
                    hovered === i && !isModal ? "bg-reliance-gold/10" : "bg-white"
                  }`}
                  style={gridStyle}
                >
                  <div 
                    className={`px-6 py-5 font-bold text-xs text-reliance-navy sticky left-0 flex items-center z-10 transition-colors duration-200 ${
                      !isModal ? 'uppercase tracking-widest border-r border-reliance-navy/20' : ''
                    } ${
                      hovered === i && !isModal ? "bg-[#F3F0E6]" : "bg-white"
                    }`}
                  >
                    {f.name}
                  </div>
                  {slots.map((i) => {
                    const p = products[i];
                    return (
                      <div
                        key={`cell-${i}`}
                        className={`px-4 py-5 text-center flex justify-center items-center ${
                          i < 2 && !isModal ? "border-r border-reliance-navy/20" : ""
                        }`}
                      >
                        {p ? <Cell val={f.getValue(p)} /> : <span className="text-slate-200">-</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isModal && (
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block border border-reliance-navy text-reliance-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-reliance-navy hover:text-white transition-all"
            >
              Compare All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
