import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const parsed = dotenv.parse(fs.readFileSync(".env"));
for (const [k, v] of Object.entries(parsed)) {
  process.env[k] = v;
}

if (process.argv.includes("--vps") || process.env.TARGET_DB === "vps") {
  const vpsLine = fs.readFileSync(".env", "utf8").split("\n").find((l) => l.includes("200.141.14.52"));
  if (vpsLine) {
    const vpsUrl = vpsLine.replace(/^#\s*DATABASE_URL\s*=\s*/, "").trim();
    process.env.DATABASE_URL = vpsUrl;
    console.log("🌐 Target Database: VPS Production Server (200.141.14.52 / reliancepaints_live)");
  }
} else {
  console.log("🌐 Target Database: MongoDB Atlas (reliancepaints-live)");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getOrUploadMedia(payload: any, filePath: string, alt: string): Promise<string> {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }

  const filename = path.basename(resolvedPath);

  // Check if media with this filename already exists
  const existing = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    console.log(`✓ Found existing media: ${filename} (ID: ${existing.docs[0].id})`);
    return existing.docs[0].id as string;
  }

  const fileBuffer = fs.readFileSync(resolvedPath);
  const ext = path.extname(filename).toLowerCase();
  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".webp"
      ? "image/webp"
      : "application/octet-stream";

  const createdMedia = await payload.create({
    collection: "media",
    data: {
      alt,
    },
    file: {
      data: fileBuffer,
      name: filename,
      mimetype: mimeType,
      size: fileBuffer.length,
    },
    overrideAccess: true,
  });

  console.log(`+ Uploaded media: ${filename} (ID: ${createdMedia.id})`);
  return createdMedia.id as string;
}

async function findColorByFamily(payload: any, family: string, preferredMood?: string): Promise<any> {
  const whereClause: any = {
    colorFamily: { equals: family },
  };

  const res = await payload.find({
    collection: "colors",
    where: whereClause,
    limit: 10,
    sort: "-popularity",
    overrideAccess: true,
  });

  if (res.docs.length > 0) {
    if (preferredMood) {
      const match = res.docs.find((d: any) => (d.moodTags || []).includes(preferredMood));
      if (match) return match;
    }
    return res.docs[0];
  }

  // Fallback to any color in collection
  const anyCol = await payload.find({
    collection: "colors",
    limit: 1,
    overrideAccess: true,
  });
  return anyCol.docs[0] || null;
}

async function seedRoomVisualizer() {
  try {
    console.log("🚀 Initializing Payload CMS...");
    const configPromise = (await import("../payload.config")).default;
    const { getPayload } = await import("payload");
    const payload = await getPayload({ config: configPromise });

    console.log("📸 Uploading & resolving room images...");
    const livingBaseId = await getOrUploadMedia(payload, "public/visualiser/living-room-new.jpg", "Living Room Original");
    const livingNavyId = await getOrUploadMedia(payload, "public/visualiser/living-room.png", "Living Room Navy Blue");
    const livingOffWhiteId = await getOrUploadMedia(payload, "public/visualiser/living-room-new.jpg", "Living Room Off White");
    const livingGreyId = await getOrUploadMedia(payload, "public/visualiser/living-room-new.jpg", "Living Room Warm Grey");

    const kitchenBaseId = await getOrUploadMedia(payload, "public/visualiser/kitchen.jpg", "Kitchen Room Original");
    const kitchenSageId = await getOrUploadMedia(payload, "public/visualiser/kitchen.jpg", "Kitchen Room Sage Green");
    const kitchenGreyId = await getOrUploadMedia(payload, "public/visualiser/kitchen.jpg", "Kitchen Room Warm Grey");
    const kitchenOffWhiteId = await getOrUploadMedia(payload, "public/visualiser/kitchen.jpg", "Kitchen Room Off White");

    const exteriorBaseId = await getOrUploadMedia(payload, "public/visualiser/exterior-new.jpg", "Exterior Room Original");
    const exteriorGoldId = await getOrUploadMedia(payload, "public/visualiser/exterior-new.jpg", "Exterior Room Heritage Gold");
    const exteriorOffWhiteId = await getOrUploadMedia(payload, "public/visualiser/exterior-new.jpg", "Exterior Room Off White");
    const exteriorCharcoalId = await getOrUploadMedia(payload, "public/visualiser/exterior-new.jpg", "Exterior Room Charcoal Slate");

    console.log("🎨 Querying real Reliance colors from Colors collection...");
    const blueColor =
      (await payload.find({ collection: "colors", where: { colorId: { equals: "4-33-7" } }, limit: 1, overrideAccess: true })).docs[0] ||
      await findColorByFamily(payload, "blues", "elegant");

    const greenColor =
      (await payload.find({ collection: "colors", where: { colorId: { equals: "4-26-7" } }, limit: 1, overrideAccess: true })).docs[0] ||
      await findColorByFamily(payload, "greens", "earthy");

    const goldColor =
      (await payload.find({ collection: "colors", where: { colorId: { equals: "2-15-7" } }, limit: 1, overrideAccess: true })).docs[0] ||
      await findColorByFamily(payload, "yellows", "energetic");

    const redColor =
      (await payload.find({ collection: "colors", where: { colorId: { equals: "3-50-7" } }, limit: 1, overrideAccess: true })).docs[0] ||
      await findColorByFamily(payload, "reds");

    const neutralColor =
      (await payload.find({ collection: "colors", where: { colorId: { equals: "5-38-4" } }, limit: 1, overrideAccess: true })).docs[0] ||
      await findColorByFamily(payload, "neutrals", "calm");

    console.log(`1. Blue Color: ${blueColor?.name} (${blueColor?.hexCode} / ${blueColor?.colorId})`);
    console.log(`2. Green Color: ${greenColor?.name} (${greenColor?.hexCode} / ${greenColor?.colorId})`);
    console.log(`3. Gold/Yellow Color: ${goldColor?.name} (${goldColor?.hexCode} / ${goldColor?.colorId})`);
    console.log(`4. Red/Crimson Color: ${redColor?.name} (${redColor?.hexCode} / ${redColor?.colorId})`);
    console.log(`5. Neutral/Slate Color: ${neutralColor?.name} (${neutralColor?.hexCode} / ${neutralColor?.colorId})`);

    const fiveColorVariants = (livingImg: string, blueImg: string, greenImg: string, goldImg: string, redImg: string, neutralImg: string) => [
      {
        color: blueColor?.id,
        colorLabel: blueColor ? `${blueColor.name} (${blueColor.colorId})` : "Ocean Blue",
        hex: blueColor?.hexCode || "#244C62",
        image: blueImg,
      },
      {
        color: greenColor?.id,
        colorLabel: greenColor ? `${greenColor.name} (${greenColor.colorId})` : "Botanical Green",
        hex: greenColor?.hexCode || "#215C46",
        image: greenImg,
      },
      {
        color: goldColor?.id,
        colorLabel: goldColor ? `${goldColor.name} (${goldColor.colorId})` : "Heritage Gold",
        hex: goldColor?.hexCode || "#C9A928",
        image: goldImg,
      },
      {
        color: redColor?.id,
        colorLabel: redColor ? `${redColor.name} (${redColor.colorId})` : "Royal Crimson",
        hex: redColor?.hexCode || "#8F3B47",
        image: redImg,
      },
      {
        color: neutralColor?.id,
        colorLabel: neutralColor ? `${neutralColor.name} (${neutralColor.colorId})` : "Slate Grey",
        hex: neutralColor?.hexCode || "#7D8193",
        image: neutralImg,
      },
    ];

    const roomVisualizerBlock = {
      blockType: "roomVisualizerCTA",
      isEnabled: true,
      title: "Room Visualizer CTA",
      sectionLabel: "Interactive Colour Visualizer",
      heading: "See It On Your Wall",
      description: "Pick any room space and explore real photos painted in our signature shades before committing to your project.",
      rooms: [
        {
          name: "Living Room",
          image: livingBaseId,
          colorVariants: fiveColorVariants(livingBaseId, livingNavyId, livingOffWhiteId, livingGreyId, livingOffWhiteId, livingGreyId),
        },
        {
          name: "Kitchen Room",
          image: kitchenBaseId,
          colorVariants: fiveColorVariants(kitchenBaseId, kitchenSageId, kitchenSageId, kitchenOffWhiteId, kitchenGreyId, kitchenGreyId),
        },
        {
          name: "Exterior Room",
          image: exteriorBaseId,
          colorVariants: fiveColorVariants(exteriorBaseId, exteriorGoldId, exteriorOffWhiteId, exteriorGoldId, exteriorCharcoalId, exteriorCharcoalId),
        },
      ],
      ctaButton: {
        label: "Launch Advanced Visualizer →",
        url: "/visualiser",
      },
    };

    console.log("🔍 Finding Home page...");
    const homePageRes = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "home",
        },
      },
      limit: 1,
      overrideAccess: true,
    });

    if (homePageRes.docs.length === 0) {
      console.log("⚠️ Home page not found in CMS pages collection. Done.");
      process.exit(0);
    }

    const homePage = homePageRes.docs[0];
    const currentLayout = (homePage.layout as any[]) || [];

    // Check if roomVisualizerCTA already exists in layout
    const existingIndex = currentLayout.findIndex((b) => b.blockType === "roomVisualizerCTA");
    if (existingIndex !== -1) {
      console.log(`↻ Updating existing roomVisualizerCTA block at index ${existingIndex}...`);
      currentLayout[existingIndex] = {
        ...currentLayout[existingIndex],
        ...roomVisualizerBlock,
      };
    } else {
      console.log(`+ Inserting roomVisualizerCTA block into home page layout...`);
      const popularIndex = currentLayout.findIndex((b) => b.blockType === "popularColours");
      if (popularIndex !== -1) {
        currentLayout.splice(popularIndex + 1, 0, roomVisualizerBlock);
      } else {
        currentLayout.push(roomVisualizerBlock);
      }
    }

    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: {
        layout: currentLayout,
      },
      context: { disableRevalidate: false },
      overrideAccess: true,
    });

    console.log("✅ Successfully updated Home Page with room visualizer linked to real Colors!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding room visualizer data:", err);
    process.exit(1);
  }
}

seedRoomVisualizer();
