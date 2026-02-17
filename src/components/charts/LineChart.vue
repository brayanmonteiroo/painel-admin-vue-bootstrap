<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getBootstrapChartColors } from '../../utils/chartColors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = withDefaults(
  defineProps<{
    labels?: string[]
    data?: number[]
    label?: string
    height?: number
  }>(),
  {
    labels: () => ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    data: () => [12, 19, 8, 15, 22, 18],
    label: 'Vendas',
    height: 200,
  }
)

const chartData = computed(() => {
  const colors = getBootstrapChartColors()
  return {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        data: props.data,
        borderColor: colors.primary,
        backgroundColor: colors.primary + '20',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  }
})

const chartOptions = computed(() => {
  const colors = getBootstrapChartColors()
  const gridColor = colors.borderColor
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: colors.bodyColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: colors.bodyColor },
      },
    },
  }
})
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
