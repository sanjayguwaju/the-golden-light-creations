import fs from "fs";
import dotenv from "dotenv";

const parsed = dotenv.parse(fs.readFileSync(".env"));
for (const [k, v] of Object.entries(parsed)) {
  process.env[k] = v;
}

const isVPS = process.argv.includes("--vps") || process.env.TARGET_DB === "vps";
if (isVPS) {
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

  // 1. Fetch available colors by family
  async function getColorsByFamily(family: string, limit = 10) {
    const res = await payload.find({
      collection: "colors",
      where: { colorFamily: { equals: family } },
      sort: "-popularity",
      limit,
      overrideAccess: true,
    });
    return res.docs;
  }

  const blueColors = await getColorsByFamily("blues", 15);
  const greenColors = await getColorsByFamily("greens", 15);
  const yellowColors = await getColorsByFamily("yellows", 15);
  const redColors = await getColorsByFamily("reds", 15);
  const neutralColors = await getColorsByFamily("neutrals", 15);
  const earthColors = await getColorsByFamily("earths", 15);
  const orangeColors = await getColorsByFamily("oranges", 15);
  const whiteColors = await getColorsByFamily("whites", 15);

  console.log("Found color pools:");
  console.log(`- Blues: ${blueColors.length}, Greens: ${greenColors.length}, Yellows: ${yellowColors.length}`);
  console.log(`- Reds: ${redColors.length}, Neutrals: ${neutralColors.length}, Earths: ${earthColors.length}`);

  // Helper to pick color according to roomType
  function pickColorForRoom(roomType: string, index: number): string {
    const rt = (roomType || "").toLowerCase();
    if (rt.includes("ext")) {
      const pool = [yellowColors[0], neutralColors[0], blueColors[0], earthColors[0], whiteColors[0]];
      const col = pool[index % pool.length] || neutralColors[0];
      return col.id as string;
    }
    if (rt.includes("lux")) {
      const pool = [blueColors[0], redColors[0], yellowColors[0], neutralColors[1], greenColors[0]];
      const col = pool[index % pool.length] || blueColors[0];
      return col.id as string;
    }
    if (rt.includes("kit")) {
      const pool = [greenColors[0], whiteColors[0], yellowColors[1], neutralColors[0]];
      const col = pool[index % pool.length] || greenColors[0];
      return col.id as string;
    }
    if (rt.includes("bed")) {
      const pool = [blueColors[1], neutralColors[2], redColors[1], greenColors[1]];
      const col = pool[index % pool.length] || blueColors[1];
      return col.id as string;
    }
    if (rt.includes("din")) {
      const pool = [redColors[0], orangeColors[0], earthColors[0], yellowColors[0]];
      const col = pool[index % pool.length] || redColors[0];
      return col.id as string;
    }
    if (rt.includes("off")) {
      const pool = [neutralColors[0], blueColors[0], greenColors[2]];
      const col = pool[index % pool.length] || neutralColors[0];
      return col.id as string;
    }
    // Default interior / living
    const pool = [neutralColors[0], greenColors[0], blueColors[0], yellowColors[0], earthColors[0], redColors[0]];
    const col = pool[index % pool.length] || neutralColors[0];
    return col.id as string;
  }

  // 2. Fix Inspiration Collection
  const inspirations = await payload.find({
    collection: "inspiration",
    limit: 100,
    depth: 0,
    overrideAccess: true,
  });

  console.log(`\nFixing ${inspirations.docs.length} Inspirations...`);
  for (let i = 0; i < inspirations.docs.length; i++) {
    const doc = inspirations.docs[i];
    let needsUpdate = false;
    let validColorId: string | null = null;

    if (doc.featuredColour) {
      const cid = typeof doc.featuredColour === "object" && doc.featuredColour !== null ? (doc.featuredColour as any).id : doc.featuredColour;
      try {
        const c = await payload.findByID({ collection: "colors", id: cid, overrideAccess: true });
        if (c) {
          validColorId = c.id as string;
        }
      } catch {
        needsUpdate = true;
      }
    } else {
      needsUpdate = true;
    }

    if (needsUpdate || !validColorId) {
      const assignedId = pickColorForRoom(doc.roomType, i);
      await payload.update({
        collection: "inspiration",
        id: doc.id,
        data: {
          featuredColour: assignedId,
        },
        overrideAccess: true,
      });

      const updatedColor = await payload.findByID({ collection: "colors", id: assignedId, overrideAccess: true });
      console.log(`  ✓ Updated Inspiration "${doc.title}" (${doc.roomType}) -> Assigned: ${updatedColor?.name} (${updatedColor?.colorId || updatedColor?.shadeCode})`);
    } else {
      console.log(`  - Inspiration "${doc.title}" already has valid color.`);
    }
  }

  // 3. Fix Color Trends Collection
  const trends = await payload.find({
    collection: "color-trends",
    limit: 50,
    depth: 0,
    overrideAccess: true,
  });

  console.log(`\nFixing ${trends.docs.length} Color Trends...`);
  for (const t of trends.docs) {
    let newColors: string[] = [];
    const tName = (t.name || "").toLowerCase();

    if (tName.includes("sunset") || tName.includes("warm")) {
      newColors = [
        orangeColors[0]?.id as string,
        redColors[0]?.id as string,
        yellowColors[0]?.id as string,
        orangeColors[1]?.id as string,
      ].filter(Boolean);
    } else if (tName.includes("ocean") || tName.includes("blue") || tName.includes("depth")) {
      newColors = [
        blueColors[0]?.id as string,
        blueColors[1]?.id as string,
        blueColors[2]?.id as string,
        greenColors[0]?.id as string,
      ].filter(Boolean);
    } else {
      // Earth & Clay / Default
      newColors = [
        earthColors[0]?.id as string,
        greenColors[0]?.id as string,
        neutralColors[0]?.id as string,
        earthColors[1]?.id as string,
      ].filter(Boolean);
    }

    await payload.update({
      collection: "color-trends",
      id: t.id,
      data: {
        colors: newColors,
      },
      overrideAccess: true,
    });
    console.log(`  ✓ Updated Trend "${t.name}" -> Assigned ${newColors.length} valid colors`);
  }

  console.log("\n🎉 All color references successfully fixed!");
  process.exit(0);
}

main().catch(console.error);
