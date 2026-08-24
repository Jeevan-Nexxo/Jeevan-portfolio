import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { INTRO } from '../../config/introConfig'
import { useSettings } from '../../context/SettingsContext'
import { useDeviceCapability } from '../../hooks/useDeviceCapability'

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
 * The intro is the default experience and always plays, except when:
 *  - User has a reduced-motion preference
 *  - Device looks incapable of smooth WebGL
 *
 * Any failure (slow chunk load, WebGL error, hang) skips straight to the
 * Hero — the visitor can never get stuck on a loading screen.
 */
export default function IntroGate({ onComplete }) {
  const { theme } = useSettings()
  const { reducedMotion, lowEnd } = useDeviceCapability()

  // The intro always plays; only genuine capability constraints skip it.
  const shouldRun = !reducedMotion && !lowEnd
  // 'loading' → chunk downloading · 'playing' → scene mounted ·
  // 'exiting' → fading out over the Hero entrance · 'done' → gone
  const [phase, setPhase] = useState(() => (shouldRun ? 'loading' : 'done'))
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
    if (phase !== 'loading') return undefined
    const t = window.setTimeout(finish, INTRO.loadTimeout)
    return () => window.clearTimeout(t)
  }, [phase, finish])

  // Absolute safety cap — even a hung scene cannot block the site.
  useEffect(() => {
    if (!shouldRun) return undefined
    const t = window.setTimeout(finish, INTRO.loadTimeout + INTRO.duration + 1200)
    return () => window.clearTimeout(t)
  }, [shouldRun, finish])

  const handleSceneReady = useCallback(() => setPhase('playing'), [])

  useEffect(() => {
    if (phase === 'done' && !finishedRef.current) {
      // Skipped entirely (reduced motion / low-end device)
      finishedRef.current = true
      onComplete()
    }
  }, [phase, onComplete])

  if (phase === 'done') return null

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
