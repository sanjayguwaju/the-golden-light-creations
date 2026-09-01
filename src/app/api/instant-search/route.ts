import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const locale = searchParams.get("locale") || "en";

    if (!query.trim()) {
      return NextResponse.json({ docs: [] });
    }

    const payload = await getPayload({ config });

    const searchResults = await payload.find({
      collection: "search",
      depth: 1,
      limit: 8,
      locale: locale as any,
      where: {
        or: [
          { title: { like: query } },
          { "meta.description": { like: query } },
          { "meta.title": { like: query } },
          { slug: { like: query } },
        ],
      },
    });

    const formattedDocs = searchResults.docs.map((doc: any) => {
      const categoryNames = doc.categories?.map((cat: any) => cat.title).filter(Boolean) || [];
      const relationTo = doc.doc?.relationTo || "pages";

      return {
        id: doc.id,
        title: doc.title || "Untitled",
        slug: doc.slug || "",
        relationTo,
        description: doc.meta?.description || "",
        image: doc.meta?.image,
        categories: categoryNames,
      };
    });

    return NextResponse.json({ docs: formattedDocs });
  } catch (error) {
    console.error("Error in instant-search API:", error);
    return NextResponse.json({ docs: [], error: "Search failed" }, { status: 500 });
  }
}
