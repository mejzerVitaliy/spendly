'use client';

import { Button, CardDescription, FormMessage } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ROUTES } from "@/shared/consts";

interface AuthFormProps<T extends z.ZodType> {
  type: "login" | "register";
  formSchema: T;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => void;
  submitDisabled: boolean;
}

function AuthForm<T extends z.ZodType>({
  type,
  formSchema,
  defaultValues,
  onSubmit,
  submitDisabled
}: AuthFormProps<T>) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{type === "login" ? "Log In to Your Account" : "Create An Account"}</CardTitle>

        <CardDescription className="text-c1-regular">
          Please fill your credentials below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {
              type === "register" && (
                <div className="w-full flex gap-4">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter your first name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter your last name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            )}

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "register" && (
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Confirm your password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex flex-col gap-6">
              <Button 
                className="w-full" 
                type="submit"
                disabled={submitDisabled}
              >
                {type === "login" ? "Log In" : "Sign Up"}
              </Button>

              <Link href={type === 'register'? ROUTES.LOGIN : ROUTES.REGISTRATION}>
                <Button className="w-full" variant='outline' type="button">
                  {type === 'register' ? 'Already have an account? Log In' : 'Don`t have an account? Sign Up'}
                </Button>
              </Link>
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { AuthForm }