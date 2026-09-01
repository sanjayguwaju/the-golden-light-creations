import React from "react";
import type { PaletteShowcaseBlock as PaletteShowcaseBlockProps, Media } from "@/payload-types";
import { PaletteShowcase } from "@/components/home/PaletteShowcase";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const PaletteShowcaseBlock = async (props: PaletteShowcaseBlockProps) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config: configPromise });
  const colorsData = await payload.find({
    collection: "colors",
    limit: 2000,
    depth: 0,
    pagination: false,
  });

  const nameToSlugMap: Record<string, string> = {};
  const hexToSlugMap: Record<string, string> = {};

  colorsData.docs.forEach((c) => {
    if (c.name) {
      nameToSlugMap[c.name.toLowerCase().trim()] = c.slug || "";
    }
    if (c.hexCode) {
      hexToSlugMap[c.hexCode.toLowerCase().trim()] = c.slug || "";
    }
  });

  // Resolve media objects for mood images
  const resolvedMoodImages = (props.moodImages ?? []).map((item) => {
    const imageUrl =
      typeof item.image === "string"
        ? item.image
        : (item.image as Media)?.url ?? "";

    return {
      imageUrl,
      caption: item.caption ?? "Room Inspiration",
      linkLabel: item.linkLabel ?? "Browse the full collection →",
      linkUrl: item.linkUrl ?? "/colors",
    };
  });

  return (
    <PaletteShowcase
      sectionLabel={props.sectionLabel ?? "1,500+ Shades"}
      heading={props.heading}
      subheading={props.subheading ?? "Scroll through curated palette groups and find your perfect color story."}
      palettes={(props.palettes ?? []).map((p) => ({
        name: p.name,
        colors: (p.colors ?? []).map((c) => {
          const cleanName = c.name.toLowerCase().trim();
          const cleanHex = c.hex.toLowerCase().trim();
          const slug = nameToSlugMap[cleanName] || hexToSlugMap[cleanHex];
          return { name: c.name, hex: c.hex, slug };
        }),
      }))}
      moodImages={resolvedMoodImages}
      viewAllLink={props.viewAllLink}
    />
  );
};

