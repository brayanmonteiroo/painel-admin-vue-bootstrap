<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppAlert from '../components/ui/AppAlert.vue'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function onSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  if (!email.value.trim()) {
    errorMessage.value = 'Informe o e-mail.'
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    successMessage.value = 'Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.'
  }, 800)
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-body py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <AppCard body-class="p-4 p-md-5">
            <h1 class="h4 card-title text-center mb-4">Recuperar senha</h1>
            <p class="text-body-secondary small text-center mb-4">
              Informe o e-mail da sua conta. Enviaremos um link para redefinir a senha.
            </p>

            <form @submit.prevent="onSubmit" novalidate>
              <AppAlert v-if="errorMessage" variant="danger" dismissible @dismiss="errorMessage = ''">
                {{ errorMessage }}
              </AppAlert>
              <AppAlert v-if="successMessage" variant="success" dismissible @dismiss="successMessage = ''">
                {{ successMessage }}
              </AppAlert>

              <AppFormInput
                v-model="email"
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                autocomplete="email"
                :disabled="loading"
                class="mb-4"
              />

              <AppButton
                type="submit"
                variant="primary"
                class="w-100"
                :loading="loading"
              >
                {{ loading ? 'Enviando...' : 'Enviar link' }}
              </AppButton>
            </form>

            <p class="text-center text-body-secondary small mt-4 mb-0">
              <router-link :to="{ name: 'login' }" class="text-decoration-none">Voltar ao login</router-link>
            </p>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>
