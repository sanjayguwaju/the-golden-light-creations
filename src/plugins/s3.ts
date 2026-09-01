import { s3Storage } from "@payloadcms/storage-s3";
import config from "../config";

const systemConfig = config();

export const s3StoragePlugin = s3Storage({
  collections: {
    // ─── files → Payload-proxied (access controlled) ───────────────
    // S3 path: files/{folder}/{filename}
    // URL:     /api/files/file/{filename}  (gated by Payload access rules)
    files: {
      prefix: "reliancepaints-storage/files",
      generateFileURL: ({ filename }) => {
        // Route through Payload so isPrivate access rule is enforced
        if (!filename) return "";
        return `/api/files/file/${filename}`;
      },
    },

    // ─── media → direct MinIO (fully public) ───────────────────────
    // S3 path: media/{filename}
    // URL:     https://minio.../bucket/media/{filename}
    media: {
      prefix: "reliancepaints-storage/media",
      generateFileURL: ({ filename }) => {
        if (!filename) return "";
        return `/api/media/file/${filename}`;
      },
    },
  },

  bucket: systemConfig.S3_BUCKET,
  config: {
    endpoint: systemConfig.S3_ENDPOINT,
    credentials: {
      accessKeyId: systemConfig.S3_ACCESS_KEY_ID,
      secretAccessKey: systemConfig.S3_SECRET_ACCESS_KEY,
    },
    region: systemConfig.S3_REGION,
  },
});
