<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
</script>

<template>
  <div class="public-layout min-vh-100 d-flex flex-column">
    <header class="public-header py-3 px-3 px-md-4">
      <div class="d-flex align-items-center justify-content-end gap-2">
        <div class="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="public-main flex-grow-1 p-3">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.public-layout {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
}
</style>

