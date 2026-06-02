"use client";

import { FiligreeCorner } from "./Filigree";

// A tasteful art placeholder. Marble surface with a gold inset frame, gold
// corner filigree, and an optional caption. Easy to swap for <Image src=...>
// when the real watercolor lands.
export function ArtPlaceholder({
  caption,
  ratio = "4 / 5",
  ornament = "corner",
  className,
  tint = "marble",
}: {
  caption?: string;
  ratio?: string;
  ornament?: "corner" | "wreath" | "arch" | "swatch" | "none";
  className?: string;
  tint?: "marble" | "champagne";
}) {
  return (
    <div
      className={`relative w-full overflow-hidden gold-frame fine-grain ${className ?? ""}`}
      style={{
        aspectRatio: ratio,
        background:
          tint === "marble"
            ? // soft polished marble
              "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse at 75% 80%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%), linear-gradient(150deg, #FFFFFF 0%, #FBF8F1 60%, #EFE6D2 100%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(227,210,160,0.25) 0%, rgba(227,210,160,0) 70%), linear-gradient(180deg, #F4ECD8 0%, #EFE6D2 100%)",
        boxShadow: "0 30px 60px -25px rgba(42,38,32,0.25)",
      }}
    >
      {ornament === "corner" && (
        <>
          <FiligreeCorner className="absolute top-4 left-4" size={70} opacity={0.7} />
          <FiligreeCorner
            className="absolute top-4 right-4"
            size={70}
            flip="h"
            opacity={0.7}
          />
          <FiligreeCorner
            className="absolute bottom-4 left-4"
            size={70}
            flip="v"
            opacity={0.7}
          />
          <FiligreeCorner
            className="absolute bottom-4 right-4"
            size={70}
            flip="hv"
            opacity={0.7}
          />
        </>
      )}

      {ornament === "wreath" && (
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="rounded-full"
            style={{
              width: "55%",
              aspectRatio: "1 / 1",
              border: "1px solid rgba(194,162,74,0.5)",
              boxShadow: "inset 0 0 30px rgba(194,162,74,0.18)",
            }}
          >
            <div
              className="absolute inset-0 grid place-items-center"
            >
              <span
                className="font-script text-3xl"
                style={{ color: "var(--gold-deep)" }}
              >
                S &amp; T
              </span>
            </div>
          </div>
        </div>
      )}

      {ornament === "arch" && (
        <div className="absolute inset-0 grid place-items-end pb-10">
          <div
            className="w-2/3 h-3/4"
            style={{
              borderTopLeftRadius: "50% 60%",
              borderTopRightRadius: "50% 60%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(227,210,160,0.3) 100%)",
              border: "1px solid rgba(194,162,74,0.4)",
              boxShadow: "inset 0 0 40px rgba(194,162,74,0.15)",
            }}
          />
        </div>
      )}

      {ornament === "swatch" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-3">
            {[
              "#FFFFFF",
              "#FBF8F1",
              "#EFE6D2",
              "#E3D2A0",
              "#C2A24A",
              "#A8842F",
              "#2A2620",
            ].map((c) => (
              <div
                key={c}
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: c,
                  boxShadow: "0 4px 10px rgba(42,38,32,0.18), 0 0 0 1px rgba(194,162,74,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {caption && (
        <span
          className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display tracking-[0.4em] uppercase text-[9px]"
          style={{ color: "var(--taupe)" }}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
