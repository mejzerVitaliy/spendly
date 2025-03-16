'use client'

import { AuthForm } from "@/shared/ui";
import { registrationSchema, RegistrationValues } from "@/features/registration";
import { useAuth } from "@/shared/hooks";

const RegistrationForm = () => {
  const {registerMutation} = useAuth();

  const onSubmit = async ({firstName, lastName, email, password}: RegistrationValues) => {
    const preparedData = {
      firstName,
      lastName,
      email,
      password
    }
    
    try {
      await registerMutation.mutateAsync(preparedData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthForm 
      type='register'
      formSchema={registrationSchema}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={onSubmit}
      submitDisabled={registerMutation.isPending}
    />
  )
}

export {RegistrationForm};