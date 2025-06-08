'use client'

import { ROUTES } from "@/shared/consts";
import { useTransactions } from "@/shared/hooks"
import { UpdateTransactionRequest } from "@/shared/types";
import { useRouter } from "next/navigation";

const useTransactionActions = () => {
  const { removeTransactionMutation, updateTransactionMutation } = useTransactions();
  const router = useRouter();

  const handleRemoveTransaction = async (id: string) => {
    try {
      await removeTransactionMutation.mutateAsync(id);
      router.push(ROUTES.TRANSACTIONS);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateTransaction = async (id: string, data: UpdateTransactionRequest) => {
    try {
      await updateTransactionMutation.mutateAsync({ id, data });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    onRemoveTransaction: handleRemoveTransaction,
    onUpdateTransaction: handleUpdateTransaction
  }
}

export { useTransactionActions }