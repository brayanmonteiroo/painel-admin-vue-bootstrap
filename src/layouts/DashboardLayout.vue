<script setup lang="ts">
import { computed } from 'vue'
import { Dropdown } from 'bootstrap'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '../store/ui'
import { useAuthStore } from '../store/auth'
import ThemeToggle from '../components/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()

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
      // apenas para evitar otimizações agressivas enquanto o template é simples
      void toggled
    })
  }
}

const pageTitle = computed(() => (route.meta?.title as string) ?? 'Dashboard')

const isActive = (path: string) =>
  route.path === path || (path !== '/dashboard' && route.path.startsWith(path + '/'))

function toggleSidebarCollapse() {
  uiStore.toggleSidebarCollapse()
}

function closeSidebar() {
  uiStore.closeSidebar()
}

function openSidebar() {
  uiStore.openSidebar()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="dashboard-wrapper d-flex min-vh-100">
    <aside
      id="dashboard-sidebar"
      class="dashboard-sidebar border-end bg-body flex-shrink-0"
      :class="{ 'sidebar-open': uiStore.sidebarOpen, 'sidebar-collapsed': uiStore.sidebarCollapsed }"
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
            :aria-label="uiStore.sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'"
            @click="toggleSidebarCollapse"
          >
            <i :class="uiStore.sidebarCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
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
              :title="uiStore.sidebarCollapsed ? item.name : undefined"
              @click="closeSidebar"
            >
              <i :class="`bi bi-${item.icon} sidebar-icon flex-shrink-0 me-2`" style="font-size: 1.1rem"></i>
              <span class="sidebar-label text-nowrap overflow-hidden">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="!uiStore.sidebarCollapsed" class="sidebar-label small text-body-secondary text-uppercase px-2 mt-3 mb-1">Autenticação</div>
        <ul class="nav flex-column">
          <li v-for="item in authItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link d-flex align-items-center rounded-2"
              :class="{ active: route.path === item.path }"
              :title="uiStore.sidebarCollapsed ? item.name : undefined"
              @click="closeSidebar"
            >
              <i :class="`bi bi-${item.icon} sidebar-icon flex-shrink-0 me-2`" style="font-size: 1.1rem"></i>
              <span class="sidebar-label text-nowrap overflow-hidden">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="!uiStore.sidebarCollapsed" class="sidebar-label small text-body-secondary text-uppercase px-2 mt-3 mb-1">Erros</div>
        <ul class="nav flex-column">
          <li v-for="item in errorItems" :key="item.path" class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link d-flex align-items-center rounded-2"
              :class="{ active: route.path === item.path }"
              :title="uiStore.sidebarCollapsed ? item.name : undefined"
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

    <div class="dashboard-overlay d-lg-none" :class="{ show: uiStore.sidebarOpen }" @click="closeSidebar" aria-hidden="true" />

    <main class="dashboard-main flex-grow-1 d-flex flex-column min-vh-100">
      <header class="dashboard-header dashboard-header-bar border-bottom bg-body py-2 px-3 px-md-4">
        <div class="d-flex align-items-center justify-content-between gap-2">
          <button
            type="button"
            class="btn btn-link d-lg-none p-0 text-body me-2 flex-shrink-0"
            aria-label="Abrir menu"
            @click="openSidebar"
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
  width: 100%;
  max-width: 100vw;
}

.dashboard-main {
  min-width: 0;
}

.dashboard-content {
  min-width: 0;
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
