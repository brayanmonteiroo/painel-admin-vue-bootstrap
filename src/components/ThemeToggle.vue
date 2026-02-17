<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { Dropdown } from 'bootstrap'

const { mode, isDark, setMode } = useTheme()

const options = [
  { value: 'light' as const, label: 'Light', icon: 'bi-sun-fill' },
  { value: 'dark' as const, label: 'Dark', icon: 'bi-moon-stars-fill' },
  { value: 'auto' as const, label: 'Auto', icon: 'bi-circle-half' },
]

const currentIcon = computed(() =>
  mode.value === 'dark' || (mode.value === 'auto' && isDark.value)
    ? 'bi-moon-stars-fill'
    : mode.value === 'auto'
    ? 'bi-circle-half'
    : 'bi-sun-fill'
)

const btnRef = ref<HTMLElement | null>(null)
let dropdownInstance: any = null
const iconRef = ref<HTMLElement | null>(null)
const DEBUG = true

function toggleDropdownManual() {
  console.log('ThemeToggle: manual toggle called')
  if (dropdownInstance) {
    dropdownInstance.toggle()
  }
}

onMounted(() => {
  if (btnRef.value) {
    try {
      dropdownInstance = Dropdown.getOrCreateInstance(btnRef.value)
    } catch (e) {
      // ignore
      console.warn('ThemeToggle: bootstrap Dropdown init failed', e)
    }
  }
})

onUnmounted(() => {
  if (dropdownInstance && typeof dropdownInstance.dispose === 'function') {
    try {
      dropdownInstance.dispose()
    } catch {
      // ignore
    }
  }
})

function highlightRect(rect: DOMRect, color = 'red') {
  const d = document.createElement('div')
  d.style.position = 'fixed'
  d.style.left = rect.left + 'px'
  d.style.top = rect.top + 'px'
  d.style.width = rect.width + 'px'
  d.style.height = rect.height + 'px'
  d.style.border = `2px solid ${color}`
  d.style.zIndex = '99999'
  d.style.pointerEvents = 'none'
  document.body.appendChild(d)
  setTimeout(() => d.remove(), 1500)
}

function logComputedStyles(el: Element | null) {
  if (!el) return
  const s = window.getComputedStyle(el)
  return {
    display: s.display,
    position: s.position,
    lineHeight: s.lineHeight,
    verticalAlign: s.verticalAlign,
    transform: s.transform,
    pointerEvents: s.pointerEvents,
    zIndex: s.zIndex,
  }
}

function onButtonClick(e: MouseEvent) {
  if (!DEBUG) return
  try {
    console.log('ThemeToggle: click event', e.type, { clientX: e.clientX, clientY: e.clientY })

    const btn = btnRef.value
    const icon = iconRef.value

    console.log('ThemeToggle: button element', btn)
    console.log('ThemeToggle: icon element', icon)

    const btnRect = btn?.getBoundingClientRect()
    const iconRect = icon?.getBoundingClientRect()
    if (btnRect) {
      console.log('ThemeToggle: button rect', btnRect)
      highlightRect(btnRect, 'lime')
    }
    if (iconRect) {
      console.log('ThemeToggle: icon rect', iconRect)
      highlightRect(iconRect, 'cyan')
    }

    const elAtPoint = document.elementFromPoint(e.clientX, e.clientY)
    console.log('ThemeToggle: elementFromPoint', elAtPoint)
    if (elAtPoint instanceof Element) {
      highlightRect(elAtPoint.getBoundingClientRect(), 'orange')
    }

    console.log('ThemeToggle: computed styles button', logComputedStyles(btn))
    console.log('ThemeToggle: computed styles icon', logComputedStyles(icon))

    // Try to toggle via bootstrap instance if available
    if (dropdownInstance && typeof dropdownInstance.toggle === 'function') {
      console.log('ThemeToggle: toggling via bootstrap instance')
      dropdownInstance.toggle()
      return
    }

    // Fallback: toggle .show class on menu
    const menu = btn?.parentElement?.querySelector('.dropdown-menu') as HTMLElement | null
    if (menu) {
      const isShown = menu.classList.contains('show')
      if (isShown) {
        menu.classList.remove('show')
        btn?.setAttribute('aria-expanded', 'false')
      } else {
        menu.classList.add('show')
        btn?.setAttribute('aria-expanded', 'true')
      }
      console.log('ThemeToggle: toggled menu fallback', menu)
    }
  } catch (err) {
    console.error('ThemeToggle: diagnostic failed', err)
  }
}
</script>

<template>
  <div class="dropdown" data-bs-theme>
    <button
      ref="btnRef"
      class="btn btn-link d-flex align-items-center theme-toggle-btn dropdown-toggle p-2"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      aria-label="Toggle theme"
      title="Toggle theme"
      @click="onButtonClick"
    >
      <i ref="iconRef" :class="['bi', currentIcon]" aria-hidden="true"></i>
    </button>

    <ul class="dropdown-menu dropdown-menu-end shadow-sm" role="menu" aria-label="Theme options">
      <li v-for="opt in options" :key="opt.value">
        <button
          type="button"
          class="dropdown-item d-flex align-items-center gap-2"
          :class="{ active: mode === opt.value }"
          :aria-pressed="mode === opt.value"
          @click="setMode(opt.value)"
          data-bs-theme-value
        >
          <i :class="['bi', opt.icon]" aria-hidden="true"></i>
          <span class="flex-grow-1">{{ opt.label }}</span>
          <i v-if="mode === opt.value" class="bi bi-check2" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.theme-toggle-btn {
  padding: 0;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  line-height: 1;
  position: relative;
  z-index: 2000; /* garante estar acima de overlays */
}

.theme-toggle-btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(0,0,0,0.05);
  outline: none;
}

.theme-toggle-btn .bi {
  display: block;
  line-height: 1;
}

.dropdown-item.active {
  --bs-dropdown-link-active-bg: transparent;
  --bs-dropdown-link-active-color: var(--bs-primary);
  font-weight: 500;
}

.dropdown-item:hover {
  background-color: var(--bs-secondary-bg);
}
.dropdown-menu {
  z-index: 2100;
}
</style>
