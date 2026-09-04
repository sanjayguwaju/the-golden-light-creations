import type { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { TypedLocale, getPayload } from "payload";
import configPromise from "@payload-config";

import { StudioPage } from "@/components/studio/StudioPage";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./[slug]/page.client";
import {
  getStudioPortfolio,
  getStudioFilms,
  getStudioServices,
  getStudioTestimonials,
  getStudioSettings,
} from "@/utilities/getStudioData";

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

const queryHomePage = cache(async ({ locale }: { locale: TypedLocale }) => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "pages",
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: "home",
        },
      },
      locale,
    });

    return result.docs?.[0] || null;
  } catch (err) {
    console.warn("Failed to query home page from CMS:", err);
    return null;
  }
});

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const page = await queryHomePage({ locale });

  if (page?.meta && (page.meta.title || page.meta.description)) {
    return generateMeta({ doc: page });
  }

  return {
    title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
    description:
      "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
  };
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params;
  const { isEnabled: draft } = await draftMode();
  const page = await queryHomePage({ locale });

  // If the Home page document exists in Payload CMS and has configured layout blocks,
  // render the dynamic block-based page!
  if (page && Array.isArray(page.layout) && page.layout.length > 0) {
    const { hero, layout } = page;

    return (
      <article className="relative w-full bg-[#0A0A0A] text-white selection:bg-[#F5B301] selection:text-[#0A0A0A]">
        <PageClient />
        <PayloadRedirects disableNotFound url="/" />
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout || []} />
      </article>
    );
  }

  // Fail-safe fallback: renders the complete luxury studio experience
  const [portfolio, films, services, testimonials, settings] = await Promise.all([
    getStudioPortfolio(),
    getStudioFilms(),
    getStudioServices(),
    getStudioTestimonials(),
    getStudioSettings(),
  ]);

  return (
    <StudioPage
      portfolio={portfolio}
      films={films}
      services={services}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
