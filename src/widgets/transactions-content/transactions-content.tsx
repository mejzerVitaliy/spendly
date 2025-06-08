import { ControlPanel, TransactionsList } from '@/features/transactions'

const TransactionsContent = () => {
  return (
    <div className="h-[calc(100vh-50px-60px)] relative">
      <ControlPanel />

      <div className="h-full">
        <TransactionsList />
      </div>
    </div>
  )
}

export {TransactionsContent}