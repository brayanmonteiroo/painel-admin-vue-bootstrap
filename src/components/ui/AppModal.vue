<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'lg' | 'xl'
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const elRef = ref<HTMLElement | null>(null)
let modalInstance: InstanceType<typeof Modal> | null = null

function onHidden() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (visible) => {
    if (!modalInstance) return
    if (visible) modalInstance.show()
    else modalInstance.hide()
  },
  { immediate: true }
)

onMounted(() => {
  if (elRef.value) {
    modalInstance = new Modal(elRef.value, { backdrop: true, keyboard: true })
    elRef.value.addEventListener('hidden.bs.modal', onHidden)
  }
})

onUnmounted(() => {
  if (elRef.value) elRef.value.removeEventListener('hidden.bs.modal', onHidden)
  modalInstance?.dispose()
  modalInstance = null
})
</script>

<template>
  <div
    ref="elRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" :class="size ? `modal-${size}` : ''">
      <div class="modal-content">
        <div v-if="title || $slots.header" class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
          </slot>
          <button type="button" class="btn-close" aria-label="Fechar" @click="emit('update:modelValue', false)" />
        </div>
        <div class="modal-body">
          <slot name="body" />
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
