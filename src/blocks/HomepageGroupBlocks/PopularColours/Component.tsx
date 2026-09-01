import React from "react";
import type { PopularColoursBlock as PopularColoursProps } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";
import PopularColoursClient from "./PopularColoursClient";

const fallbackColors = [
  {
    id: "fb-1",
    name: "Clay Red",
    hexCode: "#B46040",
    slug: "clay-red",
    colorId: "RP-104",
    colorFamily: "reds",
    description: "A rich, grounded terracotta shade evoking traditional brick architecture and warm earthen interiors.",
    moodTags: ["earthy", "cozy", "warm"],
    popularity: 98,
  },
  {
    id: "fb-2",
    name: "Teal Lagoon",
    hexCode: "#008080",
    slug: "teal-lagoon",
    colorId: "TR-5840",
    colorFamily: "blues",
    description: "Deep, tranquil aquatic hue bringing sophistication, depth, and calm focus to accent feature walls.",
    moodTags: ["calm", "elegant"],
    popularity: 94,
  },
  {
    id: "fb-3",
    name: "Gold Foil",
    hexCode: "#C9A84C",
    slug: "gold-foil",
    colorId: "RP-302",
    colorFamily: "yellows",
    description: "A luxurious warm metallic gold tone radiating prestige, festive warmth, and royal elegance.",
    moodTags: ["vibrant", "elegant"],
    popularity: 91,
  },
  {
    id: "fb-4",
    name: "Emerald Green",
    hexCode: "#2D8A4E",
    slug: "emerald-green",
    colorId: "TR-4420",
    colorFamily: "greens",
    description: "A lush, revitalizing botanical green capturing Himalayan pine groves and vibrant natural foliage.",
    moodTags: ["calm", "nature"],
    popularity: 89,
  },
  {
    id: "fb-5",
    name: "Midnight Navy",
    hexCode: "#0D1B3E",
    slug: "midnight-navy",
    colorId: "RP-001",
    colorFamily: "darks",
    description: "Reliance signature deep navy offering dramatic contrast, commanding depth, and executive grandeur.",
    moodTags: ["elegant", "minimalist"],
    popularity: 96,
  },
  {
    id: "fb-6",
    name: "Pearl White",
    hexCode: "#F5F2ED",
    slug: "pearl-white",
    colorId: "RP-101",
    colorFamily: "whites",
    description: "An ethereal warm off-white with delicate pearl undertones that maximize natural daylight.",
    moodTags: ["minimalist", "calm"],
    popularity: 99,
  },
  {
    id: "fb-7",
    name: "Ochre Earth",
    hexCode: "#C8A04A",
    slug: "ochre-earth",
    colorId: "TR-2110",
    colorFamily: "earths",
    description: "A sunny, rustic ochre reflecting golden harvest fields and timeless vernacular Nepali architecture.",
    moodTags: ["earthy", "cozy"],
    popularity: 87,
  },
  {
    id: "fb-8",
    name: "Charcoal Slate",
    hexCode: "#2E2E2E",
    slug: "charcoal-slate",
    colorId: "RP-909",
    colorFamily: "darks",
    description: "A velvety deep neutral for modern architectural exteriors, minimalist kitchens, and sharp accent trims.",
    moodTags: ["minimalist", "elegant"],
    popularity: 92,
  },
  {
    id: "fb-9",
    name: "Seafoam Mist",
    hexCode: "#9FE2BF",
    slug: "seafoam-mist",
    colorId: "TR-6388",
    colorFamily: "greens",
    description: "Soft, refreshing pastel mint adding airy lightness, breathability, and calm to living spaces.",
    moodTags: ["calm", "playful"],
    popularity: 83,
  },
  {
    id: "fb-10",
    name: "Sky Haze",
    hexCode: "#B8D4E8",
    slug: "sky-haze",
    colorId: "TR-3911",
    colorFamily: "blues",
    description: "Gentle morning sky blue that visually expands room boundaries and creates a relaxing retreat.",
    moodTags: ["calm", "cozy"],
    popularity: 85,
  },
  {
    id: "fb-11",
    name: "Crimson Red",
    hexCode: "#DC143C",
    slug: "crimson-red",
    colorId: "RP-505",
    colorFamily: "reds",
    description: "Bold, passionate crimson statement color designed for festive focal walls and dining rooms.",
    moodTags: ["energetic", "vibrant"],
    popularity: 88,
  },
  {
    id: "fb-12",
    name: "Sandstone Beige",
    hexCode: "#D9C5B2",
    slug: "sandstone-beige",
    colorId: "TR-3885",
    colorFamily: "whites",
    description: "Gentle sun-baked stone hue offering effortless versatility and timeless architectural poise.",
    moodTags: ["earthy", "minimalist"],
    popularity: 90,
  },
];

export const PopularColoursBlock: React.FC<PopularColoursProps> = async ({
  title,
  subtitle,
  layout = "grid",
  columns = "3",
  limit = 6,
  sortBy = "popularity",
  showHexCode = true,
  showDescription = false,
  enableHoverEffect = true,
  clickAction = "copy",
  colorPagePath = "/colors/",
  finderPath = "/colors",
  viewAllLink,
  selectionType = "auto",
  selectedColors,
}) => {
  const payload = await getPayload({ config });

  let colorDocs: any[] = [];

  try {
    if (selectionType === "manual" && selectedColors && selectedColors.length > 0) {
      if (typeof selectedColors[0] === "object") {
        colorDocs = selectedColors;
      } else {
        const ids = selectedColors as string[];
        const fetched = await payload.find({
          collection: "colors",
          where: {
            id: {
              in: ids,
            },
          },
          limit: ids.length,
          depth: 1,
        });
        colorDocs = ids
          .map((id) => fetched.docs.find((doc) => doc.id === id))
          .filter((doc): doc is NonNullable<typeof doc> => doc !== undefined && doc !== null);
      }
    } else {
      let sort: string | string[] = "-popularity";
      let where: Record<string, any> = {};

      switch (sortBy) {
        case "popularity":
          sort = "-popularity";
          break;
        case "popularity_asc":
          sort = "popularity";
          break;
        case "name":
          sort = "name";
          break;
        case "name_desc":
          sort = "-name";
          break;
        case "featured":
          where = { featured: { equals: true } };
          sort = "-popularity";
          break;
        case "createdAt":
          sort = "-createdAt";
          break;
        default:
          sort = "-popularity";
      }

      // Fetch a healthy set of colors (up to 40) so category tabs and shade exploration work smoothly
      const colors = await payload.find({
        collection: "colors",
        where,
        sort,
        limit: Math.max(limit || 6, 40),
        depth: 1,
      });
      colorDocs = colors.docs;
    }
  } catch (err) {
    console.error("Error fetching colors in PopularColoursBlock:", err);
  }

  // Merge with fallback data if needed to guarantee comprehensive shade coverage
  const processedData =
    colorDocs.length > 0
      ? colorDocs.map((color) => ({
          id: color.id,
          name: color.name,
          hexCode: color.hexCode,
          slug: color.slug,
          shadeCode: color.shadeCode || color.colorId,
          colorId: color.shadeCode || color.colorId || `RP-${color.name.replace(/\s+/g, "").slice(0, 3).toUpperCase()}`,
          rgb: color.rgb,
          description: color.description,
          colorFamily: color.colorFamily,
          moodTags: color.moodTags || [],
          popularity: color.popularity ?? 80,
          complementaryColours: Array.isArray(color.complementaryColours)
            ? color.complementaryColours.map((c: any) =>
                typeof c === "object" ? { name: c.name, hexCode: c.hexCode, slug: c.slug } : null
              ).filter(Boolean)
            : [],
        }))
      : fallbackColors;

  return (
    <PopularColoursClient
      title={title || "Our Premium Selection"}
      subtitle={subtitle || "Designer Colour Studio"}
      layout={layout}
      columns={columns}
      limit={limit || 6}
      colors={processedData}
      showHexCode={showHexCode}
      showDescription={showDescription}
      enableHoverEffect={enableHoverEffect}
      clickAction={clickAction}
      colorPagePath={colorPagePath}
      finderPath={finderPath}
      viewAllLink={viewAllLink || { label: "Explore All Colours", url: "/colors" }}
    />
  );
};

