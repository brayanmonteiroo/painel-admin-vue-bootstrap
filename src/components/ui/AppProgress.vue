<script setup lang="ts">
withDefaults(
  defineProps<{
    value: number
    max?: number
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
    label?: string
    striped?: boolean
    animated?: boolean
  }>(),
  { max: 100, variant: 'primary', striped: false, animated: false }
)
</script>

<template>
  <div>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div
        class="progress-bar"
        :class="[
          `bg-${variant}`,
          striped ? 'progress-bar-striped' : '',
          animated ? 'progress-bar-animated' : '',
        ]"
        :style="{ width: `${Math.min(100, (value / max) * 100)}%` }"
      >
        <span v-if="label" class="visually-hidden">{{ label }}</span>
      </div>
    </div>
    <small v-if="label" class="text-body-secondary mt-1 d-block">{{ label }}</small>
  </div>
</template>
