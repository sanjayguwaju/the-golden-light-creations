import React from "react";
import { getPayload } from "payload";
import type { Where } from "payload";
import configPromise from "@payload-config";
import type { HighlightsAndNewsBlock as Props, List, Post } from "@/payload-types";
import { getTranslations } from "next-intl/server";
import { HighlightsAndNewsClient } from "./HighlightsAndNewsClient";

export const HighlightsAndNewsBlock = async (props: Props) => {
  const {
    highlightsTitle,
    newsTitle,
    highlightsLimit = 6,
    newsLimit = 3,
    filterByCategory,
  } = props;
  const payload = await getPayload({ config: configPromise });
  const t = await getTranslations();

  const categoryId = typeof filterByCategory === "object" ? filterByCategory?.id : filterByCategory;

  const whereClauseList: Where = {
    status: { equals: "published" },
  };
  if (categoryId) {
    whereClauseList.category = { equals: categoryId };
  }

  const whereClausePosts: Where = {
    _status: { equals: "published" },
  };
  if (categoryId) {
    whereClausePosts.categories = { contains: categoryId };
  }

  // 1. Fetch Pinned items from 'list' collection for Highlights column
  const pinnedListItems = await payload.find({
    collection: "list",
    limit: highlightsLimit ?? 6,
    sort: "-publishedDate",
    where: {
      and: [whereClauseList, { isPinned: { equals: true } }],
    },
    depth: 1,
  });

  // 2. Fetch Latest items from 'posts' for Highlights column (if needed)
  const remainingHighlightsLimit = (highlightsLimit ?? 6) - pinnedListItems.docs.length;
  let dynamicPostHighlights: Post[] = [];

  if (remainingHighlightsLimit > 0) {
    const postsHighlights = await payload.find({
      collection: "posts",
      limit: remainingHighlightsLimit,
      sort: "-publishedAt",
      where: whereClausePosts,
      depth: 1,
    });
    dynamicPostHighlights = postsHighlights.docs as Post[];
  }

  const combinedHighlights = [
    ...(pinnedListItems.docs as List[]).map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishedDate: item.publishedDate,
      category: item.category,
      _collection: "list",
      isPinned: true,
    })),
    ...dynamicPostHighlights.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishedAt: item.publishedAt,
      categories: item.categories,
      heroImage: item.heroImage,
      _collection: "posts",
      isPinned: false,
    })),
  ].slice(0, highlightsLimit ?? 6);

  // Fetch Latest items from BOTH 'list' and 'posts' for News column
  const [listNews, postsNews] = await Promise.all([
    payload.find({
      collection: "list",
      limit: newsLimit ?? 3,
      sort: "-publishedDate",
      where: whereClauseList,
      depth: 1,
    }),
    payload.find({
      collection: "posts",
      limit: newsLimit ?? 3,
      sort: "-publishedAt",
      where: whereClausePosts,
      depth: 1,
    }),
  ]);

  // Combine and sort news by date
  const combinedNews = [
    ...(listNews.docs as List[]).map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishedDate: item.publishedDate,
      category: item.category,
      image: item.image,
      mainDocument: item.mainDocument,
      _collection: "list",
    })),
    ...(postsNews.docs as Post[]).map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishedAt: item.publishedAt,
      categories: item.categories,
      heroImage: item.heroImage,
      _collection: "posts",
    })),
  ]
    .sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const dateA = new Date((a.publishedDate || a.publishedAt || 0) as string | number).getTime();
      const dateB = new Date((b.publishedDate || b.publishedAt || 0) as string | number).getTime();
      return dateB - dateA;
    })
    .slice(0, newsLimit ?? 3);

  return (
    <section className="w-full bg-secondary py-3">
      <div className="container mx-auto px-4">
        <HighlightsAndNewsClient
          highlights={combinedHighlights as Record<string, unknown>[]}
          news={combinedNews as Record<string, unknown>[]}
          highlightsTitle={highlightsTitle || t("highlights")}
          newsTitle={newsTitle || t("latest-news")}
        />
      </div>
    </section>
  );
};
