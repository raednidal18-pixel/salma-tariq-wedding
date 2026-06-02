"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";
import { ASSETS } from "@/lib/assets";

const HOTEL_SRCS = [ASSETS.hotel1, ASSETS.hotel2, ASSETS.hotel3];

export function Stay() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="stay" tint="champagne">
      <SectionHeading heading={t.stay.heading} subheading={t.stay.subheading} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.stay.hotels.map((h, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <article className="bg-white border border-gold/25 shadow-card overflow-hidden h-full flex flex-col">
              <div
                className="relative w-full"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={HOTEL_SRCS[i]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="p-6 text-center flex-1 flex flex-col">
                <h3
                  className={
                    dir === "rtl"
                      ? "font-arabicDisplay text-2xl text-charcoal"
                      : "font-display text-2xl text-charcoal"
                  }
                  style={{ color: "var(--gold-deep)" }}
                >
                  {pick(h.name)}
                </h3>
                <FiligreeDivider width={80} className="my-3 mx-auto" />
                <p
                  className={
                    dir === "rtl"
                      ? "font-arabicBody text-charcoal/80 text-sm flex-1"
                      : "font-display italic text-charcoal/80 text-base flex-1"
                  }
                >
                  {pick(h.blurb)}
                </p>
                <p
                  className="mt-4 font-display text-charcoal"
                  style={{ color: "var(--gold-deep)" }}
                >
                  <span className="text-xl">{pick(h.price)}</span>
                  <span className="text-taupe text-sm ms-1">
                    {pick(t.stay.perNight)}
                  </span>
                </p>
                <button
                  disabled
                  className="mt-5 inline-flex items-center justify-center px-5 py-2 rounded-full border border-taupe/30 text-taupe/70 font-display tracking-[0.3em] uppercase text-[10px] cursor-not-allowed"
                >
                  {pick(t.stay.bookingSoon)}
                </button>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
