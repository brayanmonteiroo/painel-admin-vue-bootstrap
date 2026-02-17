<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getBootstrapChartColors } from '../../utils/chartColors'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const props = withDefaults(
  defineProps<{
    labels?: string[]
    data?: number[]
    height?: number
  }>(),
  {
    labels: () => ['Vendas diretas', 'Assinaturas', 'Outros'],
    data: () => [45, 35, 20],
    height: 200,
  }
)

const chartData = computed(() => {
  const colors = getBootstrapChartColors()
  const chartColors = [colors.primary, colors.success, colors.info]
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: chartColors,
        borderColor: chartColors.map((c) => c),
        borderWidth: 1,
      },
    ],
  }
})

const chartOptions = computed(() => {
  const colors = getBootstrapChartColors()
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: colors.bodyColor },
      },
    },
  }
})
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
