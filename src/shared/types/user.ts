import { Currency } from "./transactions"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  isTwoFactorEnabled: boolean
  mainCurrency: Currency
  totalBalance: number
  createdAt: string
  updatedAt: string
}

export type { 
  User,
}