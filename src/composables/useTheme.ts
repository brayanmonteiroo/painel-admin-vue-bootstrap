import { ref } from 'vue'

const THEME_KEY = 'bs-theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): 'light' | 'dark' | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(THEME_KEY)
  return v === 'dark' || v === 'light' ? v : null
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-bs-theme', theme)
  localStorage.setItem(THEME_KEY, theme)
}

const isDark = ref(
  (() => {
    const stored = getStoredTheme()
    if (stored) return stored === 'dark'
    return getSystemTheme() === 'dark'
  })()
)

export function useTheme() {
  function setTheme(dark: boolean) {
    const theme = dark ? 'dark' : 'light'
    isDark.value = dark
    applyTheme(theme)
  }

  function toggle() {
    setTheme(!isDark.value)
  }

  return { isDark, setTheme, toggle }
}
