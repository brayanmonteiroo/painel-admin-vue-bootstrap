<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'

const route = useRoute()
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <div class="position-relative">
    <div
      v-if="!isDashboard"
      class="theme-toggle-fixed position-fixed p-2 p-sm-3"
      style="z-index: 1050"
    >
      <ThemeToggle />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.theme-toggle-fixed {
  top: 0;
  right: 0;
}

@media (max-width: 575.98px) {
  .theme-toggle-fixed {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
</style>

<style scoped>
</style>
