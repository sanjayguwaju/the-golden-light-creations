import type { Metadata } from "next";
import { StudioPage } from "@/components/studio/StudioPage";
import {
  getStudioPortfolio,
  getStudioFilms,
  getStudioServices,
  getStudioTestimonials,
  getStudioSettings,
} from "@/utilities/getStudioData";

export const metadata: Metadata = {
  title: "The Golden Light Creations | Luxury Photography & Cinematic Films · Nepal",
  description:
    "Nepal's Finest Creative Studio — Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
};

export default async function HomePage() {
  const [portfolio, films, services, testimonials, settings] = await Promise.all([
    getStudioPortfolio(),
    getStudioFilms(),
    getStudioServices(),
    getStudioTestimonials(),
    getStudioSettings(),
  ]);

  return (
    <StudioPage
      portfolio={portfolio}
      films={films}
      services={services}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
