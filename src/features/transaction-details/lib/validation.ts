import { Currency, TransactionCategory, TransactionType } from "@/shared/types";
import { z } from "zod";

export const updateTransactionSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().optional(),
  type: z.nativeEnum(TransactionType),
  date: z.date(),
  category: z.nativeEnum(TransactionCategory),
  currency: z.nativeEnum(Currency),
});

type UpdateTransactionValues = z.infer<typeof updateTransactionSchema>;

export type { UpdateTransactionValues };
