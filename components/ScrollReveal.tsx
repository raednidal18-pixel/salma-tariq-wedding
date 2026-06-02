"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

// Cinematic in-view reveal: fade-up + soft scale. Stagger children optionally.
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as: As = "div",
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Component: any = motion[As as keyof typeof motion] ?? motion.div;
  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, scale: 0.985 }}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
