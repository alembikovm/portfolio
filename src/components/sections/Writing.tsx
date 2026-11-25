"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, type Article } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * Scatter positions for the article covers (desktop), in % of the stage.
 * Index 0 is the latest article and gets the biggest frame.
 */
const spots = [
  { x: 36, y: 10, w: 28, rot: -1.5, speed: 0.05 },
  { x: 0, y: 0, w: 17, rot: 3, speed: 0.18 },
  { x: 18, y: 8, w: 17, rot: -3, speed: -0.12 },
  { x: 65, y: 4, w: 17, rot: 4, speed: 0.15 },
  { x: 83, y: 0, w: 17, rot: -2, speed: -0.1 },
  { x: 1, y: 52, w: 17, rot: -4, speed: -0.15 },
  { x: 19, y: 60, w: 17, rot: 2, speed: 0.12 },
  { x: 64, y: 58, w: 17, rot: -3, speed: 0.16 },
  { x: 83, y: 50, w: 17, rot: 3, speed: -0.12 },
  { x: 36, y: 76, w: 14, rot: 2, speed: 0.1 },
  { x: 51, y: 78, w: 14, rot: -2, speed: -0.08 },
];

/** LinkedIn mark drawn by hand (simple-icons no longer ships it). */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <circle cx="7.1" cy="7.2" r="1.6" fill="#fff" />
      <rect x="5.7" y="9.6" width="2.8" height="8.6" rx="0.4" fill="#fff" />
      <path
        d="M10.6 9.6h2.7v1.2c.5-.8 1.5-1.4 2.9-1.4 2.3 0 3.4 1.4 3.4 4v4.8h-2.8v-4.3c0-1.3-.5-2-1.6-2-1.2 0-1.8.8-1.8 2.1v4.2h-2.8z"
        fill="#fff"
      />
    </svg>
  );
}

function Cover({ a, i }: { a: Article; i: number }) {
  const s = spots[i % spots.length];
  const featured = i === 0;
  return (
    <figure
      data-speed={s.speed}
      className="relative md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)]"
      style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--w": `${s.w}%` } as CSSProperties}
    >
      <a
        href={a.href}
        target="_blank"
        rel="noreferrer"
        className="group block transition-transform duration-500 ease-out md:rotate-[var(--rot)] md:hover:-translate-y-2 md:hover:rotate-0"
        style={{ "--rot": `${s.rot}deg` } as CSSProperties}
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border-[3px] border-white bg-white shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)]">
          <Image
            src={a.cover}
            alt=""
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 30vw" : "(max-width: 768px) 50vw, 20vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          {featured && (
            <span className="absolute left-3 top-3 rounded-full bg-acc px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white">
              Latest
            </span>
          )}
          <LinkedInIcon className="absolute bottom-2.5 right-2.5 size-5 opacity-0 shadow-md transition duration-300 group-hover:opacity-100" />
        </div>
        <figcaption className="mt-2 px-0.5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
            <span className="text-acc">{a.tag}</span> · {a.date}{featured ? ` · ${a.read}` : ""}
          </p>
          <p className={`mt-1 font-serif leading-tight transition-colors group-hover:text-acc ${featured ? "text-2xl" : "line-clamp-2 text-[0.95rem]"}`}>
            {a.title}
          </p>
        </figcaption>
      </a>
    </figure>
  );
}

/** LinkedIn articles as a one-screen scatter of covers that drift at different speeds. */
export function Writing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Parallax only where the scatter layout is used
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(
            el,
            { yPercent: speed * 100 },
            {
              yPercent: -speed * 100,
              ease: "none",
              scrollTrigger: { trigger: ".w-stage", start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="writing" ref={root} className="bg-dots relative z-[2] overflow-hidden bg-bg py-20 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle>Writing</SectionTitle>
            <p className="mt-2 max-w-lg text-ink2">Notes on frontend architecture, performance, security and AI, published on LinkedIn.</p>
          </div>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-ink/20 bg-paper py-2 pl-2 pr-5 shadow-sm transition hover:border-[#0A66C2]"
          >
            <LinkedInIcon className="size-9 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="text-sm">
              <span className="block font-semibold leading-tight">{site.articles.length} articles</span>
              <span className="block font-mono text-[0.65rem] text-muted group-hover:text-[#0A66C2]">on LinkedIn ↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Background outline words drifting behind the covers */}
      <div className="w-stage relative mx-auto mt-10 grid max-w-[1400px] grid-cols-2 gap-x-4 gap-y-8 px-6 md:block md:h-[max(84vh,700px)] md:px-8">
        {["Notes", "Ideas"].map((word, i) => (
          <span
            key={word}
            data-speed={0.15 - i * 0.3}
            aria-hidden
            className="text-outline pointer-events-none absolute hidden font-serif text-[clamp(6rem,14vw,13rem)] leading-none [--stroke:rgb(21_24_26/0.08)] md:block"
            style={{ top: `${[2, 46][i]}%`, left: `${[30, 52][i]}%` }}
          >
            {word}
          </span>
        ))}
        {site.articles.map((a, i) => (
          <div key={a.href} className={i === 0 ? "col-span-2" : ""}>
            <Cover a={a} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
