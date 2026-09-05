import React from "react";
import { StudioTeam } from "@/components/studio/StudioTeam";
import { getStudioTeam } from "@/utilities/getStudioData";

interface StudioTeamBlockComponentProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

export async function StudioTeamBlockComponent(props: StudioTeamBlockComponentProps) {
  const members = await getStudioTeam();
  return (
    <StudioTeam
      members={members}
      title={props.title}
      subtitle={props.subtitle}
      eyebrow={props.eyebrow}
    />
  );
}
