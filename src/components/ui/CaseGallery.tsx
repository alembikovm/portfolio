"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ProjectMedia } from "@/content/site";

/**
 * Screenshot in a browser-window frame. The frame wipes open on scroll;
 * extra shots become thumbnails that swap the main one.
 */
export function CaseGallery({ media, label }: { media: ProjectMedia[]; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = media[active];

  useGSAP(
    () => {
      gsap.fromTo(
        ".case-frame",
        { clipPath: "inset(8% 8% 8% 8% round 18px)", scale: 0.94 },
        {
          clipPath: "inset(0% 0% 0% 0% round 14px)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 35%", scrub: 0.6 },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="case-frame overflow-hidden rounded-[14px] border border-ink/10 bg-paper shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] will-change-[clip-path]">
        <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#e5786d]" />
          <span className="size-2.5 rounded-full bg-[#e9c46a]" />
          <span className="size-2.5 rounded-full bg-[#7fb77e]" />
          <span className="ml-3 truncate rounded-full bg-ink/5 px-3 py-0.5 font-mono text-[0.65rem] text-muted">{label}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0">
            {media.map((m, i) => (
              <Image
                key={m.src}
                src={m.src}
                alt={m.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-cover object-left-top transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <p className="font-serif text-sm italic text-ink2">{current.caption}</p>
        {media.length > 1 && (
          <div className="flex shrink-0 gap-2">
            {media.map((m, i) => (
              <button
                key={m.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show screenshot ${i + 1}: ${m.caption}`}
                aria-pressed={i === active}
                className={`relative h-10 w-16 overflow-hidden rounded-md border transition ${
                  i === active ? "border-acc ring-2 ring-acc/30" : "border-ink/15 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={m.src} alt="" fill sizes="64px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
