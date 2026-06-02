"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { ASSETS } from "@/lib/assets";

export function OrderOfDay() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="order" tint="ivory">
      <SectionHeading heading={t.order.heading} />

      <div className="mt-14 max-w-xl mx-auto relative">
        {/* Decorative lantern overlay — transparent PNG */}
        <div className="absolute -inset-y-10 -inset-x-16 pointer-events-none opacity-90">
          <Image
            src={ASSETS.lantern}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
        {/* Gold timeline thread */}
        <div
          className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(194,162,74,0) 0%, rgba(194,162,74,0.55) 12%, rgba(194,162,74,0.55) 88%, rgba(194,162,74,0) 100%)",
          }}
        />

        <ul className="space-y-10">
          {t.order.items.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={i} className="relative grid grid-cols-2 gap-5 items-center">
                <ScrollReveal
                  delay={i * 0.05}
                  className={left ? "text-end pr-6" : "col-start-2 text-start pl-6"}
                >
                  <p
                    className={
                      dir === "rtl"
                        ? "font-arabicBody tracking-wider text-[12px] text-taupe"
                        : "font-display tracking-[0.3em] uppercase text-[11px] text-taupe"
                    }
                  >
                    {pick(item.time)}
                  </p>
                  <h3
                    className={
                      dir === "rtl"
                        ? "font-arabicDisplay text-charcoal text-2xl mt-1"
                        : "font-display text-charcoal text-2xl mt-1"
                    }
                    style={{ color: "var(--gold-deep)" }}
                  >
                    {pick(item.title)}
                  </h3>
                </ScrollReveal>
                {/* Marker on the thread */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    top: "calc(50% - 6px)",
                    width: 12,
                    height: 12,
                    background:
                      "radial-gradient(circle, #FFFFFF 0%, #E3D2A0 60%, #A8842F 100%)",
                    boxShadow: "0 0 14px rgba(194,162,74,0.5)",
                    border: "1px solid rgba(194,162,74,0.5)",
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
