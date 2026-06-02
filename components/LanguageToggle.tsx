"use client";

import { useLang } from "@/lib/LanguageProvider";
import { motion } from "framer-motion";

export function LanguageToggle({
  position = "header",
}: {
  position?: "header" | "fixed";
}) {
  const { lang, toggle, t, pick } = useLang();
  const label = pick(t.ui.languageToggle);
  const cls =
    position === "fixed"
      ? "fixed top-4 ltr:right-4 rtl:left-4 z-40"
      : "relative";

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.04 }}
      className={`${cls} h-10 px-4 rounded-full bg-white/85 backdrop-blur border border-gold/45 text-charcoal shadow-sm flex items-center gap-2`}
      aria-label={`Switch language to ${lang === "en" ? "Arabic" : "English"}`}
    >
      <span
        className={
          lang === "en"
            ? "font-arabicDisplay text-lg leading-none"
            : "font-display tracking-widest text-xs uppercase"
        }
        style={{ color: "var(--gold-deep)" }}
      >
        {label}
      </span>
    </motion.button>
  );
}
