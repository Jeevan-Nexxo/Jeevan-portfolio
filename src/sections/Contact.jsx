import { useRef, useState } from 'react'
import { PROFILE } from '../content/profile'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import Button, { btnSolid, btnOutline } from '../components/ui/Button'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

/**
 * Contact / Work With Me — career + income paths, both emails, socials,
 * working resume CTA, and the editorial leaning contact photo.
 *
 * LIZZ EASTER EGG — cursor-proximity mask reveal:
 * The photo itself is NEVER faded, masked or hidden. A separate typographic
 * layer ("LIZZ") sits above a precise region of the photo and stays invisible
 * until the pointer enters that exact region, where a soft radial mask
 * reveals the letters locally. Leaving hides them again. Touch devices skip
 * the effect entirely; the Contact section is unaffected either way.
 */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-editorial">
        <SectionHeader
          index="06"
          label="Work With Me"
          title="Have a project, idea, or opportunity?"
          accentWord="Let's talk."
          titleId="contact-title"
        />

        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* Paths + CTAs */}
          <div className="lg:col-span-6">
            <Reveal>
              <ul className="flex flex-wrap gap-2" aria-label="Ways we can work together">
                {PROFILE.workPreferences.map((pref) => (
                  <li key={pref} className="chip chip--solid">
                    {pref}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={`mailto:${PROFILE.emails.primary}`} className={`${btnSolid} min-h-[48px]`}>
                  Let's Connect <span aria-hidden="true">↗</span>
                </Button>
                <Button
                  href={PROFILE.resumePath}
                  download
                  className={`${btnOutline} min-h-[48px]`}
                >
                  Download Resume <span aria-hidden="true">↓</span>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Detail label="Email">
                  <a href={`mailto:${PROFILE.emails.primary}`} className="detail-link">
                    {PROFILE.emails.primary}
                  </a>
                </Detail>
                <Detail label="Phone">
                  <a href={PROFILE.phone.href} className="detail-link">
                    {PROFILE.phone.display}
                  </a>
                </Detail>
                <Detail label="GitHub">
                  <a
                    href={PROFILE.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    @{PROFILE.socials.github.url.split('/').pop()}{' '}
                    <span aria-hidden="true">↗</span>
                  </a>
                </Detail>
                <Detail label="LinkedIn">
                  <a
                    href={PROFILE.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    /jeevansri-dev <span aria-hidden="true">↗</span>
                  </a>
                </Detail>
                <Detail label="Instagram">
                  <a
                    href={PROFILE.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    @_.st4zx.exe._ <span aria-hidden="true">↗</span>
                  </a>
                </Detail>
              </dl>
            </Reveal>
          </div>

          {/* Editorial leaning photo + easter egg */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <ContactPhoto />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Detail({ label, children }) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted">{label}</dt>
      <dd className="mt-2 break-all text-sm">{children}</dd>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function ContactPhoto() {
  const { pointerFine } = useDeviceCapability()
  const eggEnabled = pointerFine // touch devices never run the effect
  const wrapRef = useRef(null)
  const textRef = useRef(null)
  const [egg, setEgg] = useState({ active: false, x: '50%', y: '50%' })

  const handleMove = (e) => {
    if (!eggEnabled || !wrapRef.current || !textRef.current) return
    const wrapRect = wrapRef.current.getBoundingClientRect()
    const textRect = textRef.current.getBoundingClientRect()
    const lx = e.clientX - textRect.left
    const ly = e.clientY - textRect.top

    // Is the pointer inside the EXACT region where the hidden text lives?
    const inside =
      e.clientX >= textRect.left - 10 &&
      e.clientX <= textRect.right + 10 &&
      e.clientY >= textRect.top - 14 &&
      e.clientY <= textRect.bottom + 14

    setEgg({ active: inside, x: `${lx}px`, y: `${ly}px` })
  }

  const handleLeave = () => setEgg((s) => ({ ...s, active: false }))

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(95px circle at ${egg.x} ${egg.y}, black 35%, transparent 100%)`,
    maskImage: `radial-gradient(95px circle at ${egg.x} ${egg.y}, black 35%, transparent 100%)`,
  }

  return (
    <figure
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-64 max-w-full rotate-[-3deg] border border-line bg-surface p-3 shadow-[10px_10px_0_0_var(--line)] sm:w-72 lg:mt-[-2.5rem] lg:ml-auto lg:mr-0 xl:w-80"
    >
      <SmartImage
        src={PROFILE.contactPhoto}
        alt="Jeevansri — casual photograph"
        label="Casual photo coming soon"
        className="aspect-[4/5] w-full"
      />

      {/* Caption strip */}
      <figcaption className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[0.5625rem] uppercase tracking-[0.25em] text-muted">
        <span>Jeevansri — Off duty</span>
        <span aria-hidden="true" className="text-accent">
          ◆
        </span>
      </figcaption>

      {/* LIZZ egg layer — independent of the photo; only this layer fades */}
      {eggEnabled && (
        <div
          ref={textRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[36%] z-10 -translate-x-1/2 select-none"
          style={maskStyle}
        >
          <span
            className={`block font-easter text-[2.625rem] font-bold tracking-[0.28em] text-black drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] transition-opacity duration-300 xl:text-[3.375rem] ${
              egg.active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            LIZZ
          </span>
        </div>
      )}
    </figure>
  )
}
