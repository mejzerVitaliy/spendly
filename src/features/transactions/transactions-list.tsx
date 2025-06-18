'use client'

import { useTransactions } from "@/shared/hooks"
import { Button } from "@/shared/ui"
import { PlusIcon } from "lucide-react"
import { CreateTransactionDialog } from "./ui/create-transaction-dialog"
import { TransactionCard } from "./ui"

const TransactionsList = () => {
  const { getAllTransactionsQuery } = useTransactions()
  const data = getAllTransactionsQuery.data

  const transactions = data?.data

  if (!transactions || !transactions.length) {
    return (
      <div className="w-full h-full bg-black/20 flex items-center justify-center text-text-tertiary">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold">
            Create your first transaction!
          </p>

          <CreateTransactionDialog
            trigger={
              <Button variant='branding' size='lg' className="mt-4" leftIcon={<PlusIcon className="w-4 h-4 fill-black" />}>
                Create
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-y-auto p-4 pt-0">
      <ul className="w-full flex flex-col gap-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ul>

      <CreateTransactionDialog />
    </div>
  )
}

export {TransactionsList}