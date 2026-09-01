"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IndianRupee, Headset, Percent, Trophy, PackageOpen, Users } from "lucide-react";
import type { ContractorsProgramBlock } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.FC<any>> = {
  IndianRupee,
  Percent,
  Headset,
  PackageOpen,
  Trophy,
  Users,
};

type Props = {
  data: ContractorsProgramBlock["benefits"];
};

export const BenefitsSection = ({ data }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".benefit-card");
      
      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      gsap.fromTo(
        ".benefits-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="benefits" ref={container} className="py-24 px-4 md:px-8 lg:px-16 bg-brand-surface text-brand-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto benefits-title">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6">
            {data?.title || "Program Benefits"}
          </h2>
          <p className="text-lg text-brand-neutral font-sans">
            {data?.description}
          </p>
        </div>

        {data?.cards && data.cards.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.cards.map((benefit: any, idx: number) => {
              const Icon = iconMap[benefit.icon] || IndianRupee;
              return (
                <div
                  key={idx}
                  className="benefit-card group bg-white border border-brand-primary/10 p-8 flex flex-col space-y-4 hover:border-brand-secondary transition-colors duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500 ease-out" />
                  <div className="w-14 h-14 bg-brand-primary text-brand-surface flex items-center justify-center rounded-none group-hover:bg-brand-secondary group-hover:text-brand-primary transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase">
                    {benefit.title}
                  </h3>
                  <p className="text-brand-neutral font-sans leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
