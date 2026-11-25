import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

/** Mentoring offer: what sessions cover, with a link to book on GetMentor. */
export function Mentoring() {
  const m = site.mentoring;
  return (
    <section id="mentoring" className="relative z-[2] bg-sage py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.15fr] md:gap-16">
        <div>
          <SectionTitle>Mentoring</SectionTitle>
          <p className="mt-6 max-w-md text-xl font-medium leading-snug">{m.lead}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {m.tags.map((t) => (
              <span key={t} className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink2">
                {t}
              </span>
            ))}
          </div>

          <ul className="mt-8 space-y-2 text-[0.92rem] text-ink2">
            {m.background.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-acc" />
                {b}
              </li>
            ))}
          </ul>

          <a
            href={m.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-acc py-3 pl-6 pr-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Book a session on {m.platform}
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <Reveal as="ol" stagger={0.1} className="grid gap-4 sm:grid-cols-2">
          {m.topics.map((t, i) => (
            <li key={t.title} className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_20px_40px_-30px_rgb(0_0_0/0.35)]">
              <span className="font-mono text-xs text-acc">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{t.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink2">{t.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
