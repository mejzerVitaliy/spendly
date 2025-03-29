import { ControlPanel, Transactions } from "@/features/transactions";

export default function TransactionsPage() {
  return (
    <div className="relative">
      <ControlPanel />

      <div className="p-4">
        <Transactions />
      </div>
    </div>
  );
}