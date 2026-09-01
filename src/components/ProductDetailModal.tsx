"use client";

import React from "react";
import { 
  CheckCircle2, 
  Box, 
  Maximize, 
  Droplets, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/utilities/ui";
import { RelatedProducts } from "@/components/RelatedProducts";
import { isProductComingSoon, hasLoremIpsumRichText, sanitizePlaceholderText } from "@/utilities/productUtils";

type ProductDetailModalProps = {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts?: any[];
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  relatedProducts = [],
}) => {
  const category = typeof product.category === "object" ? product.category : null;
  const isComingSoon = isProductComingSoon(product);
  const isDescLorem = hasLoremIpsumRichText(product?.description);

  const cleanFeatures = (product?.keyFeatures || []).filter((item: any) => {
    const feat = typeof item === 'string' ? item : item?.feature || '';
    return feat && !feat.toLowerCase().includes('lorem ipsum');
  });

  const cleanTagline = sanitizePlaceholderText(product?.tagline);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh]">
          {/* Image Gallery */}
          <div className="bg-slate-50 p-8 flex items-center justify-center overflow-y-auto relative">
            <div className="aspect-square w-full max-w-lg relative">
              {product.images?.[0]?.image && typeof product.images[0].image !== "string" ? (
                <Media 
                  resource={product.images[0].image} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 rounded-none flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}

              {isComingSoon && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-950" />
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8 overflow-y-auto relative">
            {/* Category & Warranty Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {category && (
                <Badge className="bg-reliance-gold/10 text-reliance-gold hover:bg-reliance-gold/20 border-0 rounded-none px-4 py-1">
                  {category.title}
                </Badge>
              )}
              {isComingSoon && (
                <Badge className="bg-amber-500/15 text-amber-700 border border-amber-500/30 rounded-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Coming Soon</span>
                </Badge>
              )}
              {product.isWarrantyAvailable && (product.warranty || product.durability) && (
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 border-0 rounded-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{product.warranty || product.durability}</span>
                </Badge>
              )}
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-reliance-navy mb-2 leading-tight">
                {product.title}
              </h1>
              {cleanTagline ? (
                <p className="text-reliance-gold text-lg font-medium italic">
                  {cleanTagline}
                </p>
              ) : isComingSoon ? (
                <p className="text-amber-800 text-sm font-medium italic">
                  Formulation in progress by Reliance Paints R&D
                </p>
              ) : null}
            </div>

            {/* Description */}
            {isComingSoon && (!product.description || isDescLorem) ? (
              <div className="bg-amber-50/70 border border-amber-200/90 p-5 rounded-none space-y-2 mb-6">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Product Formulation In Progress
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                  Detailed technical data and specifications for this paint formulation will be published upon official commercial launch.
                </p>
              </div>
            ) : product.description ? (
              <div className="prose prose-slate max-w-none mb-6">
                <RichText data={product.description} />
              </div>
            ) : null}

            {/* Key Features */}
            {cleanFeatures.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-reliance-navy mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cleanFeatures.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-page-bg/50 p-3 rounded-none border-0">
                      <CheckCircle2 className="w-5 h-5 text-reliance-gold shrink-0" />
                      <span className="text-sm font-medium text-reliance-navy">{typeof item === 'string' ? item : item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Tabs */}
            <Tabs defaultValue="specs" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="colours">Colours</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="space-y-4 mt-4">
                {/* Pack Sizes */}
                {product.packSizes && product.packSizes.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Box className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-reliance-navy">Pack Sizes</p>
                      <p className="text-sm text-reliance-grey">
                        {product.packSizes.map((size: any) => size.size).join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Coverage */}
                {product.coverage && (
                  <div className="flex items-start gap-3">
                    <Maximize className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-reliance-navy">Coverage</p>
                      <p className="text-sm text-reliance-grey">{product.coverage}</p>
                    </div>
                  </div>
                )}

                {/* Application Method */}
                {product.applicationMethod && (
                  <div className="flex items-start gap-3">
                    <Droplets className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-reliance-navy">Application Method</p>
                      <p className="text-sm text-reliance-grey">{product.applicationMethod}</p>
                    </div>
                  </div>
                )}

                {/* Surface Compatibility */}
                {product.surfaceCompatibility && (
                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-reliance-navy">Surface Compatibility</p>
                      <p className="text-sm text-reliance-grey">{product.surfaceCompatibility}</p>
                    </div>
                  </div>
                )}

                {/* Drying Time */}
                {product.dryingTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-reliance-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-reliance-navy">Drying Time</p>
                      <p className="text-sm text-reliance-grey">{product.dryingTime}</p>
                    </div>
                  </div>
                )}

                {/* Warranty / Durability Guarantee */}
                {product.isWarrantyAvailable && product.durability && (
                  <div className="flex items-start gap-3 bg-emerald-50/60 p-3 border border-emerald-200">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">Durability / Warranty Guarantee</p>
                      <p className="text-sm font-semibold text-emerald-700">{product.durability}</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="colours" className="mt-4">
                {product.availableColours && product.availableColours.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {product.availableColours.map((colour: any, i: number) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-none border-0 shadow-sm"
                          style={{
                            backgroundColor: colour.color || "#ccc",
                          }}
                          title={colour.name}
                        />
                        <span className="text-xs text-reliance-grey text-center">{colour.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-reliance-grey">No colour information available.</p>
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-0">
              <button className="px-6 py-3 bg-reliance-navy text-white rounded-none font-bold hover:bg-reliance-navy/90 transition-all flex items-center gap-2 text-sm">
                Locate Store
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border-0 text-reliance-navy rounded-none font-bold hover:bg-reliance-navy/5 transition-all text-sm">
                Calculate Paint
              </button>
            </div>

            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-8 pt-8 border-0">
                <RelatedProducts products={relatedProducts} />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
