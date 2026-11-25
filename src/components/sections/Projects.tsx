import { site, type Project } from "@/content/site";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CaseGallery } from "@/components/ui/CaseGallery";
import { NotesPanel } from "@/components/ui/NotesPanel";

const statCols: Record<number, string> = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

function Meta({ p }: { p: Project }) {
  const rows = [
    ["Role", p.role],
    ["Period", p.period],
    ...(p.team ? [["Team", p.team]] : []),
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">{k}</dt>
          <dd className="text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStudy({ p, i }: { p: Project; i: number }) {
  const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <article className="border-t border-ink/10 py-20 md:py-28">
      {/* Header: number, title and meta */}
      <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end" stagger={0.08}>
        <div>
          <p className="flex items-center gap-4">
            <span className="text-outline font-serif text-6xl leading-none [--stroke:var(--color-acc)] md:text-7xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Chip tone={p.status.tone}>{p.status.label}</Chip>
          </p>
          <h3 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">{p.title}</h3>
          <p className="mt-2 font-serif text-xl italic text-muted md:text-2xl">{p.subtitle}</p>
        </div>
        <Meta p={p} />
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      {/* Screens */}
      <div className="mt-10">
        <CaseGallery media={p.media} label={`${slug} · ${p.media.length > 1 ? `${p.media.length} screens` : "screen"}`} />
      </div>

      {/* Story: challenge → what I built → engineering */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-acc">The challenge</p>
            <p className="mt-3 font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">{p.challenge}</p>
          </Reveal>

          <p className="mt-10 text-[0.65rem] uppercase tracking-[0.14em] text-acc">What I built</p>
          <Reveal as="ul" className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-ink2" stagger={0.07} y={16}>
            {p.built.map((b) => (
              <li key={b.label} className="border-l-2 border-acc/50 pl-3">
                <span className="font-semibold text-ink">{b.label}</span> — {b.text}
              </li>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <NotesPanel items={p.engineering} file={`${slug}/NOTES.md`} />

          {p.stats && (
            <Reveal
              as="dl"
              className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 ${statCols[p.stats.length] ?? "sm:grid-cols-4"}`}
              stagger={0.06}
              y={16}
            >
              {p.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-bg px-4 py-4">
                  <dt className="mt-1.5 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{s.label}</dt>
                  <dd className="font-serif text-3xl leading-none text-acc md:text-4xl">{s.value}</dd>
                </div>
              ))}
            </Reveal>
          )}

          {p.links && (
            <div className="flex flex-wrap gap-2">
              {p.links.map((l, k) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    k === 0 ? "bg-acc text-white hover:brightness-110" : "border border-ink/30 hover:border-acc hover:text-acc"
                  }`}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
          {p.note && <p className="text-xs uppercase tracking-[0.08em] text-muted">{p.note}</p>}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pt-24">
      <SectionTitle className="mb-4">Case Studies</SectionTitle>
      <p className="mb-6 max-w-xl text-ink2">Four products, from a 4M-user video platform to a factory planning board: the problem, what I built and how it works inside.</p>
      {site.projects.map((p, i) => (
        <CaseStudy key={p.title} p={p} i={i} />
      ))}
    </section>
  );
}
