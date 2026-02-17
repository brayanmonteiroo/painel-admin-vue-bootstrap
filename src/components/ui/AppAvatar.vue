<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string
    size?: 'sm' | 'md' | 'lg'
    icon?: string
  }>(),
  { size: 'md' }
)

const initials = computed(() => {
  const trimmed = props.name?.trim()
  if (!trimmed) return '?'
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length >= 2) {
    const first = parts[0]!
    const last = parts[parts.length - 1]!
    return ((first[0] ?? '') + (last[0] ?? '')).toUpperCase() || '?'
  }
  return (parts[0]!.slice(0, 2) || '?').toUpperCase()
})

const sizeClass = computed(() => {
  const map = { sm: '32px', md: '40px', lg: '48px' }
  return map[props.size] ?? '40px'
})
</script>

<template>
  <span
    class="rounded-circle d-inline-flex align-items-center justify-content-center bg-secondary bg-opacity-25 text-body fw-medium flex-shrink-0"
    :style="{ width: sizeClass, height: sizeClass, fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem' }"
  >
    <i v-if="icon" :class="`bi bi-${icon}`"></i>
    <span v-else>{{ initials }}</span>
  </span>
</template>
