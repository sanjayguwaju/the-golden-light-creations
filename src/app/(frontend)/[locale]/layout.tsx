import { cn } from "@/utilities/ui";
import { Bebas_Neue, Montserrat, Poppins, Outfit, Inter, Mukta } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
import { TypedLocale } from "payload";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { OrganizationJsonLd } from "next-seo";
import { Metadata, Viewport } from "next";

import { Providers } from "@/providers";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import localization from "@/i18n/localization";
import { StudioNavbar } from "@/components/studio/StudioNavbar";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { InitTheme } from "@/providers/Theme/InitTheme";

import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

type Args = {
  children: React.ReactNode;
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://the-golden-light-creations.netlify.app"),
  title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
  description: "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "1234567890",
  },
  openGraph: {
    siteName: process.env.NEXT_PUBLIC_COMPANY_NAME || "The Golden Light Creations",
    title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
    description: "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://the-golden-light-creations.netlify.app",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#C0171E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params;
  const currentLocale = localization.locales.find((loc) => loc.code === locale);
  const direction = currentLocale?.rtl ? "rtl" : "ltr";

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      className={cn(bebas.variable, montserrat.variable, poppins.variable, outfit.variable, inter.variable, mukta.variable)}
      lang={locale}
      dir={direction}
      data-theme="light"
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <meta name="theme-color" content="#C0171E" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/manifest.json" rel="manifest" />
        <InitTheme />
      </head>
      <body className={cn(locale === "ne" ? "font-nepali" : "font-sans", "bg-white text-[#0A0A0A] antialiased selection:bg-[#C0171E] selection:text-white")} suppressHydrationWarning>
        <Toaster position="top-right" />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <NuqsAdapter>
              <StudioNavbar />
              <main className="overflow-x-clip min-h-screen bg-white text-[#0A0A0A]">{children}</main>
              <StudioFooter />
            </NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
        <OrganizationJsonLd
          type="Organization"
          logo={`${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_URL}`}
          name={process.env.NEXT_PUBLIC_COMPANY_NAME || ""}
          url={process.env.NEXT_PUBLIC_SITE_URL || ""}
          contactPoint={[
            {
              telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
              contactType: "customer service",
            },
          ]}
          sameAs={[
            process.env.NEXT_PUBLIC_SOCIAL_X || "",
            process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
          ].filter(Boolean)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: process.env.NEXT_PUBLIC_COMPANY_NAME || "The Golden Light Creations",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://the-golden-light-creations.vercel.app",
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
