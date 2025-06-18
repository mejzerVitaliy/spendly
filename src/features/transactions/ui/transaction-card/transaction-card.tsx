import { ROUTES } from "@/shared/consts"
import { cn } from "@/shared/lib"
import { Transaction, TransactionType } from "@/shared/types"
import Link from "next/link"

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Link
      href={`${ROUTES.TRANSACTIONS}/${transaction.id}`}
      className="w-full h-[100px] bg-background-white hover:bg-branding-primary-default transition-colors duration-300 p-6 rounded-card shadow-lg flex justify-between items-center gap-[40px]"
    >
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