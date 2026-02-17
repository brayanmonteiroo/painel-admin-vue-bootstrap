<script setup lang="ts">
const emit = defineEmits<{ dismiss: [] }>()

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    dismissible?: boolean
  }>(),
  { variant: 'info', dismissible: false }
)

function onDismiss() {
  emit('dismiss')
}
</script>

<template>
  <div
    class="alert alert-dismissible fade show d-flex align-items-center"
    :class="`alert-${variant}`"
    role="alert"
  >
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="btn-close ms-auto"
      aria-label="Fechar"
      @click="onDismiss"
    />
  </div>
</template>
