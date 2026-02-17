<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalNotifications from './components/ui/GlobalNotifications.vue'
</script>

<template>
  <div class="position-relative">
    <RouterView />
    <GlobalNotifications />
  </div>
</template>
