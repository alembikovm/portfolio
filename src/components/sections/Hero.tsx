"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Dust } from "@/components/ui/Dust";

const REPEAT = 8;

/** The portrait card at the top of the page, and where scrolling shrinks it to. */
const CARD_START = "inset(13% 26% 13% 26% round 28px)";
const CARD_END = "inset(15% 32% 17% 32% round 28px)";
/** Phones: a wider, shorter card, so the portrait is not a thin strip. */
const CARD_START_SM = "inset(20% 7% 22% 7% round 24px)";
const CARD_END_SM = "inset(22% 13% 26% 13% round 24px)";
/** Matches Tailwind's `md` breakpoint. */
const DESKTOP = "(min-width: 768px)";

function NameRow({ className, invert }: { className: string; invert?: boolean }) {
  const { first, last } = site.name;
  return (
    <div className={`flex whitespace-nowrap font-serif text-[clamp(4rem,11vw,9rem)] leading-[0.95] ${className}`}>
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="pr-[0.25em]">
          <span className={invert ? "text-outline-ink" : ""}>{first}</span>{" "}
          <span className={invert ? "" : "text-outline-ink"}>{last}</span>
          <span className="pl-[0.25em]">·</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Pinned hero (CSS sticky inside a 320vh section). The portrait starts as a large
 * rounded card; scroll scrubs one timeline: the card shrinks, name rows slide in
 * opposite directions and a handwritten signature writes itself over the photo.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: DESKTOP, mobile: `not ${DESKTOP}` }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });

        tl.fromTo(
          ".hero-photo",
          { clipPath: desktop ? CARD_START : CARD_START_SM },
          { clipPath: desktop ? CARD_END : CARD_END_SM, duration: 1 },
          0,
        )
          // Phones: shift the portrait down so the head clears the card's top edge
          .fromTo(
            ".hero-photo-inner",
            { scale: desktop ? 0.8 : 1, y: 0, yPercent: desktop ? 0 : 12 },
            { scale: desktop ? 0.7 : 0.9, yPercent: desktop ? 0 : 12, duration: 1 },
            0,
          )
            .fromTo(".hero-row-a", { xPercent: 0 }, { xPercent: -18, duration: 1.4 }, 0)
          .fromTo(".hero-row-b", { xPercent: -24 }, { xPercent: -6, duration: 1.4 }, 0)
          .fromTo(".hero-sign", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, 0.55)
          .to(".hero-hint", { opacity: 0, duration: 0.1 }, 0)
          .to({}, { duration: 0.15 }); // hold the final frame a moment before release
      });
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative h-[320vh]">
      <div className="hero-stage group/hero bg-dots sticky top-0 h-svh overflow-hidden">
        {/* Name rows sit behind the photo */}
        <div className="hero-names absolute inset-x-0 top-1/2 z-10 -translate-y-1/2">
          <NameRow className="hero-row-a" />
          <NameRow className="hero-row-b" invert />
        </div>

        <Dust className="absolute inset-0 z-[15]" />

        {/* Portrait, clipped to a rounded card in the middle of the stage */}
        <div className="hero-photo absolute inset-0 z-20 [clip-path:inset(20%_7%_22%_7%_round_24px)] md:[clip-path:inset(13%_26%_13%_26%_round_28px)]">
          <div className="hero-photo-inner absolute inset-0 [transform:translateY(12%)] md:[transform:scale(0.8)]">
            <Photo src={site.portrait} alt={`${site.name.first} ${site.name.last}`} tone="from-stone-200 via-stone-500 to-stone-900" focus={site.portraitFocus} sizes="100vw" priority className="h-full w-full" />
            {!site.portrait && (
              <span className="absolute inset-x-0 bottom-[22%] text-center text-xs uppercase tracking-[0.3em] text-white/70">Your portrait</span>
            )}
          </div>
        </div>

        {/* Signature drawn over the photo */}
        <div
          className="hero-sign pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          <span className="-rotate-6 font-script text-[clamp(3.5rem,12vw,11rem)] leading-none text-white [text-shadow:0_2px_14px_rgb(0_0_0/0.35)]">
            {site.name.first} {site.name.last}
          </span>
        </div>

        {/* Floating chrome */}
        <p className="absolute left-1/2 top-[4.5rem] z-40 w-max max-w-[92vw] -translate-x-1/2 rounded-full border border-ink/15 bg-bg/40 px-4 py-1.5 text-center text-[0.7rem] leading-snug text-ink2 backdrop-blur-md md:text-sm">
          {site.status}
        </p>

        <div className="absolute left-[8%] top-[24%] z-40 hidden md:block">
          <div className="animate-floaty -rotate-6 rounded-full bg-acc px-4 py-2 font-serif text-sm tracking-[0.06em] text-white shadow-lg">
            {site.role}
          </div>
        </div>

        {/* Fact chips: fade in while hovering the hero */}
        {site.heroFacts.map((f, i) => (
          <div
            key={f.title}
            className="pointer-events-none absolute z-40 hidden scale-90 opacity-0 transition-all duration-500 ease-out group-hover/hero:scale-100 group-hover/hero:opacity-100 md:block"
            style={{ left: `${f.x}%`, top: `${f.y}%`, transitionDelay: `${i * 60}ms` }}
          >
            <div
              className={`animate-floaty rounded-xl px-3 py-1.5 font-serif shadow-lg ${
                f.outline ? "rounded-full border border-ink/40 bg-bg/30 text-sm text-ink2 backdrop-blur-sm" : "bg-white text-ink"
              }`}
              style={{ rotate: `${f.rotate}deg`, animationDelay: `${i * -1.7}s` }}
            >
              <span className={f.outline ? "" : "text-base"}>{f.title}</span>
              {f.sub && <span className="block text-[0.65rem] text-muted">{f.sub}</span>}
            </div>
          </div>
        ))}

        <div className="absolute bottom-[7%] left-1/2 z-40 flex -translate-x-1/2 gap-1.5 rounded-full border border-ink/10 bg-bg/40 p-1.5 backdrop-blur-md">
          <a href={site.cv} download className="whitespace-nowrap rounded-full bg-acc px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 md:px-5">
            Download CV
          </a>
          <a href={`mailto:${site.email}`} className="whitespace-nowrap rounded-full border border-ink/30 px-4 py-2.5 text-sm font-semibold hover:text-acc md:px-5">
            Email me
          </a>
        </div>

        <span className="hero-hint absolute bottom-[2.5%] left-1/2 z-40 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-muted">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}
