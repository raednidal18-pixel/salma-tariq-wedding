"use client";

// Reusable gold filigree pieces — SVG. Pure decoration, no behavior.
// All gold tones tie to the palette tokens; opacity drives "thinness".

export function FiligreeCorner({
  className,
  flip,
  size = 120,
  opacity = 0.85,
}: {
  className?: string;
  flip?: "h" | "v" | "hv";
  size?: number;
  opacity?: number;
}) {
  const sx = flip === "h" || flip === "hv" ? -1 : 1;
  const sy = flip === "v" || flip === "hv" ? -1 : 1;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      style={{ transform: `scale(${sx},${sy})`, opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id="fg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8842F" />
          <stop offset="40%" stopColor="#C2A24A" />
          <stop offset="55%" stopColor="#E3D2A0" />
          <stop offset="75%" stopColor="#C2A24A" />
          <stop offset="100%" stopColor="#A8842F" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#fg-gold)"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        {/* Curling vine */}
        <path d="M2 6 Q 36 8 60 28 T 112 56" />
        <path d="M6 24 Q 28 38 30 64 T 56 110" />
        {/* Inner flourish */}
        <path d="M14 14 Q 36 22 42 44 Q 46 60 70 64" opacity="0.85" />
        <path d="M30 8 Q 50 18 58 30 Q 64 38 78 38" opacity="0.7" />
        {/* Small leaf accents */}
        <path d="M44 30 q 6 -6 12 0 q -6 6 -12 0 z" fill="url(#fg-gold)" opacity="0.6" />
        <path d="M22 56 q 5 -5 10 0 q -5 5 -10 0 z" fill="url(#fg-gold)" opacity="0.55" />
        {/* Dots */}
        <circle cx="60" cy="28" r="1.3" fill="url(#fg-gold)" />
        <circle cx="30" cy="64" r="1.3" fill="url(#fg-gold)" />
        <circle cx="78" cy="38" r="1.1" fill="url(#fg-gold)" />
      </g>
    </svg>
  );
}

// A horizontal divider with a central diamond medallion.
export function FiligreeDivider({
  width = 180,
  className,
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 18"
      width={width}
      height={18}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="fg-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8842F" stopOpacity="0" />
          <stop offset="20%" stopColor="#C2A24A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E3D2A0" stopOpacity="1" />
          <stop offset="80%" stopColor="#C2A24A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A8842F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="9" x2="78" y2="9" stroke="url(#fg-line)" strokeWidth="1" />
      <line x1="102" y1="9" x2="180" y2="9" stroke="url(#fg-line)" strokeWidth="1" />
      <g transform="translate(90 9)">
        <polygon
          points="-10,0 0,-6 10,0 0,6"
          fill="none"
          stroke="#C2A24A"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="1.6" fill="#C2A24A" />
      </g>
    </svg>
  );
}

// A small floral ornament — used at the bottom of cover halves.
export function FloralSprig({
  width = 80,
  className,
  flip,
}: {
  width?: number;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 80 50"
      width={width}
      height={width * 0.625}
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id="sprig-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8842F" />
          <stop offset="50%" stopColor="#E3D2A0" />
          <stop offset="100%" stopColor="#A8842F" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#sprig-gold)"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M2 40 Q 30 20 78 28" />
        <path d="M22 28 q 4 -10 14 -8" />
        <path d="M40 22 q 4 -8 12 -6" />
        <path d="M58 24 q 3 -6 10 -4" />
      </g>
      {/* Petals */}
      <g fill="#ffffff" stroke="#C2A24A" strokeWidth="0.6">
        <circle cx="22" cy="22" r="3.5" />
        <circle cx="40" cy="16" r="3.5" />
        <circle cx="58" cy="20" r="3.5" />
      </g>
      <g fill="#C2A24A">
        <circle cx="22" cy="22" r="0.9" />
        <circle cx="40" cy="16" r="0.9" />
        <circle cx="58" cy="20" r="0.9" />
      </g>
    </svg>
  );
}
