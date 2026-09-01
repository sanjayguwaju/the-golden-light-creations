"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgSpanRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const drip1Ref = useRef<HTMLSpanElement>(null);
  const drip2Ref = useRef<HTMLSpanElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);

  // Glow animation
  const glowRef = useRef<HTMLSpanElement>(null);
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const iconTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const updateState = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(progress);
    setIsVisible(scrollTop > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show/hide animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isVisible) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        display: "block",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 20,
        scale: 0.6,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          if (el) gsap.set(el, { display: "none" });
        },
      });
    }
  }, [isVisible]);

  // Hover animations
  useEffect(() => {
    const btn = buttonRef.current;
    const bg = bgSpanRef.current;
    const pulse = pulseRef.current;
    const icon = iconRef.current;
    const glow = glowRef.current;
    const d1 = drip1Ref.current;
    const d2 = drip2Ref.current;
    const sheen = sheenRef.current;

    if (!btn) return;

    if (isHovered) {
      // Scale button
      gsap.to(btn, { scale: 1.1, y: -6, duration: 0.3, ease: "power2.out" });
      // Background & border
      if (bg) gsap.to(bg, { backgroundColor: "#12234E", borderColor: "rgba(201, 168, 76, 0.6)", duration: 0.35 });
      // Glow
      if (glow)
        gsap.to(glow, {
          boxShadow: "0 0 25px 8px rgba(201, 168, 76, 0.35), 0 0 50px 15px rgba(201, 168, 76, 0.15)",
          duration: 0.4,
        });
      // Pulse ring
      if (pulse) {
        pulseTimelineRef.current?.kill();
        pulseTimelineRef.current = gsap.timeline({ repeat: -1 });
        pulseTimelineRef.current.fromTo(
          pulse,
          { scale: 1, opacity: 0.6 },
          { scale: 1.25, opacity: 0, duration: 1.0, ease: "power2.out" },
        );
      }
      // Icon color & bounce
      if (icon) {
        gsap.to(icon, { color: "#C9A84C", duration: 0.3 });
        iconTimelineRef.current?.kill();
        iconTimelineRef.current = gsap.timeline({ repeat: -1 });
        iconTimelineRef.current.to(icon, { y: -3, duration: 0.45, ease: "power2.out" }).to(icon, {
          y: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
      // Paint drips
      if (d1) gsap.fromTo(d1, { height: 0, opacity: 0 }, { height: 10, opacity: 1, duration: 0.5, delay: 0.1, ease: "power2.out" });
      if (d2) gsap.fromTo(d2, { height: 0, opacity: 0 }, { height: 7, opacity: 0.8, duration: 0.4, delay: 0.25, ease: "power2.out" });
      // Sheen sweep
      if (sheen) gsap.fromTo(sheen, { xPercent: -100 }, { xPercent: 100, duration: 0.7, ease: "power2.out" });
    } else {
      gsap.to(btn, { scale: 1, y: 0, duration: 0.3, ease: "power2.inOut" });
      if (bg) gsap.to(bg, { backgroundColor: "#0D1B3E", borderColor: "rgba(201, 168, 76, 0.2)", duration: 0.35 });
      if (glow)
        gsap.to(glow, {
          boxShadow: "0 0 15px 4px rgba(13, 27, 62, 0.2), 0 0 30px 8px rgba(13, 27, 62, 0.05)",
          duration: 0.4,
        });
      pulseTimelineRef.current?.kill();
      iconTimelineRef.current?.kill();
      if (pulse) gsap.to(pulse, { opacity: 0, scale: 1, duration: 0.3 });
      if (icon) gsap.to(icon, { color: "#ffffff", y: 0, duration: 0.3 });
      if (d1) gsap.to(d1, { height: 0, opacity: 0, duration: 0.3 });
      if (d2) gsap.to(d2, { height: 0, opacity: 0, duration: 0.3 });
      if (sheen) gsap.set(sheen, { xPercent: -100 });
    }
  }, [isHovered]);

  useEffect(() => {
    window.addEventListener("scroll", updateState, { passive: true });
    return () => window.removeEventListener("scroll", updateState);
  }, [updateState]);

  // SVG progress rect
  const size = 56;
  const strokeWidth = 3;
  const rectSize = size - strokeWidth;
  const circumference = 4 * rectSize;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 z-[100]"
      style={{ bottom: "24px", opacity: 0, transform: "translateY(20px) scale(0.6)", display: "none" }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer rounded-none"
        style={{ width: size, height: size }}
        aria-label="Scroll to top"
      >
        {/* Glow */}
        <span ref={glowRef} className="absolute inset-0 rounded-none" aria-hidden="true" />

        {/* Pulse ring */}
        <span
          ref={pulseRef}
          className="absolute inset-0 border-2 border-reliance-gold/30 rounded-none opacity-0"
          aria-hidden="true"
        />

        {/* SVG progress rect */}
        <svg
          className="absolute inset-0"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={rectSize}
            height={rectSize}
            fill="none"
            stroke="rgba(201, 168, 76, 0.15)"
            strokeWidth={strokeWidth}
          />
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={rectSize}
            height={rectSize}
            fill="none"
            stroke="#C9A84C"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />
        </svg>

        {/* Main button face */}
        <span
          ref={bgSpanRef}
          className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-none border border-reliance-gold/20"
          style={{ backgroundColor: "#0D1B3E" }}
        >
          {/* Glossy sheen */}
          <span
            className="absolute inset-0 pointer-events-none rounded-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Interactive sheen sweep */}
          <span
            ref={sheenRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)",
              transform: "translateX(-100%) skewX(-20deg)",
            }}
            aria-hidden="true"
          />

          {/* Paint drips */}
          <span
            ref={drip1Ref}
            className="absolute -bottom-2 left-[14px] w-[5px] bg-reliance-gold"
            style={{ borderRadius: "0 0 9999px 9999px", height: 0, opacity: 0 }}
            aria-hidden="true"
          />
          <span
            ref={drip2Ref}
            className="absolute -bottom-1 right-[16px] w-[4px] bg-reliance-gold"
            style={{ borderRadius: "0 0 9999px 9999px", height: 0, opacity: 0 }}
            aria-hidden="true"
          />

          {/* Arrow icon */}
          <span ref={iconRef} className="relative z-10 text-white">
            <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
          </span>
        </span>
      </button>
    </div>
  );
}
