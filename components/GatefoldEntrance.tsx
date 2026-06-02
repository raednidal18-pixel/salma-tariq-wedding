"use client";

import { useCallback, useEffect, useReducer } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/LanguageProvider";
import { useParallax, requestOrientationPermission } from "@/lib/useParallax";
import { WaxSeal } from "./WaxSeal";
import { LanguageToggle } from "./LanguageToggle";
import { FiligreeDivider } from "./Filigree";
import { ASSETS } from "@/lib/assets";

// Phase machine: closed → cracking → swinging → open
type Phase = "closed" | "cracking" | "swinging" | "open";

function reducer(
  state: Phase,
  action: { type: "TAP" | "ADVANCE" | "RESET" },
): Phase {
  if (action.type === "RESET") return "closed";
  if (action.type === "TAP" && state === "closed") return "cracking";
  if (action.type === "ADVANCE") {
    if (state === "cracking") return "swinging";
    if (state === "swinging") return "open";
  }
  return state;
}

// Heavy door easing — never bouncy.
const DOOR_EASE: [number, number, number, number] = [0.62, 0.02, 0.18, 1.0];
const DOOR_DURATION = 1.95;

export function GatefoldEntrance() {
  const reduce = useReducedMotion();
  const [phase, dispatch] = useReducer(reducer, "closed");
  const { lang, pick, t, dir } = useLang();
  const { x, y } = useParallax(phase === "open");

  useEffect(() => {
    if (phase !== "open") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "cracking") {
      const id = setTimeout(() => dispatch({ type: "ADVANCE" }), reduce ? 80 : 720);
      return () => clearTimeout(id);
    }
    if (phase === "swinging") {
      const id = setTimeout(
        () => dispatch({ type: "ADVANCE" }),
        reduce ? 80 : DOOR_DURATION * 1000 + 100,
      );
      return () => clearTimeout(id);
    }
  }, [phase, reduce]);

  const onSealTap = useCallback(async () => {
    if (phase !== "closed") return;
    requestOrientationPermission().catch(() => {});
    dispatch({ type: "TAP" });
  }, [phase]);

  const onSkip = useCallback(() => {
    requestOrientationPermission().catch(() => {});
    dispatch({ type: "ADVANCE" });
    setTimeout(() => dispatch({ type: "ADVANCE" }), 80);
    setTimeout(() => dispatch({ type: "ADVANCE" }), 160);
  }, []);

  const onReplay = useCallback(() => dispatch({ type: "RESET" }), []);

  const doorsOpening = phase === "swinging" || phase === "open";
  const sealCracked = phase !== "closed";

  // Parallax outputs per layer.
  const bgX = useTransform(x, [-1, 1], [-10, 10]);
  const bgY = useTransform(y, [-1, 1], [-6, 6]);
  const midX = useTransform(x, [-1, 1], [-26, 26]);
  const midY = useTransform(y, [-1, 1], [-14, 14]);
  const fgX = useTransform(x, [-1, 1], [-58, 58]);
  const fgY = useTransform(y, [-1, 1], [-30, 30]);
  const stageRX = useTransform(y, [-1, 1], [1.5, -1.5]);
  const stageRY = useTransform(x, [-1, 1], [-2.2, 2.2]);
  const textX = useTransform(x, [-1, 1], [-12, 12]);

  return (
    <section
      dir={dir}
      className="relative w-full overflow-hidden bg-ivory"
      style={{ minHeight: "100svh" }}
    >
      <Diorama
        phase={phase}
        layers={{ bgX, bgY, midX, midY, fgX, fgY, stageRX, stageRY, textX }}
        lang={lang}
        pick={pick}
        t={t}
        dir={dir}
      />

      <AnimatePresence>
        {phase !== "open" && (
          <motion.div
            key="doors"
            className="absolute inset-0 z-30"
            style={{ perspective: 1700, perspectiveOrigin: "50% 50%" }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Door
                side="left"
                opening={doorsOpening}
                reduce={!!reduce}
                cover={<CoverArt side="left" />}
              />
              <Door
                side="right"
                opening={doorsOpening}
                reduce={!!reduce}
                cover={<CoverArt side="right" />}
              />
            </div>

            {/* Wax seal — centered on the seam */}
            <button
              onClick={onSealTap}
              aria-label={pick(t.envelope.tap)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 outline-none"
              style={{ touchAction: "manipulation" }}
            >
              <motion.div
                animate={
                  sealCracked
                    ? { scale: 1, transition: { duration: 0.18 } }
                    : { scale: [1, 1.04, 1], transition: { duration: 2.6, repeat: Infinity } }
                }
              >
                <WaxSeal cracked={sealCracked} size={150} monogram="S & T" />
              </motion.div>
            </button>

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
              style={{ top: "calc(50% + 112px)" }}
              animate={{
                opacity: phase === "closed" ? 1 : 0,
                y: phase === "closed" ? 0 : 8,
              }}
              transition={{ duration: 0.5 }}
            >
              <p
                className={
                  dir === "rtl"
                    ? "font-arabicBody text-charcoal/70 text-sm tracking-wide animate-flicker"
                    : "font-display tracking-[0.4em] uppercase text-[11px] text-charcoal/70 animate-flicker"
                }
              >
                {pick(t.envelope.tap)}
              </p>
              <FiligreeDivider width={80} className="mt-2 mx-auto opacity-80" />
            </motion.div>

            <button
              onClick={onSkip}
              className="absolute top-5 ltr:right-5 rtl:left-5 z-40 text-charcoal/55 hover:text-charcoal text-[11px] tracking-[0.3em] uppercase font-display transition-colors"
            >
              {pick(t.envelope.skip)} →
            </button>

            {/* Warm gold light spilling in as the doors swing */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-[35]"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "swinging" ? 0.6 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(255,240,200,0.9) 0%, rgba(255,240,200,0) 55%)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "open" && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-5"
          >
            <span
              className="font-display tracking-[0.4em] text-[11px] uppercase"
              style={{ color: "var(--gold-deep)" }}
            >
              S&nbsp;·&nbsp;T
            </span>
            <LanguageToggle />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "open" && (
          <motion.button
            key="replay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
            exit={{ opacity: 0 }}
            onClick={onReplay}
            className="absolute bottom-5 ltr:left-5 rtl:right-5 z-30 text-charcoal/55 hover:text-charcoal text-[10px] tracking-[0.3em] uppercase font-display transition-colors"
          >
            ↻ {pick(t.envelope.replay)}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Door ───────────────────────────────────────────────────────────────────
function Door({
  side,
  opening,
  reduce,
  cover,
}: {
  side: "left" | "right";
  opening: boolean;
  reduce: boolean;
  cover: React.ReactNode;
}) {
  const isLeft = side === "left";
  const hingeOrigin = isLeft ? "0% 50%" : "100% 50%";
  const targetRotate = isLeft ? -108 : 108;

  return (
    <motion.div
      className="absolute top-0 h-full"
      style={{
        width: "50%",
        left: isLeft ? 0 : "50%",
        transformOrigin: hingeOrigin,
        transformStyle: "preserve-3d",
        willChange: "transform",
        filter: "drop-shadow(0 30px 50px rgba(42,38,32,0.28))",
      }}
      initial={{ rotateY: 0 }}
      animate={
        opening
          ? reduce
            ? { rotateY: 0, opacity: 0, transition: { duration: 0.5 } }
            : { rotateY: targetRotate, transition: { duration: DOOR_DURATION, ease: DOOR_EASE } }
          : { rotateY: 0 }
      }
    >
      {/* Front face */}
      <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
        {cover}
        {/* Inner-seam shadow + thin gold edge at the seam */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            [isLeft ? "right" : "left"]: 0,
            width: 22,
            background: isLeft
              ? "linear-gradient(to left, rgba(42,38,32,0.32) 0%, rgba(42,38,32,0) 100%)"
              : "linear-gradient(to right, rgba(42,38,32,0.32) 0%, rgba(42,38,32,0) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            [isLeft ? "right" : "left"]: 0,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(194,162,74,0) 0%, rgba(194,162,74,0.7) 50%, rgba(194,162,74,0) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Sweep highlight across the door face during the swing */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={
            opening
              ? { opacity: [0, 0.4, 0], transition: { duration: 1.1, delay: 0.15 } }
              : { opacity: 0 }
          }
          style={{
            background: isLeft
              ? "linear-gradient(75deg, rgba(255,245,210,0) 30%, rgba(255,245,210,0.7) 50%, rgba(255,245,210,0) 70%)"
              : "linear-gradient(-75deg, rgba(255,245,210,0) 30%, rgba(255,245,210,0.7) 50%, rgba(255,245,210,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Back face — paler marble interior briefly visible after 90° */}
      <div
        className="absolute inset-0 marble-ivory fine-grain"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
          boxShadow: "inset 0 0 80px rgba(42,38,32,0.18)",
        }}
      >
        <div
          className="absolute inset-6 border border-gold/30"
          style={{ borderRadius: 2 }}
        />
      </div>

      {/* Side face (thickness) at the seam */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          [isLeft ? "right" : "left"]: 0,
          width: 10,
          transform: `translateZ(5px) rotateY(${isLeft ? "90deg" : "-90deg"}) translateX(${isLeft ? "-5px" : "5px"})`,
          background:
            "linear-gradient(180deg, #d8b96b 0%, #a07a2c 50%, #d8b96b 100%)",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
        }}
      />
    </motion.div>
  );
}

// ─── Cover Art ──────────────────────────────────────────────────────────────
// Each door = one half of the closed invitation. The real art lives in
// /public/watercolor/cover-{left,right}.png and covers the full door face.
function CoverArt({ side }: { side: "left" | "right" }) {
  const src = side === "left" ? ASSETS.coverLeft : ASSETS.coverRight;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        sizes="50vw"
        priority
        style={{
          objectFit: "cover",
          // Anchor each half toward the seam so the split design lines up.
          objectPosition: side === "left" ? "right center" : "left center",
        }}
      />
    </div>
  );
}

// ─── Diorama ────────────────────────────────────────────────────────────────
// Layered marble hall revealed when the doors swing open. Each layer at a
// different translateZ for true depth.
function Diorama({
  phase,
  layers,
  lang,
  pick,
  t,
  dir,
}: {
  phase: Phase;
  layers: any;
  lang: string;
  pick: (v: { en: string; ar: string }) => string;
  t: any;
  dir: "ltr" | "rtl";
}) {
  const revealed = phase === "swinging" || phase === "open";
  return (
    <div
      className="absolute inset-0 z-10"
      style={{ perspective: 1200, perspectiveOrigin: "50% 50%" }}
    >
      {/* Ivory floor — solid base behind every depth layer so transparent
          regions in BG/MID/FG never reveal a void or checkerboard. */}
      <div className="absolute inset-0 bg-ivory" />

      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          rotateX: layers.stageRX,
          rotateY: layers.stageRY,
        }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={
          revealed
            ? { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
            : { opacity: 0, scale: 1.06 }
        }
      >
        {/* BG — full-bleed marble watercolor */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-300px) scale(1.4)",
            x: layers.bgX,
            y: layers.bgY,
          }}
        >
          <HallBackground />
        </motion.div>

        {/* MID — transparent marble arches/columns layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-140px) scale(1.18)",
            x: layers.midX,
            y: layers.midY,
          }}
        >
          <MarbleColonnade />
        </motion.div>

        {/* FG — transparent floral / filigree frame */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: "translateZ(90px) scale(0.95)",
            x: layers.fgX,
            y: layers.fgY,
          }}
        >
          <ForegroundOrnaments />
        </motion.div>
      </motion.div>

      {/* ── Centerpiece — emotional payoff. Lives OUTSIDE the parallax stage
          so the doors-opening-reveal lands on stable, legible type. Sits in
          front of the FG florals; the florals frame it from the corners. ── */}
      <AnimatePresence>
        {phase === "open" && (
          <motion.div
            key="centerpiece"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="absolute inset-0 z-20 grid place-items-center text-center px-6 pointer-events-none"
            style={{ x: layers.textX }}
          >
            <div className="relative">
              {/* Soft ivory halo so the type has air around it against the
                  watercolor */}
              <div
                aria-hidden
                className="absolute -inset-x-10 -inset-y-6 sm:-inset-x-24 sm:-inset-y-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(251,248,241,0.85) 0%, rgba(251,248,241,0.55) 35%, rgba(251,248,241,0) 70%)",
                }}
              />

              <div className="relative">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    dir === "rtl"
                      ? "font-arabicBody tracking-[0.3em] text-[12px] text-charcoal/70"
                      : "font-display tracking-[0.55em] uppercase text-[11px] text-charcoal/70"
                  }
                >
                  {pick(t.hero.eyebrow)}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  className="my-6 mx-auto"
                  style={{ transformOrigin: "center" }}
                >
                  <FiligreeDivider width={200} className="mx-auto" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    dir === "rtl"
                      ? "font-arabicDisplay text-7xl sm:text-8xl leading-[1.05] gold-foil"
                      : "font-script text-[5.5rem] sm:text-[8.5rem] leading-[0.95] gold-foil"
                  }
                  style={{
                    filter: "drop-shadow(0 6px 22px rgba(168,132,47,0.28))",
                  }}
                >
                  {pick(t.meta.coupleScript)}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="my-6 mx-auto"
                  style={{ transformOrigin: "center" }}
                >
                  <FiligreeDivider width={200} className="mx-auto" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    dir === "rtl"
                      ? "font-arabicBody tracking-[0.2em] text-[14px] text-charcoal"
                      : "font-display tracking-[0.4em] uppercase text-[12px] text-charcoal"
                  }
                >
                  {pick(t.meta.weddingDate)}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue once fully open */}
      <AnimatePresence>
        {phase === "open" && (
          <motion.div
            key="cue"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.9, duration: 0.8 } }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center"
          >
            <p
              className={
                dir === "rtl"
                  ? "font-arabicBody tracking-[0.3em] text-[11px] text-charcoal/60"
                  : "font-display tracking-[0.45em] uppercase text-[10px] text-charcoal/60"
              }
            >
              {pick(t.hero.scrollCue)}
            </p>
            <div
              className="mt-3 mx-auto w-px h-8 bg-gold/55 animate-floatSlow"
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Hall background — real watercolor at deepest translateZ ───────────────
function HallBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={ASSETS.layerBg}
        alt=""
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}

// ─── Midground — transparent PNG sitting at translateZ(-140px) ─────────────
function MarbleColonnade() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={ASSETS.layerMid}
        alt=""
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}

// ─── Foreground — transparent PNG sitting at translateZ(+90px) ─────────────
function ForegroundOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Image
        src={ASSETS.layerFg}
        alt=""
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
