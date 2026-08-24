import Button, { btnOutline } from '../components/ui/Button'

/** Custom 404 — minimal, themed, with a clear way back home. */
export default function NotFound() {
  return (
    <main
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
      aria-label="Page not found"
    >
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">( Error — 404 )</p>
      <h1 className="mt-4 font-display text-7xl font-bold tracking-tight sm:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
        This page doesn&apos;t exist. It may have been moved, or it was never here at all.
      </p>
      <Button as="a" href="/" className={`${btnOutline} mt-10`}>
        ← Back Home
      </Button>
    </main>
  )
}
