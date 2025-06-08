import { ControlPanel, TransactionDetails } from "@/features/transaction-details"

const TransactionDetailsContent = () => {
  return (
    <div className="h-[calc(100vh-50px-60px)] relative">
      <ControlPanel />

      <div className="h-full">
        <TransactionDetails />
      </div>
    </div>
  )
}

export { TransactionDetailsContent }