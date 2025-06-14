'use client'

import { useTransactions } from "@/shared/hooks"
import { Button } from "@/shared/ui"
import { PlusIcon } from "lucide-react"
import { CreateTransactionDialog } from "./ui/create-transaction-dialog"
import Link from "next/link"
import { ROUTES } from "@/shared/consts"

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
    <div className="relative w-full h-full overflow-y-auto p-4">
      <ul className="w-full flex flex-col gap-4">
        {transactions.map(transaction => (
          <Link href={`${ROUTES.TRANSACTIONS}/${transaction.id}`} key={transaction.id} className="w-full h-[100px] bg-branding-primary-default p-4 rounded-card shadow-lg">
            <h4 className="text-lg font-semibold">{transaction.amount}</h4>
            <p className="text-base">{transaction.description}</p>
          </Link>
        ))}
      </ul>

      <CreateTransactionDialog />
    </div>
  )
}

export {TransactionsList}