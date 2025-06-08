'use client'

import { TransactionType } from '@/shared/types'
import { Button } from '@/shared/ui'
import { ChevronDown } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/shared/ui/ui-lib/dropdown'
import { cn } from '@/shared/lib'
import { useToggle } from 'usehooks-ts'

interface TransactionTypeDropdownProps {
  value: TransactionType
  onChange: (value: TransactionType) => void
}

const TransactionTypeDropdown = ({ 
  value, 
  onChange,
}: TransactionTypeDropdownProps) => {
  const [dropdownOpen, toggleDropdownOpen] = useToggle()

  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={toggleDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='lg'
          className='w-full flex items-center justify-between'
        >
          {value}
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', dropdownOpen && 'rotate-180')} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onChange(TransactionType.INCOME)}>
          Income
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(TransactionType.EXPENSE)}>
          Expense
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TransactionTypeDropdown } 