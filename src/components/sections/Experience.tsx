"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** Pinned section; vertical scroll drives a horizontal track of timeline cards. */
export function Experience() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 48;

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".exp-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });

      // Cards come into focus as they cross the middle of the screen
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 60%", scrub: true },
          },
        );
      });
    },
    { scope: section },
  );

  return (
    <section id="experience" ref={section} className="flex min-h-svh flex-col justify-center overflow-hidden py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionTitle>Experience</SectionTitle>
      </div>

      <div ref={track} className="mt-10 flex w-max gap-4 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-6 will-change-transform">
        {site.experience.map((e) => (
          <article key={`${e.org}-${e.title}`}className="exp-card relative w-[min(80vw,340px)] shrink-0 bg-white p-6 pb-10 shadow-[0_1px_0_rgb(0_0_0/0.04)]">
            <span className="absolute -top-1.5 left-6 h-3 w-3 rounded-full bg-acc" />
            <p className="font-serif text-lg text-acc">{e.when}</p>
            <h3 className="mt-1 font-serif text-2xl leading-tight">{e.title}</h3>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.1em] text-muted">{e.org}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink2">{e.body}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-3 px-6">
        <div className="relative h-px flex-1 bg-ink/15">
          <div className="exp-progress absolute inset-0 origin-left scale-x-0 bg-acc" />
        </div>
        <span className="text-acc">→</span>
      </div>
    </section>
  );
}
