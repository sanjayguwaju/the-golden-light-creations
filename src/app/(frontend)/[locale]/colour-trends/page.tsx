import type { Metadata } from "next/types";
import { TypedLocale } from "payload";
import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Paintbrush, Droplets, Palette } from "lucide-react";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

const getIcon = (iconStr: string) => {
  switch (iconStr) {
    case "paintbrush":
      return <Paintbrush className="w-5 h-5" />;
    case "droplets":
      return <Droplets className="w-5 h-5" />;
    case "sparkles":
      return <Sparkles className="w-5 h-5" />;
    case "palette":
      return <Palette className="w-5 h-5" />;
    default:
      return <Palette className="w-5 h-5" />;
  }
};

export default async function ColourTrendsPage({ params }: Args) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const trendsResult = await payload.find({
    collection: "color-trends",
    sort: "order",
    locale,
    limit: 100,
  });

  const TRENDING_PALETTES = trendsResult.docs.map((doc: any) => ({
    name: doc.name,
    description: doc.description,
    icon: getIcon(doc.icon),
    colors: (doc.colors || []).map((c: any) =>
      typeof c === "object" ? { name: c.name, hex: c.hexCode } : { name: "Unknown", hex: "#000000" }
    ),
  }));

  return (
    <div className="min-h-screen bg-page-bg selection:bg-reliance-gold selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy pt-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-reliance-gold rounded-full -translate-y-1/2 translate-x-1/4 blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-reliance-red rounded-full translate-y-1/2 -translate-x-1/4 blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-reliance-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white font-medium">Colour Trends</span>
          </div>

          <div className="max-w-3xl text-reliance-white">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-full px-5 py-2 text-reliance-gold text-sm font-medium mb-8 border border-reliance-gold/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>2026/2027 Colour Forecast</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-tight">
              The Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-reliance-gold via-white to-reliance-gold animate-shimmer bg-[length:200%_auto]">
                Colour is Here.
              </span>
            </h1>
            <p className="text-reliance-white/80 text-xl leading-relaxed max-w-2xl font-light">
              Discover the palettes that will define the aesthetics of tomorrow. Curated by our
              expert designers to bring life, emotion, and character to your spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="container py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-reliance-navy mb-6">
            Trending Palettes
          </h2>
          <p className="text-reliance-grey text-lg max-w-2xl mx-auto">
            Explore our carefully curated collections designed to evoke emotion and transform your
            environment.
          </p>
        </div>

        <div className="space-y-32">
          {TRENDING_PALETTES.map((palette, index) => (
            <div
              key={palette.name}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full lg:w-1/3 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-reliance-gold/10 text-reliance-gold">
                  {palette.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-reliance-navy">
                  {palette.name}
                </h3>
                <p className="text-reliance-grey text-lg leading-relaxed">{palette.description}</p>
                <button className="inline-flex items-center gap-2 text-reliance-navy font-semibold hover:text-reliance-gold transition-colors group mt-4">
                  Explore Palette
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
                  {palette.colors.map((color: { name: string; hex: string }, colorIdx: number) => (
                    <div
                      key={color.name}
                      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl"
                      style={{
                        backgroundColor: color.hex,
                        transformOrigin: "bottom",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-medium text-lg">{color.name}</p>
                        <p className="text-white/80 font-mono text-sm uppercase">{color.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-reliance-gold py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <Palette className="w-16 h-16 text-reliance-navy mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-display font-bold text-reliance-navy mb-8">
            Ready to transform your space?
          </h2>
          <p className="text-reliance-navy/80 text-xl max-w-2xl mx-auto mb-10">
            Try our visualizer tool to see these trending colors in your own room, or find a store
            near you to pick up samples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/visualiser"
              className="px-8 py-4 bg-reliance-navy text-white rounded-full font-semibold hover:bg-reliance-navy/90 transition-all hover:scale-105 active:scale-95"
            >
              Try Color Visualizer
            </Link>
            <Link
              href="/store-locator"
              className="px-8 py-4 bg-transparent border-2 border-reliance-navy text-reliance-navy rounded-full font-semibold hover:bg-reliance-navy hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              Find a Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Colour Trends | Reliance Paints",
    description:
      "Discover the latest color trends and forecasting curated by our expert designers at Reliance Paints.",
  };
}
