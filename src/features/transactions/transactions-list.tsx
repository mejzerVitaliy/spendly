'use client'

import { useTransactions } from "@/shared/hooks"
import { Button } from "@/shared/ui"
import { PlusIcon } from "lucide-react"
import { CreateTransactionDialog } from "./ui/create-transaction-dialog"
import { FilterPanel, TransactionCard } from "./ui"
import { useFilterStore } from "@/shared/stores"
import { useAppearanceStore } from "@/shared/stores/appearance"
import { cn } from "@/shared/lib"
import { useEffect, useState } from "react"
import { Transaction } from "@/shared/types"

const TransactionsList = () => {
  const { search, type, categories, currencies, date } = useFilterStore()
  const { transactionView } = useAppearanceStore()

  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  const { getAllTransactionsQuery } = useTransactions()
  const data = getAllTransactionsQuery.data

  const transactions = data?.data

  useEffect(() => {
    const filteredTransactions = transactions?.filter((transaction) => {
      let isFilterPassed = true

      if (search) {
        isFilterPassed = isFilterPassed && (transaction.description?.toLowerCase().includes(search.toLowerCase()) || false)
      }

      if (type) {
        isFilterPassed = isFilterPassed && (transaction.type === type)
      }

      if (categories && categories.length > 0) {
        const validCategories = categories.filter(cat => cat !== '')
        if (validCategories.length > 0) {
          isFilterPassed = isFilterPassed && validCategories.includes(transaction.category)
        }
      }

      if (currencies && currencies.length > 0) {
        const validCurrencies = currencies.filter(curr => curr !== '')
        if (validCurrencies.length > 0) {
          isFilterPassed = isFilterPassed && validCurrencies.includes(transaction.currency)
        }
      }

      if (date) {
        const transactionDate = new Date(transaction.date).toLocaleDateString()
        isFilterPassed = isFilterPassed && (transactionDate === date)
      }

      return isFilterPassed
    })

    const sortedTransactions = filteredTransactions?.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    setFilteredTransactions(sortedTransactions || [])
  }, [transactions, search, type, categories, currencies, date])

  if (getAllTransactionsQuery.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="w-20 h-20 border-4 border-dashed border-branding-primary-default rounded-full animate-spin" />
      </div>
    )
  }

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
    <div className="relative w-full h-full flex gap-6 pl-6 pb-6 pr-2">
      <FilterPanel />

      <div className="w-full h-full overflow-y-auto custom-scrollbar-primary">
        {(filteredTransactions && filteredTransactions.length > 0) 
          ? (
          <ul 
            className={cn(
              "w-full grid gap-4 pr-6",
              transactionView === 'grid' ? 'grid-cols-3' : 'grid-cols-1'
            )}
          >
            {filteredTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </ul>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-lg text-text-tertiary">
                There are no transactions that match your filters
              </p>
            </div>
          )
        }
      </div>

      <CreateTransactionDialog />
    </div>
  )
}

export {TransactionsList}