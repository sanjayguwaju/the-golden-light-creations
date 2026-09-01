import type { Metadata } from "next/types";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import PageClient from "./page.client";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export default async function PaintingTipsPage({ params }: Args) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  // Fetch blogs categorized under 'painting-tips' or 'diy'
  let dbPosts: any[] = [];
  try {
    const { docs } = await payload.find({
      collection: "posts",
      locale,
      depth: 1,
      limit: 6,
      sort: "-publishedAt",
      where: {
        or: [
          {
            "categories.slug": {
              equals: "painting-tips",
            },
          },
          {
            "categories.slug": {
              equals: "diy",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        publishedAt: true,
        meta: true,
        categories: true,
      },
    });
    dbPosts = docs;
  } catch (error) {
    console.error("Error fetching painting tips posts:", error);
  }

  return (
    <PageClient locale={locale} initialPosts={dbPosts} />
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Painting Tips & DIY Guides | Reliance Paints",
    description: "Get professional painting tips, DIY wall care guides, paint troubleshooters, and smart room planning estimators from Reliance Paints.",
  };
}
