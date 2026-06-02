"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { Section } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { FiligreeDivider, FiligreeCorner } from "../Filigree";
import { GoldLink } from "../GoldButton";
import { ASSETS } from "@/lib/assets";

// A formal invitation card framed by the watercolor archway. The arch sits
// as a full backdrop behind the card — never cropped, never a detached strip.
export function Invitation() {
  const { pick, t, dir } = useLang();
  return (
    <Section id="invitation" tint="ivory">
      {/* Stage: tall enough to host the arch + card on every screen. The
          arch fills the stage (objectFit: contain → always fully visible).
          The card sits absolutely centered inside the arch. */}
      <div className="relative w-full max-w-3xl mx-auto min-h-[720px] sm:min-h-[820px]">
        {/* Arch backdrop — full image, never cropped */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={ASSETS.archPortal}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 820px"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        {/* Card — centered within the arch's opening */}
        <div className="absolute inset-0 grid place-items-center px-6 sm:px-14">
          <ScrollReveal className="w-full max-w-md mx-auto">
            <div
              className="relative text-center px-5 sm:px-9 py-10 sm:py-12 marble-ivory fine-grain gold-frame shadow-card"
              style={{ borderRadius: 2 }}
            >
              <FiligreeCorner className="absolute top-3 left-3" size={56} opacity={0.65} />
              <FiligreeCorner className="absolute top-3 right-3" size={56} flip="h" opacity={0.65} />
              <FiligreeCorner className="absolute bottom-3 left-3" size={56} flip="v" opacity={0.65} />
              <FiligreeCorner className="absolute bottom-3 right-3" size={56} flip="hv" opacity={0.65} />

              <p
                className={
                  dir === "rtl"
                    ? "font-arabicBody tracking-[0.3em] text-[11px] text-taupe"
                    : "font-display tracking-[0.5em] uppercase text-[11px] text-taupe"
                }
              >
                {pick(t.invitation.intro)}
              </p>
              <FiligreeDivider width={140} className="my-4 mx-auto" />
              <h2
                className={
                  dir === "rtl"
                    ? "font-arabicDisplay text-charcoal text-4xl leading-tight"
                    : "font-script text-charcoal text-5xl sm:text-6xl leading-none"
                }
                style={{ color: "var(--gold-deep)" }}
              >
                {pick(t.meta.coupleScript)}
              </h2>
              <FiligreeDivider width={140} className="my-4 mx-auto" />
              <p
                className={
                  dir === "rtl"
                    ? "font-arabicBody text-charcoal/85 leading-relaxed text-sm"
                    : "font-display italic text-charcoal/85 text-base leading-relaxed"
                }
              >
                {pick(t.invitation.body)}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-display tracking-[0.35em] uppercase text-[9px] text-taupe">
                    {pick(t.invitation.when)}
                  </p>
                  <FiligreeDivider width={50} className="my-2 mx-auto opacity-80" />
                  <p
                    className={
                      dir === "rtl"
                        ? "font-arabicBody text-charcoal text-sm"
                        : "font-display text-charcoal text-sm"
                    }
                  >
                    {pick(t.invitation.dateLong)}
                  </p>
                </div>
                <div>
                  <p className="font-display tracking-[0.35em] uppercase text-[9px] text-taupe">
                    {pick(t.invitation.where)}
                  </p>
                  <FiligreeDivider width={50} className="my-2 mx-auto opacity-80" />
                  <p
                    className={
                      dir === "rtl"
                        ? "font-arabicBody text-charcoal text-sm"
                        : "font-display text-charcoal text-sm"
                    }
                  >
                    {pick(t.meta.venueFull)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <GoldLink href="#venue">{pick(t.invitation.viewMap)} →</GoldLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
