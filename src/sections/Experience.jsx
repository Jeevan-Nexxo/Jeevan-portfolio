import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EXPERIENCE } from '../content/experience'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]

/**
 * What I Do / Experience — three consistent interactive cards.
 * Interaction reveals a compact information panel (click / tap / Enter).
 * Not a conventional résumé timeline.
 */
export default function Experience() {
  const [openId, setOpenId] = useState(null)

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div className="container-editorial">
        <SectionHeader index="04" label="What I Do" title="Experience in" accentWord="practice." titleId="experience-title" />

        <div className="flex flex-col gap-[1px] border border-line bg-line">
          {EXPERIENCE.map((item) => (
            <ExperienceCard
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ item, open, onToggle }) {
  return (
    <Reveal className="bg-bg">
      <article>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${item.id}-panel`}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 p-6 text-left transition-colors duration-300 hover:bg-surface md:grid-cols-[auto_1fr_1fr_auto] md:p-8"
        >
          <span className="font-mono text-xs text-accent">{item.index}</span>

          <span>
            <span className="block font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted">
              {item.type}
            </span>
            <span className="mt-1 block font-display text-lg font-semibold leading-snug tracking-tight md:text-2xl">
              {item.role}
            </span>
            {item.org && (
              <span className="mt-1 block text-xs leading-relaxed text-muted">{item.org}</span>
            )}
          </span>

          <span className="col-start-2 row-start-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted md:col-start-3 md:row-start-auto md:text-right">
            {item.duration}
          </span>

          <span
            aria-hidden="true"
            className={`flex h-9 w-9 items-center justify-center border font-mono text-sm transition-all duration-300 ${
              open ? 'rotate-45 border-accent text-accent' : 'border-line text-muted group-hover:border-muted'
            }`}
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${item.id}-panel`}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="border-t border-line bg-surface p-6 md:p-8">
                <p className="text-sm text-muted">{item.summary}</p>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-relaxed">
                      <span aria-hidden="true" className="font-mono text-accent">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  )
}
