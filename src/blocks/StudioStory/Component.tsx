import React from "react";
import { StudioStory } from "@/components/studio/StudioStory";
import { getStudioSettings } from "@/utilities/getStudioData";

interface Props {
  headline?: string;
  quote?: string;
  paragraph1?: string;
  paragraph2?: string;
}

export async function StudioStoryBlockComponent(props: Props) {
  const settings = await getStudioSettings();
  return (
    <StudioStory
      headline={props?.headline || settings?.story?.headline}
      quote={props?.quote || settings?.story?.quote}
      paragraph1={props?.paragraph1 || settings?.story?.paragraph1}
      paragraph2={props?.paragraph2 || settings?.story?.paragraph2}
      stats={settings?.stats}
      isHomepagePreview={true}
    />
  );
}
