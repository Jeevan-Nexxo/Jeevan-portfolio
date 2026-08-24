# ASSETS — What To Provide For The Portfolio

Single checklist of every asset/content item the code references or will need.
Drop files into `public/` exactly at the paths below — no code changes needed.
Until an asset exists, `SmartImage` renders a clean themed placeholder
("visual coming soon") instead of a broken image, so nothing looks broken.

---

## ✅ Already present

| File | Used by |
| --- | --- |
| `public/favicon.svg` | Browser tab icon — custom gold "J" mark |
| `public/assets/photos/contact-casual.jpg` | Contact section photo (portrait polaroid) |

---

## 🔴 REQUIRED — missing right now

### 1. Resume PDF
- **Filename:** `resume.pdf`
- **Type:** PDF document
- **Place at:** `public/assets/resume/resume.pdf`
- **Used in:** Contact → "Download Resume" button (`PROFILE.resumePath`)
- **Required:** YES — the download button currently 404s silently.
- **Specs:** Any size; keep under ~2 MB. Name stays `resume.pdf`.

### 2. APEX project preview
- **Filename:** `apex.jpg`
- **Type:** Image (screenshot / UI mockup collage)
- **Place at:** `public/assets/projects/apex.jpg`
- **Used in:** Projects section — featured card, expands full-width on focus
- **Required:** YES (flagship project)
- **Specs:** Landscape **16:9**, minimum **1600×900**, JPG or WebP, dark-friendly.
  Best content: dashboard/home view of the platform, or a 2–3 screenshot collage.

### 3. Birthday Experience preview
- **Filename:** `birthday-experience.jpg`
- **Type:** Image (screenshot)
- **Place at:** `public/assets/projects/birthday-experience.jpg`
- **Used in:** Projects section card (16:9 media area)
- **Required:** YES
- **Specs:** Landscape **16:9**, minimum **1600×900**.
  Best moment: a scene with strong visuals (balloons / memories / welcome screen).

### 4. Arun Portfolio preview
- **Filename:** `arun-portfolio.jpg`
- **Type:** Image (full-page screenshot)
- **Place at:** `public/assets/projects/arun-portfolio.jpg`
- **Used in:** Projects section card (16:9 media area)
- **Required:** YES
- **Specs:** Landscape **16:9**, minimum **1600×900**. Hero section of the site works best.

### 5. This Portfolio preview
- **Filename:** `this-portfolio.jpg`
- **Type:** Image (screenshot of this site itself)
- **Place at:** `public/assets/projects/this-portfolio.jpg`
- **Used in:** Projects card 04 media area
- **Required:** YES
- **Specs:** Landscape **16:9**, minimum **1600×900**. A desktop hero shot
  (optionally composited with a mobile view) represents it best.

### 6. AI Internship certificate scan
- **Filename:** `ai-internship.jpg`
- **Type:** Image (certificate scan/photo, straightened & cropped)
- **Place at:** `public/assets/certificates/ai-internship.jpg`
- **Used in:** Certifications → "Preview" expandable area (emphasized card)
- **Required:** YES
- **Specs:** Landscape **4:3**, minimum **1200×900**, readable text after crop.

### 7. C Essentials 1 certificate scan
- **Filename:** `c-essentials-1.jpg`
- **Type:** Image (certificate scan/photo)
- **Place at:** `public/assets/certificates/c-essentials-1.jpg`
- **Used in:** Certifications → "Preview" expandable area
- **Required:** YES
- **Specs:** Landscape **4:3**, minimum **1200×900**.

### 8. MonoFik font file (LIZZ Easter egg)
- **Filename:** `MonoFik.woff2` (or `MonoFik.ttf`)
- **Type:** Font file
- **Place at:** `public/assets/fonts/MonoFik.woff2`
- **Used in:** Contact section — the hidden "LIZZ" cursor-reveal typography
- **Required:** YES for the intended look — until added, the text silently
  renders in the Space Grotesk fallback (nothing breaks).
- **Specs:** Regular weight is fine; bold styling is applied via CSS.

### 9. Open Graph share image
- **Filename:** `og-image.png`
- **Type:** PNG image (social link preview)
- **Place at:** `public/assets/branding/og-image.png`
- **Used in:** WhatsApp/Discord/Twitter link previews (`index.html` OG + Twitter meta)
- **Required:** YES before sharing the link anywhere public
- **Specs:** Exactly **1200×630**. Suggested: dark `#111111` background, big
  "JEEVANSRI G." display type with gold accent dot, matching favicon identity.

---

## 🟡 CONTENT VALUES (not files — tell me the value and I'll wire them)

Project cards use **Live URLs only** — by design there are no GitHub fields in
project data; GitHub links live exclusively in the Contact section.

To add a Live URL later, set `liveUrl` in `src/content/projects.js` on the
matching project object (`null` currently renders the disabled "Live · Soon"
state — no other change is needed):

| Project | Where to add | Currently | Needed |
| --- | --- | --- | --- |
| APEX | `projects.js → apex.liveUrl` | `null` ("Live · Soon") | URL when deployed |
| Arun Portfolio | `projects.js → arun-portfolio.liveUrl` | `null` ("Live · Soon") | URL of the deployed site |
| Birthday Experience | `projects.js → birthday-experience.liveUrl` | `null` ("Live · Soon") | **Reserved slot — add after deployment** |

---

## 🟢 OPTIONAL — nice to have later

| Filename | Place at | Purpose | Required |
| --- | --- | --- | --- |
| `apple-touch-icon.png` (180×180) | `public/` | iOS home-screen icon | Optional |
| `og-preview-alt.png` variants | `public/assets/branding/` | Alternate share images | Optional |
| Higher-res `contact-casual.jpg` | replace existing | Sharper on large screens (current file is fine) | Optional |
| WebP versions of all images above | alongside JPGs | ~30% smaller loads | Optional |

---

## 📐 Quick spec recap

- Project previews → **16:9** (1600×900+), landscape
- Certificate scans → **4:3** (1200×900+), landscape, text readable
- Social share image → **1200×630** PNG
- All images are rendered with `object-cover`, so exact ratios matter less than
  keeping the important subject centered.
