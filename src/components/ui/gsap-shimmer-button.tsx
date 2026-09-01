"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utilities/ui";
import { Slot } from "@radix-ui/react-slot";

export interface GsapShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Shimmer color */
  shimmerColor?: string;
  /** Background color */
  background?: string;
  /** Animation duration */
  duration?: string;
  /** Render as child element */
  asChild?: boolean;
}

export const GsapShimmerButton = React.forwardRef<HTMLButtonElement, GsapShimmerButtonProps>(
  (
    {
      children,
      className,
      shimmerColor = "rgba(255, 255, 255, 0.4)",
      background = "hsl(var(--primary))",
      duration = "2s",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useGSAP(
      () => {
        if (!buttonRef.current) return;
        
        gsap.to(buttonRef.current, {
          "--shimmer-bg-pos": "200% 0",
          duration: parseFloat(duration),
          repeat: -1,
          ease: "none",
        });
      },
      { scope: buttonRef }
    );

    const setRefs = (element: HTMLButtonElement) => {
      buttonRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={setRefs}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] active:scale-95",
          className
        )}
        style={{
          background: background,
          "--shimmer-bg-pos": "0% 0",
        } as React.CSSProperties}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(120deg, transparent 20%, ${shimmerColor} 50%, transparent 80%)`,
                backgroundSize: "200% auto",
                backgroundPosition: "var(--shimmer-bg-pos)",
              }}
            />
            <span className="relative z-10">{children}</span>
          </>
        )}
      </Comp>
    );
  }
);

GsapShimmerButton.displayName = "GsapShimmerButton";
