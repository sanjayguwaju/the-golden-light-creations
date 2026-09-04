import React from "react";

import type { Page } from "@/payload-types";

import { HighImpactHero } from "@/heros/HighImpact";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";
import { MissionHero } from "./MissionHero";
import { StatsHero } from "./StatsHero";
import { SplitHero } from "./SplitHero";
import { VideoHero } from "./VideoHero";
import { StoryHero } from "./StoryHero";
import { MinimalHero } from "./MinimalHero";
import { StudioHero } from "@/components/studio/StudioHero";

const heroes = {
  studioHero: StudioHero,
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  missionHero: MissionHero,
  statsHero: StatsHero,
  splitHero: SplitHero,
  videoHero: VideoHero,
  storyHero: StoryHero,
  minimalHero: MinimalHero,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type as keyof typeof heroes];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
