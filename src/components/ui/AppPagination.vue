<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    current: number
    total: number
    perPage?: number
  }>(),
  { perPage: 10 }
)

const emit = defineEmits<{ 'update:current': [page: number] }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

const start = computed(() => (props.current - 1) * props.perPage + 1)
const end = computed(() => Math.min(props.current * props.perPage, props.total))

function goTo(page: number) {
  const p = Math.max(1, Math.min(page, totalPages.value))
  if (p !== props.current) emit('update:current', p)
}
</script>

<template>
  <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
    <small class="text-body-secondary">
      Mostrando {{ start }} a {{ end }} de {{ total }} resultados
    </small>
    <nav aria-label="Paginação">
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item" :class="{ disabled: current <= 1 }">
          <button type="button" class="page-link" aria-label="Anterior" :disabled="current <= 1" @click="goTo(current - 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
        <li
          v-for="p in totalPages"
          :key="p"
          class="page-item"
          :class="{ active: p === current }"
        >
          <button type="button" class="page-link" @click="goTo(p)">{{ p }}</button>
        </li>
        <li class="page-item" :class="{ disabled: current >= totalPages }">
          <button type="button" class="page-link" aria-label="Próxima" :disabled="current >= totalPages" @click="goTo(current + 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
