import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { TypedLocale } from "payload";

import { LivePreviewListener } from "@/components/LivePreviewListener";
import Image from "next/image";
import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import type { Media } from "@/payload-types";
import { getTitlePrefixLabel, getDeptLabel } from "@/components/StaffCard";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const staffs = await payload.find({
    collection: "staffs",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = staffs.docs
    ?.filter((doc) => doc.slug)
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await paramsPromise;

  if (!slug) {
    return <PayloadRedirects url="/staffs" />;
  }

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);
  const url = "/staffs/" + decodedSlug;
  const staff = await queryStaffBySlug({
    slug: decodedSlug,
    locale,
  });

  if (!staff) {
    return <PayloadRedirects url={url} />;
  }

  const photoUrl =
    staff.profilePhoto && typeof staff.profilePhoto === "object"
      ? (staff.profilePhoto as Media).url
      : null;
  const photoAlt =
    staff.profilePhoto && typeof staff.profilePhoto === "object"
      ? (staff.profilePhoto as Media).alt || staff.fullName
      : staff.fullName;

  return (
    <article className="container py-16 lg:py-24 max-w-5xl">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column - Image & Quick Info */}
        <div className="space-y-6">
          <div className="aspect-square relative rounded-xl overflow-hidden flex items-center justify-center group">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                priority
                className="object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="text-8xl text-muted-foreground font-light transition-transform duration-700 group-hover:scale-110">
                {staff.fullName.charAt(0)}
              </div>
            )}
          </div>

          <div className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
            <div className="space-y-3 text-sm">
              {staff.email && (
                <div>
                  <span className="text-muted-foreground block text-xs">Email</span>
                  <a href={`mailto:${staff.email}`} className="text-primary hover:underline">
                    {staff.email}
                  </a>
                </div>
              )}
              {staff.phone && (
                <div>
                  <span className="text-muted-foreground block text-xs">Phone</span>
                  <a href={`tel:${staff.phone}`} className="text-primary hover:underline">
                    {staff.phone}
                  </a>
                </div>
              )}
              {staff.address && (
                <div>
                  <span className="text-muted-foreground block text-xs">Location</span>
                  <span>
                    {[staff.address.street, staff.address.city, staff.address.district]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-2 space-y-10">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-muted-foreground font-normal text-2xl md:text-3xl mr-2">
                {getTitlePrefixLabel(staff.titlePrefix)}
              </span>
              {staff.fullName}
            </h1>
            <p className="text-xl text-muted-foreground">{staff.designation}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary" className="text-sm">
                {getDeptLabel(staff.department)}
              </Badge>
              {staff.specialization && (
                <Badge variant="outline" className="text-sm">
                  {staff.specialization}
                </Badge>
              )}
            </div>
          </div>

          {staff.biography && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Biography</h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <RichText data={staff.biography} enableGutter={false} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {staff.qualifications && staff.qualifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight border-b pb-2">
                  Qualifications
                </h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {staff.qualifications.map((qual, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <div>
                        <p className="font-medium text-foreground">{qual.degree}</p>
                        <p>
                          {qual.institution} {qual.year ? `(${qual.year})` : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {staff.availabilitySchedule && staff.availabilitySchedule.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight border-b pb-2">Schedule</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {staff.availabilitySchedule.map((sched, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b border-border/50 pb-2 last:border-0"
                    >
                      <span className="capitalize">{sched.day}</span>
                      <span className="font-medium">{sched.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Generate simple metadata using the staff's name and designation
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise;

  if (!slug) return { title: "Staff Directory" };

  const decodedSlug = decodeURIComponent(slug);
  const staff = await queryStaffBySlug({
    slug: decodedSlug,
    locale,
  });

  if (!staff) return { title: "Staff Not Found" };

  const prefix = staff.titlePrefix
    ? staff.titlePrefix.charAt(0).toUpperCase() + staff.titlePrefix.slice(1) + ". "
    : "";
  const title = `${prefix}${staff.fullName} | ${staff.designation}`;

  return {
    title,
    description: staff.specialization
      ? `Specialist in ${staff.specialization} at Reliance Paints`
      : `Staff at Reliance Paints`,
  };
}

const queryStaffBySlug = cache(async ({ slug }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "staffs",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
