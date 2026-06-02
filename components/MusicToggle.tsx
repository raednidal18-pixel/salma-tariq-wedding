"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { ASSETS } from "@/lib/assets";

// Floating music toggle. Muted by default. Soft fade-in once user enables.
// If the audio file isn't present, the toggle still renders but does nothing
// audibly — gracefully silent.
export function MusicToggle() {
  const { pick, t } = useLang();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(false);

  // Appear once the user has scrolled into the site.
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        a.volume = 0.4;
        await a.play();
        setOn(true);
      } catch {
        // Autoplay blocked or file missing — silently ignore.
        setOn(false);
      }
    }
  };

  if (!visible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={ASSETS.ambientAudio}
        loop
        preload="none"
        aria-hidden
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        aria-label={pick(on ? t.ui.musicOff : t.ui.musicOn)}
        className="fixed bottom-5 ltr:right-5 rtl:left-5 z-40 w-12 h-12 rounded-full bg-white/85 backdrop-blur border border-gold/40 grid place-items-center shadow-card"
      >
        <NoteIcon playing={on} />
      </motion.button>
    </>
  );
}

function NoteIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <defs>
        <linearGradient id="note-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8842F" />
          <stop offset="60%" stopColor="#E3D2A0" />
          <stop offset="100%" stopColor="#A8842F" />
        </linearGradient>
      </defs>
      <path
        d="M9 17V6l9-2v11"
        fill="none"
        stroke="url(#note-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="2.4" fill="url(#note-gold)" />
      <circle cx="16" cy="15" r="2.4" fill="url(#note-gold)" />
      {!playing && (
        <line
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          stroke="#9A8E78"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
