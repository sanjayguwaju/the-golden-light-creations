import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { TypedLocale } from "payload";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Camera } from "lucide-react";
import type { Media } from "@/payload-types";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function AlbumsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const albums = await payload.find({
    collection: "albums",
    depth: 1,
    limit: 100,
    locale: locale as TypedLocale,
  });

  return (
    <div className="pb-24 min-h-screen">
      <div className="bg-muted/30 border-b py-12 mb-12">
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
                <BreadcrumbPage>Albums</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              Photo Albums
            </h1>
            <div className="flex justify-center">
              <Separator className="w-24 h-1.5 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Capturing moments of care, healing, and community at Reliance Paints.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {albums.docs.map((album) => {
            const featuredImage = album.featuredImage as Media;
            const imageCount = album.images?.length || 0;

            return (
              <Link key={album.id} href={`/album/${album.slug}`} className="group block">
                <Card className="overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-2xl bg-card rounded-2xl">
                  <CardContent className="p-0">
                    <div className="photo-stack-container p-3 sm:p-4">
                      <div className="photo-stack-layer-2 rounded-xl transition-transform duration-500 group-hover:rotate-6"></div>
                      <div className="photo-stack-layer-1 rounded-xl transition-transform duration-500 group-hover:rotate-3"></div>
                      <div className="photo-stack relative overflow-hidden rounded-xl z-10 border border-muted shadow-lg">
                        <AspectRatio ratio={4 / 3}>
                          {featuredImage?.url ? (
                            <Image
                              src={featuredImage.url}
                              alt={featuredImage.alt || album.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Camera className="w-12 h-12 text-muted-foreground/30" />
                            </div>
                          )}

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="text-white font-bold tracking-wider uppercase text-sm">
                                Open Album
                              </span>
                            </div>
                          </div>

                          {/* Photo count badge */}
                          <div className="absolute top-4 right-4 z-20">
                            <Badge
                              variant="secondary"
                              className="bg-white/90 backdrop-blur-md text-primary font-bold shadow-sm flex gap-1.5 py-1"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              {imageCount} {imageCount === 1 ? "Photo" : "Photos"}
                            </Badge>
                          </div>
                        </AspectRatio>
                      </div>
                    </div>

                    <div className="p-6 pt-2 text-center">
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {album.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">
                        View gallery &rarr;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {albums.docs.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted max-w-3xl mx-auto mt-12">
            <Camera className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-muted-foreground">No Albums Yet</h3>
            <p className="text-muted-foreground/70 mt-2">
              Check back soon for new photo galleries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Photo Albums | Reliance Paints",
    description: "Explore our photo albums and gallery from Reliance Paints.",
  };
}
