import React from "react";
import { StudioBanner } from "@/components/studio/StudioBanner";

interface Props {
  eyebrow?: string;
  heading?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function StudioBannerBlockComponent(props: Props) {
  return (
    <StudioBanner
      eyebrow={props.eyebrow}
      heading={props.heading}
      buttonText={props.buttonText}
      buttonLink={props.buttonLink}
    />
  );
}
