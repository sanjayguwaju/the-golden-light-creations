import React from "react";
import { StudioMarquee } from "@/components/studio/StudioMarquee";
import { getStudioSettings } from "@/utilities/getStudioData";

interface Props {
  overrideItems?: boolean;
  items?: Array<{ text: string }>;
}

export async function StudioMarqueeBlockComponent(props: Props) {
  const settings = await getStudioSettings();
  const items =
    props?.overrideItems && props?.items && props.items.length > 0
      ? props.items
      : settings?.marqueeItems;

  return <StudioMarquee items={items} />;
}
