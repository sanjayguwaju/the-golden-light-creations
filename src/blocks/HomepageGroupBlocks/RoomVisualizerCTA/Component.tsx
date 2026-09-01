import React from "react";
import type { RoomVisualizerCTABlock as RoomVisualizerCTABlockProps } from "@/payload-types";
import { RoomVisualizerCTA, type Swatch, type RoomPreview } from "@/components/home/RoomVisualizerCTA";
import { getMediaUrl } from "@/utilities/getMediaUrl";

export const RoomVisualizerCTABlock: React.FC<RoomVisualizerCTABlockProps> = (props) => {
  if (props.isEnabled === false) return null;

  // Resolve rooms directly from CMS config
  const rooms: RoomPreview[] = (props.rooms ?? [])
    .filter((r) => r && r.name && r.image)
    .map((r) => ({
      name: r.name,
      image: getMediaUrl(r.image as any),
      colorVariants: (r.colorVariants ?? [])
        .filter((v) => v && (v.color || v.colorLabel) && v.image)
        .map((v) => {
          const colorDoc = typeof v.color === "object" && v.color !== null ? (v.color as any) : null;
          const label = v.colorLabel || colorDoc?.name || colorDoc?.colorId || "Color";
          const hex = v.hex || colorDoc?.hexCode || "#C9A84C";
          const slug = colorDoc?.slug || null;
          const colorId = colorDoc?.colorId || null;

          return {
            colorLabel: label,
            hex: hex,
            slug: slug,
            colorId: colorId,
            image: getMediaUrl(v.image as any),
          };
        }),
    }));

  // If no rooms are configured in CMS, do not render dummy data
  if (rooms.length === 0) {
    return null;
  }

  // Derive swatches dynamically from all configured room variants
  const swatchMap = new Map<string, Swatch>();
  rooms.forEach((r) => {
    (r.colorVariants || []).forEach((v) => {
      if (v.colorLabel) {
        const key = v.colorLabel.toLowerCase().trim();
        if (!swatchMap.has(key)) {
          swatchMap.set(key, {
            label: v.colorLabel,
            hex: v.hex || "#C9A84C",
            slug: v.slug || null,
            colorId: v.colorId || null,
          });
        }
      }
    });
  });

  const swatches: Swatch[] = Array.from(swatchMap.values());

  return (
    <RoomVisualizerCTA
      sectionLabel={props.sectionLabel ?? undefined}
      heading={props.heading || props.title || "See It On Your Wall"}
      description={props.description ?? undefined}
      swatches={swatches}
      rooms={rooms}
      ctaButton={props.ctaButton ?? undefined}
    />
  );
};
