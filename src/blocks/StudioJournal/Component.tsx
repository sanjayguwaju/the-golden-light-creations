import React from "react";
import { StudioJournal } from "@/components/studio/StudioJournal";
import { getStudioPosts } from "@/utilities/getStudioData";

interface Props {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  limit?: number;
}

export async function StudioJournalBlockComponent(props: Props) {
  const posts = await getStudioPosts(props.limit || 3);

  return (
    <StudioJournal
      eyebrow={props.eyebrow}
      title={props.title}
      highlight={props.highlight}
      description={props.description}
      posts={posts}
    />
  );
}
