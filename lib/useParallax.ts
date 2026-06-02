"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

// Input axes are normalized to roughly [-1, 1] in both dimensions.
// On desktop: mouse position relative to the viewport.
// On mobile: device orientation gamma (left/right) and beta (front/back),
// scaled. If gyro never fires (denied/unsupported), we auto-drift slowly so
// the scene never feels frozen.
export function useParallax(active: boolean): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring smooths the input — never dizzying, always gentle.
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });
  const lastInput = useRef<number>(Date.now());
  const driftRaf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    const onMouse = (e: MouseEvent) => {
      lastInput.current = Date.now();
      x.set(((e.clientX / window.innerWidth) - 0.5) * 2);
      y.set(((e.clientY / window.innerHeight) - 0.5) * 2);
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      lastInput.current = Date.now();
      // gamma: -90..90 (left/right tilt). Clamp to ±30° → ±1.
      // beta: -180..180 (front/back). Recenter on 35° (typical hold angle).
      const gx = Math.max(-1, Math.min(1, e.gamma / 25));
      const gy = Math.max(-1, Math.min(1, (e.beta - 35) / 25));
      x.set(gx);
      y.set(gy);
    };

    // Auto-drift fallback: if no input arrives for 2s, slowly sweep the scene.
    let t = 0;
    const drift = () => {
      const idle = Date.now() - lastInput.current > 2000;
      if (idle) {
        t += 0.006;
        x.set(Math.sin(t) * 0.6);
        y.set(Math.cos(t * 0.7) * 0.4);
      }
      driftRaf.current = requestAnimationFrame(drift);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    driftRaf.current = requestAnimationFrame(drift);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
      if (driftRaf.current != null) cancelAnimationFrame(driftRaf.current);
    };
  }, [active, x, y]);

  return { x: sx, y: sy };
}

// iOS 13+ requires explicit user-gesture permission for DeviceOrientationEvent.
// Call this from inside a tap handler. Safe to call elsewhere — it no-ops.
export async function requestOrientationPermission(): Promise<"granted" | "denied" | "unsupported"> {
  if (typeof window === "undefined") return "unsupported";
  const DOE: any = (window as any).DeviceOrientationEvent;
  if (!DOE || typeof DOE.requestPermission !== "function") return "unsupported";
  try {
    const res: string = await DOE.requestPermission();
    return res === "granted" ? "granted" : "denied";
  } catch {
    return "denied";
  }
}
