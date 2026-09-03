import type { Metadata } from "next";
import { StudioPage } from "@/components/studio/StudioPage";

export const metadata: Metadata = {
  title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
  description:
    "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
};

export default function HomePage() {
  return <StudioPage />;
}
