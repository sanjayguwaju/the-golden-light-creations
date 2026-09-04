import React from "react";
import { StudioFilms } from "@/components/studio/StudioFilms";
import { getStudioFilms } from "@/utilities/getStudioData";

interface Props {
  isHomepagePreview?: boolean;
}

export async function StudioFilmsBlockComponent(props: Props) {
  const items = await getStudioFilms();
  return (
    <StudioFilms
      items={items}
      isHomepagePreview={props?.isHomepagePreview ?? true}
    />
  );
}
