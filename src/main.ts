const stored = localStorage.getItem('bs-theme')
const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
let theme: 'light' | 'dark'
if (stored === 'light' || stored === 'dark') {
  theme = stored
} else {
  // 'auto' or not set => follow system preference
  theme = prefersDark ? 'dark' : 'light'
}
document.documentElement.setAttribute('data-bs-theme', theme)

import './assets/main.css'
import './assets/theme.scss'
import './assets/theme-contrast.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
