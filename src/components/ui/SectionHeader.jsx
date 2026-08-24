import Reveal from './Reveal'

/**
 * SectionHeader — consistent editorial header for every section:
 * mono index/label rule + large display title with staggered reveal.
 * `titleId` must match the section's aria-labelledby target.
 */
export default function SectionHeader({ index, label, title, accentWord, titleId }) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">{index}</span>
          <span className="rule-h w-10" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {title} {accentWord && <span className="text-accent">{accentWord}</span>}
        </h2>
      </Reveal>
    </header>
  )
}
