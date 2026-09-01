import React from "react";
import type { CurvedColorProfileBlock as CurvedColorProfileBlockProps } from "@/payload-types";
import { CurvedColorProfile } from "@/components/home/CurvedColorProfile";

import { getPayload } from "payload";
import configPromise from "@payload-config";

export const CurvedColorProfileBlock = async (props: CurvedColorProfileBlockProps) => {
  if (props.isEnabled === false) return null;

  let mappedSwatches = (props.swatches || [])
    .map((s) => {
      if (typeof s === "string" || !s) return null;
      return {
        name: s.name,
        hex: s.hexCode,
        slug: s.slug || undefined,
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  if (mappedSwatches.length === 0) {
    const payload = await getPayload({ config: configPromise });
    const fetchedColors = await payload.find({
      collection: "colors",
      limit: 5,
      sort: "-popularity",
    });
    mappedSwatches = fetchedColors.docs.map((color) => ({
      name: color.name,
      hex: color.hexCode,
      slug: color.slug || undefined,
    }));
  }

  return (
    <CurvedColorProfile
      heading={props.heading}
      subheading={props.subheading ?? undefined}
      swatches={mappedSwatches.length > 0 ? mappedSwatches : undefined}
      ctaButton={props.ctaButton ?? undefined}
      backgroundStyle={props.backgroundStyle ?? "navy"}
    />
  );
};
