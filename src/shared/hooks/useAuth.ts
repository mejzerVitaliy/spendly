'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/api";
import { LoginResponse, RegisterResponse } from "@/shared/types";
import { useAuthStore } from "@/shared/stores";

const useAuth = () => {
  const queryClient = useQueryClient()

  const {setTokens} = useAuthStore()
  const useRegistrationMutation = () => useMutation({
    mutationKey: ['register'],
    mutationFn: authApi.register,
    onSuccess: (response: RegisterResponse) => {
      setTokens(response.data.accessToken, response.data.refreshToken);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  const useLoginMutation = () => useMutation({
    mutationKey: ['login'],
    mutationFn: authApi.login,
    onSuccess: (response: LoginResponse) => {
      setTokens(response.data.accessToken, response.data.refreshToken);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  return {
    registerMutation: useRegistrationMutation(),
    loginMutation: useLoginMutation()
  }
}

export { useAuth }