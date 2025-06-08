'use client'

import { useParams } from "next/navigation"
import { TransactionActionsDropdown } from "../transaction-actions-dropdown/transaction-actions-dropdown"
import { useTransactions } from "@/shared/hooks";

const ControlPanel = () => {
  const { id } = useParams<{ id: string }>();

  const { getTransactionByIdQuery } = useTransactions();

  const { data } = getTransactionByIdQuery(id);

  const transaction = data?.data;

  return (
    <div className="w-full h-[50px] px-4 bg-background-input flex items-center justify-between">
      <h2 className="text-h2 capitalize">
        Transaction: {transaction?.description || 'Transaction'}
      </h2>

      <TransactionActionsDropdown />
    </div>
  )
}

export {ControlPanel}