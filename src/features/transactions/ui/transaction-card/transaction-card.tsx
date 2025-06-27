'use client'

import { ROUTES } from "@/shared/consts"
import { cn } from "@/shared/lib"
import { useAppearanceStore } from "@/shared/stores/appearance"
import { Transaction, TransactionType } from "@/shared/types"
import Link from "next/link"

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { transactionView } = useAppearanceStore()

  if (transactionView === 'grid') {
    return (
      <Link
        href={`${ROUTES.TRANSACTIONS}/${transaction.id}`}
        className="w-full h-[160px] overflow-hidden bg-background-white hover:bg-branding-primary-default transition-colors duration-300 p-4 rounded-card flex flex-col justify-between"
      >  
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-text-tertiary">{new Date(transaction.date).toLocaleDateString()}</p>

          <p className={cn(
            transaction.type === TransactionType.INCOME ? 'text-text-positive' : 'text-text-negative',
            'text-lg font-medium'
          )}>
            {transaction.type === TransactionType.INCOME ? '+' : '-'}
            {transaction.amount}{' '}
            {transaction.currency}
          </p>
        </div>
        
        <div>
          <p className="text-lg font-medium">{transaction.category}</p>
        </div>

        <div className="max-w-[80%] text-sm">
          <p>{transaction.description}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`${ROUTES.TRANSACTIONS}/${transaction.id}`}
      className="w-full h-[60px] overflow-hidden bg-background-white hover:bg-branding-primary-default transition-colors duration-300 p-4 rounded-card flex gap-[40px] justify-between items-center">
      <div className="flex items-center gap-2 w-[30%]">
        <p>{transaction.category}</p>
      </div>

      <div className="w-[15%]">
        <p>{new Date(transaction.date).toLocaleDateString()}</p>
      </div>

      <div className="w-[40%] max-w-[35%] overflow-hidden text-ellipsis whitespace-nowrap">
        <p>{transaction.description}</p>
      </div>

      <div className="w-[15%]">
        <p className={cn(
          transaction.type === TransactionType.INCOME ? 'text-text-positive' : 'text-text-negative',
          'text-lg font-medium'
        )}>
          {transaction.type === TransactionType.INCOME ? '+' : '-'}
          {transaction.amount}{' '}
          {transaction.currency}
        </p>
      </div>
    </Link>
  )
}

export { TransactionCard }