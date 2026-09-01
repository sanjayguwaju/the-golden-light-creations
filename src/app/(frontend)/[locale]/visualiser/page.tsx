import type { Metadata } from "next";
import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VisualiserApp } from "@/components/visualiser/VisualiserApp";
import type { Color } from "@/payload-types";
import { PaintBucket } from "lucide-react";

export function generateMetadata(): Metadata {
  const title = "Advanced Colour Visualiser | Reliance Paints";
  const description =
    "Visualize Reliance Paints colors on your walls before you paint. Try our interactive room visualiser to find your perfect shade.";
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://reliancepaints.com";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Reliance Paints",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Reliance Paints Advanced Colour Visualiser",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  // Fetch colors with optimized select to minimize initial JSON payload
  const { docs: colors } = await payload.find({
    collection: "colors",
    limit: 1500,
    depth: 1, // Only populate shallow relationships like complementary colors
    select: {
      id: true,
      name: true,
      slug: true,
      shadeCode: true,
      colorId: true,
      hexCode: true,
      rgb: true,
      colorFamily: true,
      moodTags: true,
      description: true,
      complementaryColours: true,
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col pt-12 pb-24">
      {/* Preload primary room templates for instant rendering */}
      <link rel="preload" as="image" href="/visualiser/living-room-new.jpg" />
      <link rel="preload" as="image" href="/visualiser/bedroom-new.jpg" />
      <link rel="preload" as="image" href="/visualiser/kitchen.jpg" />
      <link rel="preload" as="image" href="/visualiser/exterior-new.jpg" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full mb-2">
            <PaintBucket className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-reliance-navy uppercase">
            Colour Visualiser
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Bring your ideas to life. Select a color from our extensive palette and click on the walls of our virtual rooms to see how they look.
          </p>
        </div>

        {/* Client Application wrapped in Suspense for useSearchParams */}
        <React.Suspense
          fallback={
            <div className="h-96 flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-reliance-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Loading 3D Visualiser...
                </p>
              </div>
            </div>
          }
        >
          <VisualiserApp colors={colors as Color[]} />
        </React.Suspense>
        
      </div>
    </div>
  );
}
