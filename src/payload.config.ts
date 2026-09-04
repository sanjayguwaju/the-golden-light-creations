import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

// Core Studio Collections
import { Portfolio } from "./collections/Portfolio";
import { Films } from "./collections/Films";
import { Services } from "./collections/Services";
import { Testimonials } from "./collections/Testimonials";
import { Albums } from "./collections/Albums";
import { ContactSubmissions } from "./collections/ContactSubmissions";

// Media & Files
import { Media } from "./collections/Media";
import { Files } from "./collections/Files";

// Editorial & General CMS
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";

// Users & Auth
import { Users } from "./collections/Users";

// Globals
import { StudioSettings } from "./globals/StudioSettings/config";
import { SiteSettings } from "./globals/SiteSettings/config";

// Configuration & Helpers
import { plugins } from "./plugins";
import localization from "./i18n/localization";
import { defaultLexical } from "./fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import config from "./config";

const systemConfig = config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: "- The Golden Light Creations",
      description: "The Golden Light Creations - Luxury Photography & Cinematic Films Admin",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/favicon.svg",
        },
      ],
    },
    autoRefresh: true,
    components: {
      beforeLogin: ["@/components/BeforeLogin"],
      graphics: {
        Icon: "@/components/CustomLogo#CustomIcon",
        Logo: "@/components/CustomLogo#CustomLogo",
      },
      beforeDashboard: ["@/components/BeforeDashboard"],
      providers: ["@/components/AdminProviders"],
      views: {
        dashboard: {
          Component: "@/components/AdminDashboard#AdminDashboardLayout",
          path: "/dashboard",
        },
        reports: {
          Component: "@/components/Reports/ReportsViewLayout#ReportsViewLayout",
          path: "/reports",
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: systemConfig.DATABASE_URL || "",
    connectOptions: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    },
  }),
  collections: [
    // Studio Showcase
    Portfolio,
    Films,
    Services,
    Albums,

    // Client Inquiries & Social Proof
    ContactSubmissions,
    Testimonials,

    // Media Library
    Media,
    Files,

    // Editorial & Content
    Pages,
    Posts,
    Categories,

    // Administration
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [StudioSettings, SiteSettings],
  plugins,
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "The Golden Light Creations",
    apiKey: systemConfig.RESEND_API_KEY || "",
  }),
  localization,
  secret: systemConfig.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
