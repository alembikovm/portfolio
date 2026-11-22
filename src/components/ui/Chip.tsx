import type { ReactNode } from "react";

const tones = {
  default: "border-ink/25 text-ink2",
  building: "border-ochre/60 text-ochre",
  live: "border-acc/60 text-acc",
  award: "border-acc/60 text-acc",
  dark: "border-white/25 text-white/80",
} as const;

export function Chip({
  children,
  tone = "default",
  size = "sm",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.08em]",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 font-serif text-lg md:text-xl",
  };
  return (
    <span className={`inline-flex items-center rounded-full border ${tones[tone]} ${sizes[size]} ${size === "lg" ? "border-ink/70" : ""}`}>
      {children}
    </span>
  );
}
