'use client'

import {
  Button,
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/shared/ui"
import { ReactNode } from "react"
import { CreateTransactionForm } from "./ui"
import { PlusIcon } from "lucide-react"
import { useToggle } from "usehooks-ts"

interface CreateTransactionDialogProps {
  trigger?: ReactNode
}

const CreateTransactionDialog = ({ trigger }: CreateTransactionDialogProps) => {
  const [open, toggleOpen] = useToggle()
  
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger
        asChild
      >
        {trigger 
          ? trigger
          : (
            <Button
              variant='branding'
              size='icon'
              className="fixed rounded-full w-14 h-14 bottom-10 right-10 z-10"
            >
              <PlusIcon className='!w-8 !h-8' />
            </Button>
          )
        }
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Transaction</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <CreateTransactionForm onDialogClose={toggleOpen} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { CreateTransactionDialog }