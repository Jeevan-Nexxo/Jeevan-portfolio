import { SKILL_GROUPS, AI_WORKFLOW } from '../content/skills'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

/**
 * Skills — grouped by learning context. No percentage bars or fake scores.
 */
export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-editorial">
        <SectionHeader index="02" label="Stack" title="Always in" accentWord="learning mode." titleId="skills-title" />

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {SKILL_GROUPS.map((group) => (
            <Reveal
              key={group.id}
              className={group.id === '02' ? 'lg:col-span-12' : 'lg:col-span-5'}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">{group.id}</span>
                <h3 className="font-display text-xl font-semibold">{group.label}</h3>
              </div>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                {group.note}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={group.label}>
                {group.items.map((item) => (
                  <li key={item} className={group.solid ? 'chip chip--solid' : 'chip'}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* AI-assisted workflow */}
        <Reveal delay={0.05}>
          <figure className="mt-16 border-l-2 border-accent bg-surface p-6 md:mt-20 md:p-8">
            <blockquote>
              <p className="font-display text-lg font-medium leading-relaxed md:text-xl">
                {AI_WORKFLOW.body}
              </p>
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs tracking-wide text-muted">
              — {AI_WORKFLOW.title} · {AI_WORKFLOW.footnote}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
