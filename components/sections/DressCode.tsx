"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";
import { ASSETS } from "@/lib/assets";

export function DressCode() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="dress" tint="champagne">
      <SectionHeading heading={t.dress.heading} />

      <ScrollReveal>
        <div className="mt-12 max-w-xl mx-auto text-center">
          <h3
            className={
              dir === "rtl"
                ? "font-arabicDisplay text-4xl text-charcoal"
                : "font-script text-5xl"
            }
            style={{ color: "var(--gold-deep)" }}
          >
            {pick(t.dress.title)}
          </h3>
          <FiligreeDivider width={140} className="my-5 mx-auto" />
          <p
            className={
              dir === "rtl"
                ? "font-arabicBody text-charcoal/85 leading-relaxed"
                : "font-display italic text-charcoal/85 text-lg leading-relaxed"
            }
          >
            {pick(t.dress.body)}
          </p>
          <p className="mt-10 font-display tracking-[0.4em] uppercase text-[10px] text-taupe">
            {pick(t.dress.paletteLabel)}
          </p>
          <div
            className="mt-5 mx-auto relative w-full max-w-md"
            style={{ aspectRatio: "16 / 5" }}
          >
            <Image
              src={ASSETS.swatchPalette}
              alt={pick(t.dress.paletteLabel)}
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
