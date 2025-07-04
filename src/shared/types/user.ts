import { Currency } from "./transactions"

enum Language {
  EN = 'en',
  RU = 'ru',
  UA = 'ua',
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  isTwoFactorEnabled: boolean
  mainCurrency: Currency
  language: Language
  createdAt: string
  updatedAt: string
}

export type { 
  User,
}