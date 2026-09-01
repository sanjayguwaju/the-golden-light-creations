import type { Metadata, Viewport } from "next/types";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import CopyButton from "./CopyButton";
import { ActionGallery } from "@/components/ActionGallery";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: TypedLocale;
    slug: string;
  }>;
};

export default async function ColorDetailPage({ params }: Args) {
  const { locale, slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const color = await payload.find({
    collection: "colors",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    locale,
  });

  if (!color.docs[0]) {
    notFound();
  }

  const colorData = color.docs[0];

  const inspirationImages = await payload.find({
    collection: "inspiration",
    where: {
      featuredColour: {
        equals: colorData.id,
      },
    },
    limit: 12,
    depth: 2,
    locale,
  });

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Hero Section */}
      <section 
        className="relative pt-12 pb-12 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: colorData.hexCode }}
      >
        <div className="container relative z-10" style={{ color: getContrastColor(colorData.hexCode) }}>
          <div className="flex items-center gap-2 text-sm mb-6 opacity-80">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/colors" className="hover:opacity-100 transition-opacity">
              Colors
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold">{colorData.name}</span>
          </div>

          <div className="max-w-2xl mt-12 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-sm">{colorData.name}</h1>
            <p className="text-2xl font-mono mb-6 opacity-90 drop-shadow-sm">{colorData.hexCode}</p>
            <p className="text-lg leading-relaxed max-w-xl opacity-80">
              {colorData.description || "A beautiful shade perfect for your next project."}
            </p>
          </div>
        </div>
      </section>

      {/* Color Details */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Color Swatch */}
          <div>
            <h2 className="text-2xl font-bold text-reliance-navy mb-6">Color Preview</h2>
            <div
              className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundColor: colorData.hexCode,
                boxShadow:
                  "inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -4px 8px rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p
                    className="text-4xl font-bold mb-2"
                    style={{ color: getContrastColor(colorData.hexCode) }}
                  >
                    {colorData.name}
                  </p>
                  <p
                    className="text-2xl font-mono"
                    style={{ color: getContrastColor(colorData.hexCode) }}
                  >
                    {colorData.hexCode}
                  </p>
                  {(colorData.shadeCode || colorData.colorId) && (
                    <p
                      className="text-lg mt-2 opacity-80"
                      style={{ color: getContrastColor(colorData.hexCode) }}
                    >
                      Shade: {colorData.shadeCode || colorData.colorId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <CopyButton hexCode={colorData.hexCode} />

            {/* Try in 3D Visualizer CTA */}
            <Link
              href={`/visualiser?color=${encodeURIComponent(colorData.slug || colorData.name)}&hex=${encodeURIComponent(colorData.hexCode)}&code=${encodeURIComponent(colorData.shadeCode || colorData.colorId || "")}`}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-reliance-gold hover:bg-reliance-navy text-reliance-navy hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-sm border border-reliance-gold"
            >
              <Sparkles className="w-4 h-4" />
              Try in 3D Room Visualizer
            </Link>
          </div>

          {/* Color Information */}
          <div>
            <h2 className="text-2xl font-bold text-reliance-navy mb-6">Color Information</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
              <div>
                <p className="text-sm text-reliance-grey mb-1">Color Name</p>
                <p className="text-lg font-semibold text-reliance-navy">{colorData.name}</p>
              </div>
              <div>
                <p className="text-sm text-reliance-grey mb-1">Hex Code</p>
                <p className="text-lg font-mono text-reliance-navy">{colorData.hexCode}</p>
              </div>
              {(colorData.rgb?.string || (typeof colorData.rgb?.r === 'number' && typeof colorData.rgb?.g === 'number' && typeof colorData.rgb?.b === 'number')) && (
                <div>
                  <p className="text-sm text-reliance-grey mb-1">RGB Formulation</p>
                  <p className="text-lg font-mono text-reliance-navy">
                    {colorData.rgb.string || `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`}
                  </p>
                </div>
              )}
              {(colorData.shadeCode || colorData.colorId) && (
                <div>
                  <p className="text-sm text-reliance-grey mb-1">Shade Code / Color ID</p>
                  <p className="text-lg font-mono text-reliance-navy">{colorData.shadeCode || colorData.colorId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-reliance-grey mb-1">Color Family</p>
                <p className="text-lg capitalize text-reliance-navy">
                  {colorData.colorFamily || "Uncategorized"}
                </p>
              </div>
              {colorData.moodTags && colorData.moodTags.length > 0 && (
                <div>
                  <p className="text-sm text-reliance-grey mb-2">Moods</p>
                  <div className="flex flex-wrap gap-2">
                    {colorData.moodTags.map((mood: string) => (
                      <span key={mood} className="px-3 py-1 bg-reliance-gold/10 text-reliance-gold rounded-full text-sm font-medium capitalize">
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {colorData.description && (
                <div>
                  <p className="text-sm text-reliance-grey mb-1">Description</p>
                  <p className="text-reliance-navy">{colorData.description}</p>
                </div>
              )}
              {colorData.complementaryColours && colorData.complementaryColours.length > 0 && (
                <div>
                  <p className="text-sm text-reliance-grey mb-3">Complementary Colors</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {colorData.complementaryColours.map((compColor: any) => {
                      const color = typeof compColor === 'object' ? compColor : null;
                      if (!color) return null;
                      return (
                        <Link href={`/colors/${color.slug}`} key={color.id} className="group">
                          <div 
                            className="h-16 rounded-lg mb-2 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          <p className="text-xs font-semibold text-reliance-navy truncate">{color.name}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Related Products */}
            {colorData.relatedProducts && colorData.relatedProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-reliance-navy mb-4">Related Products</h3>
                <div className="space-y-3">
                  {colorData.relatedProducts.map((product: any) => {
                    if (typeof product !== 'object' || !product) return null;
                    return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-reliance-navy">{product.title}</p>
                      {product.tagline && (
                        <p className="text-sm text-reliance-grey">{product.tagline}</p>
                      )}
                    </Link>
                  )})}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inspiration Gallery */}
      {inspirationImages.docs && inspirationImages.docs.length > 0 && (
        <section className="container pb-16">
          <div className="mb-8 border-t border-gray-100 pt-16">
            <h2 className="text-3xl font-bold text-reliance-navy">See This Colour In Action</h2>
            <p className="text-reliance-grey mt-2">Explore how {colorData.name} transforms these spaces.</p>
          </div>
          <ActionGallery images={inspirationImages.docs as React.ComponentProps<typeof ActionGallery>['images']} />
        </section>
      )}

      {/* Back Button */}
      <section className="container pb-16">
        <Link
          href="/colors"
          className="inline-flex items-center gap-2 text-reliance-navy hover:text-reliance-gold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to All Colors
        </Link>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const colors = await payload.find({
    collection: "colors",
    limit: 100,
  });

  return colors.docs.map((color) => ({
    slug: color.slug || color.id,
  }));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const color = await payload.find({
    collection: "colors",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
    locale,
  });

  const colorData = color.docs[0];

  if (!colorData) {
    return {
      title: "Color Not Found | Reliance Paints",
    };
  }

  return {
    title: `${colorData.name} Paint Colour | Reliance Paints`,
    description: colorData.description || `Explore ${colorData.name} paint color by Reliance Paints.`,
  };
}

export async function generateViewport({ params }: Args): Promise<Viewport> {
  const { locale, slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const color = await payload.find({
    collection: "colors",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
    locale,
  });

  const colorData = color.docs[0];

  return {
    themeColor: colorData ? colorData.hexCode : "#1A202C",
  };
}
