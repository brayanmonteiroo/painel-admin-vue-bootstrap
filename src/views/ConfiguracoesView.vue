<script setup lang="ts">
import { ref } from 'vue'
import AppTabs from '../components/ui/AppTabs.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppFormCheckbox from '../components/ui/AppFormCheckbox.vue'
import AppButton from '../components/ui/AppButton.vue'

const activeTab = ref('perfil')
const tabs = [
  { id: 'perfil', label: 'Perfil', icon: 'person' },
  { id: 'aparencia', label: 'Aparência', icon: 'palette' },
  { id: 'notificacoes', label: 'Notificações', icon: 'bell' },
]

const nome = ref('Usuário')
const email = ref('usuario@exemplo.com')

const notifEmail = ref(true)
const notifPush = ref(false)
</script>

<template>
  <div class="container-fluid">
    <h1 class="h4 mb-4 text-body">Configurações</h1>

    <AppTabs v-model="activeTab" :tabs="tabs">
      <template v-if="activeTab === 'perfil'">
        <AppCard>
          <AppFormInput v-model="nome" label="Nome" />
          <AppFormInput v-model="email" label="E-mail" type="email" />
          <AppButton variant="primary">Salvar alterações</AppButton>
        </AppCard>
      </template>
      <template v-else-if="activeTab === 'aparencia'">
        <AppCard>
          <p class="text-body mb-2">O tema claro ou escuro pode ser alterado pelo switch no canto superior direito da tela.</p>
          <p class="text-body-secondary small mb-0">A preferência é salva no navegador e aplicada em todas as páginas do dashboard.</p>
        </AppCard>
      </template>
      <template v-else-if="activeTab === 'notificacoes'">
        <AppCard>
          <AppFormCheckbox v-model="notifEmail" label="Receber notificações por e-mail" />
          <AppFormCheckbox v-model="notifPush" label="Receber notificações no navegador (push)" hint="Requer permissão do navegador." />
          <AppButton variant="primary">Salvar preferências</AppButton>
        </AppCard>
      </template>
    </AppTabs>
  </div>
</template>
