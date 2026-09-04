import React from "react";
import { StudioServices } from "@/components/studio/StudioServices";
import { getStudioServices } from "@/utilities/getStudioData";

interface Props {
  isHomepagePreview?: boolean;
}

export async function StudioServicesBlockComponent(props: Props) {
  const items = await getStudioServices();
  return (
    <StudioServices
      items={items}
      isHomepagePreview={props?.isHomepagePreview ?? true}
    />
  );
}
