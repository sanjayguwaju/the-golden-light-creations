import React from "react";

import type { Page } from "@/payload-types";

import { HighImpactHero } from "@/heros/HighImpact";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";
import { HeroCarousel } from "./HeroCarousel";
import { MissionHero } from "./MissionHero";
import { StatsHero } from "./StatsHero";
import { SplitHero } from "./SplitHero";
import { VideoHero } from "./VideoHero";
import { DonateHero } from "./DonateHero";
import { StoryHero } from "./StoryHero";
import { MinimalHero } from "./MinimalHero";
import ModernPaintsCarousel from "./ModernPaintsCarousel";

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  heroCarousel: HeroCarousel,
  missionHero: MissionHero,
  statsHero: StatsHero,
  splitHero: SplitHero,
  videoHero: VideoHero,
  donateHero: DonateHero,
  storyHero: StoryHero,
  minimalHero: MinimalHero,
  modernPaintsCarousel: ModernPaintsCarousel,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;
  
  return <HeroToRender {...props} />;
};
