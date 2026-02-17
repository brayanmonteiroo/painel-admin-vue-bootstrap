function getCssVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || ''
}

export function getBootstrapChartColors(): {
  primary: string
  success: string
  info: string
  warning: string
  danger: string
  bodyColor: string
  borderColor: string
} {
  return {
    primary: getCssVar('--bs-primary') || '#0d6efd',
    success: getCssVar('--bs-success') || '#198754',
    info: getCssVar('--bs-info') || '#0dcaf0',
    warning: getCssVar('--bs-warning') || '#ffc107',
    danger: getCssVar('--bs-danger') || '#dc3545',
    bodyColor: getCssVar('--bs-body-color') || '#212529',
    borderColor: getCssVar('--bs-border-color') || 'rgba(0,0,0,0.1)',
  }
}
