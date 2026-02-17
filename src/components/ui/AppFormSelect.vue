<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  value: string | number
  label: string
}

const props = defineProps<{
  modelValue?: string | number
  options: SelectOption[]
  label?: string
  error?: string
  placeholder?: string
  id?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const selectId = computed(() => props.id ?? `app-select-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="selectId" class="form-label">{{ label }}</label>
    <select
      :id="selectId"
      class="form-select"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="String(opt.value)"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
  </div>
</template>
