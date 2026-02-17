<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, setTheme } = useTheme()

const ariaLabel = computed(() =>
  isDark.value ? 'Ativar tema claro' : 'Ativar tema escuro'
)

const title = computed(() =>
  isDark.value ? 'Ativar tema claro' : 'Ativar tema escuro'
)

function onClick() {
  setTheme(!isDark.value)
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle-btn"
    :aria-label="ariaLabel"
    :title="title"
    @click="onClick"
  >
    <i v-if="isDark" class="bi bi-sun-fill" aria-hidden="true"></i>
    <i v-else class="bi bi-moon-fill" aria-hidden="true"></i>
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  min-height: 2.25rem;
  border-radius: 999px;
}

.theme-toggle-btn:hover .bi,
.theme-toggle-btn:focus-visible .bi {
  opacity: 0.8;
}
</style>
