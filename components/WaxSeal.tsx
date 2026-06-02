"use client";

import { motion } from "framer-motion";

// Gold wax seal. Disc + monogram. When `cracked`, shatters into shards that
// fall under gravity.
const SHARDS = [
  { dx: -44, dy: 72, r: -38, d: 0.0, clip: "polygon(50% 50%, 12% 0%, 0% 38%)" },
  { dx: 40, dy: 66, r: 32, d: 0.04, clip: "polygon(50% 50%, 88% 0%, 100% 36%)" },
  { dx: -58, dy: 112, r: -55, d: 0.08, clip: "polygon(50% 50%, 0% 38%, 6% 100%)" },
  { dx: 62, dy: 122, r: 60, d: 0.06, clip: "polygon(50% 50%, 100% 36%, 92% 100%)" },
  { dx: -10, dy: 132, r: -20, d: 0.12, clip: "polygon(50% 50%, 6% 100%, 50% 95%)" },
  { dx: 14, dy: 138, r: 18, d: 0.1, clip: "polygon(50% 50%, 50% 95%, 92% 100%)" },
] as const;

export function WaxSeal({
  cracked,
  size = 148,
  monogram = "S & T",
}: {
  cracked: boolean;
  size?: number;
  monogram?: string;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      {/* Intact seal */}
      <motion.div
        className="absolute inset-0 rounded-full gold-seal fine-grain shadow-seal"
        initial={{ opacity: 1, scale: 1 }}
        animate={
          cracked
            ? { opacity: 0, scale: 0.92, transition: { duration: 0.18 } }
            : { opacity: 1, scale: 1 }
        }
      >
        {/* Pressed ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: size * 0.1,
            boxShadow:
              "inset 0 0 0 1px rgba(255,235,170,0.55), inset 0 2px 6px rgba(80,55,15,0.55)",
          }}
        />
        {/* Outer rim */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 0,
            boxShadow:
              "inset 0 0 0 1.5px rgba(255,245,210,0.4), inset 0 -3px 8px rgba(80,55,15,0.35)",
          }}
        />
        {/* Monogram */}
        <div className="absolute inset-0 grid place-items-center select-none">
          <span
            className="font-script"
            style={{
              fontSize: size * 0.46,
              lineHeight: 1,
              color: "#3a2a10",
              textShadow:
                "0 1px 0 rgba(255,240,200,0.5), 0 -1px 0 rgba(80,55,15,0.5)",
            }}
          >
            {monogram}
          </span>
        </div>
      </motion.div>

      {/* Shards on crack */}
      {cracked &&
        SHARDS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full gold-seal"
            style={{
              clipPath: s.clip,
              WebkitClipPath: s.clip,
              transformOrigin: "50% 50%",
            }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: s.dx,
              y: s.dy + 40,
              rotate: s.r,
              opacity: 0,
            }}
            transition={{
              duration: 0.95,
              delay: s.d,
              ease: [0.36, 0, 0.66, 1],
            }}
          />
        ))}
    </div>
  );
}
