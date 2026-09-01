"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Staff, Media } from "@/payload-types";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function TeamGridClient({ displayStaffs }: { displayStaffs: Staff[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Simple stagger entry animation for team members
    gsap.fromTo(
      ".team-member-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`mx-auto grid gap-8 ${
        displayStaffs.length === 1
          ? "max-w-sm grid-cols-1"
          : displayStaffs.length === 2
            ? "max-w-2xl grid-cols-1 md:grid-cols-2"
            : displayStaffs.length === 3
              ? "max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
      }`}
    >
      {displayStaffs.map((member, idx) => {
        const photoUrl =
          member.profilePhoto && typeof member.profilePhoto === "object"
            ? (member.profilePhoto as Media).url || `/images/about/team-${idx + 1}.jpg`
            : `/images/about/team-${idx + 1}.jpg`;

        return (
          <Link 
            href={`/staffs/${member.slug}`} 
            key={member.id} 
            className="text-center group team-member-card block cursor-pointer transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg transition-transform duration-300">
              <Image
                src={photoUrl}
                alt={member.fullName || "Team member"}
                fill
                className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-reliance-navy group-hover:text-reliance-gold transition-colors inline-block">
              {member.fullName}
            </h3>
            <p className="mt-1 text-sm font-medium text-reliance-gold">
              {member.designation}
            </p>
            {member.department && (
              <p className="mt-2 text-sm text-gray-500 capitalize">
                {member.department.replace("_", " ")}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
