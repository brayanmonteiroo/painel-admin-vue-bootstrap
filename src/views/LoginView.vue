<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppAlert from '../components/ui/AppAlert.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

function onSubmit() {
  errorMessage.value = ''
  if (!email.value.trim()) {
    errorMessage.value = 'Informe o e-mail.'
    return
  }
  if (!password.value) {
    errorMessage.value = 'Informe a senha.'
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push({ name: 'dashboard' })
  }, 800)
}
</script>

<template>
  <div class="login-page min-vh-100 d-flex align-items-center justify-content-center bg-body py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <AppCard body-class="p-4 p-md-5">
            <h1 class="h4 card-title text-center mb-4">Entrar</h1>

            <form @submit.prevent="onSubmit" novalidate>
              <AppAlert v-if="errorMessage" variant="danger" dismissible @dismiss="errorMessage = ''">
                {{ errorMessage }}
              </AppAlert>

              <AppFormInput
                v-model="email"
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                autocomplete="email"
                :disabled="loading"
              />

              <AppFormInput
                v-model="password"
                label="Senha"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                :disabled="loading"
                class="mb-4"
              />

              <AppButton
                type="submit"
                variant="primary"
                class="w-100"
                :loading="loading"
              >
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </AppButton>
            </form>

            <p class="text-center text-body-secondary small mt-4 mb-2">
              <router-link :to="{ name: 'recuperar-senha' }" class="text-decoration-none">Esqueci a senha</router-link>
            </p>
            <p class="text-center text-body-secondary small mb-0">
              Não tem conta? <router-link :to="{ name: 'cadastro' }" class="text-decoration-none">Criar conta</router-link>
            </p>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
}
</style>
