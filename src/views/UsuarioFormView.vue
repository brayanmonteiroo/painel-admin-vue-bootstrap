<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppCard from '../components/ui/AppCard.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppFormSelect from '../components/ui/AppFormSelect.vue'
import AppFormSwitch from '../components/ui/AppFormSwitch.vue'
import AppButton from '../components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => Boolean(route.params.id))

const nome = ref(isEdit.value ? 'Maria Silva' : '')
const email = ref(isEdit.value ? 'maria@exemplo.com' : '')
const perfil = ref('')
const ativo = ref(true)

const perfilOptions = [
  { value: '', label: 'Selecione o perfil' },
  { value: 'admin', label: 'Administrador' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Visualizador' },
]

function salvar() {
  router.push({ name: 'dashboard-usuarios' })
}

function cancelar() {
  router.push({ name: 'dashboard-usuarios' })
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="h4 mb-4 text-body">{{ isEdit ? 'Editar usuário' : 'Novo usuário' }}</h1>

    <AppCard>
      <AppFormInput v-model="nome" label="Nome" />
      <AppFormInput v-model="email" label="E-mail" type="email" />
      <AppFormSelect v-model="perfil" label="Perfil" :options="perfilOptions" />
      <AppFormSwitch v-model="ativo" label="Ativo" />
      <div class="d-flex gap-2 mt-3">
        <AppButton variant="primary" @click="salvar">Salvar</AppButton>
        <AppButton variant="outline-secondary" @click="cancelar">Cancelar</AppButton>
      </div>
    </AppCard>
  </div>
</template>
