import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS } from '../content/projects'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Projects — premium two-column editorial grid.
 * Preview media reveals on hover (desktop) or tap (touch devices).
 */
export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-editorial">
        <SectionHeader index="03" label="Selected Work" title="Things I'm" accentWord="building." titleId="work-title" />

        <div className="grid gap-[1px] border border-line bg-line md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
  const { pointerFine } = useDeviceCapability()
  const [hovered, setHovered] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false) // mobile tap-preview
  const mediaRef = useRef(null)

  const handleCardClick = () => {
    if (!pointerFine) setPreviewOpen((v) => !v)
  }

  const handleMediaMove = (e) => {
    // subtle pointer-parallax on the preview image
    const el = mediaRef.current
    if (!el || !pointerFine) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--px', px.toFixed(3))
    el.style.setProperty('--py', py.toFixed(3))
  }

  const mediaVisible = previewOpen || Boolean(pointerFine && hovered)

  return (
    <article
      aria-label={`${project.name} — ${project.status}`}
      className={`relative flex h-full flex-col overflow-hidden bg-bg transition-colors duration-300 ${
        hovered && pointerFine ? 'bg-surface' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      {/* Media / preview */}
      <div
        ref={mediaRef}
        onMouseMove={handleMediaMove}
        className={`relative aspect-[16/9] overflow-hidden border-b border-line transition-all duration-500 ${
          mediaVisible ? '' : 'aspect-[16/4]'
        }`}
        style={{ ['--px']: 0, ['--py']: 0 }}
        aria-hidden={!mediaVisible || undefined}
      >
        <AnimatePresence>
          {mediaVisible && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 p-3 will-change-transform"
              style={{
                transform: 'translate(calc(var(--px) * 10px), calc(var(--py) * 10px))',
              }}
            >
              <SmartImage
                src={project.image}
                alt={`${project.name} project preview`}
                label={`${project.name} visual coming soon`}
                className="h-full w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ghost index */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-3 font-display text-6xl font-bold text-outline transition-opacity duration-300 ${
            mediaVisible ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {project.index}
        </span>

        {/* View indicator */}
        {mediaVisible && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute right-3 top-3 bg-accent px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-bg"
          >
            View <span aria-hidden="true">↗</span>
          </motion.span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-accent">{project.index}</span>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {project.name}
            </h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-muted">{project.description}</p>

        {project.highlight && (
          <p className="flex gap-2 text-sm leading-relaxed text-muted">
            <span aria-hidden="true" className="font-mono text-accent">—</span>
            <span>{project.highlight}</span>
          </p>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex items-center gap-5 pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

function StatusBadge({ status }) {
  const tone =
    status === 'Currently in Development' || status === 'Currently Live / In Development'
      ? { dot: 'var(--accent)', text: 'text-accent', pulse: true }
      : status === 'Deployed'
        ? { dot: 'var(--ink)', text: '', pulse: false }
        : { dot: 'var(--muted)', text: 'text-muted', pulse: false }

  return (
    <span
      className={`flex shrink items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${tone.text}`}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {tone.pulse && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: tone.dot }}
          />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tone.dot }} />
      </span>
      {status}
    </span>
  )
}

function ProjectLinks({ project }) {
  if (!project.liveUrl) {
    return (
      <span
        aria-disabled="true"
        title="Link coming soon"
        className="select-none font-mono text-xs uppercase tracking-[0.18em] text-muted opacity-60"
      >
        Live · Soon
      </span>
    )
  }
  return (
    <a
      href={project.liveUrl}
      {...(project.liveUrl.startsWith('#')
        ? {} // same-page anchor (e.g. "This Portfolio" → current site)
        : { target: '_blank', rel: 'noopener noreferrer' })}
      className="font-mono text-xs uppercase tracking-[0.18em] underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {project.liveLabel ?? 'Live'} <span aria-hidden="true">↗</span>
    </a>
  )
}
