"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";
import { GoldLink } from "../GoldButton";
import { downloadICS } from "@/lib/ics";
import { ASSETS } from "@/lib/assets";

// Concrete dates / times used by .ics export.
const EVENT_TIMES: Record<string, { start: Date; end: Date }> = {
  henna: {
    start: new Date("2026-10-16T19:30:00+03:00"),
    end: new Date("2026-10-16T23:00:00+03:00"),
  },
  katb: {
    start: new Date("2026-10-17T16:00:00+03:00"),
    end: new Date("2026-10-17T17:30:00+03:00"),
  },
  reception: {
    start: new Date("2026-10-17T19:00:00+03:00"),
    end: new Date("2026-10-18T01:00:00+03:00"),
  },
};

const SCENE_SRCS: Record<string, string> = {
  henna: ASSETS.sceneHenna,
  katb: ASSETS.sceneCeremony,
  reception: ASSETS.sceneReception,
};

export function Celebrations() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="events" tint="champagne">
      <SectionHeading
        heading={t.events.heading}
        subheading={t.events.subheading}
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.events.items.map((ev, i) => (
          <ScrollReveal key={ev.key} delay={i * 0.1}>
            <article className="bg-white border border-gold/25 shadow-card overflow-hidden">
              <div
                className="relative w-full"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={SCENE_SRCS[ev.key]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="p-6 sm:p-7 text-center">
                <h3
                  className={
                    dir === "rtl"
                      ? "font-arabicDisplay text-2xl text-charcoal"
                      : "font-display text-2xl text-charcoal tracking-wide"
                  }
                  style={{ color: "var(--gold-deep)" }}
                >
                  {pick(ev.name)}
                </h3>
                <FiligreeDivider width={90} className="my-3 mx-auto" />
                <p
                  className={
                    dir === "rtl"
                      ? "font-arabicBody text-charcoal/85 text-sm"
                      : "font-display italic text-charcoal/85 text-base"
                  }
                >
                  {pick(ev.blurb)}
                </p>
                <dl className="mt-5 text-sm space-y-1">
                  <div className="flex justify-between gap-3">
                    <dt className="text-taupe font-display tracking-[0.2em] uppercase text-[10px]">
                      {pick({ en: "Date", ar: "التاريخ" })}
                    </dt>
                    <dd
                      className={
                        dir === "rtl"
                          ? "font-arabicBody text-charcoal"
                          : "font-display text-charcoal"
                      }
                    >
                      {pick(ev.date)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-taupe font-display tracking-[0.2em] uppercase text-[10px]">
                      {pick({ en: "Time", ar: "الوقت" })}
                    </dt>
                    <dd
                      className={
                        dir === "rtl"
                          ? "font-arabicBody text-charcoal"
                          : "font-display text-charcoal"
                      }
                    >
                      {pick(ev.time)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-taupe font-display tracking-[0.2em] uppercase text-[10px]">
                      {pick({ en: "Venue", ar: "المكان" })}
                    </dt>
                    <dd
                      className={
                        dir === "rtl"
                          ? "font-arabicBody text-charcoal text-end"
                          : "font-display text-charcoal text-end"
                      }
                    >
                      {pick(ev.venue)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
                  <GoldLink
                    onClick={() => {
                      const times = EVENT_TIMES[ev.key];
                      downloadICS({
                        title: ev.name.en,
                        description: ev.blurb.en,
                        location: ev.venue.en,
                        start: times.start,
                        end: times.end,
                        filename: `salma-tariq-${ev.key}.ics`,
                      });
                    }}
                  >
                    {pick(t.events.addToCalendar)}
                  </GoldLink>
                  <GoldLink href="#venue">{pick(t.events.viewMap)}</GoldLink>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
