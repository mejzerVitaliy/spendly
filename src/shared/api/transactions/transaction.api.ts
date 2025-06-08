import { api } from "@/shared/api"
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetAllTransactionsResponse,
  GetTransactionByIdResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse
} from "@/shared/types"

const create = async (request: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
  const response = await api.post(
    "/transaction",
    request
  )

  return response.data
}

const getAll = async (): Promise<GetAllTransactionsResponse> => {
  const response = await api.get(
    "/transaction"
  )

  return response.data
}

const getById = async (id: string): Promise<GetTransactionByIdResponse> => {
  const response = await api.get(
    `/transaction/${id}`
  )

  return response.data
}

const update = async (id: string, request: UpdateTransactionRequest): Promise<UpdateTransactionResponse> => {
  const response = await api.put(
    `/transaction/${id}`,
    request
  )

  return response.data
}

const remove = async (id: string) => {
  const response = await api.delete(
    `/transaction/${id}`
  )

  return response.data
}

export const transactionApi = {
  create,
  getAll,
  getById,
  update,
  remove
}