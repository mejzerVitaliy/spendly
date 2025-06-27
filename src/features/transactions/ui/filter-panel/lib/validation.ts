import { z } from "zod"

const filterFormSchema = z.object({
  category: z.array(z.string()).optional(),
  type: z.string().optional(),
  currency: z.array(z.string()).optional(),
})

type FilterFormSchema = z.infer<typeof filterFormSchema>

export { filterFormSchema, type FilterFormSchema }