import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
      },
      {
        path: 'recuperar-senha',
        name: 'recuperar-senha',
        component: () => import('../views/RecuperarSenhaView.vue'),
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import('../views/CadastroView.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  },
]

