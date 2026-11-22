"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";

const tones = [
  "from-stone-700 to-amber-200",
  "from-rose-300 to-stone-700",
  "from-emerald-900 to-stone-300",
  "from-stone-100 to-stone-500",
  "from-sky-200 to-indigo-900",
  "from-stone-400 to-stone-800",
  "from-zinc-200 to-zinc-900",
];

/** A hand of photo cards that fans out when the section scrolls into view. */
export function Socials() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".fan-card");
      const mid = (cards.length - 1) / 2;
      const spread = () => Math.min(window.innerWidth / 11, 92);

      gsap.fromTo(
        cards,
        { x: 0, y: 40, rotation: 0, opacity: 0 },
        {
          x: (i) => (i - mid) * spread(),
          y: (i) => Math.abs(i - mid) ** 1.6 * 10,
          rotation: (i) => (i - mid) * 7,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: { each: 0.05, from: "center" },
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section id="socials" ref={ref} className="relative z-[2] bg-bg py-28 text-center md:py-36">
      <SectionTitle className="mx-auto w-fit">What’s Up</SectionTitle>
      <p className="mt-2 text-sm uppercase tracking-[0.4em] text-ink2">On the socials</p>

      <div className="relative mx-auto mt-12 h-[300px] max-w-3xl">
        {tones.map((tone, i) => {
          const center = i === (tones.length - 1) / 2;
          return (
            <div
              key={i}
              className="fan-card absolute left-1/2 top-0 -ml-[70px] transition-[translate] duration-300 hover:-translate-y-4"
              style={{ zIndex: 10 - Math.abs(i - 3) }}
            >
              <Photo
                alt="Social photo"
                tone={tone}
                className={`rounded-xl border-2 border-white shadow-xl ${center ? "h-[210px] w-[150px] -ml-[5px]" : "h-[170px] w-[140px] mt-6"}`}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-ink2">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} className="group">
            {s.label} <span className="border-b border-ink/30 pb-0.5 group-hover:border-acc group-hover:text-acc">{s.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
