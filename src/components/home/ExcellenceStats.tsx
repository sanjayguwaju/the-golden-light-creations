"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlaskConical, Shield, Award, Palette } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number;
    const duration = 2000;
    const raf = requestAnimationFrame(function tick(ts) {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * pct);
      setCount(Math.floor(end * ease));
      if (pct < 1) requestAnimationFrame(tick);
      else setCount(end);
    });
    return () => cancelAnimationFrame(raf);
  }, [started, end]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl md:text-5xl lg:text-6xl font-black text-reliance-gold wrap-break-word">
      {count}
      {suffix}
    </div>
  );
}

const iconMap = {
  flask: FlaskConical,
  shield: Shield,
  award: Award,
  palette: Palette,
};

export interface ExcellenceStatsProps {
  pretitle?: string | null;
  title?: string | null;
  subtitle?: string | null;
  stats?:
    | {
        icon: 'flask' | 'shield' | 'award' | 'palette';
        value: number;
        suffix?: string | null;
        label: string;
      }[]
    | null;
}

const defaultStats = [
  { icon: FlaskConical, value: 0, suffix: "% VOC", label: "VOC-Free Formula" },
  { icon: Shield, value: 10, suffix: "-Year", label: "Warranty" },
  { icon: Award, value: 9001, suffix: "", label: "ISO 9001 Certified" },
  { icon: Palette, value: 500, suffix: "+", label: "Colour Options" },
];

export const ExcellenceStats: React.FC<ExcellenceStatsProps> = ({
  pretitle = "Our Promise",
  title = "Engineered for Excellence",
  subtitle = "Every can of Reliance Paints carries a commitment to quality.",
  stats: inputStats,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  const renderedStats = inputStats && inputStats.length > 0
    ? inputStats.map((s) => ({
        icon: iconMap[s.icon] || Shield,
        value: s.value,
        suffix: s.suffix || "",
        label: s.label,
      }))
    : defaultStats;

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-white">
      <div className="max-w-360 mx-auto px-6 lg:px-16">
        <div ref={headingRef} className="text-center mb-16">
          {pretitle && (
            <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
              {pretitle}
            </p>
          )}
          {title && <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">{title}</h2>}
          {subtitle && <p className="text-lg text-reliance-navy/70">{subtitle}</p>}
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden">
          {renderedStats.map((s, i) => (
            <div
              key={i}
              className="text-center bg-white p-4 sm:p-6 lg:p-8 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="flex justify-center mb-3 lg:mb-4 text-reliance-gold">
                <s.icon className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1.5} />
              </div>
              <AnimatedNumber end={s.value} suffix={s.suffix} />
              <p className="text-reliance-navy mt-3 font-bold uppercase tracking-widest text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
