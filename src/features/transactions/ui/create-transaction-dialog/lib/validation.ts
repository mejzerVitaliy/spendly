import { Currency, TransactionCategory, TransactionType } from "@/shared/types";
import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  type: z.nativeEnum(TransactionType),
  date: z.date(),
  category: z.nativeEnum(TransactionCategory),
  currency: z.nativeEnum(Currency)
})

type CreateTransactionValues = z.infer<typeof createTransactionSchema>

export type { CreateTransactionValues }