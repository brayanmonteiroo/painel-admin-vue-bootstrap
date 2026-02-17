import type { LoginResult } from '../domain/auth'

export async function login(email: string, password: string): Promise<LoginResult> {
  // Simulação de login apenas para o template. Em produção,
  // substitua por uma chamada HTTP real para sua API.
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!email || !password) {
    throw new Error('Informe e-mail e senha')
  }

  return {
    user: {
      id: 1,
      name: 'Usuário Demo',
      email,
    },
    token: 'fake-token',
  }
}

