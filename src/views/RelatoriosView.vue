<script setup lang="ts">
import { ref } from 'vue'
import type { ReportFilters, ReportSummaryCard } from '../domain/report'
import { getDashboardReport } from '../services/reportService'
import AppCard from '../components/ui/AppCard.vue'
import AppTable from '../components/ui/AppTable.vue'
import AppFormSelect from '../components/ui/AppFormSelect.vue'
import AppButton from '../components/ui/AppButton.vue'
import LineChart from '../components/charts/LineChart.vue'
import DoughnutChart from '../components/charts/DoughnutChart.vue'

const periodo = ref('')
const tipo = ref('')

const periodoOptions = [
  { value: '', label: 'Selecione o período' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
]

const tipoOptions = [
  { value: '', label: 'Tipo de relatório' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'usuarios', label: 'Usuários' },
  { value: 'pedidos', label: 'Pedidos' },
]

const resumo = ref<ReportSummaryCard[]>([
  { label: 'Total de vendas', value: 'R$ 128.450,00', variant: 'success' },
  { label: 'Pedidos', value: '342', variant: 'primary' },
  { label: 'Ticket médio', value: 'R$ 375,58', variant: 'info' },
])

const dados = ref([
  { data: '16/02/2026', descricao: 'Vendas diretas', valor: 'R$ 12.400,00' },
  { data: '15/02/2026', descricao: 'Assinaturas', valor: 'R$ 8.200,00' },
  { data: '14/02/2026', descricao: 'Vendas diretas', valor: 'R$ 15.100,00' },
  { data: '13/02/2026', descricao: 'Assinaturas', valor: 'R$ 7.850,00' },
])

const loading = ref(false)
const loadError = ref('')

async function onGerar() {
  const filters: ReportFilters = {
    periodo: periodo.value,
    tipo: tipo.value,
  }

  try {
    loading.value = true
    loadError.value = ''
    const result = await getDashboardReport(filters)
    resumo.value = result.resumo
    dados.value = result.dados
  } catch (err) {
    loadError.value =
      err instanceof Error ? err.message : 'Não foi possível carregar os relatórios.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="h4 mb-4 text-body">Relatórios</h1>

    <div class="row g-3 mb-4 align-items-end">
      <div class="col-12 col-md-4">
        <AppFormSelect v-model="periodo" label="Período" :options="periodoOptions" />
      </div>
      <div class="col-12 col-md-4">
        <AppFormSelect v-model="tipo" label="Tipo" :options="tipoOptions" />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <AppButton
          variant="primary"
          icon="search"
          :loading="loading"
          :disabled="loading"
          @click="onGerar"
        >
          {{ loading ? 'Gerando...' : 'Gerar' }}
        </AppButton>
      </div>
    </div>

    <section class="row g-3 mb-4">
      <div v-for="item in resumo" :key="item.label" class="col-12 col-md-4">
        <AppCard>
          <p class="text-body-secondary small mb-1">{{ item.label }}</p>
          <h2 class="h4 mb-0" :class="`text-${item.variant}`">{{ item.value }}</h2>
        </AppCard>
      </div>
    </section>

    <div class="row">
      <div class="col-12 col-lg-6 mb-4">
        <AppCard>
          <template #header>
            <h2 class="h6 mb-0 text-body">Gráfico de vendas</h2>
          </template>
          <LineChart :height="240" />
        </AppCard>
      </div>
      <div class="col-12 col-lg-6 mb-4">
        <AppCard>
          <template #header>
            <h2 class="h6 mb-0 text-body">Distribuição por tipo</h2>
          </template>
          <DoughnutChart :height="240" />
        </AppCard>
      </div>
    </div>

      <AppCard>
      <template #header>
        <h2 class="h6 mb-0 text-body">Detalhamento</h2>
      </template>
      <AppTable hover :empty-message="loadError || 'Nenhum dado encontrado.'" :is-empty="!loading && dados.length === 0">
        <template #thead>
          <tr>
            <th class="py-3">Data</th>
            <th class="py-3">Descrição</th>
            <th class="py-3 text-end">Valor</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-if="loading">
            <td colspan="3" class="text-center py-4">
              Carregando dados...
            </td>
          </tr>
          <tr v-else v-for="row in dados" :key="row.data + row.descricao">
            <td>{{ row.data }}</td>
            <td>{{ row.descricao }}</td>
            <td class="text-end">{{ row.valor }}</td>
          </tr>
        </template>
      </AppTable>
    </AppCard>
  </div>
</template>
