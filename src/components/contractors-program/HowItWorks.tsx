"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, ThumbsUp, Wrench } from "lucide-react";
import type { ContractorsProgramBlock } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.FC<any>> = {
  ClipboardList,
  ThumbsUp,
  Wrench,
};

type Props = {
  data: ContractorsProgramBlock["howItWorks"];
};

export const HowItWorks = ({ data }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the connecting line
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate the steps
      const stepElements = gsap.utils.toArray(".step-item");
      stepElements.forEach((step: any, i) => {
        gsap.fromTo(
          step,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-24 px-4 md:px-8 lg:px-16 bg-white text-brand-primary overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">
            {data?.title || "How To Join"}
          </h2>
          <p className="text-lg text-brand-neutral font-sans">
            {data?.description}
          </p>
        </div>

        {data?.steps && data.steps.length > 0 && (
          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/10 -translate-x-1/2"></div>
            <div
              ref={lineRef}
              className="absolute left-7 md:left-1/2 top-0 w-0.5 bg-brand-secondary -translate-x-1/2 origin-top"
            ></div>

            <div className="space-y-12">
              {data.steps.map((step: any, idx: number) => {
                const Icon = iconMap[step.icon] || ClipboardList;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`step-item relative flex items-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Icon Node */}
                    <div className="absolute left-7 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-brand-primary border-4 border-white rounded-full flex items-center justify-center z-10 text-brand-surface shadow-xl">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                      <div className={`bg-brand-surface/50 border border-brand-primary/10 p-8 hover:bg-white hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 ${isEven ? "md:text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-display font-bold uppercase mb-2">
                          {step.title}
                        </h3>
                        <p className="text-brand-neutral font-sans leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
