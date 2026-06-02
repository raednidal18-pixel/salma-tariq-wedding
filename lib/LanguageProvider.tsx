"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { translations, type Lang } from "./translations";

type BilingualValue = { en: string; ar: string };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  // pick translates a {en, ar} object to the current language.
  pick: (v: BilingualValue) => string;
  dir: "ltr" | "rtl";
  t: typeof translations;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // On mount, sync from <html> attrs / localStorage if present.
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  // Reflect language + direction onto <html> for proper RTL flow.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "ar" : "en")),
    [],
  );
  const pick = useCallback((v: BilingualValue) => v[lang], [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle,
      pick,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: translations,
    }),
    [lang, setLang, toggle, pick],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
