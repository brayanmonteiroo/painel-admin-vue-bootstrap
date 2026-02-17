<script setup lang="ts">
import { ref } from 'vue'
import AppStatCard from '../components/ui/AppStatCard.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppTable from '../components/ui/AppTable.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import LineChart from '../components/charts/LineChart.vue'
import DoughnutChart from '../components/charts/DoughnutChart.vue'

const stats = ref([
  { label: 'Usuários', value: 2841, change: 12.5, icon: 'people', variant: 'primary' as const },
  { label: 'Vendas', value: 'R$ 42,5k', change: 8.2, icon: 'currency-dollar', variant: 'success' as const },
  { label: 'Pedidos', value: 156, change: -2.4, icon: 'cart-check', variant: 'info' as const },
  { label: 'Taxa conversão', value: '3,2%', change: 0.8, icon: 'percent', variant: 'warning' as const },
])

const recentOrders = ref([
  { id: '#7842', cliente: 'Maria Silva', valor: 'R$ 289,00', status: 'Concluído', data: '16/02/2026' },
  { id: '#7841', cliente: 'João Santos', valor: 'R$ 1.240,00', status: 'Processando', data: '16/02/2026' },
  { id: '#7840', cliente: 'Ana Costa', valor: 'R$ 89,90', status: 'Concluído', data: '15/02/2026' },
  { id: '#7839', cliente: 'Pedro Oliveira', valor: 'R$ 456,00', status: 'Pendente', data: '15/02/2026' },
  { id: '#7838', cliente: 'Carla Mendes', valor: 'R$ 2.100,00', status: 'Concluído', data: '14/02/2026' },
])

const statusVariant = (status: string) => {
  const map: Record<string, string> = {
    Concluído: 'success',
    Processando: 'info',
    Pendente: 'warning',
  }
  return map[status] ?? 'secondary'
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="h4 mb-4 text-body">Visão geral</h1>

    <section class="row g-3 g-md-4 mb-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="col-12 col-sm-6 col-xl-3"
      >
        <AppStatCard
          :title="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :variant="stat.variant"
          :subtitle="`${stat.change >= 0 ? '+' : ''}${stat.change}% em relação ao mês anterior`"
          :subtitle-class="stat.change >= 0 ? 'text-success' : 'text-danger'"
        />
      </div>
    </section>

    <section class="row g-3 g-md-4 mb-4">
      <div class="col-12 col-lg-8">
        <AppCard class="h-100">
          <template #header>
            <h2 class="h6 mb-0 text-body">Vendas (últimos 6 meses)</h2>
          </template>
          <LineChart :height="240" />
        </AppCard>
      </div>
      <div class="col-12 col-lg-4">
        <AppCard class="h-100">
          <template #header>
            <h2 class="h6 mb-0 text-body">Distribuição por tipo</h2>
          </template>
          <DoughnutChart :height="240" />
        </AppCard>
      </div>
    </section>

    <div class="row g-3 g-md-4">
      <div class="col-12 col-xl-8">
        <AppCard class="h-100" body-class="p-0">
          <template #header>
            <div class="d-flex align-items-center justify-content-between w-100">
              <h2 class="h6 mb-0 text-body">Últimos pedidos</h2>
              <router-link :to="{ name: 'home' }" class="btn btn-sm btn-outline-primary">
                Ver todos
              </router-link>
            </div>
          </template>
          <div>
            <AppTable hover>
              <template #thead>
                <tr>
                  <th class="py-3 ps-4">Pedido</th>
                  <th class="py-3">Cliente</th>
                  <th class="py-3">Valor</th>
                  <th class="py-3">Status</th>
                  <th class="py-3 pe-4 text-end">Data</th>
                </tr>
              </template>
              <template #tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td class="ps-4 fw-medium">{{ order.id }}</td>
                  <td>{{ order.cliente }}</td>
                  <td>{{ order.valor }}</td>
                  <td>
                    <AppBadge :variant="statusVariant(order.status) as 'success' | 'info' | 'warning' | 'secondary'">
                      {{ order.status }}
                    </AppBadge>
                  </td>
                  <td class="text-end pe-4 text-body-secondary">{{ order.data }}</td>
                </tr>
              </template>
            </AppTable>
          </div>
        </AppCard>
      </div>
      <div class="col-12 col-xl-4">
        <AppCard class="h-100">
          <template #header>
            <h2 class="h6 mb-0 text-body">Atividade recente</h2>
          </template>
          <ul class="list-group list-group-flush list-group-borderless mb-0">
            <li class="list-group-item d-flex align-items-start px-0">
              <span class="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style="width: 36px; height: 36px">
                <i class="bi bi-check-lg"></i>
              </span>
              <div>
                <p class="mb-0 small text-body">Novo pedido <strong>#7842</strong> recebido</p>
                <small class="text-body-secondary">Há 5 min</small>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-start px-0">
              <span class="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style="width: 36px; height: 36px">
                <i class="bi bi-person-plus"></i>
              </span>
              <div>
                <p class="mb-0 small text-body">Novo usuário cadastrado</p>
                <small class="text-body-secondary">Há 1 h</small>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-start px-0">
              <span class="rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style="width: 36px; height: 36px">
                <i class="bi bi-currency-dollar"></i>
              </span>
              <div>
                <p class="mb-0 small text-body">Meta do mês atingida em 78%</p>
                <small class="text-body-secondary">Ontem</small>
              </div>
            </li>
          </ul>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-borderless .list-group-item {
  border: 0;
}
</style>
