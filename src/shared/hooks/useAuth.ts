'use client'

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/shared/api";

// const queryClient = useQueryClient()

const useAuth = () => {
  const useRegistrationMutation = () => useMutation({
    mutationFn: authApi.register,
  })

  const useLoginMutation = () => useMutation({
    mutationFn: authApi.login
  })

  return {
    registerMutation: useRegistrationMutation(),
    loginMutation: useLoginMutation()
  }
}

export { useAuth }