## The Jasmine Courtyard — Salma & Tariq

A bilingual (English + Arabic, full RTL) digital wedding invitation. Levantine
golden-hour, hand-painted-storybook aesthetic. Built with Next.js 14 (App
Router), TypeScript, Tailwind, and Framer Motion.

### Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and tap the sealed envelope.

### Editing copy

All English/Arabic strings live in `lib/translations.ts`.

### Swapping watercolor art

Drop PNGs into `public/watercolor/` using the filenames in
`lib/assets.ts`. Until those files are added the layout uses tasteful
gradient placeholders.

### Build stages

1. **Envelope entrance** — sealed envelope, wax-seal cracking, flap opening,
   card rising, transition to hero. Touch-friendly, with skip + reduced-motion
   fallbacks. (✅ complete)
2. Hero + countdown.
3. Invitation portal, story timeline, celebrations, order of day, dress code,
   gallery, hotels, RSVP, gifts, venue, closing, footer.
