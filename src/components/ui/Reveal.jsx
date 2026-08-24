import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Reveal — scroll-triggered fade/slide-in wrapper (whileInView).
 * Used for section-level entrances; content stays readable without motion
 * because framer's reducedMotion="user" config neutralizes transforms.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * MaskReveal — kinetic typography primitive: text slides up from behind
 * an overflow mask. Accessible: real text is always in the DOM.
 */
export function MaskReveal({ children, delay = 0, active = true, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: '110%' }}
        animate={active ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
      {children}
    </motion.span>
    </span>
  )
}
