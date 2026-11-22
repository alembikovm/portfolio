import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Highlights() {
  return (
    <section id="highlights" className="relative z-[2] bg-sage py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle>Impact</SectionTitle>
        <Reveal className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {site.highlights.map((h) => (
            <article key={h.title} className="group border border-ink/10 bg-bg p-6 transition-colors duration-300 hover:border-acc/40">
              <p className="font-serif text-[clamp(3rem,5vw,4.25rem)] leading-none text-acc">{h.value}</p>
              <h3 className="mt-3 font-serif text-xl leading-snug">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink2">{h.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
