import { site } from "@/content/site";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

function Group({ label, items, size }: { label: string; items: string[]; size: "md" | "lg" }) {
  return (
    <div className="mt-10">
      <p className="mb-3 text-[0.65rem] uppercase tracking-[0.14em] text-muted">{label}</p>
      <Reveal className="flex flex-wrap gap-2" stagger={0.04} y={16}>
        {items.map((s) => (
          <Chip key={s} size={size}>
            {s}
          </Chip>
        ))}
      </Reveal>
    </div>
  );
}

export function Skills() {
  const { interests, building, soft } = site.skills;
  return (
    <section id="interests" className="relative z-[2] bg-bg py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle>Skills and Focus</SectionTitle>
        <Group label="Focus" items={interests} size="lg" />
        <Group label="Building" items={building} size="md" />
        <Group label="Soft skills" items={soft} size="md" />

        <p className="mb-3 mt-12 text-[0.65rem] uppercase tracking-[0.14em] text-muted">Languages</p>
        <Reveal className="grid max-w-xl grid-cols-2 border border-ink/15">
          {site.languages.map((l) => (
            <div key={l.name} className="border-ink/15 p-4 [&:not(:last-child)]:border-r">
              <p className="font-serif text-xl">{l.name}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-acc">{l.level}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
