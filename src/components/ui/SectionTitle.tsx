"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Big serif heading that slides in and "inks" from grey to full colour while scrolling. */
export function SectionTitle({ children, className = "", dark }: { children: string; className?: string; dark?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0.2, x: -30 },
      {
        opacity: 1,
        x: 0,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 60%", scrub: true },
      },
    );
  });

  return (
    <h2
      ref={ref}
      className={`font-serif text-[clamp(3.25rem,7vw,6rem)] leading-[0.95] tracking-[-0.01em] ${dark ? "text-white" : "text-ink"} ${className}`}
    >
      {children}
    </h2>
  );
}
