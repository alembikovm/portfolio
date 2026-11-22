"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

/** Two-line statement; words ink in one by one as you scroll. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".statement-text", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center 45%", scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="statement"
      ref={ref}
      className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-stone-400/40 via-sage to-bg px-6 py-32"
    >
      <p className="statement-text max-w-5xl text-center font-serif text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.12]">
        {site.statement[0]}
        <br />
        <span className="text-ink2/80">{site.statement[1]}</span>
      </p>
    </section>
  );
}
