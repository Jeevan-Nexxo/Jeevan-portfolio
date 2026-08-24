import { useState } from 'react'

/**
 * SmartImage — lazy image with a clean themed fallback.
 * Missing/broken assets render an editorial placeholder instead of the
 * browser's broken-image icon, so the layout never looks broken.
 */
export default function SmartImage({ src, alt, className = '', label = 'Visual coming soon' }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center border border-line bg-surface ${className}`}
      >
        <div className="select-none text-center">
          <span className="font-display text-4xl font-bold text-outline" aria-hidden="true">
            J
          </span>
          <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
            {label}
          </p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
