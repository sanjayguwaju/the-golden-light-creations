"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import RichText from "@/components/RichText";
import type { Media } from "@/payload-types";
import { ArrowDown, Leaf, Globe, Recycle, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  data: any;
}

export function SustainabilityClient({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImage = data?.hero?.backgroundImage as Media | undefined;

  useGSAP(() => {
    // Parallax Hero Background
    gsap.to(".hero-bg", {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    // Hero Floating Badge
    gsap.fromTo(
      ".hero-badge",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Hero Text Stagger
    gsap.fromTo(
      ".hero-text-anim",
      { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.4 }
    );

    // Down Arrow Float
    gsap.to(".scroll-indicator", {
      y: 15,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.5,
    });

    // Intro Section Fade & Scale
    gsap.from(".intro-line", {
      scrollTrigger: { trigger: ".intro-section", start: "top 80%" },
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "power4.out"
    });
    
    gsap.from(".intro-content > *", {
      scrollTrigger: { trigger: ".intro-section", start: "top 75%" },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Pillars Stagger with 3D feel
    gsap.fromTo(
      ".pillar-card",
      { y: 100, opacity: 0, rotationX: 10 },
      {
        scrollTrigger: {
          trigger: ".pillars-section",
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        transformPerspective: 1000,
      }
    );

    // Metrics counter animation
    const metrics = gsap.utils.toArray<HTMLElement>(".metric-value");
    metrics.forEach((metric) => {
      const targetValueStr = metric.getAttribute("data-value") || "0";
      const targetValue = parseFloat(targetValueStr.replace(/,/g, ''));
      const suffix = metric.getAttribute("data-suffix") || "";
      
      // Simple fade in and scale for the card
      gsap.from(metric.closest(".metric-card"), {
        scrollTrigger: {
          trigger: ".metrics-section",
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
      });

      // Animate the number
      if (!isNaN(targetValue) && targetValue > 0) {
        gsap.to({ val: 0 }, {
          val: targetValue,
          duration: 2.5,
          scrollTrigger: {
            trigger: ".metrics-section",
            start: "top 80%",
          },
          ease: "power3.out",
          onUpdate: function () {
            const currentVal = Math.floor(this.targets()[0].val);
            // Add commas back if original had them (basic heuristic)
            const displayVal = targetValueStr.includes(',') ? currentVal.toLocaleString() : currentVal.toString();
            metric.innerText = displayVal + suffix;
          },
        });
      }
    });

  }, { scope: containerRef });

  const fallbackIcons = [
    <Globe key="1" className="w-10 h-10 text-emerald-500" />,
    <Recycle key="2" className="w-10 h-10 text-blue-500" />,
    <Zap key="3" className="w-10 h-10 text-amber-500" />,
  ];

  // Helper to extract number and suffix from string like "100%" or "50k+" or "1,000+"
  const parseMetric = (str: string) => {
    // Match numbers (including commas and decimals) and trailing non-numbers
    const match = str.match(/^([\d,.]+)(.*)$/);
    if (match) {
      return { num: match[1], suffix: match[2] };
    }
    return { num: null, suffix: str };
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="hero-section relative h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-slate-950 rounded-b-[40px] md:rounded-b-[80px]">
        {heroImage && (
          <div className="absolute inset-0 z-0 hero-bg w-full h-[140%] top-[-20%] pointer-events-none">
            <Image
              src={heroImage.url || "/placeholder-hero.jpg"}
              alt={heroImage.alt || data?.hero?.title || "Hero Image"}
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              priority
              quality={90}
            />
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/50 to-slate-950" />
          </div>
        )}
        
        {/* Dynamic decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center mt-16 max-w-5xl">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 shadow-2xl">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold tracking-widest text-emerald-50 uppercase">Building a Greener Future</span>
          </div>
          <h1 className="hero-text-anim text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white leading-[1.1]">
            {data?.hero?.title || "Sustainability at Reliance"}
          </h1>
          {data?.hero?.subtitle && (
            <p className="hero-text-anim text-xl md:text-2xl font-light text-slate-300 max-w-3xl leading-relaxed">
              {data.hero.subtitle}
            </p>
          )}
        </div>
        
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Scroll</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      {data?.introduction && (
        <section className="intro-section py-32 bg-slate-50 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl intro-content">
            <div className="intro-line w-24 h-1.5 bg-emerald-500 rounded-full mb-10 mx-auto md:mx-0"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center md:text-left tracking-tight">Our Commitment</h2>
            <div className="prose prose-lg md:prose-xl text-slate-600 leading-relaxed max-w-none prose-p:mb-6 prose-a:text-emerald-600">
              <RichText data={data.introduction} />
            </div>
          </div>
        </section>
      )}

      {/* Pillars */}
      {data?.pillars && data.pillars.length > 0 && (
        <section className="pillars-section py-32 bg-slate-50 relative">
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Core Initiatives</span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">Our Sustainability Pillars</h2>
              <p className="text-xl text-slate-500">The foundational strategies driving our environmental and social responsibility.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.pillars.map((pillar: any, index: number) => {
                const img = pillar.image as Media;
                return (
                  <div 
                    key={index} 
                    className="pillar-card group bg-white border border-slate-100 rounded-[2rem] p-10 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                    
                    <div className="w-20 h-20 relative mb-10 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center overflow-hidden border border-slate-50 group-hover:-translate-y-2 transition-transform duration-500 z-10">
                      {img && typeof img === 'object' && img.url ? (
                         <Image src={img.url} alt={img.alt || pillar.title} fill className="object-cover" />
                      ) : (
                         fallbackIcons[index % fallbackIcons.length]
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-emerald-600 transition-colors z-10">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed grow z-10">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {data?.metrics && data.metrics.length > 0 && (
        <section className="metrics-section py-32 relative overflow-hidden bg-slate-950 mt-10 rounded-t-[40px] md:rounded-t-[80px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-950"></div>
          
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="text-center mb-20">
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Measurable Results</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Our Impact by the Numbers</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.metrics.map((metric: any, index: number) => {
                const { num, suffix } = parseMetric(metric.value);
                
                return (
                  <div key={index} className="metric-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center hover:bg-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="text-5xl md:text-6xl font-extrabold mb-4 bg-linear-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent flex justify-center items-end">
                        {num ? (
                          <>
                            <span 
                              className="metric-value" 
                              data-value={num} 
                              data-suffix={suffix}
                            >
                              0{suffix}
                            </span>
                          </>
                        ) : (
                          <span>{metric.value}</span>
                        )}
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-white">{metric.title}</h4>
                      {metric.description && (
                        <p className="text-slate-400 text-sm leading-relaxed">{metric.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
