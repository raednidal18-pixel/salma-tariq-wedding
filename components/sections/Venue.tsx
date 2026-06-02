"use client";

import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { MapBox } from "../MapBox";
import { FiligreeDivider } from "../Filigree";

export function Venue() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="venue" tint="champagne">
      <SectionHeading heading={t.venue.heading} />

      <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
        <ScrollReveal>
          <div>
            <h3
              className={
                dir === "rtl"
                  ? "font-arabicDisplay text-3xl text-charcoal"
                  : "font-display text-3xl text-charcoal italic"
              }
              style={{ color: "var(--gold-deep)" }}
            >
              {pick(t.venue.name)}
            </h3>
            <FiligreeDivider width={120} className="my-4" />
            <p
              className={
                dir === "rtl"
                  ? "font-arabicBody text-charcoal/85"
                  : "font-display text-charcoal/85 text-lg"
              }
            >
              {pick(t.venue.address)}
            </p>
            <p
              className={
                dir === "rtl"
                  ? "font-arabicBody text-charcoal/65 mt-5 leading-relaxed"
                  : "font-display italic text-charcoal/65 mt-5 leading-relaxed"
              }
            >
              {pick(t.venue.directions)}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <MapBox />
        </ScrollReveal>
      </div>
    </Section>
  );
}
