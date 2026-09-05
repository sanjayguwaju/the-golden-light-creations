import React from "react";
import { StudioProcess, ProcessStep } from "@/components/studio/StudioProcess";

interface Props {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: ProcessStep[];
}

export function StudioProcessBlockComponent(props: Props) {
  return (
    <StudioProcess
      eyebrow={props.eyebrow}
      title={props.title}
      highlight={props.highlight}
      description={props.description}
      steps={props.steps}
    />
  );
}
