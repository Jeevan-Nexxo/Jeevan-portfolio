import { motion } from 'framer-motion'
import { PROFILE } from '../content/profile'
import Button, { btnSolid, btnOutline } from '../components/ui/Button'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Hero — asymmetric editorial composition.
 * Entrance sequence (staggered): metadata → name mask reveal → role →
 * supporting copy → CTAs → scroll indicator. Runs once `ready` is true,
 * i.e. after the optional 3D intro completes or is skipped.
 */
export default function Hero({ ready }) {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* Top metadata row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="container-editorial"
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-muted sm:text-xs">
            Portfolio — ©2026
          </p>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.3em] text-muted sm:text-xs md:block">
            Open to internships · Projects · Collabs
          </p>
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-accent md:hidden" />
        </div>
      </motion.div>

      {/* Main composition */}
      <div className="container-editorial relative grid flex-1 items-center gap-10 py-12 lg:grid-cols-12">
        {/* Vertical hairline — editorial grid detail */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="absolute right-0 top-8 hidden h-[70%] w-px origin-top bg-line lg:block"
        />

        <div className="lg:col-span-9">
          {/* Name */}
          <h1 className="font-display text-[clamp(3rem,11.5vw,10rem)] font-bold leading-[0.95] tracking-tight">
            <NameLine text="JEEVANSRI" ready={ready} baseDelay={0.3} />
            <span className="block">
              <MaskedLetter char="G" delay={0.85} ready={ready} className="text-accent" />
            </span>
            <span className="sr-only">{PROFILE.name}</span>
          </h1>
        </div>

        <div className="lg:col-span-3 lg:pr-10">
          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
            className="font-mono text-xs uppercase leading-relaxed tracking-[0.22em] text-muted lg:border-l lg:border-line lg:pl-5"
          >
            {PROFILE.role}
          </motion.p>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
            className="mt-5 max-w-sm text-sm leading-relaxed text-muted lg:border-l lg:border-line lg:pl-5 lg:text-base"
          >
            {PROFILE.heroStatement}
          </motion.p>
        </div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 1.35 }}
        className="container-editorial pb-8"
      >
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button href="#work" className={`${btnSolid} min-h-[48px]`}>
              View Work <span aria-hidden="true">↓</span>
            </Button>
            <Button href="#contact" className={`${btnOutline} min-h-[48px]`}>
              Contact
            </Button>
          </div>

          {/* Scroll indicator + credential meta */}
          <div className="hidden items-center gap-10 md:flex">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted">
              B.Sc CS · Second Year
            </p>
            <div className="flex items-center gap-3" aria-hidden="true">
              <ScrollLine ready={ready} />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/** One display line of staggered masked letters (kinetic typography). */
function NameLine({ text, ready, baseDelay }) {
  return (
    <span className="block" aria-hidden="true">
      {text.split('').map((char, i) => (
        <MaskedLetter key={i} char={char} delay={baseDelay + i * 0.045} ready={ready} />
      ))}
    </span>
  )
}

function MaskedLetter({ char, delay, ready, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: '112%' }}
        animate={ready ? { y: '0%' } : { y: '112%' }}
        transition={{ duration: 0.75, delay, ease: EASE }}
      >
        {char}
      </motion.span>
    </span>
  )
}

function ScrollLine({ ready }) {
  return (
    <span className="relative block h-12 w-px overflow-hidden bg-line">
      <motion.span
        className="absolute inset-x-0 top-0 block h-1/2 bg-accent"
        animate={ready ? { y: ['-100%', '220%'] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
      />
    </span>
  )
}
