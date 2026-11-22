"use client";

import { useEffect, useRef } from "react";

/** Drifting dot clusters on the left and right edges, drawn on a canvas. */
export function Dust({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;

    type P = { x: number; y: number; r: number; a: number; vx: number; vy: number; green: boolean };
    let dots: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const clusters = [
        { cx: w * 0.12, cy: h * 0.22 },
        { cx: w * 0.9, cy: h * 0.38 },
        { cx: w * 0.04, cy: h * 0.62 },
      ];
      dots = Array.from({ length: 220 }, (_, i) => {
        const c = clusters[i % clusters.length];
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.7) * Math.min(w, h) * 0.22;
        return {
          x: c.cx + Math.cos(ang) * dist,
          y: c.cy + Math.sin(ang) * dist,
          r: Math.random() * 1.4 + 0.6,
          a: Math.random() * 0.45 + 0.15,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          green: Math.random() < 0.18,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduce) {
          d.x += d.vx;
          d.y += d.vy;
        }
        ctx.fillStyle = d.green ? `rgba(47,90,62,${d.a + 0.2})` : `rgba(21,24,26,${d.a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none h-full w-full ${className}`} />;
}
