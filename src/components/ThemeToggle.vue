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

const currentIcon = computed(() => {
  if (mode.value === 'auto') return 'bi-circle-half'
  return mode.value === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'
})

const iconColor = computed(() => {
  // color for icon and caret: black in light, white in dark; auto follows effective theme
  const dark = mode.value === 'auto' ? isDark.value : mode.value === 'dark'
  return dark ? '#ffffff' : '#000000'
})

const btnRef = ref<HTMLElement | null>(null)
let dropdownInstance: ReturnType<typeof Dropdown.getOrCreateInstance> | null = null

onMounted(() => {
  if (btnRef.value) {
    try {
      dropdownInstance = Dropdown.getOrCreateInstance(btnRef.value)
    } catch {
      // ignore
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

function onButtonClick() {
  try {
    if (dropdownInstance && typeof dropdownInstance.toggle === 'function') {
      dropdownInstance.toggle()
    }
  } catch {
    // ignore
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
      :style="{ color: iconColor }"
    >
      <i :class="['bi', currentIcon]" aria-hidden="true"></i>
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

.dropdown-item:focus {
  outline: none;
}

.dropdown-item:focus-visible {
  outline: 2px solid var(--bs-primary);
  outline-offset: -2px;
}

.dropdown-menu {
  z-index: 2100;
}
</style>
