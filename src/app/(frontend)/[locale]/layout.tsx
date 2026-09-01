import { cn } from "@/utilities/ui";
import { Outfit, Inter, Mukta } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";

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
import { Metadata } from "next";

import { Providers } from "@/providers";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import localization from "@/i18n/localization";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { SiteHeader } from "@/components/SiteHeader";
import { DynamicNavbar } from "@/components/DynamicNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { NoticeModalServer } from "@/components/NoticeModal/NoticeModalServer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { InitTheme } from "@/providers/Theme/InitTheme";

import "../globals.css";
import { QuickActionWidget } from "@/components/QuickActionWidget";
import type { Navigation, Footer, Header as HeaderType, TopBar, SiteSetting } from "@/payload-types";
import { GoogleAnalytics } from "@next/third-parties/google";
// import { MockSiteFooter } from "@/components/MockSiteFooter";
import { SplashScreen } from "@/components/SplashScreen";
import { TawkToChat } from "@/components/TawkToChat";

type Args = {
  children: React.ReactNode;
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://reliancepaintsnepal.com"),
  title: "Reliance Paints Nepal | Official Website",
  description: "Reliance Paints Nepal offers a wide range of decorative and industrial paints.",
  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "1234567890",
  },
  openGraph: {
    siteName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Reliance Paints Nepal",
    title: "Reliance Paints Nepal | Official Website",
    description: "Reliance Paints Nepal offers a wide range of decorative and industrial paints.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://reliancepaintsnepal.com",
    locale: "en_US",
    type: "website",
  },
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

  const [headerData, navData, footerData, topBarData, siteSettingsData] = await Promise.all([
    getCachedGlobal("header", 1, locale)() as Promise<HeaderType>,
    getCachedGlobal("navigation", 1, locale)() as Promise<Navigation>,
    getCachedGlobal("footer", 1, locale)() as Promise<Footer>,
    getCachedGlobal("top-bar", 1, locale)() as Promise<TopBar>,
    getCachedGlobal("site-settings", 1, locale)().catch(() => null) as Promise<SiteSetting | null>,
  ]);

  const whatsappNumber =
    siteSettingsData?.contactDetails?.whatsappNumber ||
    siteSettingsData?.contactDetails?.phone ||
    footerData?.contactInfo?.phone;

  return (
    <html
      className={cn(outfit.variable, inter.variable, mukta.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Yatra+One&family=Rozha+One&family=Noto+Serif+Devanagari:wght@700;900&display=swap"
          rel="stylesheet"
        />
        <InitTheme />
      </head>
      <body className={cn(locale === "ne" ? "font-nepali" : "font-sans", "antialiased")} suppressHydrationWarning>
        <Toaster position="top-right" />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <SplashScreen />
            <NuqsAdapter>
              <SiteHeader data={topBarData} />
              <DynamicNavbar locale={locale} />
              <NoticeModalServer />
              <ScrollToTop />
              <QuickActionWidget whatsappNumber={whatsappNumber} />
              <main className="overflow-x-clip">{children}</main>
              <SiteFooter data={footerData} />
              {/* <MockSiteFooter /> */}
              <TawkToChat 
                isEnabled={siteSettingsData?.tawkToChat?.enableTawkTo} 
                propertyId={siteSettingsData?.tawkToChat?.propertyId} 
                widgetId={siteSettingsData?.tawkToChat?.widgetId} 
              />
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
              name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Reliance Paints Nepal",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://reliancepaintsnepal.com",
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
