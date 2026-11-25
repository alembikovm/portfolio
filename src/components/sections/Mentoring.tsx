import Image from "next/image";
import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

/** Mentoring: what one-on-one sessions cover, with a link to book on GetMentor. */
export function Mentoring() {
  const m = site.mentoring;
  return (
    <section id="mentoring" className="relative z-[2] bg-sage py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>Mentoring</SectionTitle>
          <a
            href={m.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 rounded-full border border-ink/20 bg-paper py-3 pl-5 pr-5 shadow-sm transition hover:border-[#ff6b35]"
          >
            <Image src="/getmentor.png" alt="GetMentor" width={130} height={26} className="h-[26px] w-auto" />
            <span className="border-l border-ink/15 pl-4 text-sm">
              <span className="block font-semibold leading-tight">Book a session</span>
              <span className="block font-mono text-[0.65rem] text-muted group-hover:text-[#ff6b35]">on getmentor.dev ↗</span>
            </span>
          </a>
        </div>
        <Reveal as="ol" stagger={0.1} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
