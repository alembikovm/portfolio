"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";

const R = 88;
const C = 2 * Math.PI * R;
const GAP = 7;

/** Donut segments proportional to solved counts, with a small gap between them. */
function useArcs() {
  const { solved } = site.leetcode;
  const total = solved.reduce((n, s) => n + s.count, 0);
  let offset = 0;
  const arcs = solved.map((s) => {
    const len = Math.max((s.count / total) * C - GAP, 3);
    const arc = { ...s, len, offset };
    offset += len + GAP;
    return arc;
  });
  return { arcs, total };
}

export function LeetCode() {
  const root = useRef<HTMLElement>(null);
  const lc = site.leetcode;
  const { arcs, total } = useArcs();
  const maxTopic = Math.max(...lc.topics.map((t) => t.count));
  const maxLang = Math.max(...lc.languages.map((l) => l.count));

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
      });

      gsap.utils.toArray<SVGCircleElement>(".lc-arc").forEach((el, i) => {
        const len = Number(el.dataset.len);
        tl.fromTo(el, { attr: { "stroke-dasharray": `0 ${C}` } }, { attr: { "stroke-dasharray": `${len} ${C}` }, duration: 1.1 }, i * 0.18);
      });

      gsap.utils.toArray<HTMLElement>(".lc-count").forEach((el) => {
        const counter = { v: 0 };
        tl.to(counter, { v: Number(el.dataset.to), duration: 1.4, snap: { v: 1 }, onUpdate: () => (el.textContent = String(counter.v)) }, 0);
      });

      tl.fromTo(".lc-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.04 }, 0.2).fromTo(
        ".lc-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        0,
      );
    },
    { scope: root },
  );

  return (
    <section id="leetcode" ref={root} className="relative z-[2] overflow-hidden bg-graphite py-24 text-white md:py-32">
      {/* Faint giant numerals in the background */}
      <span aria-hidden className="text-outline pointer-events-none absolute -right-8 -top-10 select-none font-serif text-[16rem] leading-none [--stroke:rgb(255_255_255/0.06)] md:text-[24rem]">
        {total}
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle dark>LeetCode</SectionTitle>
            <p className="mt-2 max-w-lg text-white/65">
              Keeping the algorithm muscle warm between product work. Mostly JavaScript, mostly arrays, trees and hash maps.
            </p>
          </div>
          <a
            href={lc.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 px-5 py-2.5 font-mono text-sm text-white/85 transition hover:border-[#e0a526] hover:text-[#e0a526]"
          >
            leetcode.com/u/{lc.handle} ↗
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Solved donut */}
          <div className="lc-fade flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="relative mx-auto size-60">
              <svg viewBox="0 0 220 220" className="size-full -rotate-90">
                <circle cx="110" cy="110" r={R} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="12" />
                {arcs.map((a) => (
                  <circle
                    key={a.level}
                    className="lc-arc"
                    data-len={a.len}
                    cx="110"
                    cy="110"
                    r={R}
                    fill="none"
                    stroke={a.color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${a.len} ${C}`}
                    strokeDashoffset={-a.offset}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="lc-count font-serif text-7xl leading-none" data-to={total}>
                  {total}
                </span>
                <span className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/50">problems solved</span>
              </div>
            </div>

            <p className="mt-auto pt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/40">Solved of all problems</p>
            <ul className="mt-3 space-y-4">
              {lc.solved.map((s) => (
                <li key={s.level}>
                  <div className="flex items-baseline justify-between font-mono text-sm">
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ background: s.color }} />
                      {s.level}
                    </span>
                    <span>
                      <span className="lc-count text-white" data-to={s.count}>
                        {s.count}
                      </span>
                      <span className="text-white/35"> / {s.total}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="lc-bar h-full origin-left rounded-full"
                      style={{ width: `${Math.max((s.count / s.total) * 100, 1)}%`, background: s.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: lc.languages[0].count, k: `in ${lc.languages[0].name}` },
                { v: lc.activeDays, k: "active days" },
                { v: lc.since, k: "solving since", plain: true },
              ].map((s) => (
                <div key={s.k} className="lc-fade rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-serif text-4xl leading-none text-[#9cc9a8] md:text-5xl">
                    {s.plain ? s.v : <span className="lc-count" data-to={s.v}>{s.v}</span>}
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50">{s.k}</p>
                </div>
              ))}
            </div>

            {/* Topics */}
            <div className="lc-fade flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="mb-5 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
                Top topics
                <span className="h-px flex-1 bg-white/10" />
              </p>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {lc.topics.map((t) => (
                  <li key={t.name} className="font-mono text-[0.78rem]">
                    <div className="flex justify-between text-white/80">
                      <span>{t.name}</span>
                      <span className="text-white/45">{t.count}</span>
                    </div>
                    <div className="mt-1 h-[3px] rounded-full bg-white/[0.06]">
                      <div className="lc-bar h-full origin-left rounded-full bg-[#9cc9a8]" style={{ width: `${(t.count / maxTopic) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mb-4 mt-8 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
                Languages
                <span className="h-px flex-1 bg-white/10" />
              </p>
              <ul className="space-y-2.5">
                {lc.languages.map((l) => (
                  <li key={l.name} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 font-mono text-[0.78rem] text-white/80">
                    <span>{l.name}</span>
                    <div className="h-2 rounded-full bg-white/[0.06]">
                      <div className="lc-bar h-full origin-left rounded-full bg-[#e0a526]" style={{ width: `${Math.max((l.count / maxLang) * 100, 1.5)}%` }} />
                    </div>
                    <span className="text-right text-white/45">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/30">Snapshot · {lc.asOf}</p>
      </div>
    </section>
  );
}
