"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "ghost";

export function GoldButton({
  children,
  variant = "primary",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display tracking-[0.3em] uppercase text-[11px] transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-charcoal text-ivory hover:bg-[#1f1c17]"
      : "border border-gold/55 text-charcoal hover:bg-gold/10";
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      className={`${base} ${styles} ${className ?? ""}`}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

// Discreet link-style action, for "View map" etc.
export function GoldLink({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const cls = `inline-flex items-center gap-2 font-display tracking-[0.3em] uppercase text-[10px] text-charcoal/80 hover:text-charcoal border-b border-gold/40 hover:border-gold pb-[2px] transition-colors ${className ?? ""}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
