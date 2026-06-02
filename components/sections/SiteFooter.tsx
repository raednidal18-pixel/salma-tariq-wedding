"use client";

import { useLang } from "@/lib/LanguageProvider";
import { LanguageToggle } from "../LanguageToggle";
import { FiligreeDivider } from "../Filigree";

export function SiteFooter() {
  const { pick, t, dir } = useLang();
  const links = [
    { href: "#invitation", label: t.nav.invitation },
    { href: "#events", label: t.nav.events },
    { href: "#rsvp", label: t.nav.rsvp },
    { href: "#venue", label: t.nav.venue },
  ];
  return (
    <footer
      dir={dir}
      className="relative w-full"
      style={{
        background:
          "linear-gradient(180deg, #EFE6D2 0%, #E3D2A0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 text-center">
        <span
          className="font-script text-5xl"
          style={{ color: "var(--gold-deep)" }}
        >
          S &amp; T
        </span>
        <FiligreeDivider width={140} className="my-4 mx-auto" />
        <ul className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={
                  dir === "rtl"
                    ? "font-arabicBody text-charcoal/70 hover:text-charcoal text-sm"
                    : "font-display tracking-[0.3em] uppercase text-[10px] text-charcoal/70 hover:text-charcoal"
                }
              >
                {pick(l.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-center">
          <LanguageToggle />
        </div>
        <p className="mt-8 text-[10px] tracking-[0.3em] uppercase font-display text-taupe">
          {pick(t.footer.music)}
        </p>
        <p className="mt-2 text-[10px] tracking-[0.3em] uppercase font-display text-taupe">
          {pick(t.footer.credit)}
        </p>
      </div>
    </footer>
  );
}
