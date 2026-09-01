import React from "react";
import type { PaintCalculatorSectionBlock as PaintCalculatorSectionBlockProps } from "@/payload-types";
import { PaintCalculatorSection } from "@/components/home/PaintCalculatorSection";

export const PaintCalculatorSectionBlock: React.FC<PaintCalculatorSectionBlockProps> = (props) => {
  if (props.isEnabled === false) return null;
  
  return (
    <PaintCalculatorSection
      sectionLabel={props.sectionLabel}
      title={props.title}
      subheading={props.subheading}
    />
  );
};
