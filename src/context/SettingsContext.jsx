import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY, THEMES } from '../config/themes'

const SettingsContext = createContext(null)

/**
 * Central app settings: theme preset.
 * Persisted to localStorage so the choice survives refresh.
 * Also syncs the active theme to <html data-theme> for the token system.
 *
 * Note: the 3D launch intro is not a setting — it always plays automatically
 * (with error-boundary and safety-timeout fallbacks).
 */
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
    } catch {
      /* corrupted storage — fall back to defaults */
    }
    return DEFAULT_SETTINGS
  })

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* storage unavailable (private mode) — settings stay in-memory */
    }
  }, [settings])

  const setTheme = useCallback(
    (theme) => setSettings((s) => ({ ...s, theme })),
    []
  )
  const resetDefaults = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  const value = useMemo(
    () => ({
      settings,
      theme: THEMES.find((t) => t.id === settings.theme) ?? THEMES[0],
      setTheme,
      resetDefaults,
    }),
    [settings, setTheme, resetDefaults]
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>')
  return ctx
}
