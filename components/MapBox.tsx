"use client";

// Styled "map" — pure CSS / SVG, no API. Just enough to read as a venue map.
// A gilded compass rose, abstract roads, an olive grove on one side, a pin
// on the venue.

export function MapBox({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden gold-frame ${className ?? ""}`}
      style={{
        aspectRatio: "16 / 10",
        background:
          "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%), linear-gradient(150deg, #FBF8F1 0%, #EFE6D2 100%)",
        boxShadow: "0 30px 60px -25px rgba(42,38,32,0.3)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* abstract terrain */}
        <defs>
          <linearGradient id="map-grove" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EFE6D2" />
            <stop offset="100%" stopColor="#E3D2A0" />
          </linearGradient>
        </defs>
        {/* groves */}
        <path
          d="M 0 30 Q 90 50 130 110 Q 80 180 0 200 Z"
          fill="url(#map-grove)"
          opacity="0.6"
        />
        <path
          d="M 400 0 Q 320 30 290 90 Q 320 150 400 130 Z"
          fill="url(#map-grove)"
          opacity="0.6"
        />
        {/* roads */}
        <g
          fill="none"
          stroke="#9A8E78"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        >
          <path d="M 0 200 Q 120 150 200 140 T 400 90" />
          <path d="M 60 250 Q 140 200 180 170 T 280 130" />
          <path d="M 250 250 Q 240 200 220 170" />
        </g>
        {/* primary road */}
        <path
          d="M 0 200 Q 120 150 200 140 T 400 90"
          fill="none"
          stroke="#C2A24A"
          strokeWidth="1.6"
          opacity="0.9"
          strokeDasharray="6 4"
        />
        {/* compass rose */}
        <g transform="translate(60 60)" stroke="#C2A24A" strokeWidth="0.8" fill="none">
          <circle r="14" />
          <path d="M 0 -14 L 2 0 L 0 14 L -2 0 Z" fill="#C2A24A" />
          <path d="M -14 0 L 0 -2 L 14 0 L 0 2 Z" fill="#C2A24A" opacity="0.6" />
          <text
            y="-18"
            textAnchor="middle"
            fontSize="6"
            fill="#A8842F"
            fontFamily="serif"
          >
            N
          </text>
        </g>
      </svg>

      {/* The pin */}
      <div
        className="absolute"
        style={{ left: "62%", top: "44%", transform: "translate(-50%, -100%)" }}
      >
        <div className="relative">
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              background: "linear-gradient(180deg, #E3D2A0 0%, #A8842F 100%)",
              boxShadow: "0 6px 14px rgba(168,132,47,0.45), inset 0 0 0 1.5px rgba(255,245,210,0.6)",
            }}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-6 font-display tracking-[0.3em] uppercase text-[9px]"
            style={{ color: "var(--charcoal)", whiteSpace: "nowrap" }}
          >
            Dar Al-Yasmine
          </span>
        </div>
      </div>
    </div>
  );
}
