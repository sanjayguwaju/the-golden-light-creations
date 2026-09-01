"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, BadgeCheck, ShieldCheck, Clock, Lock, CalendarCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  phone: string;
  city: string;
  surface: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  city?: string;
}

interface BgConfig {
  sectionBg: string;
  stripeColor: string;
  stripeOpacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ICON_MAP = {
  BadgeCheck,
  ShieldCheck,
  CheckCircle,
  Clock,
};

interface HirePainterProps {
  sectionLabel?: string;
  title?: string;
  subheading?: string;
  features?: Array<{
    icon: "BadgeCheck" | "ShieldCheck" | "CheckCircle" | "Clock";
    title: string;
    desc: string;
  }>;
}

const FEATURES = [
  {
    Icon: BadgeCheck,
    title: "Certified & trained",
    desc: "Every painter completes the 3-week Reliance ColourCare certification before stepping into your home.",
  },
  {
    Icon: ShieldCheck,
    title: "Fully insured",
    desc: "Your home and belongings are protected end-to-end. Every job is covered throughout.",
  },
  {
    Icon: CheckCircle,
    title: "Satisfaction guaranteed",
    desc: "Not satisfied? We redo it — free, no arguments, no delays. Your approval is the only benchmark.",
  },
  {
    Icon: Clock,
    title: "Response within 2 hours",
    desc: "Submit your request and our team calls to schedule a free on-site visit — within two hours, every time.",
  },
];

const BG_PRESETS = [
  { hex: "#F7F4EE", label: "Off-white" },
  { hex: "#EEF2F7", label: "Cool mist" },
  { hex: "#F0EDE8", label: "Warm linen" },
  { hex: "#E8F0EC", label: "Sage wash" },
  { hex: "#F5EEE8", label: "Sand" },
  { hex: "#EDE8F5", label: "Lavender" },
  { hex: "#F5F5F0", label: "Chalk" },
  { hex: "#0D1B3E", label: "Navy" },
  { hex: "#1A1A1A", label: "Charcoal" },
];

const STRIPE_PRESETS = [
  { hex: "#0D1B3E", label: "Navy" },
  { hex: "#C8923A", label: "Gold" },
  { hex: "#1A1A1A", label: "Black" },
  { hex: "#FFFFFF", label: "White" },
  { hex: "#3B6D11", label: "Forest" },
  { hex: "#534AB7", label: "Purple" },
  { hex: "#993C1D", label: "Rust" },
];

const DEFAULT_BG: BgConfig = {
  sectionBg: "#F7F4EE",
  stripeColor: "#0D1B3E",
  stripeOpacity: 6,
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  city: "",
  surface: "",
  message: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorSwatch({
  hex,
  label,
  isActive,
  onClick,
}: {
  hex: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className="w-7 h-7 rounded-md transition-transform hover:scale-110 shrink-0"
      style={{
        background: hex,
        border: isActive
          ? "2.5px solid #0D1B3E"
          : hex === "#FFFFFF"
            ? "1px solid #ddd"
            : "2px solid transparent",
        outline: isActive ? "1.5px solid #C8923A" : "none",
        outlineOffset: "1px",
      }}
    />
  );
}

function BgControls({ config, onChange }: { config: BgConfig; onChange: (c: BgConfig) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `background: ${config.sectionBg}; /* stripe: ${config.stripeColor} @ ${config.stripeOpacity}% opacity */`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-4">
        Background Controls
      </p>

      {/* Section bg */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-xs text-zinc-400 w-20 shrink-0">Section bg</span>
        <div className="flex gap-1.5 flex-wrap items-center">
          {BG_PRESETS.map((s) => (
            <ColorSwatch
              key={s.hex}
              {...s}
              isActive={config.sectionBg === s.hex}
              onClick={() => onChange({ ...config, sectionBg: s.hex })}
            />
          ))}
          <label
            className="w-7 h-7 rounded-md border border-zinc-200 overflow-hidden cursor-pointer relative"
            title="Custom color"
          >
            <input
              type="color"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              value={config.sectionBg}
              onChange={(e) => onChange({ ...config, sectionBg: e.target.value })}
            />
            <div className="absolute inset-0 rounded-md" style={{ background: config.sectionBg }} />
          </label>
        </div>
      </div>

      {/* Stripe color */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-xs text-zinc-400 w-20 shrink-0">Stripe</span>
        <div className="flex gap-1.5 flex-wrap items-center">
          {STRIPE_PRESETS.map((s) => (
            <ColorSwatch
              key={s.hex}
              {...s}
              isActive={config.stripeColor === s.hex}
              onClick={() => onChange({ ...config, stripeColor: s.hex })}
            />
          ))}
          <label
            className="w-7 h-7 rounded-md border border-zinc-200 overflow-hidden cursor-pointer relative"
            title="Custom stripe color"
          >
            <input
              type="color"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              value={config.stripeColor}
              onChange={(e) => onChange({ ...config, stripeColor: e.target.value })}
            />
            <div
              className="absolute inset-0 rounded-md"
              style={{ background: config.stripeColor }}
            />
          </label>
        </div>
      </div>

      {/* Opacity */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-zinc-400 w-20 shrink-0">Opacity</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={config.stripeOpacity}
          onChange={(e) => onChange({ ...config, stripeOpacity: Number(e.target.value) })}
          className="flex-1 accent-reliance-navy"
        />
        <span className="text-xs text-zinc-500 w-8 text-right">{config.stripeOpacity}%</span>
      </div>

      {/* Code output */}
      <div className="flex items-center justify-between gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-2.5">
        <code className="text-[11px] text-zinc-500 font-mono truncate">
          bg: <span className="text-zinc-800">{config.sectionBg}</span>
          {"  "}stripe: <span className="text-zinc-800">{config.stripeColor}</span>
          {"  "}opacity: <span className="text-zinc-800">{config.stripeOpacity}%</span>
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] text-zinc-500 bg-zinc-100 hover:bg-zinc-200 rounded-md px-2.5 py-1 shrink-0 transition-colors"
        >
          {copied ? "Copied!" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}

function FeatureItem({ iconName, Icon, title, desc }: { iconName?: string; Icon?: any; title: string; desc: string }) {
  const ResolvedIcon = iconName ? ICON_MAP[iconName as keyof typeof ICON_MAP] : Icon;
  return (
    <div className="flex gap-5 items-start">
      <div className="w-12 h-12 bg-reliance-navy rounded-2xl flex items-center justify-center text-[#C8923A] shrink-0 shadow-lg">
        {ResolvedIcon && <ResolvedIcon size={24} strokeWidth={1.5} />}
      </div>
      <div>
        <h3 className="font-semibold text-reliance-navy text-[15px] mb-1">{title}</h3>
        <p className="text-[#6B6860] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone))
      e.phone = "Valid phone required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 animate-[fadeInUp_0.4s_ease_forwards]">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl text-reliance-navy mb-2">Request received!</h3>
        <p className="text-[#6B6860] text-sm leading-relaxed">
          Our team will call you within 2 hours to schedule your free on-site visit.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-5 text-sm text-[#C8923A] underline underline-offset-2"
        >
          Submit another request →
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl text-reliance-navy mb-1">Book a free site visit</h3>
      <p className="text-xs text-zinc-400 mb-6">No payment required — we&apos;ll call within 2 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name + Phone */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { key: "name", label: "Full name", type: "text", placeholder: "Ravi Kumar" },
              { key: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
            ] as const
          ).map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors bg-zinc-50 ${
                  errors[key]
                    ? "border-red-300 bg-red-50"
                    : "border-zinc-200 focus:border-reliance-navy"
                }`}
              />
              {errors[key] && <p className="text-red-500 text-[11px] mt-1">{errors[key]}</p>}
            </div>
          ))}
        </div>

        {/* City + Surface */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
              City
            </label>
            <input
              type="text"
              placeholder="New Delhi"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors bg-zinc-50 ${
                errors.city ? "border-red-300 bg-red-50" : "border-zinc-200 focus:border-reliance-navy"
              }`}
            />
            {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
              Service
            </label>
            <select
              value={form.surface}
              onChange={(e) => setForm({ ...form, surface: e.target.value })}
              className="w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-reliance-navy bg-zinc-50 text-zinc-700 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230D1B3E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "32px",
              }}
            >
              <option value="">Select service…</option>
              <option>Interior painting</option>
              <option>Exterior painting</option>
              <option>Wood &amp; metal</option>
              <option>Waterproofing</option>
              <option>Full home</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
            Notes (optional)
          </label>
          <textarea
            rows={3}
            placeholder="Describe your space — area in sq ft, any specific concerns…"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-reliance-navy bg-zinc-50 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-reliance-navy text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#162B5A] active:scale-[.98] transition-all flex items-center justify-center gap-2 mt-1 shadow-lg shadow-reliance-navy/20"
        >
          <CalendarCheck size={16} strokeWidth={2} />
          Book free visit
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-1">
          <Lock size={12} className="text-[#C8923A]" />
          <p className="text-center text-[11px] text-zinc-400">Your details are never shared</p>
        </div>
      </form>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const HirePainterSection: React.FC<HirePainterProps> = ({
  sectionLabel,
  title,
  subheading,
  features,
}) => {
  const [bgConfig, setBgConfig] = useState<BgConfig>(DEFAULT_BG);

  const handleBgChange = useCallback((c: BgConfig) => setBgConfig(c), []);

  const actualFeatures = features && features.length > 0
    ? features.map(f => ({ title: f.title, desc: f.desc, iconName: f.icon, Icon: null }))
    : FEATURES;

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;
    gsap.from(leftRef.current, {
      opacity: 0,
      x: -32,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
    });
    gsap.from(rightRef.current, {
      opacity: 0,
      x: 32,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <div ref={sectionRef} className="p-6 max-w-[1200px] mx-auto">
      {/* Color Controls */}
      <BgControls config={bgConfig} onChange={handleBgChange} />

      {/* Section Preview */}
      <section
        className="py-12 md:py-24 relative overflow-hidden rounded-3xl"
        style={{ background: bgConfig.sectionBg }}
      >
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "7px 7px",
            color: bgConfig.stripeColor,
            opacity: bgConfig.stripeOpacity / 100,
          }}
        />

        <div className="max-w-[1100px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start relative z-10">
          {/* Left: features */}
          <div ref={leftRef}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#C8923A] mb-4">
              {sectionLabel || "Professional Services"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-reliance-navy mb-4 leading-tight">
              {title ? (
                title.includes("Hire a Painter") ? (
                  <>
                    Hire a Painter
                    <br />
                    You Can{" "}
                    <em className="italic text-[#C8923A]">
                      Trust
                    </em>
                  </>
                ) : (
                  title
                )
              ) : (
                <>
                  Hire a Painter
                  <br />
                  You Can{" "}
                  <em className="italic text-[#C8923A]">
                    Trust
                  </em>
                </>
              )}
            </h2>
            <p className="text-lg text-[#6B6860] mb-12 leading-relaxed">
              {subheading ||
                "Our ColourCast-certified painters deliver flawless finishes — backed by an absolute satisfaction guarantee."}
            </p>

            <div className="space-y-8">
              {actualFeatures.map((f, i) => (
                <FeatureItem key={i} {...f} />
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div ref={rightRef} className="relative">
            {/* Gold drip accent */}
            <div
              className="absolute -left-3 rounded-full"
              style={{
                top: "20px",
                bottom: "20px",
                width: "4px",
                background: "#C8923A",
              }}
            >
              <div
                className="absolute"
                style={{
                  bottom: "-16px",
                  left: "-3px",
                  width: "10px",
                  height: "20px",
                  background: "#C8923A",
                  borderRadius: "0 0 50% 50%",
                }}
              />
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-reliance-navy/10 border border-zinc-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
