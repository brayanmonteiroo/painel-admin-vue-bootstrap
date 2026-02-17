import type { ReportFilters, ReportRow, ReportSummaryCard } from '../domain/report'

export interface ReportData {
  resumo: ReportSummaryCard[]
  dados: ReportRow[]
}

export async function getDashboardReport(filters: ReportFilters): Promise<ReportData> {
  // Simulação de consulta de relatórios apenas para o template.
  // Em um projeto real, utilize aqui um client HTTP apontando para sua API.
  await new Promise((resolve) => setTimeout(resolve, 400))

  const baseResumo: ReportSummaryCard[] = [
    { label: 'Total de vendas', value: 'R$ 128.450,00', variant: 'success' },
    { label: 'Pedidos', value: '342', variant: 'primary' },
    { label: 'Ticket médio', value: 'R$ 375,58', variant: 'info' },
  ]

  const baseDados: ReportRow[] = [
    { data: '16/02/2026', descricao: 'Vendas diretas', valor: 'R$ 12.400,00' },
    { data: '15/02/2026', descricao: 'Assinaturas', valor: 'R$ 8.200,00' },
    { data: '14/02/2026', descricao: 'Vendas diretas', valor: 'R$ 15.100,00' },
    { data: '13/02/2026', descricao: 'Assinaturas', valor: 'R$ 7.850,00' },
  ]

  // Apenas um exemplo simples de como os filtros poderiam alterar os dados
  if (filters.tipo === 'usuarios') {
    return {
      resumo: [
        { label: 'Novos usuários', value: '128', variant: 'success' },
        { label: 'Usuários ativos', value: '2.345', variant: 'primary' },
        { label: 'Churn', value: '2,3%', variant: 'danger' },
      ],
      dados: [
        { data: '16/02/2026', descricao: 'Novos cadastros', valor: '36' },
        { data: '15/02/2026', descricao: 'Novos cadastros', valor: '28' },
        { data: '14/02/2026', descricao: 'Novos cadastros', valor: '31' },
        { data: '13/02/2026', descricao: 'Novos cadastros', valor: '33' },
      ],
    }
  }

  return {
    resumo: baseResumo,
    dados: baseDados,
  }
}

