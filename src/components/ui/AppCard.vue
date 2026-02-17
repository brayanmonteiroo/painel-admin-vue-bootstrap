<script setup lang="ts">
defineProps<{
  bodyClass?: string
  headerClass?: string
  footerClass?: string
}>()
</script>

<template>
  <div class="card shadow-sm">
    <div v-if="$slots.header" class="card-header bg-transparent border-bottom" :class="headerClass">
      <slot name="header" />
    </div>
    <div class="card-body" :class="bodyClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer bg-transparent border-top" :class="footerClass">
      <slot name="footer" />
    </div>
  </div>
</template>
