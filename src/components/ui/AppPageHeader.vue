<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
    <div>
      <h1 class="h4 mb-1 text-body">{{ title }}</h1>
      <nav v-if="$slots.breadcrumb" aria-label="breadcrumb">
        <slot name="breadcrumb" />
      </nav>
    </div>
    <div v-if="$slots.actions" class="d-flex align-items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
