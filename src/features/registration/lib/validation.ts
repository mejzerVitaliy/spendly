import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Email is not correct"),
  password: z.string().min(6, "Password must contain least 6 symbols"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match. Try again",
  path: ["confirmPassword"],
});

type RegistrationValues = z.infer<typeof registrationSchema>

export type {RegistrationValues};