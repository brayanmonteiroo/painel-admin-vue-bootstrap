<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Dropdown } from 'bootstrap'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed'
const sidebarCollapsed = ref(
  typeof localStorage !== 'undefined' && localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
)

function sendDebugLog(runId: string, hypothesisId: string, message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c44a3593-60d6-4ab7-9dbc-7c9f9ca5fd5b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      location: 'src/layouts/DashboardLayout.vue',
      message,
      data,
      runId,
      hypothesisId,
    }),
  }).catch(() => {})
  // #endregion
}

onMounted(() => {
  sendDebugLog('run2', 'H-env', 'DashboardLayout mounted', {
    hasWindow: typeof window !== 'undefined',
    hasBootstrapOnWindow: typeof window !== 'undefined' && typeof (window as any).bootstrap !== 'undefined',
    hasDropdownImport: typeof Dropdown === 'function',
  })
})

function toggleSidebarCollapse() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed.value))
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'speedometer2' },
  { name: 'Relatórios', path: '/dashboard/relatorios', icon: 'graph-up' },
  { name: 'Usuários', path: '/dashboard/usuarios', icon: 'people' },
  { name: 'Perfil', path: '/dashboard/perfil', icon: 'person' },
  { name: 'Configurações', path: '/dashboard/configuracoes', icon: 'gear' },
  { name: 'Componentes', path: '/dashboard/componentes', icon: 'puzzle' },
]

const authItems = [
  { name: 'Login', path: '/', icon: 'box-arrow-in-right' },
  { name: 'Cadastro', path: '/cadastro', icon: 'person-plus' },
  { name: 'Recuperar senha', path: '/recuperar-senha', icon: 'key' },
]

const errorItems = [
  { name: '404 Não encontrado', path: '/404', icon: 'exclamation-triangle' },
  { name: '403 Acesso negado', path: '/403', icon: 'shield-lock' },
  { name: '500 Erro do servidor', path: '/500', icon: 'exclamation-octagon' },
]

function onUserMenuClick(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement | null
  const menu = target?.parentElement?.querySelector('.dropdown-menu')

  sendDebugLog('run2', 'H-click-before', 'Sidebar user menu clicked (before Bootstrap)', {
    hasTarget: Boolean(target),
    hasMenu: Boolean(menu),
    menuClasses: menu?.className ?? null,
  })

  let toggled = false
  if (target) {
    try {
      const instance = Dropdown.getOrCreateInstance(target)
      instance.toggle()
      toggled = true
    } catch {
      toggled = false
    }
  }

  if (menu) {
    requestAnimationFrame(() => {
      sendDebugLog('run2', 'H-click-after', 'Sidebar user menu clicked (after potential Bootstrap handling)', {
        hasMenu: true,
        menuClasses: menu.className,
        toggled,
      })
    })
  }
}

const pageTitle = computed(() => (route.meta?.title as string) ?? 'Dashboard')

const isActive = (path: string) => route.path === path || (path !== '/dashboard' && route.path.startsWith(path + '/'))

function closeSidebar() {
  sidebarOpen.value = false
}

function logout() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="dashboard-wrapper d-flex min-vh-100">
    <aside
      id="dashboard-sidebar"
      class="dashboard-sidebar border-end bg-body flex-shrink-0"
      :class="{ 'sidebar-open': sidebarOpen, 'sidebar-collapsed': sidebarCollapsed }"
    >
      <div class="sidebar-header dashboard-header-bar d-flex align-items-center justify-content-between p-3 border-bottom">
        <span class="fw-bold text-body d-flex align-items-center overflow-hidden min-w-0">
          <span class="sidebar-icon-wrapper flex-shrink-0 d-flex align-items-center justify-content-center">
            <i class="bi bi-grid-1x2-fill sidebar-icon"></i>
          </span>
          <span class="sidebar-label ms-2 text-nowrap">Dashboard</span>
        </span>
        <div class="d-flex align-items-center gap-1 flex-shrink-0">
          <button
            type="button"
            class="btn btn-link d-none d-lg-inline-block p-0 text-body"
            :aria-label="sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'"
            @click="toggleSidebarCollapse"
          >
            <i :class="sidebarCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
          </button>
          <button
            type="button"
            class="btn btn-link d-lg-none p-0 text-body"
            aria-label="Fechar menu"
            @click="closeSidebar"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <nav class="sidebar-nav p-2">
        <ul class="nav flex-column">
          <li v-for="item in navItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link d-flex align-items-center rounded-2"
              :class="{ active: isActive(item.path) }"
              :title="sidebarCollapsed ? item.name : undefined"
              @click="closeSidebar"
            >
              <i :class="`bi bi-${item.icon} sidebar-icon flex-shrink-0 me-2`" style="font-size: 1.1rem"></i>
              <span class="sidebar-label text-nowrap overflow-hidden">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="!sidebarCollapsed" class="sidebar-label small text-body-secondary text-uppercase px-2 mt-3 mb-1">Autenticação</div>
        <ul class="nav flex-column">
          <li v-for="item in authItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link d-flex align-items-center rounded-2"
              :class="{ active: route.path === item.path }"
              :title="sidebarCollapsed ? item.name : undefined"
              @click="closeSidebar"
            >
              <i :class="`bi bi-${item.icon} sidebar-icon flex-shrink-0 me-2`" style="font-size: 1.1rem"></i>
              <span class="sidebar-label text-nowrap overflow-hidden">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="!sidebarCollapsed" class="sidebar-label small text-body-secondary text-uppercase px-2 mt-3 mb-1">Erros</div>
        <ul class="nav flex-column">
          <li v-for="item in errorItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link d-flex align-items-center rounded-2"
              :class="{ active: route.path === item.path }"
              :title="sidebarCollapsed ? item.name : undefined"
              @click="closeSidebar"
            >
              <i :class="`bi bi-${item.icon} sidebar-icon flex-shrink-0 me-2`" style="font-size: 1.1rem"></i>
              <span class="sidebar-label text-nowrap overflow-hidden">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer mt-auto p-3 border-top">
        <div class="dropdown">
          <button
            class="btn btn-sm w-100 d-flex align-items-center justify-content-center sidebar-user-btn"
            type="button"
            @click="onUserMenuClick"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0 me-2 sidebar-user-avatar"
                  style="width: 28px; height: 28px">
              <i class="bi bi-person"></i>
            </span>
            <span class="sidebar-label sidebar-user-label text-start flex-grow-1 text-truncate min-w-0">Usuário</span>
            <i class="bi bi-chevron-down sidebar-user-chevron ms-1 flex-shrink-0"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end w-100 shadow">
            <li><router-link class="dropdown-item" :to="{ name: 'dashboard-perfil' }" @click="closeSidebar"><i class="bi bi-person me-2"></i>Perfil</router-link></li>
            <li><router-link class="dropdown-item" :to="{ name: 'dashboard-configuracoes' }" @click="closeSidebar"><i class="bi bi-gear me-2"></i>Conta</router-link></li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button type="button" class="dropdown-item text-danger" @click="logout">
                <i class="bi bi-box-arrow-right me-2"></i>Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <div class="dashboard-overlay d-lg-none" :class="{ show: sidebarOpen }" @click="closeSidebar" aria-hidden="true" />

    <main class="dashboard-main flex-grow-1 d-flex flex-column min-vh-100">
      <header class="dashboard-header dashboard-header-bar border-bottom bg-body py-3 px-3 px-md-4">
        <div class="d-flex align-items-center justify-content-between gap-2">
          <button
            type="button"
            class="btn btn-link d-lg-none p-0 text-body me-2 flex-shrink-0"
            aria-label="Abrir menu"
            @click="sidebarOpen = true"
          >
            <i class="bi bi-list" style="font-size: 1.5rem"></i>
          </button>
          <nav aria-label="breadcrumb" class="flex-grow-1 min-w-0">
            <ol class="breadcrumb mb-0 flex-nowrap text-truncate">
              <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
              <li v-if="pageTitle !== 'Dashboard'" class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
            </ol>
          </nav>
          <div class="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div class="dashboard-content flex-grow-1 p-3 p-md-4">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  background-color: var(--bs-body-bg);
}

.dashboard-header-bar {
  height: 3.5rem;
  min-height: 3.5rem;
  box-sizing: border-box;
  flex-shrink: 0;
}

.dashboard-sidebar {
  width: 260px;
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1040;
  transition: width 0.2s ease;
}

@media (min-width: 992px) {
  .dashboard-sidebar {
    display: flex;
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .dashboard-sidebar.sidebar-collapsed {
    width: 64px;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-label {
    width: 0;
    overflow: hidden;
    opacity: 0;
    margin: 0;
    padding: 0;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-icon.me-2 {
    margin-right: 0 !important;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-header span.fw-bold {
    justify-content: center;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-user-label,
  .dashboard-sidebar.sidebar-collapsed .sidebar-user-chevron {
    display: none !important;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-user-avatar {
    margin-right: 0 !important;
  }

  .dashboard-sidebar.sidebar-collapsed .sidebar-footer .sidebar-user-btn {
    justify-content: center;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
}

.sidebar-icon-wrapper {
  width: 1.25rem;
  height: 1.25rem;
}

.sidebar-icon-wrapper .sidebar-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.sidebar-user-btn {
  border: 1px solid var(--bs-border-color);
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
}

.sidebar-user-btn:hover {
  background-color: var(--bs-secondary-bg);
  border-color: var(--bs-border-color);
  color: var(--bs-body-color);
}

@media (max-width: 991.98px) {
  .dashboard-sidebar {
    display: flex;
    transform: translateX(-100%);
    transition: transform 0.2s ease-out;
  }

  .dashboard-sidebar.sidebar-open {
    transform: translateX(0);
  }

  .dashboard-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1035;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
  }

  .dashboard-overlay.show {
    opacity: 1;
    visibility: visible;
  }
}

.sidebar-nav .nav-link {
  color: var(--bs-body-color);
  padding: 0.5rem 0.75rem;
}

.sidebar-nav .nav-link:hover {
  background-color: var(--bs-secondary-bg);
  color: var(--bs-body-color);
}

.sidebar-nav .nav-link.active {
  background-color: var(--bs-primary-bg-subtle);
  color: var(--bs-primary);
}

.breadcrumb-item a {
  color: var(--bs-body-color);
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}
</style>
