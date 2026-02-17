<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-danger' | 'link'
    size?: 'sm' | 'lg'
    loading?: boolean
    icon?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    loading: false,
    disabled: false,
  }
)
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[
      variant.startsWith('outline-') ? `btn-${variant}` : `btn-${variant}`,
      size ? `btn-${size}` : '',
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
    <i v-else-if="icon" :class="`bi bi-${icon} me-2`"></i>
    <slot />
  </button>
</template>
