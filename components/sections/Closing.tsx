"use client";

import { useLang } from "@/lib/LanguageProvider";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";

export function Closing() {
  const { pick, t, dir } = useLang();
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, rgba(255,245,210,0.6) 0%, rgba(255,245,210,0) 60%), linear-gradient(180deg, #FBF8F1 0%, #EFE6D2 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-32 sm:py-40 text-center grid place-items-center min-h-[80svh]">
        <ScrollReveal>
          <FiligreeDivider width={180} className="mx-auto" />
          <p
            className={
              dir === "rtl"
                ? "font-arabicBody tracking-[0.3em] text-[12px] text-taupe mt-6"
                : "font-display tracking-[0.5em] uppercase text-[11px] text-taupe mt-6"
            }
          >
            {pick(t.closing.line)}
          </p>
          <h2
            className={
              dir === "rtl"
                ? "font-arabicDisplay text-5xl sm:text-7xl text-charcoal mt-4 leading-tight gold-foil"
                : "font-script text-6xl sm:text-8xl leading-none mt-4 gold-foil"
            }
          >
            {pick(t.closing.couple)}
          </h2>
          <FiligreeDivider width={180} className="mt-8 mx-auto" />
          <p
            className={
              dir === "rtl"
                ? "font-arabicBody mt-6 text-charcoal/75"
                : "font-display italic mt-6 text-charcoal/75 text-lg"
            }
          >
            {pick(t.meta.weddingDate)} · {pick(t.meta.venueShort)}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
