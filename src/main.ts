const stored = localStorage.getItem('bs-theme')
const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
document.documentElement.setAttribute('data-bs-theme', theme)

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
