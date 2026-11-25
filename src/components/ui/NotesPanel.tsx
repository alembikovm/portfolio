"use client";

import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

function Lines({ items, large }: { items: string[]; large?: boolean }) {
  return items.map((t, i) => (
    <li key={t} className={`flex ${large ? "gap-5" : "gap-3"}`}>
      <span className={`${large ? "w-7" : "w-5"} shrink-0 select-none text-right text-white/30`}>{String(i + 1).padStart(2, "0")}</span>
      <span>
        <span className="text-[#9cc9a8]">→ </span>
        {t}
      </span>
    </li>
  ));
}

/**
 * Dark, code-style panel with a project's engineering notes.
 * Clicking it opens the same notes in a larger modal (native <dialog>: Esc, focus trap and inert page for free).
 */
export function NotesPanel({ items, file }: { items: string[]; file: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-graphite text-white shadow-[0_30px_60px_-35px_rgb(0_0_0/0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-35px_rgb(0_0_0/0.7)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[0.68rem] text-white/50">
          <span>{file}</span>
          {/* after:inset-0 stretches this button over the whole card */}
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Open ${file} in a larger view`}
            className="cursor-zoom-in text-[#9cc9a8] after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#9cc9a8]"
          >
            <span className="group-hover:hidden">under the hood</span>
            <span className="hidden group-hover:inline">expand ⤢</span>
          </button>
        </div>
        <Reveal as="ol" className="space-y-2.5 px-5 py-5 font-mono text-[0.8rem] leading-relaxed" stagger={0.06} y={12}>
          <Lines items={items} />
        </Reveal>
      </div>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label={file}
        // A click that lands on the dialog itself (not its content) is a click on the backdrop
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="notes-dialog m-auto w-[min(92vw,960px)] overflow-visible bg-transparent p-0 backdrop:bg-graphite/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[85vh] overflow-auto rounded-2xl bg-graphite text-white shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)]">
          <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-graphite px-7 py-4 font-mono text-sm text-white/50">
            <span>{file}</span>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:border-[#9cc9a8] hover:text-[#9cc9a8]"
            >
              Esc · close
            </button>
          </div>
          <ol className="space-y-4 px-7 py-8 font-mono text-base leading-relaxed md:text-xl">
            <Lines items={items} large />
          </ol>
        </div>
      </dialog>
    </>
  );
}
