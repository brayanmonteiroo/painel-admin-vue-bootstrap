<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppAlert from '../components/ui/AppAlert.vue'

const router = useRouter()
const nome = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const errorMessage = ref('')

function onSubmit() {
  errorMessage.value = ''
  if (!nome.value.trim()) {
    errorMessage.value = 'Informe o nome.'
    return
  }
  if (!email.value.trim()) {
    errorMessage.value = 'Informe o e-mail.'
    return
  }
  if (!password.value) {
    errorMessage.value = 'Informe a senha.'
    return
  }
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'As senhas não coincidem.'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres.'
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
  <div class="d-flex align-items-center justify-content-center flex-grow-1 py-3">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <AppCard body-class="p-4 p-md-5">
            <h1 class="h4 card-title text-center mb-4">Criar conta</h1>

            <form @submit.prevent="onSubmit" novalidate>
              <AppAlert v-if="errorMessage" variant="danger" dismissible @dismiss="errorMessage = ''">
                {{ errorMessage }}
              </AppAlert>

              <AppFormInput
                v-model="nome"
                label="Nome"
                type="text"
                placeholder="Seu nome"
                autocomplete="name"
                :disabled="loading"
              />

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
                placeholder="Mínimo 6 caracteres"
                autocomplete="new-password"
                :disabled="loading"
              />

              <AppFormInput
                v-model="passwordConfirm"
                label="Confirmar senha"
                type="password"
                placeholder="Repita a senha"
                autocomplete="new-password"
                :disabled="loading"
                class="mb-4"
              />

              <AppButton
                type="submit"
                variant="primary"
                class="w-100"
                :loading="loading"
              >
                {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
              </AppButton>
            </form>

            <p class="text-center text-body-secondary small mt-4 mb-0">
              Já tem conta? <router-link :to="{ name: 'login' }" class="text-decoration-none">Entrar</router-link>
            </p>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>
