"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider } from "../Filigree";
import { GoldButton } from "../GoldButton";

export function Gifts() {
  const { pick, t, dir } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <Section id="gifts" tint="ivory">
      <SectionHeading heading={t.gifts.heading} />

      <ScrollReveal>
        <div className="mt-12 max-w-lg mx-auto text-center">
          <p
            className={
              dir === "rtl"
                ? "font-arabicBody text-charcoal/85 leading-relaxed"
                : "font-display italic text-charcoal/85 text-lg leading-relaxed"
            }
          >
            {pick(t.gifts.intro)}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 max-w-md mx-auto bg-white border border-gold/30 shadow-card p-8 text-center">
          <h3
            className={
              dir === "rtl"
                ? "font-arabicDisplay text-3xl text-charcoal"
                : "font-display text-3xl text-charcoal italic"
            }
            style={{ color: "var(--gold-deep)" }}
          >
            {pick(t.gifts.honeymoon)}
          </h3>
          <FiligreeDivider width={120} className="my-3 mx-auto" />
          <p
            className={
              dir === "rtl"
                ? "font-arabicBody text-charcoal/75"
                : "font-display italic text-charcoal/75"
            }
          >
            {pick(t.gifts.honeymoonBody)}
          </p>
          <div className="mt-6">
            <GoldButton onClick={() => setOpen(true)}>
              {pick(t.gifts.contribute)}
            </GoldButton>
          </div>
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur grid place-items-center p-5"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full marble-ivory fine-grain gold-frame p-8 sm:p-10 shadow-card"
              dir={dir}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 ltr:right-4 rtl:left-4 text-charcoal/55 hover:text-charcoal text-xs tracking-[0.3em] uppercase font-display"
              >
                ✕
              </button>
              <h3
                className={
                  dir === "rtl"
                    ? "font-arabicDisplay text-2xl text-charcoal text-center"
                    : "font-display text-2xl text-charcoal italic text-center"
                }
                style={{ color: "var(--gold-deep)" }}
              >
                {pick(t.gifts.honeymoon)}
              </h3>
              <FiligreeDivider width={120} className="my-3 mx-auto" />
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-display tracking-[0.3em] uppercase text-[10px] text-taupe">
                    {pick(t.gifts.cliq)}
                  </dt>
                  <dd className="mt-1 text-charcoal font-display tracking-wider" dir="ltr">
                    salma.tariq.wedding
                  </dd>
                </div>
                <div>
                  <dt className="font-display tracking-[0.3em] uppercase text-[10px] text-taupe">
                    {pick(t.gifts.bank)}
                  </dt>
                  <dd className="mt-1 text-charcoal" dir="ltr">
                    <p>Arab Bank · Amman</p>
                    <p>IBAN: JO00 0000 0000 0000 0000 0000 00</p>
                    <p>Salma Al-Haddad &amp; Tariq Mansour</p>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-center text-taupe text-[10px] tracking-[0.3em] uppercase font-display">
                {pick(t.ui.soon)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
