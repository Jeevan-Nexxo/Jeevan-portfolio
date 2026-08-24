/**
 * CENTRALIZED THEME PRESETS
 * Each preset defines the three core tokens; derived tokens
 * (surface, muted, line) are computed in styles/main.css.
 */
export const THEMES = [
  {
    id: 'warm-editorial-tech',
    label: 'Warm Editorial Tech',
    swatch: { bg: '#111111', ink: '#F5F1E8', accent: '#D6A72C' },
  },
  {
    id: 'editorial-cinematic',
    label: 'Editorial Cinematic',
    swatch: { bg: '#121212', ink: '#F3EBDD', accent: '#C96B3C' },
  },
  {
    id: 'experimental-tech',
    label: 'Experimental Tech',
    swatch: { bg: '#151515', ink: '#E5E5E5', accent: '#B7D63A' },
  },
  {
    id: 'warm-cinematic',
    label: 'Warm Cinematic',
    swatch: { bg: '#161412', ink: '#F4EFE6', accent: '#B85C38' },
  },
]

export const DEFAULT_SETTINGS = {
  theme: 'warm-editorial-tech',
}

export const SETTINGS_STORAGE_KEY = 'jd-portfolio-settings-v1'
