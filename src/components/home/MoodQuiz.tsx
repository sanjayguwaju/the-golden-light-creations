"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LucideIcon } from "lucide-react";
import {
  Waves, Flame, Sun, Leaf, Star, Heart, Zap, Cloud,
  Sofa, BedDouble, ChefHat, ShowerHead, BookOpen, Home, Baby, Dumbbell,
  MoonStar,
} from "lucide-react";
import type { MoodQuizBlock } from "@/payload-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ---------- Icon maps ----------

const MOOD_ICONS: Record<string, LucideIcon> = {
  Waves, Flame, Sun, Leaf, Star, Heart, Zap, Cloud,
};

const ROOM_ICONS: Record<string, LucideIcon> = {
  Sofa, BedDouble, ChefHat, ShowerHead, BookOpen, Home, Baby, Dumbbell,
};

// ---------- Enriched types (real DB data injected by Component.tsx) ----------

export type EnrichedResultColor = {
  name: string;
  hex: string;
  colorId?: string;
  slug?: string;
};

export type EnrichedMood = {
  label: string;
  icon: string;
  swatchColors?: { hex: string }[] | null;
  id?: string;
  resultColors: EnrichedResultColor[];
};

export type MoodQuizProps = Omit<Partial<MoodQuizBlock>, "moods"> & {
  moods?: EnrichedMood[];
};

// ---------- Component ----------

type Step = 1 | 2 | 3;

export const MoodQuiz: React.FC<MoodQuizProps> = ({
  sectionLabel,
  heading,
  subheading,
  moods,
  roomTypes,
  step1Label,
  step1Sub,
  step2Label,
  step2Sub,
  step3Label,
  step3Sub,
  resultsLabel,
  orderSampleLabel,
}) => {
  const [step, setStep] = useState<Step>(1);
  const [selectedMood, setSelectedMood] = useState<EnrichedMood | null>(null);
  const [room, setRoom] = useState<string>("");
  const [light, setLight] = useState(50);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const moodList = moods ?? [];
  const roomList = roomTypes ?? [];

  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }
    },
    { scope: sectionRef },
  );

  // Transition between steps
  const prevStepRef = useRef<Step>(step);
  useEffect(() => {
    if (!stepContainerRef.current) return;
    
    // Out then in transition
    gsap.fromTo(
      stepContainerRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
    );
    prevStepRef.current = step;
  }, [step]);

  const handleReset = () => {
    setStep(1);
    setSelectedMood(null);
    setRoom("");
    setLight(50);
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-reliance-offwhite">
      <div className="max-w-200 mx-auto px-6 lg:px-16">
        <div ref={headingRef} className="text-center mb-12">
          {sectionLabel && (
            <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-3">
              {sectionLabel}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-lg text-reliance-grey">{subheading}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex gap-px mb-12 bg-zinc-200">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 transition-all duration-500 ${
                step >= s ? "bg-reliance-gold" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        <div className="bg-white p-8 lg:p-12 border border-reliance-navy">
          <div ref={stepContainerRef}>
            {/* ── Step 1 — Pick a Mood ─────────────────────────────── */}
            {step === 1 && (
              <div key="step1">
                {step1Label && (
                  <h3 className="text-2xl text-reliance-navy mb-2">{step1Label}</h3>
                )}
                {step1Sub && (
                  <p className="text-reliance-grey mb-8">{step1Sub}</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {moodList.map((m) => {
                    const Icon = MOOD_ICONS[m.icon] ?? Waves;
                    return (
                      <button
                        key={m.label}
                        onClick={() => { setSelectedMood(m); setStep(2); }}
                        className={`p-6 border text-center flex flex-col items-center gap-3 transition-all hover:border-reliance-gold hover:-translate-y-1 ${
                          selectedMood?.label === m.label
                            ? "border-reliance-gold bg-reliance-gold/10"
                            : "border-reliance-navy/20"
                        }`}
                      >
                        <span className="text-reliance-navy">
                          <Icon size={36} strokeWidth={1.5} />
                        </span>
                        <span className="font-bold uppercase tracking-widest text-xs text-reliance-navy">
                          {m.label}
                        </span>
                        {(m.swatchColors ?? []).length > 0 && (
                          <div className="flex gap-px border border-reliance-navy/20">
                            {(m.swatchColors ?? []).map((c, i) => (
                              <div
                                key={i}
                                className="w-5 h-5"
                                style={{ backgroundColor: c.hex }}
                                title={c.hex}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 2 — Pick a Room ─────────────────────────────── */}
            {step === 2 && (
              <div key="step2">
                {step2Label && (
                  <h3 className="text-2xl text-reliance-navy mb-2">{step2Label}</h3>
                )}
                {step2Sub && (
                  <p className="text-reliance-grey mb-8">{step2Sub}</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {roomList.map((r) => {
                    const Icon = ROOM_ICONS[r.icon] ?? Home;
                    return (
                      <button
                        key={r.label}
                        onClick={() => { setRoom(r.label); setStep(3); }}
                        className={`p-5 border text-center flex flex-col items-center gap-2 transition-all hover:border-reliance-gold hover:-translate-y-1 ${
                          room === r.label
                            ? "border-reliance-gold bg-reliance-gold/10"
                            : "border-reliance-navy/20"
                        }`}
                      >
                        <span className="text-reliance-navy">
                          <Icon size={28} strokeWidth={1.5} />
                        </span>
                        <span className="font-bold uppercase tracking-widest text-[10px] text-reliance-navy">
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-reliance-grey hover:text-reliance-navy transition-colors"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* ── Step 3 — Light Level + Results ───────────────────── */}
            {step === 3 && (
              <div key="step3">
                {step3Label && (
                  <h3 className="text-2xl text-reliance-navy mb-2">{step3Label}</h3>
                )}
                {step3Sub && (
                  <p className="text-reliance-grey mb-8">{step3Sub}</p>
                )}

                {/* Light slider */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-reliance-grey mb-4">
                    <span className="flex items-center gap-1">
                      <MoonStar size={14} /> Dark
                    </span>
                    <span className="flex items-center gap-1">
                      <Sun size={14} /> Bright
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={light}
                    onChange={(e) => setLight(Number(e.target.value))}
                    className="w-full h-2 bg-reliance-navy/20 appearance-none cursor-pointer accent-reliance-navy"
                  />
                  <p className="text-center mt-4 text-sm text-reliance-grey">
                    {light < 33
                      ? "Low natural light"
                      : light < 66
                      ? "Moderate natural light"
                      : "Lots of natural light"}
                  </p>
                </div>

                {/* Real DB results */}
                <div className="border-t border-zinc-100 pt-8">
                  {resultsLabel && (
                    <p className="text-sm font-bold uppercase tracking-widest text-reliance-gold mb-6">
                      {resultsLabel}
                    </p>
                  )}

                  {selectedMood?.resultColors && selectedMood.resultColors.length > 0 ? (
                    <div className="grid grid-cols-3 gap-px bg-reliance-navy/20 border border-reliance-navy/20 mb-8">
                      {selectedMood.resultColors.map((c) => (
                        <div key={c.slug ?? c.name} className="text-center bg-white p-4">
                          <div
                            className="h-20 w-full mb-3 border border-reliance-navy/10"
                            style={{ backgroundColor: c.hex }}
                          />
                          <p className="text-xs font-bold uppercase tracking-widest text-reliance-navy leading-tight">
                            {c.name}
                          </p>
                          {c.colorId && (
                            <p className="text-[10px] font-mono text-reliance-grey mt-0.5">
                              {c.colorId}
                            </p>
                          )}
                          <p className="text-[10px] font-mono text-reliance-grey">{c.hex}</p>
                          {orderSampleLabel && (
                            <button className="mt-3 text-[10px] font-bold uppercase tracking-widest text-reliance-gold border border-reliance-gold px-3 py-1 hover:bg-reliance-gold hover:text-reliance-navy transition-colors">
                              {orderSampleLabel}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-reliance-grey mb-8">
                      No colors found for this mood yet. Add colors with this mood tag in the admin.
                    </p>
                  )}

                  <button
                    onClick={handleReset}
                    className="text-sm text-reliance-grey hover:text-reliance-navy transition-colors"
                  >
                    ← Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
