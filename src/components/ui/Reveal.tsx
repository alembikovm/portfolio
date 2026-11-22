"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Fade-and-rise on first scroll into view. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  stagger,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, animates direct children one after another instead of the wrapper. */
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      // fromTo, not from: with StrictMode's double effect run, from() can capture the
      // hidden state as its end values and leave elements invisible.
      gsap.fromTo(targets, { opacity: 0, y }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
