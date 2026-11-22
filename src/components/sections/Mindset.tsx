"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** Dark band; z-[2] so it covers the travelling sphere as it passes. */
export function Mindset() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".mindset-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.25 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: row, start: "top 85%", end: "top 60%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="mindset" ref={ref} className="relative z-[2] bg-forest py-28 text-white md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle dark>Mindset</SectionTitle>
        <ol className="mt-10">
          {site.mindset.map((m, i) => (
            <li key={m} className="mindset-row flex gap-8 border-t border-white/12 py-5 md:gap-14">
              <span className="w-4 shrink-0 pt-1.5 font-serif text-sm text-white/50">{i + 1}</span>
              <span className="text-lg md:text-2xl">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
