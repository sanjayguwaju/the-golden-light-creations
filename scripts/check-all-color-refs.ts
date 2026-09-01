import fs from "fs";
import dotenv from "dotenv";

const parsed = dotenv.parse(fs.readFileSync(".env"));
for (const [k, v] of Object.entries(parsed)) {
  process.env[k] = v;
}

if (process.argv.includes("--vps") || process.env.TARGET_DB === "vps") {
  const vpsLine = fs.readFileSync(".env", "utf8").split("\n").find((l) => l.includes("200.141.14.52"));
  if (vpsLine) {
    const vpsUrl = vpsLine.replace(/^#\s*DATABASE_URL\s*=\s*/, "").trim();
    process.env.DATABASE_URL = vpsUrl;
    console.log("🌐 Target Database: VPS Production Server (200.141.14.52)");
  }
} else {
  console.log("🌐 Target Database: MongoDB Atlas");
}

async function main() {
  const configPromise = (await import("../src/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config: configPromise });

  // 1. Check ColorTrends
  const trends = await payload.find({
    collection: "color-trends",
    limit: 50,
    depth: 0,
    overrideAccess: true,
  });
  console.log(`\nChecking ${trends.docs.length} Color Trends:`);
  for (const t of trends.docs) {
    console.log(`- Trend: "${t.name}" -> ${(t.colors || []).length} colors`);
    for (const cid of (t.colors || [])) {
      const colorId = typeof cid === "object" && cid !== null ? (cid as any).id : cid;
      try {
        const c = await payload.findByID({ collection: "colors", id: colorId, overrideAccess: true });
        console.log(`    ✓ Color: ${c.name} (${c.colorId})`);
      } catch (e: any) {
        console.log(`    ✗ DEAD COLOR ID: ${colorId}`);
      }
    }
  }

  // 2. Check Inspiration
  const inspirations = await payload.find({
    collection: "inspiration",
    limit: 50,
    depth: 0,
    overrideAccess: true,
  });
  console.log(`\nChecking ${inspirations.docs.length} Inspirations:`);
  for (const doc of inspirations.docs) {
    const colorId = doc.featuredColour;
    if (colorId) {
      const cid = typeof colorId === "object" && colorId !== null ? (colorId as any).id : colorId;
      try {
        const c = await payload.findByID({ collection: "colors", id: cid, overrideAccess: true });
        console.log(`  ✓ [${doc.title}] (${doc.roomType}) -> Color: ${c.name} (${c.colorId})`);
      } catch (e: any) {
        console.log(`  ✗ [${doc.title}] (${doc.roomType}) -> DEAD COLOR ID: ${cid}`);
      }
    } else {
      console.log(`  - [${doc.title}] (${doc.roomType}) -> NO COLOR`);
    }
  }

  process.exit(0);
}

main().catch(console.error);
