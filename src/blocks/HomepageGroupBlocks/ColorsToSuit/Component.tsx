import React from "react";
import type { ColorsToSuitBlock as ColorsToSuitBlockProps, Color, Media } from "@/payload-types";
import { ColorsToSuit } from "@/components/home/ColorsToSuit";
import { getPayload } from "payload";
import config from "@payload-config";

export const ColorsToSuitBlock: React.FC<ColorsToSuitBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config });

  // Resolve chips from payload
  const resolvedChips: Array<{ name: string; hex: string; shadeName: string; image: string }> = [];

  if (props.chips && props.chips.length > 0) {
    for (const chip of props.chips) {
      if (!chip.color || !chip.image) continue;

      let colorDoc: Color | null = null;
      if (typeof chip.color === "object") {
        colorDoc = chip.color as Color;
      } else {
        try {
          colorDoc = await payload.findByID({
            collection: "colors",
            id: chip.color,
          });
        } catch (err) {
          console.error("Failed to find color in ColorsToSuitBlock:", err);
        }
      }

      let mediaDoc: Media | null = null;
      if (typeof chip.image === "object") {
        mediaDoc = chip.image as Media;
      } else {
        try {
          mediaDoc = await payload.findByID({
            collection: "media",
            id: chip.image,
          });
        } catch (err) {
          console.error("Failed to find media in ColorsToSuitBlock:", err);
        }
      }

      if (colorDoc && mediaDoc) {
        resolvedChips.push({
          name: chip.roomName,
          hex: colorDoc.hexCode,
          shadeName: colorDoc.name,
          image: mediaDoc.url || "/hero-1.png",
        });
      }
    }
  }

  return (
    <ColorsToSuit
      title={props.title}
      chips={resolvedChips.length > 0 ? resolvedChips : undefined}
    />
  );
};
