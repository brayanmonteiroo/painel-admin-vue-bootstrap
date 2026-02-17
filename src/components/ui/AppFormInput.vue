<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string | number
  label?: string
  error?: string
  hint?: string
  id?: string
  type?: HTMLInputElement['type']
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const attrs = useAttrs()
const inputId = computed(() => props.id ?? `app-input-${Math.random().toString(36).slice(2, 9)}`)
const isPassword = computed(() => (props.type ?? attrs.type) === 'password')
const passwordVisible = ref(false)

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
}

const effectiveType = computed<HTMLInputElement['type']>(() => {
  if (!isPassword.value) return (props.type ?? (attrs.type as HTMLInputElement['type'] | undefined)) ?? 'text'
  return passwordVisible.value ? 'text' : 'password'
})

const inputAttrs = computed(() => {
  const { type: _t, ...rest } = { ...attrs } as Record<string, unknown>
  return rest
})
</script>

<template>
  <div class="mb-3">
    <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
    <div v-if="isPassword" class="position-relative">
      <input
        :id="inputId"
        class="form-control pe-5"
        :class="{ 'is-invalid': error }"
        :value="modelValue"
        :type="effectiveType"
        v-bind="inputAttrs"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        type="button"
        class="btn btn-link link-secondary p-0 position-absolute top-50 end-0 translate-middle-y me-2 app-form-input-toggle"
        :aria-label="passwordVisible ? 'Ocultar senha' : 'Mostrar senha'"
        :title="passwordVisible ? 'Ocultar senha' : 'Mostrar senha'"
        @click="togglePasswordVisibility"
      >
        <i :class="passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" aria-hidden="true"></i>
      </button>
    </div>
    <input
      v-else
      :id="inputId"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    <div v-else-if="hint" class="form-text">{{ hint }}</div>
  </div>
</template>

<style scoped>
.app-form-input-toggle {
  font-size: 1.1rem;
  text-decoration: none;
}
.app-form-input-toggle:hover {
  opacity: 0.8;
}
</style>
