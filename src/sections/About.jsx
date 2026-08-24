import { PROFILE } from '../content/profile'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

/**
 * About — short, honest, human. Communicates current stage and direction.
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-editorial">
        <SectionHeader index="01" label="About" title="Curious by default," accentWord="builder by choice." titleId="about-title" />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-1">
            <Reveal>
              <p className="text-lg leading-relaxed md:text-xl">{PROFILE.bio[0]}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">{PROFILE.bio[1]}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">{PROFILE.bio[2]}</p>
            </Reveal>

            {PROFILE.approachBlocks?.map((block, i) => (
              <Reveal key={block.label} delay={0.2 + i * 0.06}>
                <div className="mt-10 max-w-xl md:mt-12" data-approach-block={block.label}>
                  <div className="rule-h" aria-hidden="true" />
                  <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    {block.label}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{block.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Currently exploring
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas currently being explored">
                {PROFILE.currentlyExploring.map((area) => (
                  <li key={area} className="chip chip--solid">
                    {area}
                  </li>
                ))}
              </ul>
              <div className="rule-h my-8" aria-hidden="true" />
              <p className="font-mono text-xs leading-loose tracking-wide text-muted">
                STATUS — LEARNING &amp; BUILDING
                <br />
                MODE — EXPLORATION → IMPLEMENTATION
                <br />
                FOCUS — REAL-WORLD PRODUCTS
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
