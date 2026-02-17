<script setup lang="ts">
import { ref } from 'vue'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppAvatar from '../components/ui/AppAvatar.vue'
import AppButton from '../components/ui/AppButton.vue'

const nome = ref('Usuário')
const email = ref('usuario@exemplo.com')
const senhaAtual = ref('')
const senhaNova = ref('')
const senhaConfirmar = ref('')
</script>

<template>
  <div class="container-fluid">
    <h1 class="h4 mb-4 text-body">Perfil</h1>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <AppCard>
          <template #header>
            <h2 class="h6 mb-0 text-body">Dados pessoais</h2>
          </template>
          <AppFormInput v-model="nome" label="Nome" />
          <AppFormInput v-model="email" label="E-mail" type="email" />
          <AppButton variant="primary">Salvar alterações</AppButton>
        </AppCard>

        <AppCard class="mt-4">
          <template #header>
            <h2 class="h6 mb-0 text-body">Alterar senha</h2>
          </template>
          <AppFormInput v-model="senhaAtual" label="Senha atual" type="password" />
          <AppFormInput v-model="senhaNova" label="Nova senha" type="password" />
          <AppFormInput v-model="senhaConfirmar" label="Confirmar nova senha" type="password" />
          <AppButton variant="primary">Atualizar senha</AppButton>
        </AppCard>
      </div>
      <div class="col-12 col-lg-4">
        <AppCard>
          <template #header>
            <h2 class="h6 mb-0 text-body">Avatar</h2>
          </template>
          <div class="d-flex align-items-center gap-3">
            <AppAvatar :name="nome" size="lg" />
            <div>
              <p class="mb-1 text-body fw-medium">{{ nome }}</p>
              <p class="mb-0 small text-body-secondary">{{ email }}</p>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
