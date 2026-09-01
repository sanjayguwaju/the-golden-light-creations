"use client";

import React from "react";
import type { UpcomingEventsBlock as UpcomingEventsBlockProps } from "@/payload-types";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import RichText from "@/components/RichText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, Users, ArrowRight, Star } from "lucide-react";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const categoryColors: Record<string, string> = {
  fundraiser: "bg-rose-100 text-rose-700 border-rose-200",
  volunteer: "bg-emerald-100 text-emerald-700 border-emerald-200",
  workshop: "bg-blue-100 text-blue-700 border-blue-200",
  community: "bg-amber-100 text-amber-700 border-amber-200",
  conference: "bg-purple-100 text-purple-700 border-purple-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const categoryLabels: Record<string, string> = {
  fundraiser: "Fundraiser",
  volunteer: "Volunteer",
  workshop: "Workshop",
  community: "Community",
  conference: "Conference",
  other: "Event",
};

const columnClasses: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

function formatDate(dateString: string, locale = "en"): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString: string, locale = "en"): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const UpcomingEventsBlock: React.FC<UpcomingEventsBlockProps> = ({
  title,
  subtitle,
  events,
  layout = "list",
  columns = "3",
  showViewAllButton,
  viewAllLink,
  maxEventsToShow = 6,
}) => {
  if (!events?.length) return null;

  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, maxEventsToShow ?? 6);

  const featuredEvent = sortedEvents.find((e) => e.featured);
  const regularEvents = sortedEvents.filter((e) => !e.featured);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {layout === "featured" && featuredEvent && (
          <div className="mb-12">
            <Card className="overflow-hidden border-2 border-accent/20">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto min-h-[300px]">
                  {featuredEvent.image &&
                  typeof featuredEvent.image === "object" &&
                  featuredEvent.image.url ? (
                    <Image
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-accent/50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8 flex flex-col justify-center">
                  {featuredEvent.category && (
                    <Badge
                      variant="outline"
                      className={cn("w-fit mb-4", categoryColors[featuredEvent.category])}
                    >
                      {categoryLabels[featuredEvent.category]}
                    </Badge>
                  )}

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredEvent.title}</h3>

                  {featuredEvent.description &&
                    typeof featuredEvent.description === "object" &&
                    featuredEvent.description !== null &&
                    "root" in featuredEvent.description && (
                      <div className="prose prose-sm max-w-none mb-6">
                        <RichText
                          data={featuredEvent.description as unknown as DefaultTypedEditorState}
                          enableGutter={false}
                        />
                      </div>
                    )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {formatDate(featuredEvent.startDate)}
                        {featuredEvent.endDate && ` - ${formatDate(featuredEvent.endDate)}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span>{formatTime(featuredEvent.startDate)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      {featuredEvent.isVirtual ? (
                        <>
                          <Video className="w-5 h-5" />
                          <span>Virtual Event</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-5 h-5" />
                          <span>{featuredEvent.location || "TBA"}</span>
                        </>
                      )}
                    </div>

                    {featuredEvent.maxAttendees && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <span>Limited to {featuredEvent.maxAttendees} attendees</span>
                      </div>
                    )}
                  </div>

                  {featuredEvent.registrationLink && (
                    <Link href={featuredEvent.registrationLink}>
                      <Button className="gap-2">
                        {featuredEvent.registrationRequired ? "Register Now" : "Learn More"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </div>
            </Card>

            {regularEvents.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">More Events</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {regularEvents.slice(0, 3).map((event, index) => (
                    <EventCard key={index} event={event} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(layout === "list" || (layout === "featured" && !featuredEvent)) && (
          <div className="space-y-4">
            {sortedEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        )}

        {layout === "grid" && (
          <div className={cn("grid gap-6", columnClasses[columns ?? "3"])}>
            {sortedEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        )}

        {showViewAllButton && viewAllLink && (
          <div className="text-center mt-12">
            <Link href={viewAllLink}>
              <Button variant="outline" size="lg" className="gap-2">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

function EventCard({
  event,
  compact = false,
}: {
  event: {
    title: string;
    description?: unknown;
    image?: unknown;
    startDate: string;
    endDate?: string | null;
    category?: string | null;
    isVirtual?: boolean | null;
    location?: string | null;
    maxAttendees?: number | null;
    registrationLink?: string | null;
    registrationRequired?: boolean | null;
    featured?: boolean | null;
  };
  compact?: boolean;
}) {
  const startDate = new Date(event.startDate);
  const month = startDate.toLocaleDateString("en", { month: "short" });
  const day = startDate.getDate();

  if (compact) {
    return (
      <Card className="overflow-hidden">
        <div className="relative h-32">
          {event.image &&
          typeof event.image === "object" &&
          (event.image as { url?: string }).url ? (
            <Image
              src={(event.image as { url?: string }).url!}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-accent/50" />
            </div>
          )}
          <div className="absolute top-2 left-2 bg-white rounded-lg p-2 text-center">
            <div className="text-xs font-medium text-muted-foreground uppercase">{month}</div>
            <div className="text-xl font-bold text-foreground">{day}</div>
          </div>
        </div>
        <CardContent className="p-4">
          <h5 className="font-semibold mb-1 line-clamp-1">{event.title as string}</h5>
          <div className="text-sm text-muted-foreground">
            {event.isVirtual ? "Virtual Event" : event.location || "TBA"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center gap-4 p-6 bg-muted/50 md:w-48 flex-shrink-0">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {month}
              </div>
              <div className="text-4xl font-bold text-primary">{day}</div>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {event.category && (
                    <Badge variant="outline" className={cn(categoryColors[event.category])}>
                      {categoryLabels[event.category]}
                    </Badge>
                  )}
                  {event.featured && (
                    <Badge className="bg-accent text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{event.title as string}</h3>

                {(() => {
                  const desc = event.description;
                  if (desc && typeof desc === "object" && "root" in desc) {
                    return (
                      <div className="prose prose-sm max-w-none mb-4 text-muted-foreground">
                        <RichText
                          data={desc as unknown as DefaultTypedEditorState}
                          enableGutter={false}
                        />
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(event.startDate)}
                  </span>

                  <span className="flex items-center gap-1">
                    {event.isVirtual ? (
                      <>
                        <Video className="w-4 h-4" />
                        Virtual
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4" />
                        {event.location || "TBA"}
                      </>
                    )}
                  </span>

                  {event.maxAttendees && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.maxAttendees} spots
                    </span>
                  )}
                </div>
              </div>

              {event.registrationLink && (
                <Link href={event.registrationLink} className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="gap-1">
                    {event.registrationRequired ? "Register" : "Details"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
