'use client'

import { Button } from "@/shared/ui"
import { CreateTransactionDialog } from "../create-transaction-dialog"
import { GridIcon, ListIcon, PlusCircleIcon } from "lucide-react"
import { Searcher } from "@/features/searcher"
import { useAppearanceStore } from "@/shared/stores/appearance"

const ControlPanel = () => {
  const { transactionView, setTransactionView } = useAppearanceStore()

  return (
    <div className="w-full h-[80px] px-5 flex items-center justify-between">

      <div className="text-h2">Transactions</div>
      <Searcher />

      <div className="flex items-center gap-2">
        <Button 
          leftIcon={transactionView === 'row'
            ? <GridIcon className="!w-5 !h-5" />
            : <ListIcon className="!w-5 !h-5" />
          } 
          size={'icon'} 
          onClick={() => {
            setTransactionView(transactionView === 'row' ? 'grid' : 'row')
          }}
        />

        <CreateTransactionDialog
          trigger={
            <Button leftIcon={<PlusCircleIcon />}>
              Add new
            </Button>
          }
        />
      </div>
    </div>
  )
}

export {ControlPanel}