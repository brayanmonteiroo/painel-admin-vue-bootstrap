<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  label?: string
  error?: string
  hint?: string
  id?: string
  rows?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const textareaId = computed(() => props.id ?? `app-textarea-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="textareaId" class="form-label">{{ label }}</label>
    <textarea
      :id="textareaId"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      :rows="rows ?? 3"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    <div v-else-if="hint" class="form-text">{{ hint }}</div>
  </div>
</template>
