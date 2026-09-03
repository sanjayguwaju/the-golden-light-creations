import "dotenv/config";
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand, _Object } from "@aws-sdk/client-s3";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

async function main() {
  const isExecute = process.argv.includes("--execute") || process.argv.includes("--force");
  const bucket = process.env.S3_BUCKET;

  if (!bucket) {
    console.error("❌ S3_BUCKET is not set.");
    process.exit(1);
  }

  console.log("🚀 Initializing Payload CMS...");
  const payload = await getPayload({ config: configPromise });

  console.log("🔍 Fetching media documents from collection...");
  let page = 1;
  let allMediaDocs: any[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await payload.find({
      collection: "media",
      limit: 100,
      page,
      depth: 0,
    });
    allMediaDocs.push(...result.docs);
    hasNextPage = result.hasNextPage;
    page++;
  }

  console.log(`📦 Found ${allMediaDocs.length} media records in collection.`);

  const storagePrefix = process.env.S3_PREFIX || "the-golden-light-creations";

  // Build sets of files to preserve
  const preservedFilenames = new Set<string>();
  const thumbnailFilenames = new Set<string>();

  for (const doc of allMediaDocs) {
    if (doc.filename) {
      preservedFilenames.add(doc.filename.toLowerCase());
      preservedFilenames.add(`${storagePrefix}/media/${doc.filename}`.toLowerCase());
    }
    if (doc.sizes?.thumbnail?.filename) {
      thumbnailFilenames.add(doc.sizes.thumbnail.filename.toLowerCase());
      thumbnailFilenames.add(`${storagePrefix}/media/${doc.sizes.thumbnail.filename}`.toLowerCase());
    }
  }

  console.log("📡 Listing all objects in Cloudflare R2...");
  let continuationToken: string | undefined = undefined;
  const allObjects: _Object[] = [];

  do {
    const listCmd: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: `${storagePrefix}/media/`,
      ContinuationToken: continuationToken,
    });

    const response: any = await s3Client.send(listCmd);
    if (response.Contents) {
      allObjects.push(...response.Contents);
    }
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  console.log(`📦 Total objects in R2 under media prefix: ${allObjects.length}`);

  // Categorize objects
  const toKeep: _Object[] = [];
  const toDelete: _Object[] = [];
  let deleteSizeBytes = 0;
  let keepSizeBytes = 0;

  // Regex pattern for generated sizes like -500x500.jpg, -1200x630.png, -300x200.jpg, etc.
  const sizeVariantRegex = /-\d+x\d+\.(png|jpe?g|webp|avif|gif)$/i;

  for (const obj of allObjects) {
    if (!obj.Key || obj.Key.endsWith("/")) continue;

    const lowerKey = obj.Key.toLowerCase();
    const basenameLower = obj.Key.split("/").pop()?.toLowerCase() || "";

    const isOriginal = preservedFilenames.has(lowerKey) || preservedFilenames.has(basenameLower);
    const isThumbnail = thumbnailFilenames.has(lowerKey) || thumbnailFilenames.has(basenameLower);
    const isSizeVariant = sizeVariantRegex.test(obj.Key);

    if (isOriginal) {
      toKeep.push(obj);
      keepSizeBytes += obj.Size || 0;
    } else if (isThumbnail) {
      // Keep thumbnail for admin dashboard
      toKeep.push(obj);
      keepSizeBytes += obj.Size || 0;
    } else if (isSizeVariant) {
      // Unused size variant
      toDelete.push(obj);
      deleteSizeBytes += obj.Size || 0;
    } else {
      // If it doesn't match sizeVariant pattern, preserve it safely
      toKeep.push(obj);
      keepSizeBytes += obj.Size || 0;
    }
  }

  const deleteMB = (deleteSizeBytes / (1024 * 1024)).toFixed(2);
  const keepMB = (keepSizeBytes / (1024 * 1024)).toFixed(2);

  console.log("\n=================================================");
  console.log("📊 R2 Media Analysis:");
  console.log(`   • Files to KEEP:   ${toKeep.length} files (~${keepMB} MB) (Originals + Admin Thumbnails)`);
  console.log(`   • Files to PURGE:  ${toDelete.length} files (~${deleteMB} MB) (Unused size variants)`);
  console.log("=================================================");

  if (!isExecute) {
    console.log("\n🔒 DRY-RUN MODE: No files were deleted.");
    console.log("👉 To perform the actual deletion, run:");
    console.log("   pnpm r2:cleanup --execute\n");
    process.exit(0);
  }

  console.log(`\n🗑️  Executing deletion of ${toDelete.length} unused variant files in batches...`);

  // Delete in batches of 500 (S3 DeleteObjects supports up to 1000)
  const BATCH_SIZE = 500;
  let deletedCount = 0;

  for (let i = 0; i < toDelete.length; i += BATCH_SIZE) {
    const batch = toDelete.slice(i, i + BATCH_SIZE);
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: batch.map((item) => ({ Key: item.Key! })),
        Quiet: true,
      },
    });

    await s3Client.send(deleteCommand);
    deletedCount += batch.length;
    process.stdout.write(`\r🧹 Deleted [${deletedCount}/${toDelete.length}] files...`);
  }

  console.log("\n\n=================================================");
  console.log("🎉 Cloudflare R2 Cleanup Complete!");
  console.log(`✅ Deleted: ${deletedCount} unused variant files`);
  console.log(`💾 Storage Freed: ~${deleteMB} MB`);
  console.log("=================================================");

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
