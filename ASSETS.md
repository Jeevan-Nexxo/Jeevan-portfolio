# ASSETS — What To Provide For The Portfolio

Drop files into `public/` at the paths listed below — no code changes needed.
Until an asset exists, `SmartImage` renders a clean themed placeholder
("visual coming soon") instead of a broken image, so nothing looks broken.

---

## ✅ Already present

| File | Used by |
| --- | --- |
| `public/favicon.svg` | Browser tab icon — gold "J" mark |
| `public/assets/resume/jeevansri_resume.pdf` | Contact → "Download Resume" button |
| `public/assets/photos/contact-casual.jpg` | Contact section photo (portrait polaroid) |

---

## 🎬 3D Intro (existing — no action required)

The 3D launch animation is compiled and lazy-loaded automatically.

| Component | Path | Purpose |
| --- | --- | --- |
| `IntroGate` | `src/components/intro/IntroGate.jsx` | Orchestrates load → play → exit overlay |
| `Scene3D` | `src/components/intro/Scene3D.jsx` | R3F canvas: wireframe cube + orbiting particles + drifting light |
| Config | `src/config/introConfig.js` | Timing constants (2.6s play, 3s load timeout, 650ms fade) |
| Dependencies | `three`, `@react-three/fiber` in `package.json` | R3F runtime |

Build output: lazy chunk `dist/assets/Scene3D-*.js` (~850 KB).

**Fallbacks (built-in):** error boundary → skip to Hero; load timeout → skip.
No heuristic gates — the intro always attempts to render. No Admin toggle exists.

---

## 🔴 REQUIRED — missing right now

### 1. APEX project preview
- **Filename:** `apex.jpg`
- **Type:** Image (screenshot / UI mockup collage)
- **Place at:** `public/assets/projects/apex.jpg`
- **Used in:** Projects card 01 — 16:9 media area
- **Specs:** Landscape **16:9**, minimum **1600×900**, JPG or WebP, dark-friendly.
  Best content: dashboard/home view of the platform, or a 2–3 screenshot collage.

### 2. Birthday Experience preview
- **Filename:** `birthday-experience.jpg`
- **Type:** Image (screenshot)
- **Place at:** `public/assets/projects/birthday-experience.jpg`
- **Used in:** Projects card 03 — 16:9 media area
- **Specs:** Landscape **16:9**, minimum **1600×900**.
  Best moment: a scene with strong visuals (balloons / memories / welcome screen).

### 3. Arun Portfolio preview
- **Filename:** `arun-portfolio.jpg`
- **Type:** Image (full-page screenshot)
- **Place at:** `public/assets/projects/arun-portfolio.jpg`
- **Used in:** Projects card 02 — 16:9 media area
- **Specs:** Landscape **16:9**, minimum **1600×900**. Hero section of the site works best.

### 4. This Portfolio preview
- **Filename:** `this-portfolio.jpg`
- **Type:** Image (screenshot of this site)
- **Place at:** `public/assets/projects/this-portfolio.jpg`
- **Used in:** Projects card 04 — 16:9 media area
- **Specs:** Landscape **16:9**, minimum **1600×900**. A desktop hero shot
  (optionally composited with a mobile view) represents it best.

### 5. AI Internship certificate scan
- **Filename:** `ai-internship.jpg`
- **Type:** Image (certificate scan/photo, straightened & cropped)
- **Place at:** `public/assets/certificates/ai-internship.jpg`
- **Used in:** Certifications → "Preview" expandable area (emphasized card)
- **Specs:** Landscape **4:3**, minimum **1200×900**, readable text after crop.

### 6. C Essentials 1 certificate scan
- **Filename:** `c-essentials-1.jpg`
- **Type:** Image (certificate scan/photo)
- **Place at:** `public/assets/certificates/c-essentials-1.jpg`
- **Used in:** Certifications → "Preview" expandable area
- **Specs:** Landscape **4:3**, minimum **1200×900**.

### 7. MonoFik font file (LIZZ Easter egg)
- **Filename:** `MonoFik.woff2` (or `.ttf`)
- **Place at:** `public/assets/fonts/MonoFik.woff2`
- **Used in:** Contact section — hidden "LIZZ" cursor-reveal typography
- **Until added:** text renders in Space Grotesk fallback (nothing breaks).

### 8. Open Graph share image
- **Filename:** `og-image.png`
- **Type:** PNG image (social link preview)
- **Place at:** `public/assets/branding/og-image.png`
- **Used in:** WhatsApp/Discord/Twitter link previews (`index.html` OG + Twitter meta)
- **Specs:** Exactly **1200×630**. Suggested: dark `#111111` background, big
  "JEEVANSRI G." display type with gold accent dot, matching favicon identity.

---

## 🟡 Live URLs — add later in code

Project cards show **Live URL** only (no GitHub fields in project data).
GitHub links live in the Contact section's socials block.

To wire a URL, set `liveUrl` on the matching object in `src/content/projects.js`.
`null` renders the disabled `Live · Soon` state; no other change is needed.

| Project | Data path | Current | Status |
| --- | --- | --- | --- |
| APEX | `projects.js → apex.liveUrl` | `null` | Waiting for deployment |
| Arun Portfolio | `projects.js → arun-portfolio.liveUrl` | `null` | Waiting for deployment |
| Birthday Experience | `projects.js → birthday-experience.liveUrl` | `null` | **Reserved — add after deployment** |
| This Portfolio | `projects.js → this-portfolio.liveUrl` | `#top` | Already wired (smooth-scrolls to top of site) |

---

## 🟢 OPTIONAL — nice to have later

| Filename | Place at | Purpose |
| --- | --- | --- |
| `apple-touch-icon.png` (180×180) | `public/` | iOS home-screen icon |
| Higher-res `contact-casual.jpg` | replace existing | Sharper on large screens (current file is fine) |
| WebP versions of images above | alongside JPGs | ~30% smaller loads |

---

## 📐 Quick spec recap

- Project previews → **16:9** (1600×900+), landscape
- Certificate scans → **4:3** (1200×900+), landscape, text readable
- Social share image → **1200×630** PNG
- All images use `object-cover`, so keeping the important subject centred matters more than exact ratios.
