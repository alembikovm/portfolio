"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

const glass = "border border-ink/15 bg-bg/60 backdrop-blur-md";

export function Header() {
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    // Scroll progress line under the header
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    // Header CTAs appear once the hero is done
    ScrollTrigger.create({
      trigger: "#home",
      start: "bottom 85%",
      refreshPriority: -1,
      onEnter: () => setPastHero(true),
      onLeaveBack: () => setPastHero(false),
    });

    // Active nav pill
    site.nav.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        refreshPriority: -1, // created before the Experience pin; measure after it
        onToggle: (self) => self.isActive && setActive(id),
        onLeaveBack: () => id === site.nav[0].id && setActive(null),
      });
    });
  });

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        <a href="#home" className={`pointer-events-auto rounded-full px-3 py-1.5 font-serif text-lg tracking-[0.08em] text-acc ${glass}`}>
          {site.initials}
        </a>

        <nav className={`pointer-events-auto ml-auto hidden items-center gap-0.5 rounded-full p-1 lg:flex ${glass}`}>
          {site.nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.06em] transition-colors duration-300 ${
                active === id ? "bg-ink/10 text-ink shadow-[inset_0_0_0_1px_rgb(21_24_26/0.15)]" : "text-ink2 hover:text-acc"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div
          className={`pointer-events-auto hidden items-center gap-2 transition-all duration-500 md:flex ${
            pastHero ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <a href={site.cv} download className="rounded-full bg-acc px-4 py-2 text-xs font-semibold text-white hover:brightness-110">
            Download CV
          </a>
          <a href={`mailto:${site.email}`} className={`rounded-full px-4 py-2 text-xs font-semibold ${glass} hover:text-acc`}>
            Email
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`pointer-events-auto ml-auto rounded-full px-4 py-2 font-serif text-sm tracking-[0.08em] lg:hidden ${glass}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className={`pointer-events-auto mx-4 flex flex-col rounded-3xl p-3 lg:hidden ${glass}`}>
          {site.nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-full px-4 py-2 font-serif text-2xl">
              {label}
            </a>
          ))}
        </nav>
      )}

      <div ref={bar} className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-acc" />
    </header>
  );
}
