import {
  siAnthropic,
  siClaude,
  siDocker,
  siExpress,
  siGitlab,
  siGreensock,
  siJest,
  siKonva,
  siMobx,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siRabbitmq,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siSocketdotio,
  siStorybook,
  siSupabase,
  siSymfony,
  siTailwindcss,
  siTestinglibrary,
  siThreedotjs,
  siTypescript,
  siVercel,
  siVitest,
  siVuedotjs,
  siWebpack,
  siZod,
  type SimpleIcon,
} from "simple-icons";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const icons: Record<string, SimpleIcon> = {
  siAnthropic, siClaude, siDocker, siExpress, siGitlab, siGreensock, siJest, siKonva, siMobx, siMongodb,
  siNestjs, siNextdotjs, siNodedotjs, siPostgresql, siRabbitmq, siReact, siReactquery, siRedis, siRedux,
  siSocketdotio, siStorybook, siSupabase, siSymfony, siTailwindcss, siTestinglibrary, siThreedotjs,
  siTypescript, siVercel, siVitest, siVuedotjs, siWebpack, siZod,
};

/** Near-black brand colours would vanish on hover, so they keep the accent instead. */
function hoverColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 60 ? "var(--color-acc)" : `#${hex}`;
}

function Tile({ name, icon }: { name: string; icon?: string }) {
  const si = icon ? icons[icon] : undefined;
  return (
    <li
      className="group flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper py-2 pl-2.5 pr-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-ink/25"
      style={si ? { ["--brand" as string]: hoverColor(si.hex) } : undefined}
    >
      {si ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-ink2 transition-colors duration-300 group-hover:fill-[var(--brand)]">
          <path d={si.path} />
        </svg>
      ) : (
        <span aria-hidden className="flex size-5 items-center justify-center rounded-md border border-ink2/60 font-mono text-[0.5rem] font-semibold text-ink2 transition-colors group-hover:border-acc group-hover:text-acc">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-sm leading-none text-ink2">{name}</span>
    </li>
  );
}

export function Toolbox() {
  return (
    <section id="toolbox" className="relative z-[2] bg-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle>Toolbox</SectionTitle>
        <p className="mt-2 max-w-lg text-ink2">What I reach for in production, grouped by where it lives.</p>
        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {site.toolbox.map((g) => (
            <div key={g.group} className="grid gap-3 py-5 md:grid-cols-[11rem_1fr] md:items-start md:gap-6">
              <p className="flex items-center gap-2 pt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {g.group}
                <span className="text-ink/30">{String(g.items.length).padStart(2, "0")}</span>
              </p>
              <Reveal as="ul" className="flex flex-wrap gap-2" stagger={0.025} y={12}>
                {g.items.map((t) => (
                  <Tile key={t.name} name={t.name} icon={"icon" in t ? t.icon : undefined} />
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
