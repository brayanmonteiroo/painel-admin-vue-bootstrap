import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'
import { errorRoutes } from './errors'
import { useAuthStore } from '../store/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...dashboardRoutes, ...errorRoutes],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isDashboardRoute = to.path.startsWith('/dashboard')

  if (isDashboardRoute && !authStore.isAuthenticated) {
    if (to.name === 'login') {
      return true
    }
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
