import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      component: () => import('../views/RecuperarSenhaView.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
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
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/403',
      name: 'forbidden',
      component: () => import('../views/ForbiddenView.vue'),
    },
    {
      path: '/500',
      name: 'server-error',
      component: () => import('../views/ServerErrorView.vue'),
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-catch',
      component: NotFoundView,
    },
  ],
})

export default router
