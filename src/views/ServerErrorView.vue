<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppButton from '../components/ui/AppButton.vue'

const router = useRouter()

function goBack() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-body">
    <div class="text-center px-3">
      <i class="bi bi-exclamation-octagon text-body-secondary" style="font-size: 4rem"></i>
      <h1 class="h3 mt-3 mb-2 text-body">Erro no servidor</h1>
      <p class="text-body-secondary mb-4">Algo deu errado. Tente novamente ou volte ao início.</p>
      <AppButton variant="primary" @click="goBack">Voltar ao início</AppButton>
    </div>
  </div>
</template>
