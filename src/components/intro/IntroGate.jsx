import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { INTRO } from '../../config/introConfig'
import { useSettings } from '../../context/SettingsContext'

const Scene3D = lazy(() => import('./Scene3D'))

/** Error boundary: any 3D failure → immediate fallback to the Hero. */
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError?.()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * IntroGate — orchestrates the 2–3 second 3D launch.
 *
 * On mobile (<=639px, matching the project's sm: breakpoint), the intro is
 * skipped entirely — the Hero animates in immediately.
 *
 * On tablet and desktop the intro always attempts to render. Any genuine
 * failure (slow chunk load, WebGL error, hang) falls back to the Hero via
 * the error boundary + safety timeout.
 */
export default function IntroGate({ onComplete }) {
  const { theme } = useSettings()

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches

  const [phase, setPhase] = useState(isMobile ? 'done' : 'loading')
  const finishedRef = useRef(false)

  const finish = useCallback(() => {
    if (finishedRef.current || phase === 'exiting' || phase === 'done') return
    finishedRef.current = true
    setPhase('exiting')
    // Hand off to the Hero immediately so entrances overlap the fade…
    onComplete()
    // …then fully remove the overlay.
    window.setTimeout(() => setPhase('done'), INTRO.exitFade + 60)
  }, [phase, onComplete])

  // Guard ONLY the loading phase: if the lazy chunk stalls past the timeout,
  // fall back. Once the scene mounts, the scene's own timeline drives the end.
  useEffect(() => {
    if (isMobile || phase !== 'loading') return undefined
    const t = window.setTimeout(finish, INTRO.loadTimeout)
    return () => window.clearTimeout(t)
  }, [isMobile, phase, finish])

  // Absolute safety cap — even a hung scene cannot block the site.
  useEffect(() => {
    if (isMobile) return undefined
    const t = window.setTimeout(finish, INTRO.loadTimeout + INTRO.duration + 1200)
    return () => window.clearTimeout(t)
  }, [isMobile, finish])

  const handleSceneReady = useCallback(() => setPhase('playing'), [])

  useEffect(() => {
    if (phase === 'done' && !finishedRef.current) {
      finishedRef.current = true
      onComplete()
    }
  }, [phase, onComplete])

  if (isMobile || phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex items-center justify-center"
      style={{
        backgroundColor: theme.swatch.bg,
        opacity: phase === 'exiting' ? 0 : 1,
        pointerEvents: phase === 'exiting' ? 'none' : 'auto',
        transitionProperty: 'opacity',
        transitionDuration: `${INTRO.exitFade}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <SceneErrorBoundary onError={finish}>
        <Suspense fallback={<IntroFallbackLabel />}>
          <Scene3D
            accent={theme.swatch.accent}
            ink={theme.swatch.ink}
            onReady={handleSceneReady}
            onFinish={finish}
          />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  )
}

function IntroFallbackLabel() {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">Initializing</p>
  )
}
