<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    pill?: boolean
  }>(),
  { pill: true }
)
</script>

<template>
  <span class="badge" :class="[`bg-${variant}`, pill ? 'rounded-pill' : '']">
    <slot />
  </span>
</template>
