'use client'

import { TransactionCategory } from '@/shared/types'
import { Button } from '@/shared/ui'
import { ChevronDown } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/shared/ui/ui-lib/dropdown'
import { useToggle } from 'usehooks-ts'
import { cn } from '@/shared/lib'

const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  [TransactionCategory.SALARY]: 'Salary',
  [TransactionCategory.GIFT]: 'Gift',
  [TransactionCategory.INVESTMENT]: 'Investment',
  [TransactionCategory.FOOD]: 'Food',
  [TransactionCategory.TRANSPORT]: 'Transport',
  [TransactionCategory.HOUSING]: 'Housing',
  [TransactionCategory.UTILITIES]: 'Utilities',
  [TransactionCategory.HEALTH]: 'Health',
  [TransactionCategory.HOBBY]: 'Hobby',
  [TransactionCategory.OTHER]: 'Other'
}

interface TransactionCategoryDropdownProps {
  value: TransactionCategory
  onChange: (value: TransactionCategory) => void
  type?: 'INCOME' | 'EXPENSE'
}

const TransactionCategoryDropdown = ({ 
  value, 
  onChange,
  type = 'EXPENSE'
}: TransactionCategoryDropdownProps) => {
  const [dropdownOpen, toggleDropdownOpen] = useToggle()
  
  const categories = Object.values(TransactionCategory).filter(category => {
    if (type === 'INCOME') {
      return [TransactionCategory.SALARY, TransactionCategory.GIFT, TransactionCategory.INVESTMENT, TransactionCategory.OTHER].includes(category)
    }
    return [TransactionCategory.FOOD, TransactionCategory.TRANSPORT, TransactionCategory.HOUSING, 
            TransactionCategory.UTILITIES, TransactionCategory.HEALTH, TransactionCategory.HOBBY, 
            TransactionCategory.OTHER].includes(category)
  })

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
        {categories.map((category) => (
          <DropdownMenuItem 
            key={category} 
            onClick={() => onChange(category)}
          >
            {CATEGORY_LABELS[category]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TransactionCategoryDropdown } 