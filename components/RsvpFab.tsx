"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";

// Mobile-only floating RSVP button. Appears after hero, hides when RSVP is in view.
export function RsvpFab() {
  const { pick, t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      const rsvp = document.getElementById("rsvp");
      const inView = rsvp
        ? rsvp.getBoundingClientRect().top < window.innerHeight * 0.6
        : false;
      setVisible(past && !inView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="fab"
          href="#rsvp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="md:hidden fixed bottom-5 ltr:left-5 rtl:right-5 z-40 px-5 py-3 rounded-full bg-charcoal text-ivory font-display tracking-[0.3em] uppercase text-[11px] shadow-card"
        >
          {pick(t.ui.rsvpFloating)}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
