<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm'
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  }>(),
  { variant: 'primary' }
)
</script>

<template>
  <span
    class="spinner-border"
    :class="[
      size ? `spinner-border-${size}` : '',
      `text-${variant}`,
    ]"
    role="status"
    aria-hidden="true"
  />
</template>
