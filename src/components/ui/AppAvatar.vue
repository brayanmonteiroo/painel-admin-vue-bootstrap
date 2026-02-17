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
  if (!props.name?.trim()) return '?'
  const parts = props.name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return parts[0].slice(0, 2).toUpperCase()
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
