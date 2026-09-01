import "dotenv/config";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getPayload } from "payload";
import configPromise from "../src/payload.config";

// Configuration
const DEST_DIR = path.resolve(process.cwd(), "downloads/media");
const ORIGINALS_DIR = path.join(DEST_DIR, "originals");
const SIZES_DIR = path.join(DEST_DIR, "sizes");

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

interface DownloadItem {
  requestedKey: string;
  resolvedKey?: string;
  destPath: string;
  filename: string;
  filesize?: number;
  isSizeVariant?: boolean;
  parentDocId?: string;
}

// Build index of S3 bucket keys
async function buildS3Index(bucket: string, prefix: string) {
  console.log("📑 Indexing all files in S3 storage...");
  const exactSet = new Set<string>();
  const lowerMap = new Map<string, string>(); // lowercase key -> actual key
  const nameMap = new Map<string, string>(); // lowercase basename -> actual key

  let continuationToken: string | undefined = undefined;
  let totalIndexed = 0;

  do {
    const listCmd: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    });

    const response: any = await s3Client.send(listCmd);
    if (response.Contents) {
      for (const item of response.Contents) {
        if (item.Key && item.Key !== prefix) {
          exactSet.add(item.Key);
          lowerMap.set(item.Key.toLowerCase(), item.Key);
          const baseName = path.basename(item.Key).toLowerCase();
          if (!nameMap.has(baseName)) {
            nameMap.set(baseName, item.Key);
          }
          totalIndexed++;
        }
      }
    }
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  console.log(`✓ Indexed ${totalIndexed} files from S3.`);
  return { exactSet, lowerMap, nameMap };
}

function resolveKey(
  targetKey: string,
  index: { exactSet: Set<string>; lowerMap: Map<string, string>; nameMap: Map<string, string> }
): string | null {
  if (index.exactSet.has(targetKey)) {
    return targetKey;
  }

  const lower = targetKey.toLowerCase();
  if (index.lowerMap.has(lower)) {
    return index.lowerMap.get(lower)!;
  }

  const baseNameLower = path.basename(targetKey).toLowerCase();
  if (index.nameMap.has(baseNameLower)) {
    return index.nameMap.get(baseNameLower)!;
  }

  // Try matching with -1 suffix before extension
  const ext = path.extname(targetKey);
  const nameWithoutExt = targetKey.slice(0, -ext.length);
  const dash1Key = `${nameWithoutExt}-1${ext}`;
  if (index.exactSet.has(dash1Key)) return dash1Key;
  if (index.lowerMap.has(dash1Key.toLowerCase())) return index.lowerMap.get(dash1Key.toLowerCase())!;

  // Try matching base without extension or normalized spaces/dashes
  const cleanBase = baseNameLower.replace(/[-_\s]+/g, "");
  for (const [key, actualKey] of index.nameMap.entries()) {
    if (key.replace(/[-_\s]+/g, "") === cleanBase) {
      return actualKey;
    }
  }

  // Token-based similarity match (e.g. "pankaj kumar karn" vs "pankaj-kumar")
  const baseTokens = baseNameLower.replace(ext.toLowerCase(), "").split(/[-_\s]+/).filter(Boolean);
  let bestMatch: string | null = null;
  let maxMatchedTokens = 0;
  for (const [key, actualKey] of index.nameMap.entries()) {
    const keyExt = path.extname(key);
    if (keyExt === ext.toLowerCase()) {
      const keyTokens = key.replace(keyExt, "").split(/[-_\s]+/).filter(Boolean);
      const common = baseTokens.filter((t) => keyTokens.includes(t)).length;
      if (common >= 2 && common > maxMatchedTokens) {
        maxMatchedTokens = common;
        bestMatch = actualKey;
      }
    }
  }
  if (bestMatch) return bestMatch;

  return null;
}

async function downloadFile(item: DownloadItem, bucket: string, retries = 3): Promise<boolean> {
  const keyToFetch = item.resolvedKey || item.requestedKey;
  const dir = path.dirname(item.destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(item.destPath) && item.filesize) {
    const stat = fs.statSync(item.destPath);
    if (stat.size === item.filesize) {
      return true; // Already downloaded
    }
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: keyToFetch,
      });

      const response = await s3Client.send(command);
      if (!response.Body) {
        throw new Error("Empty response body from S3");
      }

      const fileStream = fs.createWriteStream(item.destPath);
      await pipeline(response.Body as any, fileStream);
      return true;
    } catch (err: any) {
      if (attempt === retries) {
        console.error(`\n❌ Failed to download ${keyToFetch} after ${retries} attempts: ${err.message}`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return false;
}

async function runPool<T>(items: T[], concurrency: number, fn: (item: T) => Promise<void>) {
  let index = 0;
  const workers = new Array(concurrency).fill(0).map(async () => {
    while (index < items.length) {
      const current = items[index++];
      await fn(current);
    }
  });
  await Promise.all(workers);
}

async function main() {
  const args = process.argv.slice(2);
  const includeSizes = args.includes("--include-sizes") || args.includes("--all");
  const bucket = process.env.S3_BUCKET;

  if (!bucket) {
    console.error("❌ S3_BUCKET is not set in environment.");
    process.exit(1);
  }

  // Build S3 Index
  const s3Index = await buildS3Index(bucket, "reliancepaints-storage/media/");

  console.log("🚀 Initializing Payload CMS...");
  const payload = await getPayload({ config: configPromise });

  console.log("🔍 Fetching all media items from collection...");
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

  // Prepare download queue
  const queue: DownloadItem[] = [];
  const manifest: any[] = [];

  for (const doc of allMediaDocs) {
    if (!doc.filename) continue;

    // Original file
    const origKey = `reliancepaints-storage/media/${doc.filename}`;
    const resolvedOrigKey = resolveKey(origKey, s3Index);
    const origDest = path.join(ORIGINALS_DIR, doc.filename);

    queue.push({
      requestedKey: origKey,
      resolvedKey: resolvedOrigKey || origKey,
      destPath: origDest,
      filename: doc.filename,
      filesize: doc.filesize,
      isSizeVariant: false,
      parentDocId: doc.id,
    });

    const manifestEntry: any = {
      id: doc.id,
      filename: doc.filename,
      resolvedS3Key: resolvedOrigKey || origKey,
      alt: doc.alt || "",
      mimeType: doc.mimeType,
      filesize: doc.filesize,
      width: doc.width,
      height: doc.height,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      localOriginalPath: path.relative(process.cwd(), origDest),
      sizes: {},
    };

    // Responsive size variants
    if (doc.sizes) {
      for (const [sizeName, sizeInfo] of Object.entries<any>(doc.sizes)) {
        if (sizeInfo && sizeInfo.filename) {
          const sizeKey = `reliancepaints-storage/media/${sizeInfo.filename}`;
          const resolvedSizeKey = resolveKey(sizeKey, s3Index);
          const sizeDest = path.join(SIZES_DIR, sizeInfo.filename);

          manifestEntry.sizes[sizeName] = {
            filename: sizeInfo.filename,
            resolvedS3Key: resolvedSizeKey || sizeKey,
            width: sizeInfo.width,
            height: sizeInfo.height,
            filesize: sizeInfo.filesize,
            mimeType: sizeInfo.mimeType,
            localPath: path.relative(process.cwd(), sizeDest),
          };

          if (includeSizes) {
            queue.push({
              requestedKey: sizeKey,
              resolvedKey: resolvedSizeKey || sizeKey,
              destPath: sizeDest,
              filename: sizeInfo.filename,
              filesize: sizeInfo.filesize,
              isSizeVariant: true,
              parentDocId: doc.id,
            });
          }
        }
      }
    }

    manifest.push(manifestEntry);
  }

  // Ensure directories exist
  fs.mkdirSync(DEST_DIR, { recursive: true });
  fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
  if (includeSizes) {
    fs.mkdirSync(SIZES_DIR, { recursive: true });
  }

  // Write manifest.json
  const manifestPath = path.join(DEST_DIR, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`📄 Saved media manifest to ${path.relative(process.cwd(), manifestPath)}`);

  console.log(
    `📥 Downloading ${queue.length} files (${includeSizes ? "originals + sizes" : "originals only"})...`
  );

  let completed = 0;
  let successCount = 0;
  let failureCount = 0;
  let totalBytes = 0;
  const startTime = Date.now();

  const CONCURRENCY = 20;

  await runPool(queue, CONCURRENCY, async (item) => {
    const ok = await downloadFile(item, bucket);
    completed++;
    if (ok) {
      successCount++;
      totalBytes += item.filesize || 0;
    } else {
      failureCount++;
    }

    const percent = ((completed / queue.length) * 100).toFixed(1);
    process.stdout.write(
      `\r⏳ [${completed}/${queue.length}] (${percent}%) | Success: ${successCount} | Failed: ${failureCount}`
    );
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const downloadedMB = (totalBytes / (1024 * 1024)).toFixed(2);

  console.log("\n");
  console.log("==========================================");
  console.log("🎉 Download Complete!");
  console.log(`📁 Target folder: ${DEST_DIR}`);
  console.log(`📊 Originals folder: ${ORIGINALS_DIR}`);
  if (includeSizes) {
    console.log(`📐 Sizes folder: ${SIZES_DIR}`);
  }
  console.log(`📄 Manifest: ${manifestPath}`);
  console.log(`✅ Successfully downloaded: ${successCount} files (~${downloadedMB} MB)`);
  if (failureCount > 0) {
    console.log(`⚠️ Failed to download: ${failureCount} files`);
  }
  console.log(`⏱️ Time elapsed: ${durationSec}s`);
  console.log("==========================================");

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
