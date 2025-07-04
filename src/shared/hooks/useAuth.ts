'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/shared/api";
import { LoginResponse, RegisterResponse } from "@/shared/types";
import { useAuthStore, useTwoFactorStore } from "@/shared/stores";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/consts";

const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {setTokens} = useAuthStore()
  const {setEmail: setTwoFactorEmail} = useTwoFactorStore()

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
    onSuccess: ({data}: LoginResponse) => {
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });

        router.push(ROUTES.DASHBOARD);
      } else {
        setTwoFactorEmail(data.user.email);
        router.push(ROUTES.TWO_FACTOR);
      }
    },
  })

  const useVerifyTwoFactorMutation = () => useMutation({
    mutationKey: ['verify two factor'],
    mutationFn: authApi.verifyTwoFactor,
    onSuccess: ({data}: LoginResponse) => {
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  })

  const useResendTwoFactorMutation = () => useMutation({
    mutationKey: ['resend two factor'],
    mutationFn: authApi.resendTwoFactorCode,
  })  

  const useToggleTwoFactorMutation = () => useMutation({
    mutationKey: ['two factor'],
    mutationFn: authApi.toggleTwoFactor,
    onSuccess: () => {
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
    verifyTwoFactorMutation: useVerifyTwoFactorMutation(),
    resendTwoFactorMutation: useResendTwoFactorMutation(),
    toggleTwoFactorMutation: useToggleTwoFactorMutation(),
    getMeQuery: useGetMeQuery(),
    logoutMutation: useLogoutMutation(),
  }
}

export { useAuth }