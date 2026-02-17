<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const title = (route.meta?.title as string) ?? 'Página'
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center py-5">
      <div class="col-12 col-md-8 col-lg-6 text-center">
        <i class="bi bi-tools text-body-secondary mb-3" style="font-size: 3rem"></i>
        <h2 class="h4 text-body mb-2">{{ title }}</h2>
        <p class="text-body-secondary mb-0">Em breve.</p>
      </div>
    </div>
  </div>
</template>
