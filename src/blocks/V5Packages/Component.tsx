import React from "react";
import Link from "next/link";
import { V5TiltCard } from "@/components/v5/V5TiltCard";

export interface V5PackageFeature {
  item: string;
}

export interface V5PackageItem {
  name: string;
  price: string;
  featured?: boolean;
  badge?: string;
  features?: V5PackageFeature[];
  buttonText?: string;
  buttonLink?: string;
}

export interface V5PackagesBlockProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  packages?: V5PackageItem[];
}

const defaultPackagesList: V5PackageItem[] = [
  {
    name: "Standard",
    price: "Starting at NPR 35,000",
    featured: false,
    features: [
      { item: "1 Photographer" },
      { item: "1 Videographer" },
      { item: "Highlight Video" },
      { item: "Long Video" },
      { item: "Unlimited Photos" },
    ],
    buttonText: "Enquire",
    buttonLink: "#contact",
  },
  {
    name: "Premium",
    price: "Starting at NPR 65,000",
    featured: true,
    badge: "Most Popular",
    features: [
      { item: "Drone + 1 Drone Pilot" },
      { item: "1 Photographer" },
      { item: "1 Videographer" },
      { item: "Highlight + Long Video" },
      { item: "64GB Pendrive" },
      { item: "Karizma Album" },
      { item: "Unlimited Photos" },
    ],
    buttonText: "Enquire",
    buttonLink: "#contact",
  },
  {
    name: "Gold",
    price: "Starting at NPR 50,000",
    featured: false,
    features: [
      { item: "1 Photographer" },
      { item: "1 Videographer" },
      { item: "Highlight Video" },
      { item: "Long Video" },
      { item: "Karizma Album" },
      { item: "Unlimited Photos" },
    ],
    buttonText: "Enquire",
    buttonLink: "#contact",
  },
];

export function V5PackagesBlockComponent({
  eyebrow = "Wedding Packages",
  title = "Choose the coverage that fits your day",
  description = "Every package includes a dedicated team, professional color grading, and a private delivery gallery.",
  packages = defaultPackagesList,
}: V5PackagesBlockProps) {
  const items = packages && packages.length > 0 ? packages : defaultPackagesList;

  return (
    <section
      id="packages"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-14 bg-[#FAF7F4] text-[#1A1414] overflow-hidden"
    >
      {/* Ambient background blur orb */}
      <div
        className="absolute -bottom-36 -left-32 w-[400px] h-[400px] rounded-full blur-[60px] opacity-50 pointer-events-none z-0 bg-[#F6E3E4]"
        aria-hidden="true"
      />

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {items.map((pkg, idx) => {
            const isFeatured = Boolean(pkg.featured);

            return (
              <V5TiltCard
                key={idx}
                className={`relative flex flex-col bg-white rounded-lg p-8 sm:p-10 shadow-[0_4px_10px_rgba(26,20,20,0.06),0_12px_28px_rgba(26,20,20,0.08)] transition-all duration-300 ${
                  isFeatured
                    ? "border-t-[3px] border-t-[#A31621] shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)] md:-translate-y-2 md:scale-[1.03] z-10"
                    : "border-t-[3px] border-t-transparent hover:shadow-[0_10px_24px_rgba(26,20,20,0.08),0_30px_60px_rgba(26,20,20,0.12)]"
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-5 right-5 bg-[#A31621] text-white text-[10.5px] font-bold tracking-[0.03em] uppercase py-1.5 px-3 rounded-full shadow-[0_14px_30px_rgba(163,22,33,0.22)]">
                    {pkg.badge || "Most Popular"}
                  </div>
                )}

                <div
                  className="text-[22px] font-normal text-[#1A1414] mb-1.5"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {pkg.name}
                </div>
                <div className="text-[#A31621] font-bold text-[14px] mb-6">
                  {pkg.price}
                </div>

                <ul className="space-y-2 text-[14px] text-[#7A716C] leading-[2.2] mb-7 flex-1 list-none p-0">
                  {pkg.features?.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#A31621] font-bold select-none">—</span>
                      <span>{feat.item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pkg.buttonLink || "#contact"}
                  className={`inline-flex items-center justify-center text-[13px] font-semibold py-3.5 px-7 rounded-[2px] transition-all duration-200 text-center ${
                    isFeatured
                      ? "bg-[#A31621] text-white shadow-[0_14px_30px_rgba(163,22,33,0.22)] hover:bg-[#6E0F17] hover:-translate-y-0.5"
                      : "bg-white text-[#1A1414] border border-[#1A1414] hover:border-[#A31621] hover:text-[#A31621] hover:-translate-y-0.5"
                  }`}
                >
                  {pkg.buttonText || "Enquire"}
                </Link>
              </V5TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
