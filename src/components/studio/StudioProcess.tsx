"use client";

import React from "react";
import { Compass, Camera, Sliders, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface ProcessStep {
  stepNumber: string;
  tag: string;
  title: string;
  description: string;
  iconType?: "compass" | "camera" | "sliders" | "sparkles";
}

interface StudioProcessProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    tag: "Pre-Production",
    title: "Discovery & Moodboarding",
    description:
      "We dive deep into your love story, brand identity, or editorial brief. Moodboards, lighting timelines, and location scouting are locked in before cameras roll.",
    iconType: "compass",
  },
  {
    stepNumber: "02",
    tag: "On Set",
    title: "Cinematic Production",
    description:
      "Shooting on 4K/8K cinema systems with anamorphic lenses, natural golden-hour lighting, and certified drone pilots for sweeping Himalayan perspectives.",
    iconType: "camera",
  },
  {
    stepNumber: "03",
    tag: "Post-Production",
    title: "Color Grading & Sound Design",
    description:
      "Every frame is custom color-graded to our warm editorial palette. Audio is mixed with 32-bit floating point precision and licensed cinematic musical scores.",
    iconType: "sliders",
  },
  {
    stepNumber: "04",
    tag: "Heirloom Finish",
    title: "Private Premiere & Delivery",
    description:
      "Experience your full wedding film or commercial campaign in a private 4K screening gallery, complemented by master archival drives and handcrafted albums.",
    iconType: "sparkles",
  },
];

function renderStepIcon(type?: string) {
  switch (type) {
    case "compass":
      return <Compass className="w-5 h-5 text-[#C0171E]" />;
    case "camera":
      return <Camera className="w-5 h-5 text-[#C0171E]" />;
    case "sliders":
      return <Sliders className="w-5 h-5 text-[#C0171E]" />;
    case "sparkles":
      return <Sparkles className="w-5 h-5 text-[#C0171E]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#C0171E]" />;
  }
}

export function StudioProcess({
  eyebrow = "The Creative Journey",
  title = "How We Craft Your",
  highlight = "Vision",
  description = "From initial consultation to final 4K master delivery, our structured production workflow ensures effortless elegance and cinema-grade results every time.",
  steps,
}: StudioProcessProps) {
  const stepsToRender = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-black/5 relative overflow-hidden">
      {/* Subtle decorative background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-bebas text-[#C0171E]/[0.015] select-none pointer-events-none tracking-widest uppercase">
        PROCESS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
            <span className="font-montserrat text-xs font-bold tracking-[0.4em] text-[#C0171E] uppercase">
              {eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#C0171E]/60" />
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] uppercase leading-[0.95] mb-4">
            {title} {highlight && <em className="text-[#C0171E] not-italic">{highlight}</em>}
          </h2>

          {description && (
            <p className="font-poppins text-xs sm:text-base text-[#0A0A0A]/70 font-light leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stepsToRender.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-[#FFFDFD] border border-[#C0171E]/15 hover:border-[#C0171E]/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Step Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bebas text-5xl sm:text-6xl text-[#C0171E]/20 group-hover:text-[#C0171E] transition-colors leading-none">
                    {step.stepNumber}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-[#FFF5F5] border border-[#C0171E]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    {renderStepIcon(step.iconType)}
                  </div>
                </div>

                {/* Tag */}
                <span className="inline-block font-montserrat text-[10px] uppercase font-bold tracking-widest text-[#C0171E] bg-[#FFF5F5] px-2.5 py-1 rounded-md border border-[#C0171E]/15 mb-3">
                  {step.tag}
                </span>

                {/* Title */}
                <h3 className="font-montserrat font-bold text-base sm:text-lg text-[#0A0A0A] group-hover:text-[#C0171E] transition-colors mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-6 pt-4 border-t border-[#C0171E]/10 flex items-center justify-between text-xs font-montserrat text-[#0A0A0A]/40 group-hover:text-[#C0171E] transition-colors">
                <span className="uppercase tracking-wider font-semibold">Step {step.stepNumber} of 04</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-2 sm:pr-6 bg-[#FFF5F5] border border-[#C0171E]/20 rounded-full">
            <span className="px-4 py-1.5 rounded-full bg-[#C0171E] text-white font-montserrat text-xs uppercase font-bold tracking-wider shadow-xs">
              Personalized Plan
            </span>
            <span className="font-poppins text-xs sm:text-sm text-[#0A0A0A]/80 font-light">
              Have a unique creative vision or multi-day itinerary in mind?
            </span>
            <Link
              href="/contact"
              className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#C0171E] hover:text-[#A01018] flex items-center gap-1 ml-auto"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
