import { defineStore } from 'pinia'

interface UiState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  notifications: {
    id: number
    message: string
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  }[]
}

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed'

function loadInitialSidebarCollapsed(): boolean {
  if (typeof localStorage === 'undefined') {
    return false
  }
  return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    sidebarOpen: false,
    sidebarCollapsed: loadInitialSidebarCollapsed(),
    notifications: [],
  }),
  actions: {
    openSidebar() {
      this.sidebarOpen = true
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    toggleSidebarCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(this.sidebarCollapsed))
      }
    },
    pushNotification(message: string, variant: UiState['notifications'][number]['variant'] = 'info') {
      const id = Date.now()
      this.notifications.push({ id, message, variant })
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})

