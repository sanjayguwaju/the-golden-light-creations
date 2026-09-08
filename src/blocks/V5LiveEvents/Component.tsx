import React from "react";
import Image from "next/image";

export interface V5LiveEventItem {
  title: string;
  image?: any;
  imageUrl?: string;
  span?: "standard" | "tall" | "wide";
}

export interface V5LiveEventsBlockProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: V5LiveEventItem[];
}

const defaultEventsList: V5LiveEventItem[] = [
  {
    title: "GE Fest — Main Stage",
    imageUrl: "/v5/ge-fest-main-stage-performance.jpg",
    span: "tall",
  },
  {
    title: "Festival Crowd Coverage",
    imageUrl: "/v5/festival-crowd.jpg",
    span: "wide",
  },
  {
    title: "Live Vocal Performance",
    imageUrl: "/v5/vocalist-performing-live.jpg",
    span: "standard",
  },
  {
    title: "On-Stage Performance",
    imageUrl: "/v5/guitarist-on-stage.jpg",
    span: "standard",
  },
  {
    title: "Headline Performance",
    imageUrl: "/v5/headline-performer-on-stage.jpg",
    span: "tall",
  },
  {
    title: "Crowd Interaction",
    imageUrl: "/v5/performer-waving-to-crowd.jpg",
    span: "standard",
  },
  {
    title: "Stage Coverage",
    imageUrl: "/v5/performer-on-stage.jpg",
    span: "standard",
  },
];

export function V5LiveEventsBlockComponent({
  eyebrow = "On Location",
  title = "Live events, concerts & festival coverage",
  description = "Real coverage from real stages — festival crowds, headline performers, and the energy of a live show captured frame by frame.",
  items = defaultEventsList,
}: V5LiveEventsBlockProps) {
  const eventItems = items && items.length > 0 ? items : defaultEventsList;

  return (
    <section
      id="live-events"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-[#FAF7F4] text-[#1A1414] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Head */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-[12.5px] text-[#A31621] font-bold tracking-[0.03em] uppercase mb-3.5">
              {eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#1A1414]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-md text-[15px] text-[#7A716C] leading-[1.65]">
              {description}
            </p>
          )}
        </div>

        {/* Live Events Asymmetric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[230px] gap-3.5">
          {eventItems.map((item, idx) => {
            const isTall = item.span === "tall";
            const isWide = item.span === "wide";

            const spanClass = isTall
              ? "row-span-2 col-span-1"
              : isWide
              ? "col-span-2 row-span-1"
              : "col-span-1 row-span-1";

            const imageSrc =
              (typeof item.image === "object" && item.image?.url)
                ? item.image.url
                : item.imageUrl || defaultEventsList[idx % defaultEventsList.length].imageUrl;

            return (
              <figure
                key={idx}
                className={`group relative overflow-hidden rounded-md shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)] transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] bg-[#1A1414] ${spanClass}`}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={item.title || "Live event"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 p-4.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-[13px] font-medium opacity-0 translate-y-1.5 transition-all duration-250 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  {item.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
