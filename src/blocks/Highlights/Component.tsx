import { getPayload } from "payload";
import configPromise from "@payload-config";
import type {
  HighlightsBlock as HighlightsBlockProps,
  Post,
  List,
  Category,
} from "@/payload-types";
import { HighlightsClient } from "./HighlightsClient";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export const HighlightsBlock = async ({ width, label, limit = 10 }: HighlightsBlockProps) => {
  const payload = await getPayload({ config: configPromise });
  const t = await getTranslations();
  const safeLimit = limit ?? 10;
  const safeLabel = label && label !== "Highlights" ? label : t("highlights");

  // 1. Fetch Pinned Notices/Items from 'list'
  const pinnedListItems = await payload.find({
    collection: "list",
    limit: 5,
    where: {
      and: [{ status: { equals: "published" } }, { isPinned: { equals: true } }],
    },
    select: {
      title: true,
      slug: true,
      category: true,
    },
  });

  // 2. Fetch Latest Posts
  const latestPosts = await payload.find({
    collection: "posts",
    limit: safeLimit,
    sort: "-publishedAt",
    select: {
      title: true,
      slug: true,
      categories: true,
    },
  });

  // Combine items: Pinned notices first, then posts
  const combinedItems = [
    ...(pinnedListItems.docs as List[]).map((item) => ({
      id: `list-${item.id}`,
      title: item.title,
      url: `/list/${item.slug}`,
      isPinned: true,
      categoryName: typeof item.category !== "string" ? item.category?.title : undefined,
    })),
    ...(latestPosts.docs as Post[]).map((post) => ({
      id: `post-${post.id}`,
      title: post.title,
      url: `/posts/${post.slug}`,
      isPinned: false,
      categoryName: (post.categories?.[0] as Category)?.title,
    })),
  ].slice(0, safeLimit * 2);

  if (!combinedItems.length) return null;

  return (
    <section className="w-full bg-secondary py-3">
      <div className={width === "container" ? "container mx-auto px-4" : "w-full"}>
        <HighlightsClient items={combinedItems} label={safeLabel} />
      </div>
    </section>
  );
};
