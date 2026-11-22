import { site } from "@/content/site";

/** Tilted green marquee band between hero and statement. */
export function Ribbon() {
  const items = [...site.ribbon, ...site.ribbon, ...site.ribbon];
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6" aria-hidden>
      <div className="-rotate-2 scale-105 bg-acc py-2.5 text-bg">
        <div className="animate-marquee flex w-max whitespace-nowrap font-serif text-lg">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {items.map((t, i) => (
                <span key={i} className="px-3">
                  {t} <span className="pl-3 opacity-70">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
