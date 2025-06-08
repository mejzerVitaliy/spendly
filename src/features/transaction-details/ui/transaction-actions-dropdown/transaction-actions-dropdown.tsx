import { cn } from '@/shared/lib'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/ui-lib'
import { ChevronDownIcon } from 'lucide-react'
import React, { useMemo } from 'react'
import { useToggle } from 'usehooks-ts'
import { useTransactionActions } from './lib'
import { useParams } from 'next/navigation'

const TransactionActionsDropdown = () => {
  const [open, toggleOpen] = useToggle()
  const { id } = useParams<{ id: string }>()

  const { onRemoveTransaction, onUpdateTransaction } = useTransactionActions()

  const actions = useMemo(() => ([
    {
      label: 'Edit',
      onClick: () => {
        console.log('Edit')
      }
    },
    {
      label: 'Delete',
      onClick: () => onRemoveTransaction(id)
    }
  ]), [id, onRemoveTransaction, onUpdateTransaction])

  return (
    <DropdownMenu open={open} onOpenChange={toggleOpen}>
      <DropdownMenuTrigger>
        <Button
          variant='outline'
          size='sm'
          rightIcon={<ChevronDownIcon className={cn('w-4 h-4 transition-transform duration-300', open && 'rotate-180')} />}
        >
          Actions
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {actions.map((action) => (
          <DropdownMenuItem key={action.label} onClick={action.onClick} className='cursor-pointer'>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TransactionActionsDropdown }