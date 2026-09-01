"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "@/i18n/routing";

export function SplashScreen() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [show, setShow] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
      if (hasSeenSplash) {
        setShow(false);
      } else {
        sessionStorage.setItem("hasSeenSplash", "true");
      }
    } else {
      setShow(false);
    }
  }, [isHome]);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<SVGGElement>(null);
  const dropRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while splash is active
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !canRef.current ||
        !dropRef.current ||
        !pathRef.current ||
        !textRef.current
      )
        return;

      const pathLength = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1,
      });
      gsap.set(dropRef.current, { opacity: 0, y: -10, scale: 0.5, transformOrigin: "center" });
      gsap.set(canRef.current, { opacity: 0, y: -8, rotate: -6, transformOrigin: "20% 70%" });
      gsap.set([textRef.current, taglineRef.current], {
        opacity: 0,
        y: 14,
      });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "center" });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

      // ambient floating color dots, drifting the whole time
      if (dotsRef.current) {
        const dots = dotsRef.current.querySelectorAll("[data-dot]");
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            y: i % 2 === 0 ? "+=14" : "-=14",
            x: i % 2 === 0 ? "-=8" : "+=8",
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            duration: 0.85,
            ease: "power3.inOut",
            onComplete: () => setShow(false),
          });
        },
      });

      // 0. Ambient glow breathes in behind everything
      tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1, ease: "sine.out" }, 0);

      // 1. Can settles into place
      tl.to(
        canRef.current,
        { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: "back.out(1.6)" },
        0.15
      );

      // 2. Drop falls and lands
      tl.to(
        dropRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "bounce.out" },
        0.45
      );

      // 3. Brush stroke sweeps across, revealing the swatch
      tl.to(pathRef.current, { strokeDashoffset: 0, duration: 1.3, ease: "power1.inOut" }, 0.75);

      // 4. Wordmark, then tagline settle in — a calm, deliberate cascade
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 1.68);
      tl.to(ruleRef.current, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 1.95);
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.05);

      // 5. Progress line fills, signaling "ready"
      tl.to(progressRef.current, { scaleX: 1, duration: 0.7, ease: "power1.inOut" }, 2.15);

      // 6. Soft settling pulse across the mark
      tl.to(
        [dropRef.current],
        { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" },
        2.3
      );

      // 7. Shimmer sweeps once across the wordmark, like light catching a fresh coat
      if (shimmerRef.current) {
        tl.fromTo(
          shimmerRef.current,
          { xPercent: -130 },
          { xPercent: 130, duration: 0.9, ease: "power2.inOut" },
          2.4
        );
      }

      // 8. Stroke gently cycles through accent hues while it holds
      tl.to(
        pathRef.current,
        {
          stroke: "#E8B84B",
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
        },
        2.3
      );

      // Hold briefly before exit
      tl.to({}, { duration: 0.35 });
    },
    { scope: containerRef }
  );

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#0B1035]"
    >
      {/* ambient radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-140 w-140 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,199,94,0.16) 0%, rgba(240,199,94,0.05) 45%, transparent 70%)",
        }}
      />

      {/* ambient floating color dots */}
      <div ref={dotsRef} className="pointer-events-none absolute inset-0">
        <span
          data-dot
          className="absolute left-[22%] top-[30%] h-2 w-2 rounded-full bg-[#F0C75E]/40"
        />
        <span
          data-dot
          className="absolute right-[24%] top-[62%] h-2.5 w-2.5 rounded-full bg-[#8FA6D9]/30"
        />
        <span
          data-dot
          className="absolute left-[30%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-[#D4A73A]/50"
        />
        <span
          data-dot
          className="absolute right-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#F0C75E]/30"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* paint mark */}
        <svg viewBox="0 0 220 110" className="w-45 sm:w-55 h-auto overflow-visible">
          <g ref={canRef}>
            <rect x="28" y="16" width="26" height="20" rx="3" fill="#D4A73A" />
            <rect x="26" y="12" width="30" height="6" rx="2" fill="#F0C75E" />
            <rect x="24" y="10" width="6" height="12" rx="2" fill="#F0C75E" opacity="0.9" />
          </g>

          <path
            ref={dropRef}
            d="M56 34 C56 34 62 42 62 48 C62 52.4 58.4 56 54 56 C49.6 56 46 52.4 46 48 C46 42 52 36 56 34 Z"
            fill="#D4A73A"
          />

          <path
            ref={pathRef}
            d="M 62 62 C 88 44, 108 78, 132 56 C 150 40, 168 66, 192 50"
            fill="none"
            stroke="#F0C75E"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        </svg>

        {/* wordmark block */}
        <div className="mt-2 flex flex-col items-center">
          <span
            ref={textRef}
            className="relative mt-3 inline-block overflow-hidden font-serif text-3xl sm:text-[2.75rem] font-semibold leading-none tracking-wide text-[#F5E8C8]"
          >
            Reliance Paints
            <div
              ref={shimmerRef}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                transform: "translateX(-130%)",
              }}
            />
          </span>

          <div
            ref={ruleRef}
            className="mt-4 h-px w-24 bg-linear-to-r from-transparent via-[#F0C75E] to-transparent"
          />

          <span
            ref={taglineRef}
            className="mt-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-[#F0C75E]/70"
          >
            Colour, considered
          </span>
        </div>

        {/* loading progress */}
        <div className="mt-10 h-0.5 w-32 sm:w-40 overflow-hidden rounded-full bg-white/10">
          <div ref={progressRef} className="h-full w-full rounded-full bg-[#F0C75E]" />
        </div>
      </div>
    </div>
  );
}
