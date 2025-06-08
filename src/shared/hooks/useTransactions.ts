'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { transactionApi } from "../api/transactions"
import { UpdateTransactionRequest } from "../types"

const useTransactions = () => {
  const queryClient = useQueryClient()

  const useCreateTransactionMutation = () => useMutation({
    mutationKey: ['transactions'],
    mutationFn: transactionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }
  })

  const useGetAllTransactionsQuery = () => useQuery({
    queryKey: ['transactions'],
    queryFn: transactionApi.getAll,
  })

  const useGetTransactionByIdQuery = (id: string) => useQuery({
    queryKey: ['transactions', id],
    queryFn: () => transactionApi.getById(id),
  })

  const useUpdateTransactionMutation = () => useMutation({
    mutationKey: ['transactions'],
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionRequest }) => transactionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }
  })

  const useRemoveTransactionMutation = () => useMutation({
    mutationKey: ['transactions'],
    mutationFn: transactionApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }
  })

  return {
    createTransactionMutation: useCreateTransactionMutation(),
    getAllTransactionsQuery: useGetAllTransactionsQuery(),
    getTransactionByIdQuery: useGetTransactionByIdQuery,
    updateTransactionMutation: useUpdateTransactionMutation(),
    removeTransactionMutation: useRemoveTransactionMutation()
  }
}

export { useTransactions }