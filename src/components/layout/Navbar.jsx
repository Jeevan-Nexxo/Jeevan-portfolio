import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../../content/profile'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Navbar — small, premium, unobtrusive. Gains a hairline + blur after scroll.
 * Anchor links + CSS smooth scrolling keep it keyboard friendly.
 */
export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-sm' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-editorial flex h-14 items-center justify-between md:h-16"
      >
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight"
          aria-label={`${PROFILE.name} — back to top`}
        >
          {PROFILE.firstName}
          <span className="text-accent">.</span>
        </a>

        <ul className="flex items-center gap-5 sm:gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
