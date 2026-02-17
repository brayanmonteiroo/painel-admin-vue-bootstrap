<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="public-layout min-vh-100 d-flex flex-column">
    <main class="public-main flex-grow-1 p-3 d-flex flex-column min-h-0">
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

