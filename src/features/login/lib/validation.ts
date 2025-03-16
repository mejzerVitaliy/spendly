import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is not correct"),
  password: z.string().min(6, 'Password must be longer that 6 symbols')
})

type LoginValues = z.infer<typeof loginSchema>

export type {LoginValues}