import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { MoodQuizBlock as MoodQuizBlockProps } from "@/payload-types";
import { MoodQuiz } from "@/components/home/MoodQuiz";
import type { EnrichedMood } from "@/components/home/MoodQuiz";

export const MoodQuizBlock: React.FC<MoodQuizBlockProps> = async (props) => {
  if (props.isEnabled === false) return null;

  const payload = await getPayload({ config: configPromise });

  // For each mood, fetch real colors from the Colors collection filtered by moodTag
  const enrichedMoods: EnrichedMood[] = await Promise.all(
    (props.moods ?? []).map(async (mood) => {
      const { docs } = await payload.find({
        collection: "colors",
        where: {
          moodTags: { contains: mood.moodTag },
        },
        limit: props.maxResultColors ?? 6,
        sort: "-popularity",
        depth: 0,
      });

      return {
        label: mood.label,
        icon: mood.icon,
        swatchColors: mood.swatchColors ?? [],
        id: mood.id ?? undefined,
        resultColors: docs.map((c) => ({
          name: c.name,
          hex: c.hexCode,
          colorId: c.colorId ?? undefined,
          slug: c.slug,
        })),
      };
    })
  );

  return <MoodQuiz {...props} moods={enrichedMoods} />;
};
