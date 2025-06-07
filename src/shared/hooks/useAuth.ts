'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/api";
import { LoginResponse, RegisterResponse } from "@/shared/types";
import { useAuthStore } from "@/shared/stores";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/consts";

const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

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

  const useGetMeQuery = () => useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
  })

  const useLogoutMutation = () => useMutation({
    mutationKey: ['logout'],
    mutationFn: authApi.logout,
    onSuccess: () => {
      setTokens('', '')
      queryClient.clear()
      router.push(ROUTES.LOGIN)
    }
  })

  return {
    registerMutation: useRegistrationMutation(),
    loginMutation: useLoginMutation(),
    getMeQuery: useGetMeQuery(),
    logoutMutation: useLogoutMutation()
  }
}

export { useAuth }