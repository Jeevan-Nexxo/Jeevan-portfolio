import { useCallback, useState } from 'react'
import IntroGate from '../components/intro/IntroGate'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Certifications from '../sections/Certifications'
import Contact from '../sections/Contact'

/**
 * Home — full portfolio experience.
 * The optional 3D intro (if enabled) plays above this page; the Hero's
 * cinematic entrance begins as soon as the intro completes or is skipped.
 */
export default function Home() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <IntroGate onComplete={handleIntroComplete} />
      <Navbar ready={introDone} />

      <main id="main" tabIndex={-1}>
        <Hero ready={introDone} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
