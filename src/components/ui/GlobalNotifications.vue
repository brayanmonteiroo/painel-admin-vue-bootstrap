<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '../../store/ui'
import AppAlert from './AppAlert.vue'

const uiStore = useUiStore()
const { notifications } = storeToRefs(uiStore)

function onDismiss(id: number) {
  uiStore.removeNotification(id)
}
</script>

<template>
  <div
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 1080; max-width: 360px; width: 100%"
    aria-live="polite"
    aria-atomic="true"
  >
    <div class="d-flex flex-column gap-2 align-items-stretch">
      <AppAlert
        v-for="n in notifications"
        :key="n.id"
        :variant="n.variant"
        dismissible
        @dismiss="onDismiss(n.id)"
      >
        {{ n.message }}
      </AppAlert>
    </div>
  </div>
</template>

