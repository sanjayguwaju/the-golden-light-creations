import React from "react";
import type { ExcellenceStatsBlock as ExcellenceStatsBlockProps } from "@/payload-types";
import { ExcellenceStats as ExcellenceStatsStatic } from "@/components/home/ExcellenceStats";

export const ExcellenceStatsBlock: React.FC<ExcellenceStatsBlockProps> = (props) => {
  if (props.isEnabled === false) return null;
  
  return (
    <ExcellenceStatsStatic
      pretitle={props.pretitle}
      title={props.title}
      subtitle={props.subtitle}
      stats={props.stats}
    />
  );
};
