import { ApiResponse } from "@/shared/types"

enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

enum TransactionCategory {
  SALARY = 'SALARY',
  GIFT = 'GIFT',
  INVESTMENT = 'INVESTMENT',
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  HOUSING = 'HOUSING',
  UTILITIES = 'UTILITIES',
  HEALTH = 'HEALTH',
  HOBBY = 'HOBBY',
  OTHER = 'OTHER'
}

enum Currency {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR'
}

interface Transaction {
  id: string
  description?: string
  amount: number
  type: TransactionType
  date: Date
  category: TransactionCategory
  currency: Currency
}

interface CreateTransactionRequest {
  description?: string
  amount: number
  type: TransactionType
  date: Date
  category: TransactionCategory
  currency: Currency
}

interface CreateTransactionResponse
  extends ApiResponse<Transaction> {}

interface GetAllTransactionsResponse
  extends ApiResponse<Transaction[]> {}

interface GetTransactionByIdResponse
  extends ApiResponse<Transaction> {}

interface UpdateTransactionRequest {
  description?: string
  amount: number
  type: TransactionType
  date: Date
  category: TransactionCategory
  currency: Currency
}

interface UpdateTransactionResponse
  extends ApiResponse<Transaction> {}


export type {
  Transaction,
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetAllTransactionsResponse,
  GetTransactionByIdResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse
}

export {
  TransactionType,
  TransactionCategory,
  Currency
}