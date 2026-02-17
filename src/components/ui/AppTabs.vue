<script setup lang="ts">
import { computed } from 'vue'

interface Tab {
  id: string
  label: string
  icon?: string
}

const props = defineProps<{
  tabs: Tab[]
  modelValue?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [id: string] }>()

const activeId = computed({
  get: () => props.modelValue ?? props.tabs[0]?.id ?? '',
  set: (id: string) => emit('update:modelValue', id),
})

function select(id: string) {
  emit('update:modelValue', id)
}
</script>

<template>
  <div>
    <ul class="nav nav-tabs mb-3" role="tablist">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item" role="presentation">
        <button
          type="button"
          class="nav-link d-flex align-items-center"
          :class="{ active: activeId === tab.id }"
          :aria-selected="activeId === tab.id"
          role="tab"
          @click="select(tab.id)"
        >
          <i v-if="tab.icon" :class="`bi bi-${tab.icon} me-2`"></i>
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <slot :active-id="activeId" />
    </div>
  </div>
</template>
