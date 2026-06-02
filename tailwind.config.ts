import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF8F1",
        champagne: "#EFE6D2",
        gold: "#C2A24A",
        "gold-deep": "#A8842F",
        "gold-soft": "#E3D2A0",
        charcoal: "#2A2620",
        taupe: "#9A8E78",
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        arabicDisplay: ["var(--font-arabic-display)", "serif"],
        arabicBody: ["var(--font-arabic-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        door:
          "0 40px 80px -30px rgba(42,38,32,0.45), 0 25px 45px -25px rgba(168,132,47,0.25)",
        card:
          "0 30px 60px -25px rgba(42,38,32,0.35), 0 12px 28px -18px rgba(168,132,47,0.18)",
        seal:
          "inset 0 1px 1px rgba(255,255,255,0.55), 0 4px 12px rgba(120,90,30,0.45), 0 14px 36px -10px rgba(194,162,74,0.55)",
        glow: "0 0 90px 0 rgba(227,210,160,0.55)",
      },
      keyframes: {
        sealPulse: {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.04)", filter: "brightness(1.08)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.82" },
          "55%": { opacity: "0.95" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      animation: {
        sealPulse: "sealPulse 2.6s ease-in-out infinite",
        flicker: "flicker 5s ease-in-out infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        twinkle: "twinkle 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
