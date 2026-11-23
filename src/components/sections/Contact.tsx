"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".connect-title", { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
      });
      gsap.from(".connect-links > *", {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        delay: 0.4,
        scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  const link = "border-b-2 border-acc pb-0.5 text-lg hover:text-acc";

  return (
    <>
      <section id="contact" ref={ref} className="relative z-[2] flex min-h-[55vh] items-end bg-bg pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="connect-title font-serif text-[clamp(3.5rem,10vw,7.5rem)] uppercase leading-[0.9]">Let’s connect</h2>
          <div className="connect-links mt-8 flex flex-wrap gap-8">
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={link}>
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={link}>
              GitHub
            </a>
            <a href={site.cv} download className={link}>
              Download CV
            </a>
          </div>
        </div>
      </section>
      <footer className="relative z-[2] border-t border-ink/10 bg-bg py-8 text-center text-xs text-muted">
        © {site.year} {site.name.first} {site.name.last} · {site.city}
      </footer>
    </>
  );
}
