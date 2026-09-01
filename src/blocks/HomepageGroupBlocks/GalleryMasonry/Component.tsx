import React from "react";
import type { GalleryMasonryBlock as GalleryMasonryBlockProps } from "@/payload-types";
import {
  GalleryMasonry as GalleryMasonryStatic,
  GalleryItem,
} from "@/components/home/GalleryMasonry";
import { getPayload } from "payload";
import config from "@payload-config";

export const GalleryMasonryBlock: React.FC<GalleryMasonryBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  let mappedItems: GalleryItem[] = [];

  if (props.items && props.items.length > 0) {
    mappedItems = props.items.map((item) => {
      let imageUrl = "/hero-1.png";
      if (item.image && typeof item.image !== "string") {
        imageUrl = item.image.url || imageUrl;
      } else if (typeof item.image === "string") {
        imageUrl = item.image;
      }

      return {
        image: imageUrl,
        color: item.color,
        room: item.room,
        tall: !!item.tall,
      };
    });
  } else {
    const payload = await getPayload({ config });
    const limitValue = typeof props.limit === "number" ? props.limit : 6;

    const inspirations = await payload.find({
      collection: "inspiration",
      limit: limitValue,
      depth: 2,
    });

    mappedItems = inspirations.docs.map((doc) => {
      let imageUrl = "/hero-1.png";
      let isTall = false;

      if (doc.image && typeof doc.image !== "string") {
        imageUrl = doc.image.url || imageUrl;
        if (doc.image.width && doc.image.height) {
          isTall = doc.image.height > doc.image.width;
        }
      }

      let colorName = "Reliance Gold";
      let colorHex = "#C59B27";
      let colorSlug = "reliance-gold";

      if (doc.featuredColour && typeof doc.featuredColour !== "string") {
        colorName = doc.featuredColour.name;
        colorHex = doc.featuredColour.hexCode || colorHex;
        colorSlug = doc.featuredColour.slug || colorSlug;
      }

      const roomTypeLabels: Record<string, string> = {
        "living-room": "Living Room",
        bedroom: "Bedroom",
        kitchen: "Kitchen",
        bathroom: "Bathroom",
        exterior: "Exterior",
        office: "Office",
        "dining-room": "Dining Room",
        other: "Other",
      };
      const roomLabel = roomTypeLabels[doc.roomType] || "Home";

      const secondaryColours = Array.isArray(doc.secondaryColours)
        ? doc.secondaryColours
            .filter((c) => c && typeof c !== "string")
            .map((c: any) => ({
              name: c.name,
              hexCode: c.hexCode,
              slug: c.slug,
            }))
        : undefined;

      return {
        image: imageUrl,
        color: colorName,
        title: doc.title,
        colorHex,
        colorSlug,
        room: roomLabel,
        tall: isTall,
        styleTags: Array.isArray(doc.styleTags) ? doc.styleTags : undefined,
        secondaryColours,
      };
    });
  }

  return (
    <GalleryMasonryStatic
      items={mappedItems}
      title={props.title}
      subtitle={props.subtitle}
      description={props.description}
      buttonLabel={props.buttonLabel}
      redirectClickToImage={props.redirectClickToImage ?? false}
    />
  );
};
