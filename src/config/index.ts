const config = () => {
  return {
    // App & Server
    NODE_ENV: process.env.NODE_ENV,
    environment: process.env.NODE_ENV,
    ENV: process.env.NODE_ENV,
    frontendURL: process.env.PAYLOAD_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001",

    // Secrets
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || "",
    PREVIEW_SECRET: process.env.PREVIEW_SECRET || "",
    CRON_SECRET: process.env.CRON_SECRET || "",

    // Database
    DATABASE_URI: process.env.DATABASE_URI || "",
    DATABASE_URL: process.env.DATABASE_URL || "",

    // Admin
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
    ADMIN_API_URL: process.env.ADMIN_API_URL || "",

    // S3 / MinIO / R2
    ENABLE_S3: process.env.ENABLE_S3 === "true",
    S3_BUCKET: process.env.S3_BUCKET || "",
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || "",
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || "",
    S3_REGION: process.env.S3_REGION || "",
    S3_ENDPOINT: process.env.S3_ENDPOINT || "",

    // Media
    MEDIA_CDN_URL: process.env.MEDIA_CDN_URL || "",

    // Email
    ENABLE_EMAIL: process.env.ENABLE_EMAIL === "true",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "",

    // Redis
    ENABLE_REDIS: process.env.ENABLE_REDIS === "true",
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_USERNAME: process.env.REDIS_USERNAME || "",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
    REDIS_TLS: process.env.REDIS_TLS === "true",
    REDIS_DB: process.env.REDIS_DB || 0,

    // SEO & Public App Info
    NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
    NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL || "",
    NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
    NEXT_PUBLIC_SOCIAL_X: process.env.NEXT_PUBLIC_SOCIAL_X || "",
    NEXT_PUBLIC_SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
  };
};

export type SYSTEM_CONFIG = ReturnType<typeof config>;

export default config;
