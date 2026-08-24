import { motion } from 'framer-motion'
import { PROFILE, FOOTER } from '../../content/profile'

const LINKS = [
  PROFILE.socials.github,
  PROFILE.socials.linkedin,
  PROFILE.socials.instagram,
]

/**
 * Footer — minimal premium footer with a subtle cinematic reveal.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-line" aria-label="Footer">
      <div className="container-editorial py-14 md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,9vw,7rem)] font-bold leading-none tracking-tight"
        >
          {PROFILE.firstName}
          <span className="text-accent">.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{FOOTER.tagline}</p>

          <ul className="flex items-center gap-6">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-accent"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${PROFILE.emails.primary}`}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-accent"
              >
                Email
              </a>
            </li>
          </ul>
        </motion.div>

        <div className="rule-h mt-10" aria-hidden="true" />
        <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
          {FOOTER.copyright}
        </p>
      </div>
    </footer>
  )
}
