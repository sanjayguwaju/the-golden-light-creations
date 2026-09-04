import React from "react";
import { StudioPortfolio } from "@/components/studio/StudioPortfolio";
import { getStudioPortfolio } from "@/utilities/getStudioData";

interface Props {
  isHomepagePreview?: boolean;
}

export async function StudioPortfolioBlockComponent(props: Props) {
  const items = await getStudioPortfolio();
  return (
    <StudioPortfolio
      items={items}
      isHomepagePreview={props?.isHomepagePreview ?? true}
    />
  );
}
