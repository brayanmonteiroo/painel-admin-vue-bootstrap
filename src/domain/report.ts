export interface ReportSummaryCard {
  label: string
  value: string
  variant: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
}

export interface ReportRow {
  data: string
  descricao: string
  valor: string
}

export interface ReportFilters {
  periodo: string
  tipo: string
}

