// Central asset paths. Swap files in /public/watercolor/ with the same names
// and the whole site picks them up.

export const ASSETS = {
  // Gatefold cover (two halves of the closed invitation)
  coverLeft: "/watercolor/cover-left.png",
  coverRight: "/watercolor/cover-right.png",
  // Diorama depth layers revealed behind the doors
  layerBg: "/watercolor/layer-bg.png",
  layerMid: "/watercolor/layer-mid.png",
  layerFg: "/watercolor/layer-fg.png",
  // Legacy hero (kept for stage 2/3 reference)
  hero: "/watercolor/hero-courtyard.png",
  archPortal: "/watercolor/arch-portal.png",
  columnsCountdown: "/watercolor/columns-countdown.png",
  sceneHenna: "/watercolor/scene-henna.png",
  sceneCeremony: "/watercolor/scene-ceremony.png",
  sceneReception: "/watercolor/scene-reception.png",
  vignetteMet: "/watercolor/vignette-met.png",
  vignetteFirstDate: "/watercolor/vignette-firstdate.png",
  vignetteProposal: "/watercolor/vignette-proposal.png",
  vignetteForever: "/watercolor/vignette-forever.png",
  lantern: "/watercolor/lantern-vignette.png",
  // NOTE: on disk the actual filenames are hotel1.png and hotel3.png (no dash).
  // hotel2 file is missing — currently using hotel1 as a stand-in so the
  // layout reviews cleanly. Drop the real hotel-2 image in to fix.
  hotel1: "/watercolor/hotel1.png",
  hotel2: "/watercolor/hotel1.png",
  hotel3: "/watercolor/hotel3.png",
  swatchPalette: "/watercolor/swatch-palette.png",
  // Optional ambient track — drop a file at this path to enable it.
  ambientAudio: "/audio/ambient.mp3",
} as const;
