import { defineStore } from 'pinia'
import type { AuthUser } from '../domain/auth'
import { login as authLogin } from '../services/authService'

interface AuthState {
  user: AuthUser | null
  token: string | null
  loading: boolean
  error: string | null
}

const AUTH_STORAGE_KEY = 'pa-auth'

function loadInitialState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return { user: null, token: null, loading: false, error: null }
    }
    const parsed = JSON.parse(raw) as Pick<AuthState, 'user' | 'token'>
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
      loading: false,
      error: null,
    }
  } catch {
    return { user: null, token: null, loading: false, error: null }
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadInitialState(),
  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const result = await authLogin(email, password)

        this.user = result.user
        this.token = result.token

        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            user: this.user,
            token: this.token,
          }),
        )
      } catch (err) {
        this.user = null
        this.token = null
        this.error = err instanceof Error ? err.message : 'Não foi possível fazer login'
        localStorage.removeItem(AUTH_STORAGE_KEY)
        throw err
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.error = null
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },
  },
})

