"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
import { Form, FormControl, FormField, FormItem, Input } from "@/shared/ui"
import { SearchIcon } from "lucide-react"
import { useFilterStore } from "@/shared/stores"

const searchSchema = z.object({
  search: z.string(),
})

type SearchFormData = z.infer<typeof searchSchema>

const Searcher = () => {
  const { setSearch } = useFilterStore()

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  const searchValue = form.watch('search')

  useEffect(() => {
    if (searchValue || searchValue === '') {
      setSearch(searchValue)
    }
  }, [searchValue, setSearch])

  return (
    <div className="w-[450px]">
      <Form {...form}>
        <form className="w-full">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      rightIcon={<SearchIcon className="w-4 h-4" />}
                      type="text"
                      placeholder="Search..."
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export { Searcher }