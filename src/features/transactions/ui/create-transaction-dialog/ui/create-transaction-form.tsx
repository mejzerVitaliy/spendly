'use client'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createTransactionSchema, CreateTransactionValues } from '../lib'
import { Currency, TransactionCategory, TransactionType } from '@/shared/types'
import { TransactionCategoryDropdown } from '@/features/transactions/ui/create-transaction-dialog/ui/transaction-category-dropdown'
import { TransactionTypeDropdown } from '@/features/transactions/ui/create-transaction-dialog/ui/transaction-type-dropdown'
import { DateInput } from '@/shared/ui'
import { CheckIcon, ChevronDown, PlusIcon } from 'lucide-react'
import { useToggle } from 'usehooks-ts'
import { cn } from '@/shared/lib'
import { useTransactions } from '@/shared/hooks'

const CreateTransactionForm = () => {
  const [currencyDropdownOpen, toggleCurrencyDropdownOpen] = useToggle()
  const { createTransactionMutation, getAllTransactionsQuery } = useTransactions()

  const form = useForm<CreateTransactionValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      description: '',
      type: TransactionType.EXPENSE,
      date: new Date(),
      category: TransactionCategory.FOOD,
      currency: Currency.USD
    }
  })

  const onSubmit = async (data: CreateTransactionValues) => {
    const preparedData = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date)
    }

    try {
      await createTransactionMutation.mutateAsync(preparedData)
      getAllTransactionsQuery.refetch()
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          name='amount'
          render={({field}) => (
            <FormItem className='w-full'>
              <FormLabel>Transaction Amount</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter amount'
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          name='description'
          render={({field}) => (
            <FormItem className='w-full'>
              <FormLabel>Transaction Description</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter description'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='w-full flex gap-3'>
          <FormField 
            name='type'
            render={({field}) => (
              <FormItem className='w-full'>
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <TransactionTypeDropdown
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='currency'
            render={({field}) => (
              <FormItem className='w-full'>
                <FormLabel>Transaction Currency</FormLabel>
                <FormControl>
                  <DropdownMenu
                    open={currencyDropdownOpen}
                    onOpenChange={toggleCurrencyDropdownOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        size='lg'
                        className='w-full flex items-center justify-between'
                      >
                        {field.value}
                        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', currencyDropdownOpen && 'rotate-180')} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full'>
                      {Object.values(Currency).map((currency) => (
                        <DropdownMenuItem 
                          key={currency} 
                          onClick={() => field.onChange(currency)}
                          className='w-full flex items-center justify-between'
                        >
                          <p>{currency}</p>
                          {field.value === currency && <CheckIcon className='w-4 h-4' />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        

        <FormField
          name='category'
          render={({field}) => (
            <FormItem className='w-full'>
              <FormLabel>Transaction Category</FormLabel>
              <FormControl>
                <TransactionCategoryDropdown
                  value={field.value}
                  onChange={field.onChange}
                  type={form.watch('type')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='date'
          render={({field}) => (
            <FormItem className='w-full'>
              <FormLabel>Transaction Date</FormLabel>
              <div className='w-full'>
                <DateInput
                  date={field.value}
                  onCalendarChange={field.onChange}
                  className='w-full'
                  hasIcon
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type='submit'
          className='w-full'
          size='lg'
          variant='branding'
          rightIcon={<PlusIcon className='w-4 h-4' />}
          disabled={!form.formState.isValid || createTransactionMutation.isPending}
        >
          {createTransactionMutation.isPending ? 'Creating...' : 'Create Transaction'}
        </Button>
      </form>
    </Form>
  )
}

export { CreateTransactionForm }