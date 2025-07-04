import { z } from "zod";

export const twoFactorSchema = z.object({
  code: z.string()
    .min(6, 'Code must be 6 digits')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers')
})

export type TwoFactorValues = z.infer<typeof twoFactorSchema> 