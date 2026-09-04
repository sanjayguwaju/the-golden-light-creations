import React from "react";
import { StudioStats } from "@/components/studio/StudioStats";
import { getStudioSettings } from "@/utilities/getStudioData";

interface Props {
  overrideStats?: boolean;
  projectsCount?: number;
  clientsCount?: number;
  socialReach?: string;
  yearsExperience?: number;
}

export async function StudioStatsBlockComponent(props: Props) {
  const settings = await getStudioSettings();
  const stats = props?.overrideStats
    ? {
        projectsCount: props.projectsCount ?? settings?.stats?.projectsCount,
        clientsCount: props.clientsCount ?? settings?.stats?.clientsCount,
        socialReach: props.socialReach ?? settings?.stats?.socialReach,
        yearsExperience: props.yearsExperience ?? settings?.stats?.yearsExperience,
      }
    : settings?.stats;

  return <StudioStats stats={stats} />;
}
