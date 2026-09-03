import "dotenv/config";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { S3Client, GetObjectCommand, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";

// Configuration
const BASE_DEST_DIR = path.resolve(process.cwd(), "downloads/r2-storage");
const S3_PREFIX = `${process.env.S3_PREFIX || "the-golden-light-creations"}/`;

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

interface DownloadTask {
  key: string;
  size: number;
  lastModified?: Date;
  destPath: string;
}

async function listAllR2Objects(bucket: string, prefix: string): Promise<DownloadTask[]> {
  console.log(`📡 Connecting to Cloudflare R2 bucket: "${bucket}"...`);
  console.log(`🔍 Listing all objects under prefix: "${prefix}"...`);

  let continuationToken: string | undefined = undefined;
  const tasks: DownloadTask[] = [];
  let totalBytes = 0;

  do {
    const command: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    });

    const response: any = await s3Client.send(command);
    if (response.Contents) {
      for (const item of response.Contents as _Object[]) {
        if (!item.Key || item.Key.endsWith("/")) continue;

        // Strip the base prefix for cleaner local folder structure
        // e.g. reliancepaints-storage/media/xyz.png -> media/xyz.png
        const relativeKey = item.Key.startsWith(prefix)
          ? item.Key.slice(prefix.length)
          : item.Key;

        const destPath = path.join(BASE_DEST_DIR, relativeKey);
        const size = item.Size || 0;
        totalBytes += size;

        tasks.push({
          key: item.Key,
          size,
          lastModified: item.LastModified,
          destPath,
        });
      }
    }

    process.stdout.write(`\r📦 Discovered ${tasks.length} files (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)...`);
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  console.log(`\n✅ Total files found in R2: ${tasks.length} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  return tasks;
}

async function downloadSingleFile(task: DownloadTask, bucket: string, retries = 3): Promise<boolean> {
  const dir = path.dirname(task.destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file already exists with exact size
  if (fs.existsSync(task.destPath)) {
    try {
      const stat = fs.statSync(task.destPath);
      if (stat.size === task.size && task.size > 0) {
        return true; // Already downloaded & valid
      }
    } catch {
      // ignore
    }
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: task.key,
      });

      const response = await s3Client.send(command);
      if (!response.Body) {
        throw new Error("Empty response body from R2");
      }

      const tempDestPath = `${task.destPath}.tmp_${Date.now()}`;
      const fileStream = fs.createWriteStream(tempDestPath);
      await pipeline(response.Body as any, fileStream);

      // Rename temp file to destination atomically
      fs.renameSync(tempDestPath, task.destPath);
      return true;
    } catch (err: any) {
      if (attempt === retries) {
        console.error(`\n❌ Failed to download [${task.key}]: ${err.message}`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 400 * attempt));
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
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    console.error("❌ S3_BUCKET is not set in environment.");
    process.exit(1);
  }

  const tasks = await listAllR2Objects(bucket, S3_PREFIX);
  if (tasks.length === 0) {
    console.log("No files found to download.");
    process.exit(0);
  }

  fs.mkdirSync(BASE_DEST_DIR, { recursive: true });

  // Save R2 manifest
  const manifestPath = path.join(BASE_DEST_DIR, "manifest.json");
  const manifestData = tasks.map((t) => ({
    r2Key: t.key,
    sizeBytes: t.size,
    lastModified: t.lastModified,
    localPath: path.relative(process.cwd(), t.destPath),
  }));
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), "utf-8");
  console.log(`📄 Saved R2 manifest to ${path.relative(process.cwd(), manifestPath)}`);

  console.log(`📥 Starting direct download to: ${BASE_DEST_DIR}`);
  console.log(`⚡ Concurrency: 25 parallel streams`);

  let completed = 0;
  let successCount = 0;
  let failureCount = 0;
  let totalDownloadedBytes = 0;
  const totalBytesAll = tasks.reduce((acc, t) => acc + t.size, 0);
  const startTime = Date.now();

  const CONCURRENCY = 25;

  await runPool(tasks, CONCURRENCY, async (task) => {
    const ok = await downloadSingleFile(task, bucket);
    completed++;
    if (ok) {
      successCount++;
      totalDownloadedBytes += task.size;
    } else {
      failureCount++;
    }

    const percent = ((completed / tasks.length) * 100).toFixed(1);
    const currMB = (totalDownloadedBytes / (1024 * 1024)).toFixed(1);
    const totalMB = (totalBytesAll / (1024 * 1024)).toFixed(1);
    const elapsedSec = (Date.now() - startTime) / 1000;
    const speedMBs = elapsedSec > 0 ? (totalDownloadedBytes / (1024 * 1024) / elapsedSec).toFixed(1) : "0.0";

    process.stdout.write(
      `\r⏳ [${completed}/${tasks.length}] (${percent}%) | ${currMB}/${totalMB} MB | Speed: ${speedMBs} MB/s | Failed: ${failureCount}`
    );
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const downloadedMB = (totalDownloadedBytes / (1024 * 1024)).toFixed(2);

  console.log("\n");
  console.log("=================================================");
  console.log("🎉 Direct Cloudflare R2 Download Complete!");
  console.log(`📁 Target Directory: ${BASE_DEST_DIR}`);
  console.log(`📄 Manifest File:    ${manifestPath}`);
  console.log(`✅ Success:          ${successCount} files (~${downloadedMB} MB)`);
  if (failureCount > 0) {
    console.log(`⚠️  Failed:           ${failureCount} files`);
  }
  console.log(`⏱️  Total Time:       ${durationSec}s`);
  console.log("=================================================");

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
