<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: boolean
  label?: string
  id?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const inputId = computed(() => props.id ?? `app-switch-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="mb-3">
    <div class="form-check form-switch">
      <input
        :id="inputId"
        class="form-check-input"
        type="checkbox"
        role="switch"
        :checked="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <label v-if="label" :for="inputId" class="form-check-label">{{ label }}</label>
    </div>
  </div>
</template>
