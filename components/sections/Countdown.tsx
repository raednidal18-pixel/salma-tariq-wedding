"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";

// October 17, 2026 · 5:00 PM (Amman, UTC+3)
const TARGET = new Date("2026-10-17T17:00:00+03:00").getTime();

function diff(now: number) {
  const ms = Math.max(0, TARGET - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown() {
  const { pick, t, lang } = useLang();
  // Time-based render must wait for the client mount, otherwise the seconds
  // computed on the server won't match the client a moment later → hydration mismatch.
  const [v, setV] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setV(diff(Date.now()));
    const id = setInterval(() => setV(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: { value: number | null; label: { en: string; ar: string } }[] = [
    { value: v?.days ?? null, label: t.countdown.days },
    { value: v?.hours ?? null, label: t.countdown.hours },
    { value: v?.minutes ?? null, label: t.countdown.minutes },
    { value: v?.seconds ?? null, label: t.countdown.seconds },
  ];

  return (
    <Section id="countdown" tint="ivory">
      <SectionHeading heading={t.countdown.heading} />

      <div className="mt-14">
        <ScrollReveal>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto px-4 sm:px-10">
            {cells.map((c, i) => (
              <CountCell
                key={i}
                value={c.value}
                label={pick(c.label)}
                lang={lang}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}

function CountCell({
  value,
  label,
  lang,
}: {
  value: number | null;
  label: string;
  lang: "en" | "ar";
}) {
  // Pre-mount: dashes so the server-rendered HTML matches what the client
  // first paints. Once the effect runs, real numbers fill in.
  const display =
    value == null
      ? "—"
      : lang === "ar"
        ? toArabicNumerals(value)
        : String(value).padStart(2, "0");
  return (
    <div className="relative text-center marble-ivory fine-grain gold-frame py-5 sm:py-7">
      <motion.div
        key={display}
        initial={{ opacity: 0.4, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-charcoal text-3xl sm:text-5xl"
        style={{ color: "var(--gold-deep)" }}
        suppressHydrationWarning
      >
        {display}
      </motion.div>
      <p
        className={
          lang === "ar"
            ? "font-arabicBody mt-2 tracking-wider text-[11px] text-taupe"
            : "font-display mt-2 tracking-[0.3em] uppercase text-[10px] text-taupe"
        }
      >
        {label}
      </p>
    </div>
  );
}

function toArabicNumerals(n: number): string {
  const map: Record<string, string> = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };
  return String(n)
    .padStart(2, "0")
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

