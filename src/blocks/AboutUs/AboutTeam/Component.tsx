import React from "react";
import Image from "next/image";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { AboutTeamBlock as AboutTeamProps, Media, Staff } from "@/payload-types";
import AboutPageInteractive from "@/components/AboutPageInteractive";
import TeamGridClient from "./TeamGridClient";

export const AboutTeamBlock: React.FC<AboutTeamProps> = async ({
  eyebrow = "Leadership Team",
  heading,
  description,
  selectManually,
  staffMembers,
  limit = 12,
}) => {
  const payload = await getPayload({ config: configPromise });
  let displayStaffs: Staff[] = [];

  if (selectManually && staffMembers && staffMembers.length > 0) {
    // Relationship values might be populated already depending on depth,
    // but safety check or resolve them
    displayStaffs = staffMembers.filter(
      (item): item is Staff => typeof item === "object" && item !== null
    );
  } else {
    const fetched = await payload.find({
      collection: "staffs",
      limit: limit || 12,
      sort: "displayOrder",
      where: {
        isActive: {
          equals: true,
        },
        showOnWebsite: {
          equals: true,
        },
      },
    });
    displayStaffs = fetched.docs as Staff[];
  }

  return (
    <AboutPageInteractive>
      <section id="team" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-reliance-gold">
              {eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-medium text-reliance-navy sm:text-4xl">{heading}</h2>
            {description && <p className="text-lg leading-8 text-gray-600">{description}</p>}
          </div>

          <TeamGridClient displayStaffs={displayStaffs} />
        </div>
      </section>
    </AboutPageInteractive>
  );
};
