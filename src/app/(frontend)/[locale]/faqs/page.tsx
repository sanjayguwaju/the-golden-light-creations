import type { Metadata } from "next/types";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";
import FaqAccordion from "@/components/faqs/FaqAccordion";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

const translations = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Got Questions? We're Here to Help",
    description1: "Whether you're painting your home for the first time or looking for the right product for your next project, we've answered some of the most common questions to help you get started.",
    description2: "If you can't find the answer you're looking for, feel free to contact our team. We're always happy to help.",
    contactUs: "Contact Us",
    exploreProducts: "Explore Products",
    breadcrumbHome: "Home",
    breadcrumbFaqs: "FAQs",
    stillHaveQuestionsTitle: "Still Have Questions?",
    stillHaveQuestionsDesc: "Our team is always ready to help you choose the right paint and answer any questions you may have.",
    contactOurTeam: "Contact Our Team",
    findADealer: "Find a Dealer",
    metaTitle: "Frequently Asked Questions | Reliance Paints",
    metaDescription:
      "Find answers to frequently asked questions about Reliance Paints, our products, applications, technical tips, color matching, and warranties.",
  }
};

export default async function FaqsPage({ params }: Args) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  // Query FAQs collection from Payload CMS
  const { docs: rawFaqs } = await payload.find({
    collection: "faqs",
    sort: "order",
    limit: 100,
    locale,
  });

  // Map database response to client items
  const faqs = rawFaqs.map((faq) => ({
    id: faq.id,
    question: faq.question || "",
    answer: faq.answer || "",
    category: faq.category as "general" | "products" | "technical" | "visualizer" | "warranty",
  }));

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-page-bg pb-24">
      {/* Hero Section */}
      <section className="relative bg-reliance-navy pt-12 pb-12 overflow-hidden">
        {/* Glow Effects for Premium Aesthetics */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-reliance-gold rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-reliance-red rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-reliance-white transition-colors">
              {t.breadcrumbHome}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white">{t.breadcrumbFaqs}</span>
          </div>

          {/* Heading Content */}
          <div className="max-w-2xl text-reliance-white">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/20 rounded-full px-4 py-1.5 text-reliance-gold text-sm mb-6 border border-reliance-gold/30">
              <HelpCircle className="w-4 h-4" />
              <span>{t.breadcrumbFaqs} Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
              {t.title}
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-reliance-gold">
              {t.subtitle}
            </h2>
            <p className="text-reliance-white/80 text-lg leading-relaxed max-w-2xl mb-4">
              {t.description1}
            </p>
            <p className="text-reliance-white/80 text-lg leading-relaxed max-w-2xl mb-8">
              {t.description2}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-reliance-red text-white px-6 py-3 rounded-full font-medium hover:bg-reliance-red/90 transition-colors"
              >
                {t.contactUs}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                {t.exploreProducts}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion / FAQ Content Section */}
      <section className="container py-12 md:py-20">
        <FaqAccordion items={faqs} locale={locale} />
      </section>

      {/* Still Have Questions CTA */}
      <section className="container pb-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-reliance-navy mb-4 font-display">
            {t.stillHaveQuestionsTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t.stillHaveQuestionsDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-reliance-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-reliance-red/90 transition-colors"
            >
              {t.contactOurTeam}
            </Link>
            <Link
              href={`/${locale}/store-locator`}
              className="bg-reliance-navy text-white px-8 py-3.5 rounded-full font-medium hover:bg-reliance-navy/90 transition-colors"
            >
              {t.findADealer}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: "website",
    },
  };
}
