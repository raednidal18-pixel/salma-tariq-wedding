"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { FiligreeDivider } from "./Filigree";
import { useLang } from "@/lib/LanguageProvider";

// Header pattern used by every section: eyebrow, gold divider, heading, divider, optional subheading.
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow?: { en: string; ar: string };
  heading: { en: string; ar: string };
  subheading?: { en: string; ar: string };
}) {
  const { pick, dir } = useLang();
  return (
    <ScrollReveal className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <p
          className={
            dir === "rtl"
              ? "font-arabicBody tracking-[0.3em] text-[11px] text-taupe"
              : "font-display tracking-[0.5em] uppercase text-[11px] text-taupe"
          }
        >
          {pick(eyebrow)}
        </p>
      )}
      <FiligreeDivider width={160} className="my-5 mx-auto" />
      <h2
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-charcoal text-4xl sm:text-5xl leading-tight"
            : "font-display text-charcoal text-4xl sm:text-5xl tracking-wide"
        }
      >
        {pick(heading)}
      </h2>
      <FiligreeDivider width={160} className="my-5 mx-auto" />
      {subheading && (
        <p
          className={
            dir === "rtl"
              ? "font-arabicBody text-charcoal/65 mt-2"
              : "font-display italic text-charcoal/65 mt-2"
          }
        >
          {pick(subheading)}
        </p>
      )}
    </ScrollReveal>
  );
}

// Section wrapper with consistent vertical rhythm + an alternating tint.
export function Section({
  id,
  children,
  tint = "ivory",
  className,
}: {
  id?: string;
  children: ReactNode;
  tint?: "ivory" | "champagne";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full ${className ?? ""}`}
      style={{
        background:
          tint === "ivory"
            ? "linear-gradient(180deg, #FBF8F1 0%, #FFFFFF 50%, #FBF8F1 100%)"
            : "linear-gradient(180deg, #FBF8F1 0%, #F4ECD8 50%, #FBF8F1 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
        {children}
      </div>
    </section>
  );
}
