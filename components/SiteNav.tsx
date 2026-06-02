"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";

// Sticky nav. Appears after the user scrolls past the hero. Smooth-scrolls
// to anchors. Hamburger on mobile.
export function SiteNav() {
  const { pick, t, dir } = useLang();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = typeof window !== "undefined" ? window.innerHeight : 800;
      setVisible(window.scrollY > h * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { href: string; label: { en: string; ar: string } }[] = [
    { href: "#invitation", label: t.nav.invitation },
    { href: "#countdown", label: t.nav.countdown },
    { href: "#story", label: t.nav.story },
    { href: "#events", label: t.nav.events },
    { href: "#rsvp", label: t.nav.rsvp },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="nav"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ y: -60, opacity: 0 }}
            dir={dir}
            className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-ivory/85 border-b border-gold/25"
          >
            <div className="mx-auto max-w-6xl px-5 sm:px-8 h-14 flex items-center justify-between">
              <a
                href="#top"
                className="font-display tracking-[0.4em] text-[11px] uppercase"
                style={{ color: "var(--gold-deep)" }}
              >
                S · T
              </a>
              <div className="hidden md:flex items-center gap-7">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={
                      dir === "rtl"
                        ? "font-arabicBody text-charcoal/80 hover:text-charcoal text-sm transition-colors"
                        : "font-display tracking-[0.3em] uppercase text-[11px] text-charcoal/80 hover:text-charcoal transition-colors"
                    }
                  >
                    {pick(l.label)}
                  </a>
                ))}
                <LanguageToggle />
              </div>
              <div className="md:hidden flex items-center gap-3">
                <LanguageToggle />
                <button
                  aria-label="Menu"
                  onClick={() => setOpen((v) => !v)}
                  className="w-9 h-9 grid place-items-center rounded-full border border-gold/40"
                >
                  <span className="block w-4 h-px bg-charcoal mb-1.5" />
                  <span className="block w-4 h-px bg-charcoal mb-1.5" />
                  <span className="block w-4 h-px bg-charcoal" />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ivory/97 md:hidden"
            dir={dir}
          >
            <button
              className="absolute top-5 ltr:right-5 rtl:left-5 text-charcoal/70 text-xs tracking-[0.3em] uppercase font-display"
              onClick={() => setOpen(false)}
            >
              {pick(t.ui.close)} ✕
            </button>
            <div className="h-full grid place-items-center">
              <ul className="space-y-6 text-center">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className={
                        dir === "rtl"
                          ? "font-arabicDisplay text-3xl text-charcoal"
                          : "font-display tracking-[0.3em] uppercase text-lg text-charcoal"
                      }
                    >
                      {pick(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
