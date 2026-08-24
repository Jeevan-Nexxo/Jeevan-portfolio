import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ADMIN_PASSWORD } from '../../config/adminConfig'
import { THEMES } from '../../config/themes'
import { useSettings } from '../../context/SettingsContext'

const AUTH_KEY = 'jd-admin-authed'

/**
 * AdminPanel — FRONTEND-ONLY DEMO CONTROL PANEL.
 * Opened with Ctrl + Shift + J. Not exposed in public navigation.
 *
 * ⚠ The password check is intentionally hardcoded and NOT secure — it exists
 * purely as a demo gate. See src/config/adminConfig.js.
 */
export default function AdminPanel() {
  const { settings, setTheme, resetDefaults } = useSettings()
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  // Global shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyJ') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setError(false)
      setInput('')
    } else {
      setError(true)
    }
  }

  const close = () => {
    setOpen(false)
    setError(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close admin panel"
            onClick={close}
            className="absolute inset-0 bg-black/70"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Demo admin panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md border border-line bg-bg p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-accent">
                  Restricted · Demo
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold">Demo Admin Panel</h2>
              </div>
              <button
                onClick={close}
                className="border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Close panel"
              >
                ✕
              </button>
            </div>

            {!authed ? (
              <form onSubmit={submit} className="mt-8">
                <label
                  htmlFor="admin-pass"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
                >
                  Admin Password
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  value={input}
                  autoFocus
                  onChange={(e) => {
                    setInput(e.target.value)
                    setError(false)
                  }}
                  className={`mt-3 w-full border bg-surface px-4 py-3 font-mono text-sm outline-none transition-colors focus-visible:outline-none ${
                    error ? 'border-accent' : 'border-line focus:border-muted'
                  }`}
                  placeholder="••••••••"
                />
                {error && (
                  <p role="alert" className="mt-2 font-mono text-xs text-accent">
                    Incorrect password.
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-5 w-full bg-accent px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-ink"
                >
                  Unlock
                </button>
              </form>
            ) : (
              <div className="mt-8 space-y-8">
                {/* Theme preset */}
                <fieldset>
                  <legend className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    Theme Preset
                  </legend>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setTheme(theme.id)}
                        aria-pressed={settings.theme === theme.id}
                        className={`flex items-center gap-3 border p-3 text-left transition-colors ${
                          settings.theme === theme.id
                            ? 'border-accent'
                            : 'border-line hover:border-muted'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="relative h-7 w-7 shrink-0 rounded-full border"
                          style={{
                            borderColor: theme.swatch.accent,
                            backgroundColor: theme.swatch.bg,
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              right: 1,
                              bottom: 1,
                              width: 9,
                              height: 9,
                              borderRadius: '50%',
                              backgroundColor: theme.swatch.accent,
                            }}
                          />
                        </span>
                        <span className="text-xs leading-tight">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
                  <button
                    onClick={resetDefaults}
                    className="font-mono text-xs uppercase tracking-[0.15em] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    Reset to Defaults
                  </button>
                  <button
                    onClick={close}
                    className="bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-bg transition-colors hover:bg-ink"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            <p className="mt-6 border-t border-line pt-4 font-mono text-[0.625rem] leading-relaxed text-muted">
              Frontend-only demo controls. This is not secure authentication — settings are stored
              locally in your browser.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
