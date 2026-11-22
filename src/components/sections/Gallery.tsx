"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";

/** Dark scatter gallery: photos and giant outline words move at different speeds. */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { yPercent: speed * 120 },
          {
            yPercent: -speed * 120,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="gallery" ref={ref} className="bg-dots-light relative z-[2] overflow-hidden bg-graphite text-white">
      <div className="relative mx-auto h-[190vh] max-w-[1400px] md:h-[210vh]">
        {site.galleryWords.map((word, i) => (
          <span
            key={word}
            data-speed={0.4 - i * 0.2}
            className="text-outline pointer-events-none absolute font-serif text-[clamp(7rem,22vw,20rem)] leading-none [--stroke:rgb(255_255_255/0.16)]"
            style={{ top: `${12 + i * 30}%`, left: `${[42, 22, 50][i]}%` }}
          >
            {word}
          </span>
        ))}

        {site.gallery.map((g) => (
          <figure
            key={g.label}
            data-speed={g.speed}
            className="absolute"
            style={{ left: `${g.x}%`, top: `${g.y + 8}%`, width: `max(${g.w}%, 160px)` }}
          >
            <Photo alt={g.label} tone={g.tone} className="aspect-[3/4] shadow-2xl" />
            <figcaption className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-white/60">{g.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
