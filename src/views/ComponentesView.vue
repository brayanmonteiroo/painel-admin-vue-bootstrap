<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppStatCard from '../components/ui/AppStatCard.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppAlert from '../components/ui/AppAlert.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppTable from '../components/ui/AppTable.vue'
import AppPagination from '../components/ui/AppPagination.vue'
import AppTabs from '../components/ui/AppTabs.vue'
import AppProgress from '../components/ui/AppProgress.vue'
import AppSpinner from '../components/ui/AppSpinner.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppFormInput from '../components/ui/AppFormInput.vue'
import AppFormSelect from '../components/ui/AppFormSelect.vue'
import AppFormCheckbox from '../components/ui/AppFormCheckbox.vue'
import AppFormSwitch from '../components/ui/AppFormSwitch.vue'
import AppFormTextarea from '../components/ui/AppFormTextarea.vue'
import AppPageHeader from '../components/ui/AppPageHeader.vue'
import AppAvatar from '../components/ui/AppAvatar.vue'

const modalOpen = ref(false)
const paginationCurrent = ref(1)
const activeTab = ref('um')
const tabs = [
  { id: 'um', label: 'Aba 1', icon: 'star' },
  { id: 'dois', label: 'Aba 2', icon: 'heart' },
]
const selectVal = ref('')
const selectOptions = [
  { value: 'a', label: 'Opção A' },
  { value: 'b', label: 'Opção B' },
]
const formCheck = ref(true)
const formSwitch = ref(true)
const formInput = ref('')
const formTextarea = ref('')
</script>

<template>
  <div class="container-fluid pb-5">
    <AppPageHeader title="Componentes UI">
      <template #breadcrumb>
        <ol class="breadcrumb mb-0 small">
          <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
          <li class="breadcrumb-item active">Componentes</li>
        </ol>
      </template>
    </AppPageHeader>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppButton</h2>
      <div class="d-flex flex-wrap gap-2">
        <AppButton variant="primary">Primary</AppButton>
        <AppButton variant="secondary">Secondary</AppButton>
        <AppButton variant="outline-primary">Outline</AppButton>
        <AppButton variant="primary" icon="check">Com ícone</AppButton>
        <AppButton variant="primary" loading>Loading</AppButton>
        <AppButton variant="primary" size="sm">Pequeno</AppButton>
        <AppButton variant="primary" size="lg">Grande</AppButton>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppCard</h2>
      <div class="row g-3">
        <div class="col-md-4">
          <AppCard>
            <p class="mb-0 text-body">Conteúdo do card.</p>
          </AppCard>
        </div>
        <div class="col-md-4">
          <AppCard>
            <template #header>Header do card</template>
            Corpo do card.
            <template #footer>Footer</template>
          </AppCard>
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppStatCard</h2>
      <div class="row g-3">
        <div class="col-md-3">
          <AppStatCard title="Total" value="1.234" subtitle="+12% este mês" icon="graph-up" variant="primary" />
        </div>
        <div class="col-md-3">
          <AppStatCard title="Vendas" value="R$ 42k" icon="currency-dollar" variant="success" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppBadge</h2>
      <div class="d-flex flex-wrap gap-2">
        <AppBadge variant="primary">Primary</AppBadge>
        <AppBadge variant="success">Success</AppBadge>
        <AppBadge variant="danger">Danger</AppBadge>
        <AppBadge variant="warning">Warning</AppBadge>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppAlert</h2>
      <AppAlert variant="success" dismissible>Mensagem de sucesso (dismissível).</AppAlert>
      <AppAlert variant="warning" class="mt-2">Aviso.</AppAlert>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppModal</h2>
      <AppButton variant="primary" @click="modalOpen = true">Abrir modal</AppButton>
      <AppModal v-model="modalOpen" title="Título do modal">
        <p class="mb-0">Conteúdo do modal.</p>
        <template #footer>
          <AppButton variant="secondary" @click="modalOpen = false">Fechar</AppButton>
          <AppButton variant="primary">Confirmar</AppButton>
        </template>
      </AppModal>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppTable</h2>
      <AppTable hover striped>
        <template #thead>
          <tr>
            <th class="py-2">Coluna 1</th>
            <th class="py-2">Coluna 2</th>
          </tr>
        </template>
        <template #tbody>
          <tr><td>A</td><td>B</td></tr>
          <tr><td>C</td><td>D</td></tr>
        </template>
      </AppTable>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppPagination</h2>
      <AppPagination
        :current="paginationCurrent"
        :total="50"
        :per-page="10"
        @update:current="paginationCurrent = $event"
      />
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppTabs</h2>
      <AppTabs v-model="activeTab" :tabs="tabs">
        <div v-if="activeTab === 'um'" class="p-3 border rounded bg-body">Conteúdo da aba 1.</div>
        <div v-else-if="activeTab === 'dois'" class="p-3 border rounded bg-body">Conteúdo da aba 2.</div>
      </AppTabs>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppProgress</h2>
      <AppProgress :value="70" variant="primary" label="70%" />
      <AppProgress :value="40" variant="success" striped animated class="mt-2" />
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppSpinner</h2>
      <div class="d-flex gap-3 align-items-center">
        <AppSpinner />
        <AppSpinner size="sm" variant="success" />
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppEmptyState</h2>
      <AppCard>
        <AppEmptyState icon="inbox" title="Nenhum item">
          <template #action>
            <AppButton variant="primary" size="sm">Adicionar</AppButton>
          </template>
        </AppEmptyState>
      </AppCard>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">Formulários</h2>
      <AppCard>
        <AppFormInput v-model="formInput" label="AppFormInput" placeholder="Placeholder" />
        <AppFormSelect v-model="selectVal" label="AppFormSelect" :options="selectOptions" placeholder="Selecione" />
        <AppFormCheckbox v-model="formCheck" label="AppFormCheckbox" />
        <AppFormSwitch v-model="formSwitch" label="AppFormSwitch" />
        <AppFormTextarea v-model="formTextarea" label="AppFormTextarea" :rows="2" />
      </AppCard>
    </section>

    <section class="mb-5">
      <h2 class="h5 text-body mb-3">AppAvatar</h2>
      <div class="d-flex gap-3 align-items-center">
        <AppAvatar name="Maria Silva" size="sm" />
        <AppAvatar name="João Santos" size="md" />
        <AppAvatar name="Ana" size="lg" />
        <AppAvatar icon="person" size="md" />
      </div>
    </section>
  </div>
</template>
