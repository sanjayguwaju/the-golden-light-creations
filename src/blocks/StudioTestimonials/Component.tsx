import React from "react";
import { StudioTestimonials } from "@/components/studio/StudioTestimonials";
import { getStudioTestimonials } from "@/utilities/getStudioData";

export async function StudioTestimonialsBlockComponent(_props: any) {
  const testimonials = await getStudioTestimonials();
  return <StudioTestimonials items={testimonials} />;
}
