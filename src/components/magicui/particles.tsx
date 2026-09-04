"use client";

import React, { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utilities/ui";

export interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 60,
  staticity = 50,
  ease = 50,
  size = 0.5,
  refresh = false,
  color = "#F5B301",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rafID = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    context.current = canvasRef.current.getContext("2d");
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    const rgb = hexToRgb(color);

    const circleParams = (): Circle => {
      const w = canvasSize.current.w || 800;
      const h = canvasSize.current.h || 600;
      const x = Math.floor(Math.random() * w);
      const y = Math.floor(Math.random() * h);
      const pSize = Math.floor(Math.random() * 2) + size;
      const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: pSize,
        alpha: 0,
        targetAlpha,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        magnetism: 0.1 + Math.random() * 4,
      };
    };

    const drawCircle = (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size: cSize, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, cSize, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          circles.current.push(circle);
        }
      }
    };

    const resizeCanvas = () => {
      if (canvasContainerRef.current && canvasRef.current && context.current) {
        const w = canvasContainerRef.current.offsetWidth || window.innerWidth;
        const h = canvasContainerRef.current.offsetHeight || window.innerHeight;
        canvasSize.current = { w, h };

        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        context.current.scale(dpr, dpr);

        circles.current = [];
        for (let i = 0; i < quantity; i++) {
          drawCircle(circleParams());
        }
      }
    };

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (inside) {
          mouse.current = {
            x: e.clientX - rect.left - canvasSize.current.w / 2,
            y: e.clientY - rect.top - canvasSize.current.h / 2,
          };
        }
      }
    };

    const animate = () => {
      if (context.current) {
        context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      }
      circles.current.forEach((circle: Circle, i: number) => {
        circle.alpha += (circle.targetAlpha - circle.alpha) * 0.02;
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        drawCircle(circle, true);

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current[i] = circleParams();
        }
      });
      rafID.current = requestAnimationFrame(animate);
    };

    rafID.current = requestAnimationFrame(animate);

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [quantity, staticity, ease, size, color, vx, vy, refresh]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
