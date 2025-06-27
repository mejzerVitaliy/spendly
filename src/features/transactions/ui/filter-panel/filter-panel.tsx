'use client'

import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { filterFormSchema, FilterFormSchema } from "./lib"
import { Form, FormControl, FormItem, FormField, Checkbox, Button } from "@/shared/ui"
import { PlusIcon } from "lucide-react"
import { useToggle } from "usehooks-ts"
import { motion, AnimatePresence } from "framer-motion";
import { Currency, TransactionCategory, TransactionType } from "@/shared/types"
import { cn } from "@/shared/lib"
import { useEffect } from "react"
import { useFilterStore } from "@/shared/stores"


const typeOptions = [
  {
    label: 'All Types',
    value: ''
  },
  {
    label: 'Income',
    value: TransactionType.INCOME
  },
  {
    label: 'Expense',
    value: TransactionType.EXPENSE
  }
]

const categoryOptions = [
  {
    label: 'All Categories',
    value: ''
  },
  {
    label: 'Food',
    value: TransactionCategory.FOOD
  },
  {
    label: 'Transport',
    value: TransactionCategory.TRANSPORT
  },
  {
    label: 'Gift',
    value: TransactionCategory.GIFT
  },
  {
    label: 'Health',
    value: TransactionCategory.HEALTH
  },
  {
    label: 'Salary',
    value: TransactionCategory.SALARY
  },
  {
    label: 'Housing',
    value: TransactionCategory.HOUSING
  },
  {
    label: 'Hobby',
    value: TransactionCategory.HOBBY
  },
  {
    label: 'Investment',
    value: TransactionCategory.INVESTMENT
  },
  {
    label: 'Utilities',
    value: TransactionCategory.UTILITIES
  },
  {
    label: 'Other',
    value: TransactionCategory.OTHER
  },
]

const currencyOptions = [
  {
    label: 'All Currencies',
    value: ''
  },
  {
    label: 'USD',
    value: Currency.USD
  },
  {
    label: 'EUR',
    value: Currency.EUR
  },
  {
    label: 'UAH',
    value: Currency.UAH
  }
]

const FilterPanel = () => {
  const [typeOpen, toggleTypeOpen] = useToggle()
  const [categoryOpen, toggleCategoryOpen] = useToggle()
  const [currencyOpen, toggleCurrencyOpen] = useToggle()

  const { setType, setCategories, setCurrencies } = useFilterStore()

  const form = useForm<FilterFormSchema>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      category: [''],
      type: '',
      currency: [''],
    }
  })

  const watchedType = form.watch('type')
  const watchedCategory = form.watch('category')
  const watchedCurrency = form.watch('currency')

  const handleMultiSelectChange = (checked: boolean | string, optionValue: string, field: FieldValues) => {
    const isChecked = checked === true
    const currentValues = field.value || []
    
    if (optionValue === '') {
      field.onChange([''])
    } else {
      if (isChecked) {
        const newValues = currentValues.filter((val: string) => val !== '').concat(optionValue)
        field.onChange(newValues)
      } else {
        if (currentValues.length === 1) {
          field.onChange([''])
        } else {
          field.onChange(currentValues.filter((val: string) => val !== optionValue))
        }
      }
    }
  }

  useEffect(() => {
    setType(watchedType as TransactionType)
  }, [watchedType, setType])

  useEffect(() => {
    setCategories(watchedCategory as TransactionCategory[])
  }, [watchedCategory, setCategories])

  useEffect(() => {
    setCurrencies(watchedCurrency as Currency[])
  }, [watchedCurrency, setCurrencies])

  return (
    <aside className="w-[220px] h-full p-4 bg-background-white rounded-card shadow-md flex flex-col">
      <Form {...form}>
        <form className="w-full space-y-2 flex-1">
          <p className="text-lg mb-2">Filters</p>

          <div>
            <div className="pb-2 border-b">
              <div className="flex items-center justify-between mb-0 cursor-pointer" onClick={() => toggleTypeOpen()}>
                <p className="text-p1-medium">Transaction type</p>

                <PlusIcon
                  className={cn("w-4 h-4 transition-transform duration-300", typeOpen && "rotate-[-135deg]")}
                />
              </div>

              <AnimatePresence>
                {typeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="overflow-hidden mt-2 "
                  >
                    {typeOptions.map((option) => (
                      <FormField
                        key={option.value || 'all'}
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={field.value === option.value}
                                  onCheckedChange={() => field.onChange(option.value)}
                                />
                                <p className="text-sm text-black/60">{option.label}</p>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pb-2 border-b">
              <div className="flex items-center justify-between mb-0 cursor-pointer" onClick={() => toggleCategoryOpen()}>
                <p className="text-p1-medium">Category</p>

                <PlusIcon
                  className={cn("w-4 h-4 transition-transform duration-300", categoryOpen && "rotate-[-135deg]")}
                />
              </div>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="overflow-hidden mt-2 max-h-[150px] custom-scrollbar-secondary overflow-y-auto "
                  >
                    {categoryOptions.map((option) => (
                      <FormField
                        key={option.value || 'all'}
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => handleMultiSelectChange(checked, option.value, field)}
                                />
                                <p className="text-sm text-black/60">{option.label}</p>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            <div>
              <div className="flex items-center justify-between mb-0 cursor-pointer" onClick={() => toggleCurrencyOpen()}>
                <p className="text-p1-medium">Currency</p>

                <PlusIcon
                  className={cn("w-4 h-4 transition-transform duration-300", currencyOpen && "rotate-[-135deg]")}
                />
              </div>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="overflow-hidden mt-2 max-h-[150px] custom-scrollbar-secondary overflow-y-auto "
                  >
                    {currencyOptions.map((option) => (
                      <FormField
                        key={option.value || 'all'}
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => handleMultiSelectChange(checked, option.value, field)}
                                />
                                <p className="text-sm text-black/60">{option.label}</p>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </Form>

      <Button variant="secondary" className="w-full" onClick={() => form.reset()}>
        Reset filters
      </Button>
    </aside>
  )
}

export { FilterPanel }