'use client'

import { AuthForm } from "@/shared/ui"
import { loginSchema, LoginValues } from "@/features/login"
import { useAuth } from "@/shared/hooks"

const LoginForm = () => {
  const { loginMutation } = useAuth();

  const onSubmit = async ({ email, password}: LoginValues) => {
    const preparedData = {
      email,
      password
    }
    
    try {
      await loginMutation.mutateAsync(preparedData)
    } catch (error) {
      console.error(error)
    }
  }
 
  return (
    <AuthForm 
      type="login"
      formSchema={loginSchema}
      defaultValues={{
        email: '',
        password: ''
      }}
      onSubmit={onSubmit}
      submitDisabled={loginMutation.isPending}
    />
  )
}

export {LoginForm}