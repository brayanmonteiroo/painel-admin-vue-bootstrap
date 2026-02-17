export type UserStatus = 'Ativo' | 'Inativo'

export interface User {
  id: number
  nome: string
  email: string
  status: UserStatus
}

