"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";
import { ASSETS } from "@/lib/assets";

const VIGNETTE_SRCS = [
  ASSETS.vignetteMet,
  ASSETS.vignetteFirstDate,
  ASSETS.vignetteProposal,
  ASSETS.vignetteForever,
];

export function Story() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="story" tint="ivory">
      <SectionHeading heading={t.story.heading} />

      <div className="mt-16 relative">
        {/* Gold thread running through the timeline (desktop) */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(194,162,74,0) 0%, rgba(194,162,74,0.55) 12%, rgba(194,162,74,0.55) 88%, rgba(194,162,74,0) 100%)",
          }}
        />

        <ul className="space-y-16 md:space-y-24">
          {t.story.chapters.map((c, i) => {
            const flipped = i % 2 === 1;
            return (
              <li key={i} className="relative">
                <div
                  className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${flipped ? "md:[direction:rtl]" : ""}`}
                  style={{ direction: dir }}
                >
                  {/* Vignette */}
                  <ScrollReveal>
                    <div className="md:max-w-[360px] mx-auto">
                      <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                        <Image
                          src={VIGNETTE_SRCS[i]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 80vw, 360px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                  {/* Text */}
                  <ScrollReveal delay={0.15}>
                    <div
                      className={
                        flipped
                          ? "md:[direction:ltr] md:text-end"
                          : "md:[direction:ltr]"
                      }
                      style={{ direction: dir }}
                    >
                      <p className="font-display tracking-[0.4em] uppercase text-[10px] text-taupe">
                        {pick({ en: `Chapter ${i + 1}`, ar: `الفصل ${i + 1}` })}
                      </p>
                      <h3
                        className={
                          dir === "rtl"
                            ? "font-arabicDisplay text-3xl sm:text-4xl text-charcoal mt-3"
                            : "font-display text-3xl sm:text-4xl text-charcoal mt-3"
                        }
                      >
                        {pick(c.title)}
                      </h3>
                      <FiligreeDivider width={80} className="my-3" />
                      <p
                        className={
                          dir === "rtl"
                            ? "font-arabicBody text-charcoal/80 leading-relaxed max-w-md"
                            : "font-display italic text-charcoal/80 text-lg leading-relaxed max-w-md"
                        }
                      >
                        {pick(c.body)}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
                {/* Marker on the gold thread */}
                <span
                  className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    background:
                      "radial-gradient(circle, #E3D2A0 0%, #A8842F 100%)",
                    boxShadow: "0 0 12px rgba(194,162,74,0.6)",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
