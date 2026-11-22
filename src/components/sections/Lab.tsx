import Image from "next/image";
import { site, type LabProject } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

function LabCard({ p }: { p: LabProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.tone}`}>
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center p-6 text-center font-serif text-4xl italic text-white/80">
            {p.title}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-3xl">{p.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink2">{p.blurb}</p>
        <ul className="mt-4 space-y-1.5 font-mono text-[0.74rem] leading-relaxed text-ink2">
          {p.points.map((t) => (
            <li key={t}>
              <span className="text-acc">→ </span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md bg-ink/[0.06] px-2 py-0.5 font-mono text-[0.68rem] text-ink2">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-4 pt-6 text-sm font-semibold">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="border-b border-ink/30 pb-0.5 hover:border-acc hover:text-acc">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Open-source and side projects from GitHub. */
export function Lab() {
  return (
    <section id="lab" className="relative z-[2] mt-12 bg-sage py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle>Lab</SectionTitle>
            <p className="mt-2 max-w-lg text-ink2">Side projects and open source, where I try architecture ideas before they reach client work.</p>
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
        <Reveal className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.1}>
          {site.lab.map((p) => (
            <LabCard key={p.title} p={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
