<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppButton from '../components/ui/AppButton.vue'

const router = useRouter()

function goHome() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-body">
    <div class="text-center px-3">
      <i class="bi bi-exclamation-triangle text-body-secondary" style="font-size: 4rem"></i>
      <h1 class="h3 mt-3 mb-2 text-body">Página não encontrada</h1>
      <p class="text-body-secondary mb-4">A URL que você acessou não existe ou foi movida.</p>
      <AppButton variant="primary" @click="goHome">Voltar ao início</AppButton>
    </div>
  </div>
</template>
