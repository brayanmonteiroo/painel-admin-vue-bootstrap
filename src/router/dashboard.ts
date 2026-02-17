import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: 'relatorios',
        name: 'dashboard-relatorios',
        component: () => import('../views/RelatoriosView.vue'),
        meta: { title: 'Relatórios' },
      },
      {
        path: 'configuracoes',
        name: 'dashboard-configuracoes',
        component: () => import('../views/ConfiguracoesView.vue'),
        meta: { title: 'Configurações' },
      },
      {
        path: 'usuarios',
        name: 'dashboard-usuarios',
        component: () => import('../views/UsuariosView.vue'),
        meta: { title: 'Usuários' },
      },
      {
        path: 'usuarios/novo',
        name: 'dashboard-usuarios-novo',
        component: () => import('../views/UsuarioFormView.vue'),
        meta: { title: 'Novo usuário' },
      },
      {
        path: 'usuarios/:id/edit',
        name: 'dashboard-usuarios-edit',
        component: () => import('../views/UsuarioFormView.vue'),
        meta: { title: 'Editar usuário' },
      },
      {
        path: 'perfil',
        name: 'dashboard-perfil',
        component: () => import('../views/PerfilView.vue'),
        meta: { title: 'Perfil' },
      },
      {
        path: 'componentes',
        name: 'dashboard-componentes',
        component: () => import('../views/ComponentesView.vue'),
        meta: { title: 'Componentes' },
      },
    ],
  },
]

