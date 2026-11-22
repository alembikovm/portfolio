"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Motivation() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".motivation-p").forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0.2 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "top 55%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="motivation" ref={ref} className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionTitle>Approach</SectionTitle>
      <p className="mt-8 max-w-xl text-2xl font-medium leading-snug md:text-[1.7rem]">{site.motivation.lead}</p>
      <div className="mt-14 max-w-2xl space-y-5 text-[0.95rem] leading-relaxed text-ink2">
        {site.motivation.paragraphs.map((p) => (
          <p key={p} className="motivation-p">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
