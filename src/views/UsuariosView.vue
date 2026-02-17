<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppPageHeader from '../components/ui/AppPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppTable from '../components/ui/AppTable.vue'
import AppPagination from '../components/ui/AppPagination.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'

const router = useRouter()
const busca = ref('')
const currentPage = ref(1)
const perPage = 10

const usuarios = ref([
  { id: 1, nome: 'Maria Silva', email: 'maria@exemplo.com', status: 'Ativo' },
  { id: 2, nome: 'João Santos', email: 'joao@exemplo.com', status: 'Ativo' },
  { id: 3, nome: 'Ana Costa', email: 'ana@exemplo.com', status: 'Inativo' },
  { id: 4, nome: 'Pedro Oliveira', email: 'pedro@exemplo.com', status: 'Ativo' },
  { id: 5, nome: 'Carla Mendes', email: 'carla@exemplo.com', status: 'Ativo' },
])

const filtered = computed(() => {
  if (!busca.value.trim()) return usuarios.value
  const q = busca.value.toLowerCase()
  return usuarios.value.filter(
    (u) => u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  )
})

const total = computed(() => filtered.value.length)

function novo() {
  router.push({ name: 'dashboard-usuarios-novo' })
}

function edit(id: number) {
  router.push({ name: 'dashboard-usuarios-edit', params: { id: String(id) } })
}
</script>

<template>
  <div class="container-fluid">
    <AppPageHeader title="Usuários">
      <template #actions>
        <AppButton variant="primary" icon="plus-lg" @click="novo">Novo usuário</AppButton>
      </template>
    </AppPageHeader>

    <AppCard body-class="p-0">
      <div class="p-3 border-bottom">
        <AppFormInput
          v-model="busca"
          placeholder="Buscar por nome ou e-mail..."
          class="mb-0"
        />
      </div>
      <AppTable hover :empty-message="'Nenhum usuário encontrado.'" :is-empty="filtered.length === 0">
        <template #thead>
          <tr>
            <th class="py-3 ps-4">Nome</th>
            <th class="py-3">E-mail</th>
            <th class="py-3">Status</th>
            <th class="py-3 pe-4 text-end">Ações</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="u in filtered" :key="u.id">
            <td class="ps-4 fw-medium">{{ u.nome }}</td>
            <td>{{ u.email }}</td>
            <td>
              <AppBadge :variant="u.status === 'Ativo' ? 'success' : 'secondary'">
                {{ u.status }}
              </AppBadge>
            </td>
            <td class="text-end pe-4">
              <AppButton variant="outline-primary" size="sm" @click="edit(u.id)">Editar</AppButton>
            </td>
          </tr>
        </template>
      </AppTable>
      <div v-if="total > 0" class="p-3 border-top">
        <AppPagination
          :current="currentPage"
          :total="total"
          :per-page="perPage"
          @update:current="currentPage = $event"
        />
      </div>
    </AppCard>
  </div>
</template>
