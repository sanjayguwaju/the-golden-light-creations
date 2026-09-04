import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { TypedLocale } from "payload";
import React from "react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Gallery from "./Gallery";
import { Separator } from "@/components/ui/separator";
import type { Album } from "@/payload-types";

export const revalidate = 600;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const albums = await payload.find({
    collection: "albums",
    limit: 1000,
    select: { slug: true },
  });

  return albums.docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const response = await payload.find({
    collection: "albums",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const album = response.docs[0];
  if (!album) return { title: "Album Not Found" };

  return {
    title: `${album.title} | Photo Gallery | The Golden Light Creations`,
    description: `Photos from ${album.title} by The Golden Light Creations.`,
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const response = await payload.find({
    collection: "albums",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    locale: locale as TypedLocale,
  });

  const album = response.docs[0] as unknown as Album;

  if (!album) {
    return notFound();
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Dynamic Header Section */}
      <div className="bg-muted/30 border-b py-10 mb-12">
        <div className="container">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/albums">Albums</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-primary">
                  {album.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase">
              {album.title}
            </h1>
            <div className="flex justify-center">
              <Separator className="w-24 h-1.5 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Exploring the captured moments from our collection.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Gallery Grid Section */}
        {album.images && album.images.length > 0 ? (
          <Gallery images={album.images} />
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <p className="text-xl text-muted-foreground">
              This album is currently empty. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
