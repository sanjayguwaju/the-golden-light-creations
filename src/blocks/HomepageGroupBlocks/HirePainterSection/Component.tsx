import React from "react";
import type { HirePainterSectionBlock as HirePainterSectionBlockProps } from "@/payload-types";
import { HirePainterSection } from "@/components/home/HirePainterSection";

export const HirePainterSectionBlock: React.FC<HirePainterSectionBlockProps> = (props) => {
  if (props.isEnabled === false) return null;
  
  return (
    <HirePainterSection
      sectionLabel={props.sectionLabel}
      title={props.title}
      subheading={props.subheading}
      features={props.features ?? undefined}
    />
  );
};
