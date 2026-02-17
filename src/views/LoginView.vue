<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useUiStore } from '../store/ui'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppAlert from '../components/ui/AppAlert.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const loading = computed(() => authStore.loading)

async function onSubmit() {
  errorMessage.value = ''
  if (!email.value.trim()) {
    errorMessage.value = 'Informe o e-mail.'
    return
  }
  if (!password.value) {
    errorMessage.value = 'Informe a senha.'
    return
  }

  try {
    await authStore.login(email.value, password.value)
    uiStore.pushNotification('Login realizado com sucesso!', 'success')
    const redirect = (route.query.redirect as string | undefined) ?? undefined
    if (redirect) {
      router.push(redirect)
    } else {
      router.push({ name: 'dashboard' })
    }
  } catch (err) {
    if (!errorMessage.value) {
      errorMessage.value =
        err instanceof Error ? err.message : 'Não foi possível fazer login. Tente novamente.'
    }
  }
}
</script>

<template>
  <div class="login-page d-flex align-items-center justify-content-center flex-grow-1 py-3">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <AppCard body-class="p-4 p-md-5">
            <h1 class="h4 card-title text-center mb-3">Entrar</h1>
            <!-- texto de informação com cor chamativa-->
            <div class="alert alert-info text-body-secondary small text-center mb-4" role="alert">
              <p class="mb-0">
                Use qualquer e-mail e uma senha numérica
                (por exemplo, <strong>123</strong>) para acessar.
              </p>
            </div>

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

