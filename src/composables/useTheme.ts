import { ref, computed } from 'vue'

type ThemeMode = 'light' | 'dark' | 'auto'
const THEME_KEY = 'bs-theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  const v = localStorage.getItem(THEME_KEY)
  if (v === 'light' || v === 'dark' || v === 'auto') return v
  return 'auto'
}

function applyTheme(effective: 'light' | 'dark') {
  document.documentElement.setAttribute('data-bs-theme', effective)
}

const mode = ref<ThemeMode>(getStoredMode())

const effectiveTheme = computed<'light' | 'dark'>(() =>
  mode.value === 'auto' ? getSystemTheme() : mode.value
)

const isDark = computed(() => effectiveTheme.value === 'dark')

// apply initial effective theme immediately
applyTheme(effectiveTheme.value)

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', () => {
    if (mode.value === 'auto') {
      applyTheme(getSystemTheme())
    }
  })
}

export function useTheme() {
  function setMode(newMode: ThemeMode) {
    mode.value = newMode
    try {
      localStorage.setItem(THEME_KEY, newMode)
    } catch {
      /* ignore write errors */
    }
    applyTheme(effectiveTheme.value)
  }

  function setTheme(dark: boolean) {
    setMode(dark ? 'dark' : 'light')
  }

  function toggle() {
    setTheme(!isDark.value)
  }

  return { mode, isDark, effectiveTheme, setMode, setTheme, toggle }
}

