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
      className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-ink/25"
      style={si ? { ["--brand" as string]: hoverColor(si.hex) } : undefined}
    >
      {si ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-8 fill-ink2 transition-colors duration-300 group-hover:fill-[var(--brand)]">
          <path d={si.path} />
        </svg>
      ) : (
        <span aria-hidden className="flex size-8 items-center justify-center rounded-lg border border-ink2/60 font-mono text-[0.65rem] font-semibold text-ink2 transition-colors group-hover:border-acc group-hover:text-acc">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-[0.78rem] leading-tight text-ink2">{name}</span>
    </li>
  );
}

export function Toolbox() {
  return (
    <section id="toolbox" className="relative z-[2] bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle>Toolbox</SectionTitle>
        <p className="mt-2 max-w-lg text-ink2">What I reach for in production, grouped by where it lives.</p>
        {site.toolbox.map((g) => (
          <div key={g.group} className="mt-12">
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {g.group}
              <span className="h-px flex-1 bg-ink/10" />
              <span>{String(g.items.length).padStart(2, "0")}</span>
            </p>
            <Reveal as="ul" className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6" stagger={0.03} y={16}>
              {g.items.map((t) => (
                <Tile key={t.name} name={t.name} icon={"icon" in t ? t.icon : undefined} />
              ))}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
