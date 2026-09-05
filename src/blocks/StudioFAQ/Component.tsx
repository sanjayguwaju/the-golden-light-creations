import React from "react";
import { StudioFAQ, FAQItem } from "@/components/studio/StudioFAQ";

interface Props {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  items?: FAQItem[];
}

export function StudioFAQBlockComponent(props: Props) {
  return (
    <StudioFAQ
      eyebrow={props.eyebrow}
      title={props.title}
      highlight={props.highlight}
      description={props.description}
      items={props.items}
    />
  );
}
