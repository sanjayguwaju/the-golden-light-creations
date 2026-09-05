import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";

async function main() {
  console.log("🔄 Initializing Payload to copy English content blocks to Nepali locale...");
  const payload = await getPayload({ config: configPromise });

  // 1. Fetch all pages with all locales
  const pagesResult = await payload.find({
    collection: "pages",
    locale: "all",
    limit: 100,
    depth: 0,
  });

  console.log(`\nFound ${pagesResult.docs.length} pages in database:`);

  for (const page of pagesResult.docs) {
    const p = page as any;
    const slug = p.slug;
    const enBlocks = p.layout?.en || (Array.isArray(p.layout) ? p.layout : []);
    const neBlocks = p.layout?.ne || [];

    console.log(`\n📄 Processing Page: [${slug}] (ID: ${p.id})`);
    console.log(`   EN blocks count: ${Array.isArray(enBlocks) ? enBlocks.length : 0}`);
    console.log(`   Current NE blocks count: ${Array.isArray(neBlocks) ? neBlocks.length : 0}`);

    if (!Array.isArray(enBlocks) || enBlocks.length === 0) {
      console.log(`   ⚠️ No English blocks found for page [${slug}], skipping layout copy.`);
      continue;
    }

    // Deep clone the English blocks so there are no mutated references
    const clonedBlocks = JSON.parse(JSON.stringify(enBlocks));

    // Preserve existing Nepali title or fallback to English title
    const neTitle = p.title?.ne || p.title?.en || p.title;

    // Update the Nepali locale for this page
    await payload.update({
      collection: "pages",
      id: p.id,
      locale: "ne",
      data: {
        title: neTitle,
        layout: clonedBlocks,
      },
      draft: false,
    });

    console.log(`   ✅ Successfully copied ${clonedBlocks.length} content blocks to Nepali locale ('ne')!`);
  }

  // 2. Check posts: also copy English title & content to Nepali locale if needed
  console.log("\n\n📝 Checking Posts collection...");
  const postsResult = await payload.find({
    collection: "posts",
    locale: "all",
    limit: 100,
    depth: 0,
  });

  console.log(`Found ${postsResult.docs.length} posts in database:`);
  for (const post of postsResult.docs) {
    const p = post as any;
    const slug = p.slug;
    const enTitle = p.title?.en || p.title;
    const neTitle = p.title?.ne || enTitle;
    const enContent = p.content?.en || p.content;
    const neContent = p.content?.ne;

    console.log(`\n📰 Post: [${slug}] (ID: ${p.id})`);
    console.log(`   EN title: ${enTitle}`);
    console.log(`   EN content present: ${Boolean(enContent)}`);
    console.log(`   NE content present: ${Boolean(neContent)}`);

    if (enContent) {
      const clonedContent = JSON.parse(JSON.stringify(enContent));
      await payload.update({
        collection: "posts",
        id: p.id,
        locale: "ne",
        data: {
          title: neTitle,
          content: clonedContent,
        },
        draft: false,
      });
      console.log(`   ✅ Successfully copied English title & content to Nepali locale for post [${slug}]!`);
    } else {
      console.log(`   ℹ️ No EN content, skipping.`);
    }
  }

  console.log("\n✨ All content blocks and content successfully synchronized to Nepali ('ne') locale!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
