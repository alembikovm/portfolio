"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { METRIKA_ID } from "./metrika-config";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

function reachGoal(goal: string, params?: Record<string, string>) {
  window.ym?.(METRIKA_ID, "reachGoal", goal, params);
}

/** Maps a clicked link to a Metrika goal, or null if the link isn't one we count. */
function goalFor(href: string): string | null {
  if (href.startsWith("mailto:")) return "email_click";
  if (href.endsWith(site.cv)) return "cv_download";
  if (href.includes("t.me/")) return "telegram_click";
  if (href.includes("getmentor.dev")) return "mentoring_click";
  if (href.includes("linkedin.com")) return "linkedin_click";
  if (href.includes("github.com")) return "github_click";
  return null;
}

/**
 * Sends Metrika goals without touching each component:
 * - link clicks are classified by href (CV, email, Telegram, GetMentor, LinkedIn, GitHub);
 * - every <section id> sends `section_view` once, when it crosses the middle of the screen.
 */
export function MetrikaGoals() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const goal = goalFor(href);
      if (goal) reachGoal(goal, { href });
    };
    document.addEventListener("click", onClick, { capture: true });

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          io.unobserve(entry.target);
          reachGoal("section_view", { section: id });
          if (id === "contact") reachGoal("contact_reached");
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      io.disconnect();
    };
  }, []);

  return null;
}
