"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { ContractorsProgramBlock } from "@/payload-types";
import { ContractorRegistrationForm } from "./ContractorRegistrationForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  data: ContractorsProgramBlock["cta"];
};

export const ContractorsCTA = ({ data }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const [formType, setFormType] = useState<"contractor" | "painter" | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="join" ref={container} className="py-32 px-4 md:px-8 lg:px-16 bg-white text-brand-primary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="cta-content relative z-10 max-w-4xl mx-auto border border-brand-primary/10 bg-white p-8 md:p-20 shadow-2xl rounded-sm">
        {!formType ? (
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 text-brand-primary">
              {data?.title || "Ready to Upgrade Your Business?"}
            </h2>
            <p className="text-lg md:text-2xl text-brand-primary/70 font-sans font-light mb-12 max-w-2xl mx-auto">
              {data?.description || "Join our network of professionals to access exclusive benefits, training, and premium pricing."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setFormType("contractor")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-brand-secondary text-brand-primary px-10 py-5 font-sans font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                <span>Become a Contractor</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="text-brand-primary/50 font-bold uppercase tracking-widest text-sm">OR</div>
              
              <button
                onClick={() => setFormType("painter")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-brand-secondary text-brand-secondary px-10 py-4 font-sans font-bold uppercase tracking-widest hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300"
              >
                <span>Become a Painter</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 text-brand-primary rounded-lg">
            <button 
              onClick={() => setFormType(null)}
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-brand-primary/60 hover:text-brand-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <h3 className="text-3xl font-display font-bold uppercase mb-8 text-center">
              Become a <span className="text-reliance-red">{formType}</span>
            </h3>
            <ContractorRegistrationForm type={formType} />
          </div>
        )}
      </div>
    </section>
  );
};
