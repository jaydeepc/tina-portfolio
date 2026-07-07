# TINA MARIA THOMAS — Cinematic Scarlet Portfolio

A scroll-driven, cinematic 3D portfolio for **Tina Maria Thomas** — Tech Lead,
Full-Stack Developer & AI Accelerator at Thoughtworks. Built around her brand:

> **"I build intelligent systems, lead teams, and ship reliable software
> faster — with tests first, always."**

Ink-black void · scarlet rim light · cream typography · test-first storytelling.

## Run it

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build
```

## The experience

| Beat | What happens |
|---|---|
| Loader | Real preloading (hero frames, gallery film, fonts) with a truthful % counter, then a scarlet flash reveal |
| Hero | **"The Hero Walk"** — Tina walks toward camera through the scarlet void, expression shifting from focused to a confident smile; pinned canvas frame-scrub mapped 1:1 to scroll. Live HUD chip + frame counter |
| About | Engineering with Intent — a full-bleed walking film of Tina (thoughtful → warm smile) covers the pinned section while her story and domain chips reveal in the frame's negative space |
| Focus | **Clip 2 "AI Systems in Motion"** as a 97-frame scroll-scrubbed sequence — the film advances in lockstep with the pin while starter-kit modules assemble |
| Philosophy | RED → GREEN → REFACTOR staged type, CI pipeline lighting up, the mantra *"I will write the tests first."* |
| Pillars | Full-Stack / AI & ML Acceleration / Quality & Delivery — scrub-switched with animated SVG diagrams |
| Toolbox | Terminal-styled command center of stacks |
| Open Source | Cloud Carbon Footprint (scarlet→green dashboard) + Talisman (secret-scan gate) |
| Speaking | vodQA Pact workshop + YourStory AI-in-testing talk |
| Certifications | AWS AI Practitioner · GCP Cloud Digital Leader |
| Impact | **Clip 3 "Built. Tested. Shipped."** — horizontal glass-card gallery over Tina's walk |
| Stats | Count-up strip |
| Finale | CTA + footer, embers calm down, final hero pose ghosted behind |

## Media pipeline

All three films were generated with **Seedance 2.0 (Higgsfield)** — std mode,
4K, 16:9, 8 s, no audio — identity-locked to Tina's reference photo on every
generation.

- `assets/masters/` — original Seedance masters (keep, do not ship):
  clips 1–3 at 4K, clip 4 (hero walk) + clip 5 (about walk) at 1080p
- `public/media/hero/{lg,sm}/` — 97-frame hero walk scrub (clip 4, 12 fps,
  1920 w sharpened / 832 w)
- `public/media/about/{lg,sm}/` — 97-frame about walk scrub (clip 5, 12 fps)
- `public/media/focus/{lg,sm}/` — 97-frame scrub of clip 2 for Current Focus
- `public/media/gallery*.mp4` — 1440p/720p encodes of clip 3 for Impact
- Re-process after swapping a master:
  ```bash
  ffmpeg -i assets/masters/clip4-herowalk-1080.mp4 -vf "fps=12,unsharp=5:5:0.45:3:3:0.0" \
    -c:v libwebp -q:v 74 -f image2 -start_number 0 public/media/hero/lg/f_%04d.webp
  ```
  …then update the matching `count` in `src/lib/assets.ts`.

## Configure Tina's links

Edit **`src/config/site.ts`** — LinkedIn is live; **GitHub, email and resume
are placeholders** waiting for real URLs.

## Visual QA harness

With the dev server running:

```bash
node scripts/shoot.mjs out/                      # desktop sweep of every beat
W=390 H=844 SECTIONS=1 node scripts/shoot.mjs out-mobile/
node scripts/shoot.mjs out/ hero-mid:1400        # specific offsets
```

`/?at=<scrollY>` deep-links any scroll position for debugging.

## Notes

- Lenis smooth scroll + GSAP ScrollTrigger, canvas scrub draws only on frame
  change, videos play from blob URLs (zero mid-scroll network stutter).
- Mobile gets a lighter tier (832 w frames, 720p films, stacked impact cards).
- `prefers-reduced-motion` collapses pins/scrubs to static content.
- Background tabs: the loader keeps truthful progress via an interval fallback
  and hands over instantly, so the site is ready when the tab is focused.
