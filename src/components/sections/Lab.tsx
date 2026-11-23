"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, type LabProject } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

function LabCard({ p, i }: { p: LabProject; i: number }) {
  return (
    <article className="lab-card group flex w-[min(84vw,420px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-40px_rgb(0_0_0/0.4)]">
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.tone}`}>
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="420px"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center p-6 text-center font-serif text-4xl italic text-white/80">
            {p.title}
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[0.6rem] text-ink2 backdrop-blur">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-acc">{p.context ?? "Side project"}</p>
        <h3 className="mt-1.5 font-serif text-[1.7rem] leading-tight">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink2">{p.blurb}</p>
        <ul className="mt-3 space-y-1 font-mono text-[0.72rem] leading-relaxed text-ink2">
          {p.points.map((t) => (
            <li key={t}>
              <span className="text-acc">→ </span>
              {t}
            </li>
          ))}
        </ul>
        {p.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md bg-ink/[0.06] px-2 py-0.5 font-mono text-[0.66rem] text-ink2">
                {s}
              </span>
            ))}
          </div>
        )}
        {p.links.length > 0 && (
          <div className="mt-auto flex gap-4 pt-5 text-sm font-semibold">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="border-b border-ink/30 pb-0.5 hover:border-acc hover:text-acc">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** Side projects and earlier client work: pinned, vertical scroll drives a horizontal track (like Experience). */
export function Lab() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const distance = () => Math.max(track.current!.scrollWidth - window.innerWidth + 48, 0);

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

      gsap.to(".lab-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".lab-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 80%", scrub: true },
          },
        );
      });
    },
    { scope: section },
  );

  return (
    <section id="lab" ref={section} className="relative z-[2] flex min-h-svh flex-col justify-center overflow-hidden bg-sage py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <SectionTitle>Lab</SectionTitle>
          <p className="mt-2 max-w-lg text-ink2">Side projects, open source and earlier client work.</p>
        </div>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/30 px-5 py-2.5 font-mono text-sm hover:border-acc hover:text-acc"
        >
          github.com/alembikovm ↗
        </a>
      </div>

      <div ref={track} className="mt-10 flex w-max items-stretch gap-5 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-6 will-change-transform">
        {site.lab.map((p, i) => (
          <LabCard key={p.title} p={p} i={i} />
        ))}
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl items-center gap-3 px-6">
        <div className="relative h-px flex-1 bg-ink/15">
          <div className="lab-progress absolute inset-0 origin-left scale-x-0 bg-acc" />
        </div>
        <span className="font-mono text-xs text-muted">{String(site.lab.length).padStart(2, "0")} projects</span>
      </div>
    </section>
  );
}
