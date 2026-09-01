import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";
import { ProductCategories } from "./collections/ProductCategories";
import { ProductSubcategories } from "./collections/ProductSubcategories";
import { Products } from "./collections/Products";
import { List } from "./collections/List";
import { CommonFormSubmissions } from "./collections/CommonFormSubmissions";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Stores } from "./collections/Stores";
import { Careers } from "./collections/Careers";
import { JobApplications } from "./collections/JobApplications";
import { Warranties } from "./collections/Warranties";
import { Faqs } from "./collections/Faqs";
import { ContractorApplications } from "./collections/ContractorApplications";
import { plugins } from "./plugins";
import localization from "./i18n/localization";
import { TopBar } from "./globals/TopBar/config";
import { Header } from "./globals/Header/config";
import { Navigation } from "./globals/Navigation/config";
import { Footer } from "./globals/Footer/config";
import { SiteSettings } from "./globals/SiteSettings/config";
import { defaultLexical } from "./fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { Staffs } from "./collections/Staffs";
import { Albums } from "./collections/Albums";
import { Files } from "./collections/Files";
import { Colors } from "./collections/Colors";
import { Inspiration } from "./collections/Inspiration";
import { ColorTrends } from "./collections/ColorTrends";
import config from "./config";

const systemConfig = config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: "- Reliance Paints",
      description: "Reliance Paints Pvt. Ltd.",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.png",
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
    Media,
    Users,
    Pages,
    Posts,
    Categories,
    ProductCategories,
    ProductSubcategories,
    Products,
    List,
    Staffs,
    CommonFormSubmissions,
    Albums,
    Files,
    Colors,
    Inspiration,
    ColorTrends,
    Stores,
    ContactSubmissions,
    Careers,
    JobApplications,
    Warranties,
    Faqs,
    ContractorApplications,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [TopBar, Header, Navigation, Footer, SiteSettings],
  plugins,
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Reliance Paints",
    apiKey: systemConfig.RESEND_API_KEY || "",
  }),
  localization,
  secret: systemConfig.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
