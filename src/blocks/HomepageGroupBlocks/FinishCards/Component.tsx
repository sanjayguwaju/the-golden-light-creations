import React from "react";
import type { FinishCardsBlock as FinishCardsBlockProps, Media } from "@/payload-types";
import { FinishCards } from "@/components/home/FinishCards";
import { getPayload } from "payload";
import config from "@payload-config";

export const FinishCardsBlock: React.FC<FinishCardsBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config });

  // Resolve finishes media relationships
  const resolvedFinishes: Array<{ name: string; image: string; desc: string; texture?: string }> = [];

  if (props.finishes && props.finishes.length > 0) {
    for (const f of props.finishes) {
      if (!f.image) continue;

      let mediaDoc: Media | null = null;
      if (typeof f.image === "object") {
        mediaDoc = f.image as Media;
      } else {
        try {
          mediaDoc = await payload.findByID({
            collection: "media",
            id: f.image,
          });
        } catch (err) {
          console.error("Failed to find media in FinishCardsBlock:", err);
        }
      }

      resolvedFinishes.push({
        name: f.name,
        image: mediaDoc?.url || "/hero-1.png",
        desc: f.desc,
        texture: f.texture ?? undefined,
      });
    }
  }

  return (
    <FinishCards
      sectionLabel={props.sectionLabel}
      title={props.title}
      subtitle={props.subtitle ?? undefined}
      finishes={resolvedFinishes.length > 0 ? resolvedFinishes : undefined}
    />
  );
};
