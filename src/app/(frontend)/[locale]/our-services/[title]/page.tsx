import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Clock, User, ExternalLink, ShieldPlus } from "lucide-react";
import RichText from "@/components/RichText";
import Image from "next/image";
import type { Media, Staff } from "@/payload-types";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  const payload = await getPayload({ config: configPromise });

  // Fetch all pages
  const pages = await payload.find({
    collection: "pages",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let foundService: any = null;

  for (const doc of pages.docs) {
    const layout = doc.layout || [];

    for (const block of layout) {
      if (block.blockType === "ourServices" && block.categories) {
        const match = block.categories.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (s: any) => s.title === decodedTitle
        );

        if (match) {
          foundService = match;
          break;
        }
      }
    }

    if (foundService) break;
  }

  if (!foundService) {
    return notFound();
  }

  const service = foundService;

  return (
    <div className="min-h-screen bg-[#fefdf8] pb-16">
      {/* ─── BREADCRUMB HEADER ───────────────── */}
      <div className="bg-[#f0f2f5] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#0066cc]">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#0066cc]">
                  Our Services
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ─── MAIN CONTENT ───────────────── */}
      <div className="container mx-auto px-6 pt-12">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            {service.title}
          </h1>

          {service.description && (
            <p className="text-[#333] text-center max-w-3xl mb-10 leading-relaxed text-[15px]">
              {service.description}
            </p>
          )}

          {/* Social Buttons */}
          <div className="flex items-center justify-center gap-0 mb-12">
            <button className="bg-[#4267B2] text-white px-5 py-2.5 flex items-center gap-2 text-sm font-semibold border">
              Share
            </button>
            <button className="bg-[#1DA1F2] text-white px-5 py-2.5 flex items-center gap-2 text-sm font-semibold border">
              Tweet
            </button>
            <button className="bg-[#db4a39] text-white px-5 py-2.5 flex items-center gap-2 text-sm font-semibold border">
              Share
            </button>
          </div>
        </div>

        {/* ─── DETAILS ───────────────── */}
        <div className="w-full max-w-4xl mx-auto space-y-12">
          {/* Long Description */}
          {service.longDescription && (
            <div className="prose max-w-none text-gray-800 border-t pt-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#1a5c2e]">
                <ShieldPlus className="w-6 h-6" />
                About the Section
              </h2>

              <RichText data={service.longDescription} enableGutter={false} />
            </div>
          )}

          {/* Timings */}
          {service.timings && (
            <div className="flex items-start gap-4 bg-green-50 border rounded-xl p-6">
              <Clock className="w-6 h-6 text-[#1a5c2e]" />

              <div>
                <h4 className="font-bold text-[#1a5c2e] text-lg mb-2">Availability & Timings</h4>

                <p className="text-gray-700 whitespace-pre-wrap">{service.timings}</p>
              </div>
            </div>
          )}

          {/* Doctors */}
          {service.availableDoctors && service.availableDoctors.length > 0 && (
            <div className="border-t pt-10">
              <h4 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <User className="w-7 h-7 text-[#1a5c2e]" />
                Specialized Doctors
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.availableDoctors.map((doc: Staff | string, idx: number) => {
                  const doctor = doc as Staff;
                  if (!doctor?.fullName) return null;

                  const photo = doctor.profilePhoto as Media;

                  return (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl border bg-white shadow-sm">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative">
                        {photo?.url ? (
                          <Image
                            src={photo.url}
                            alt={doctor.fullName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User />
                        )}
                      </div>

                      <div>
                        <p className="font-bold">
                          {doctor.titlePrefix}. {doctor.fullName}
                        </p>

                        <p className="text-sm text-[#1a5c2e] font-semibold">{doctor.designation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* External Link */}
          {service.link && (
            <div className="pt-10 flex justify-center">
              <Button asChild className="bg-[#1a5c2e] text-white px-10 h-14">
                <Link href={service.link} target="_blank" className="flex items-center gap-2">
                  View Full Information
                  <ExternalLink size={20} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
