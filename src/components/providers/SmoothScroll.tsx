"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -70 } });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Pinned sections store absolute scroll offsets. If anything above them changes height
  // after the last refresh (late images, fonts, hot reload), re-measure every trigger.
  useEffect(() => {
    let last = document.body.scrollHeight;
    let timer: number | undefined;
    const onRefresh = () => (last = document.body.scrollHeight);
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Math.abs(document.body.scrollHeight - last) > 2) ScrollTrigger.refresh();
      }, 200);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, []);

  return <>{children}</>;
}
