/**
 * Button — plain CTA link/button with clean hover states.
 * Renders an anchor or button; all interaction is native (no pointer effects),
 * so keyboard and touch behavior stay untouched.
 */
export default function Button({ as = 'a', className = '', children, ...rest }) {
  const Tag = as === 'button' ? 'button' : 'a'
  return (
    <Tag type={as === 'button' ? 'button' : undefined} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/** Shared visual styles for the two CTA variants. */
export const btnSolid =
  'inline-flex items-center justify-center gap-3 bg-accent px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-bg transition-colors duration-300 hover:bg-ink'
export const btnOutline =
  'inline-flex items-center justify-center gap-3 border border-line px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent'
