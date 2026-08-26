/**
 * 3D LAUNCH INTRO CONFIGURATION
 * -----------------------------
 * Timing + capability thresholds for the optional 2–3 second intro.
 * The intro itself lives in src/components/intro/Scene3D.jsx and is
 * lazy-loaded only when needed — removing/replacing it never breaks the site.
 */
export const INTRO = {
  /** Total time the scene plays before morphing into the Hero (ms). */
  duration: 2600,
  /** Max time allowed for the lazy 3D chunk to load before falling back (ms). */
  loadTimeout: 3000,
  /** Fade-out transition length while handing off to the Hero (ms). */
  exitFade: 650,
}
