import type { Metadata } from "next";
import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, Calendar, ArrowLeft, ChevronRight, Home } from "lucide-react";
import RichText from "@/components/RichText";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { ShareJobButtons } from "@/components/careers/ShareJobButtons";
import { GeneralApplicationModal } from "@/components/careers/GeneralApplicationModal";
import type { Career } from "@/payload-types";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const careers = await payload.find({
    collection: "careers",
    limit: 1000,
    select: { slug: true },
    depth: 0,
  });

  return careers.docs
    .map(({ slug }) => ({ slug }))
    .filter((item) => Boolean(item.slug));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "careers",
    where: { slug: { equals: slug } },
    depth: 0,
    locale: locale as any,
  });

  const career = docs[0];

  if (!career) {
    return { title: "Job Not Found | Reliance Paints" };
  }

  const title = `${career.title} - Careers | Reliance Paints`;
  const description = `Apply for the ${career.title} position in the ${career.department} department at Reliance Paints, located in ${career.location}.`;
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://reliancepaints.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Reliance Paints",
      locale,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Args) {
  const { slug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "careers",
    where: { slug: { equals: slug } },
    depth: 1,
    locale: locale as any,
  });

  const career = docs[0] as Career | undefined;

  if (!career) {
    notFound();
  }

  // Google Jobs Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: career.title,
    description: `Position: ${career.title} at Reliance Paints Industries Pvt. Ltd. Department: ${career.department}. Location: ${career.location}`,
    identifier: {
      "@type": "PropertyValue",
      name: "Reliance Paints",
      value: career.id,
    },
    datePosted: career.createdAt,
    employmentType: career.type ? career.type.toUpperCase().replace("-", "_") : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Reliance Paints Industries Pvt. Ltd.",
      sameAs: "https://reliancepaints.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.location || "Kathmandu",
        addressCountry: "NP",
      },
    },
  };

  return (
    <div className="min-h-screen bg-reliance-offwhite dark:bg-slate-950 flex flex-col pt-8 pb-24">
      {/* Inject Google Jobs JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb & Back Link */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-reliance-grey dark:text-slate-400">
            <Link href={`/${locale}`} className="hover:text-reliance-navy dark:hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${locale}/careers`} className="hover:text-reliance-navy dark:hover:text-white">
              Careers
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-reliance-navy dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">
              {career.title}
            </span>
          </nav>

          <Link
            href={`/${locale}/careers`}
            className="inline-flex items-center text-xs font-bold text-reliance-navy dark:text-white hover:text-reliance-gold transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Careers
          </Link>
        </div>

        {/* Job Header */}
        <div className="bg-white dark:bg-slate-900 border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-8 md:p-12 mb-8 rounded-none">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-reliance-gold/10 text-reliance-gold text-xs font-bold uppercase tracking-wider border border-reliance-gold/30">
              {career.department}
            </span>
            <span className="inline-block px-3 py-1 bg-reliance-navy/10 text-reliance-navy dark:bg-slate-800 dark:text-slate-300 text-xs font-bold uppercase tracking-wider border border-reliance-navy/20">
              {career.type ? career.type.replace("-", " ") : "Full Time"}
            </span>
            {!career.isActive && (
              <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200">
                Closed
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-reliance-navy dark:text-white mb-6 uppercase">
            {career.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-reliance-grey dark:text-slate-300 border-t pt-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-reliance-gold" />
              {career.location}
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-reliance-gold" />
              {career.department}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-reliance-gold" />
              Posted on {new Date(career.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Social Share Buttons */}
          <ShareJobButtons title={career.title} />
        </div>

        {/* Job Description */}
        <div className="bg-white dark:bg-slate-900 border border-reliance-navy shadow-[8px_8px_0_0_#0D1B3E] p-8 md:p-12 mb-12 rounded-none">
          <h2 className="text-2xl font-bold text-reliance-navy dark:text-white mb-6 border-b pb-4 uppercase">
            Job Description
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-reliance-navy prose-headings:uppercase prose-a:text-reliance-gold">
            <RichText data={career.description} />
          </div>
        </div>

        {/* Application Form */}
        {career.isActive ? (
          <div id="apply">
            <JobApplicationForm
              careerId={career.id}
              jobType={career.type}
              department={career.department}
            />
          </div>
        ) : (
          <div className="bg-reliance-offwhite dark:bg-slate-900 border border-reliance-navy p-8 text-center rounded-none shadow-[8px_8px_0_0_#0D1B3E] space-y-4">
            <h3 className="text-xl font-bold text-reliance-navy dark:text-white uppercase">
              This position is no longer accepting applications.
            </h3>
            <p className="text-reliance-grey dark:text-slate-400 text-sm max-w-md mx-auto">
              Please browse our active openings or submit your resume to our talent network for future opportunities.
            </p>
            <div className="pt-2">
              <GeneralApplicationModal>
                <button className="inline-flex items-center justify-center bg-reliance-navy hover:bg-reliance-gold text-white hover:text-reliance-navy px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-none cursor-pointer">
                  Submit Your Resume
                </button>
              </GeneralApplicationModal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
