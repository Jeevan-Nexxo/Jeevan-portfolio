import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress — minimal vertical indicator pinned to the right edge.
 * Subtle hairline track + accent fill; purely decorative (aria-hidden),
 * never intercepts pointer events or interferes with scrolling.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-1/2 z-30 hidden h-[38vh] w-[2px] -translate-y-1/2 sm:block md:right-5"
      style={{ backgroundColor: 'var(--line)' }}
    >
      <motion.div
        className="h-full w-full origin-top"
        style={{ scaleY, backgroundColor: 'var(--accent)' }}
      />
    </motion.div>
  )
}
