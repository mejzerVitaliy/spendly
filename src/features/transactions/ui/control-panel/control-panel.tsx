import { Button } from "@/shared/ui"
import { CreateTransactionDialog } from "../create-transaction-dialog"
import { PlusCircleIcon } from "lucide-react"

const ControlPanel = () => {
  return (
    <div className="w-full h-[100px] px-5 flex items-center justify-between">
      <h2 className="text-h2">
        Transactions
      </h2>

      <CreateTransactionDialog
        trigger={
          <Button leftIcon={<PlusCircleIcon />}>
            Add new
          </Button>
        }
      />
    </div>
  )
}

export {ControlPanel}