import { useEffect, useState } from 'react'

/**
 * Device capability snapshot used by the custom cursor and the 3D intro.
 * Re-evaluates when the user changes motion preference mid-session.
 */
export function useDeviceCapability() {
  const [cap, setCap] = useState(() => read())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setCap(read())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return cap
}

function read() {
  if (typeof window === 'undefined') {
    return { pointerFine: false, reducedMotion: false, lowEnd: false }
  }
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = navigator.deviceMemory ?? 8
  return {
    pointerFine: window.matchMedia('(pointer: fine)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    lowEnd: cores <= 2 || memory < 4,
  }
}
