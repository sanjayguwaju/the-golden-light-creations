"use client";

import React, { useRef, useState } from "react";

interface V5TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  translateY?: number;
}

export function V5TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = 6,
  perspective = 800,
  translateY = -4,
  ...props
}: V5TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotateX = ((y / r.height) - 0.5) * -maxTilt;
    const rotateY = ((x / r.width) - 0.5) * maxTilt;
    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${translateY}px)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: transform || undefined,
        transformStyle: "preserve-3d",
        transition: transform
          ? "transform 0.08s ease-out, box-shadow 0.25s ease"
          : "transform 0.35s ease, box-shadow 0.25s ease",
        willChange: "transform",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
