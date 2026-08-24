import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CERTIFICATIONS } from '../content/certifications'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Certifications — compact premium credential cards.
 * The AI internship receives stronger visual emphasis (practical experience).
 * Interaction expands a certificate preview where the asset exists.
 */
export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div className="container-editorial">
        <SectionHeader index="05" label="Credentials" title="Verified" accentWord="milestones." titleId="certifications-title" />

        <div className="grid gap-[1px] border border-line bg-line lg:grid-cols-5">
          {CERTIFICATIONS.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ cert }) {
  const [open, setOpen] = useState(false)

  return (
    <Reveal className={`bg-bg ${cert.emphasized ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
      <article className="relative flex h-full flex-col p-6 md:p-8">
        {cert.emphasized && (
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 h-10 w-10 border-b border-l border-accent"
          />
        )}

        {cert.emphasized && (
          <p className="mb-4 inline-flex w-fit bg-accent px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-bg">
            Practical Experience
          </p>
        )}

        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted">
          Issued by — {cert.issuer}
        </p>

        <h3
          className={`mt-3 font-display font-semibold tracking-tight ${
            cert.emphasized ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          }`}
        >
          {cert.title}
        </h3>

        <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">{cert.date}</p>

        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{cert.note}</p>

        {/* Preview toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${cert.id}-preview`}
          className="mt-6 flex w-fit items-center gap-2 border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {open ? 'Hide Preview' : 'Preview'}
          <span aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${cert.id}-preview`}
              key="preview"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-5 aspect-[4/3] border border-line p-2">
                <SmartImage
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  label="Certificate scan coming soon"
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  )
}
