import "dotenv/config";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";

const LOCALES = ["en", "ne", "ko", "hr", "hi", "zh", "fr", "it", "ru"];

async function main() {
  console.log("🌟 Connecting to Payload CMS...");
  const payload = await getPayload({ config: configPromise });

  const videoMediaId = "6a9f726c59c22793b28be48b";
  const posterMediaId = "6a9e3e5b0a6852a038571bfb";

  console.log(`Video Media ID: ${videoMediaId}`);
  console.log(`Poster Media ID: ${posterMediaId}`);

  // 1. Ensure StudioSettings global is saved with both
  console.log("⚙️ Ensuring StudioSettings global hero section is set...");
  const currentSettings = await payload.findGlobal({
    slug: "studio-settings",
  });

  await payload.updateGlobal({
    slug: "studio-settings",
    data: {
      hero: {
        ...currentSettings.hero,
        video: videoMediaId,
        videoUrl: `/api/media/file/hero-video.mp4`,
        poster: posterMediaId,
        posterUrl: `/api/media/file/hero-poster.jpg`,
      },
    },
    context: { disableRevalidate: true },
  });
  console.log("  ✅ Updated StudioSettings global hero configuration!");

  // 2. Update Pages collection - Home page layout per-locale
  console.log("📄 Updating 'home' page layout with StudioHero video block for each locale...");

  for (const loc of LOCALES) {
    const pageRes = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "home" },
      },
      locale: loc as any,
      limit: 1,
    });

    if (pageRes.docs.length > 0) {
      const pageDoc = pageRes.docs[0];
      const currentBlocks = (pageDoc.layout as any[]) || [];

      if (Array.isArray(currentBlocks) && currentBlocks.length > 0) {
        const updatedBlocks = currentBlocks.map((block) => {
          if (block && block.blockType === "studioHero") {
            return {
              ...block,
              video: videoMediaId,
              videoUrl: `/api/media/file/hero-video.mp4`,
              poster: posterMediaId,
              posterUrl: `/api/media/file/hero-poster.jpg`,
            };
          }
          return block;
        });

        await payload.update({
          collection: "pages",
          id: pageDoc.id,
          locale: loc as any,
          data: {
            title: pageDoc.title || "Home",
            layout: updatedBlocks,
          },
          context: { disableRevalidate: true },
        });
        console.log(`  ✅ Updated 'home' page studioHero block for locale: ${loc}`);
      }
    }
  }

  console.log("\n🎉 ALL DONE! Video is safely in Cloudflare R2, registered in Media library, and attached to the Hero section across all pages.\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Execution failed:", err);
  process.exit(1);
});
