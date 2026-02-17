import type { User } from '../domain/user'

// Dados estáticos apenas para demonstração no template.
const MOCK_USERS: User[] = [
  { id: 1, nome: 'Maria Silva', email: 'maria@exemplo.com', status: 'Ativo' },
  { id: 2, nome: 'João Santos', email: 'joao@exemplo.com', status: 'Ativo' },
  { id: 3, nome: 'Ana Costa', email: 'ana@exemplo.com', status: 'Inativo' },
  { id: 4, nome: 'Pedro Oliveira', email: 'pedro@exemplo.com', status: 'Ativo' },
  { id: 5, nome: 'Carla Mendes', email: 'carla@exemplo.com', status: 'Ativo' },
]

export async function listUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...MOCK_USERS]
}

