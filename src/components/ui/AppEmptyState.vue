<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    title?: string
  }>(),
  { icon: 'inbox', title: 'Nenhum registro encontrado' }
)
</script>

<template>
  <div class="text-center py-5">
    <i v-if="icon" :class="`bi bi-${icon} text-body-secondary`" style="font-size: 3rem"></i>
    <h3 class="h6 text-body mt-3 mb-2">{{ title }}</h3>
    <p v-if="$slots.default" class="text-body-secondary mb-3">
      <slot />
    </p>
    <slot name="action" />
  </div>
</template>
