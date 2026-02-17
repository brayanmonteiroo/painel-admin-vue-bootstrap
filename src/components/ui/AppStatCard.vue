<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    value: string | number
    subtitle?: string
    subtitleClass?: string
    icon?: string
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  }>(),
  { variant: 'primary' }
)
</script>

<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <p class="text-body-secondary small text-uppercase mb-1">{{ title }}</p>
          <h2 class="h4 mb-0 text-body">{{ value }}</h2>
          <small v-if="subtitle" class="d-block mt-1" :class="subtitleClass ?? 'text-muted'">{{ subtitle }}</small>
        </div>
        <div
          v-if="icon"
          class="rounded-3 d-flex align-items-center justify-content-center bg-opacity-10 flex-shrink-0"
          :class="`bg-${variant}`"
          style="width: 48px; height: 48px"
        >
          <i :class="`bi bi-${icon} text-body-secondary`" style="font-size: 1.25rem"></i>
        </div>
      </div>
    </div>
  </div>
</template>
