'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/shared/api";
import { ChangePasswordRequest, UpdateSettingsRequest, UpdateUserRequest } from "@/shared/types";
import { toast } from "sonner";
import { useAuthStore } from "@/shared/stores";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/consts";

const useProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateProfileMutation = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (data: UpdateUserRequest) => profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  const updateAvatarMutation = useMutation({
    mutationKey: ['updateAvatar'],
    mutationFn: (file: File) => profileApi.updateAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  const deleteAvatarMutation = useMutation({
    mutationKey: ['deleteAvatar'],
    mutationFn: () => profileApi.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  const updatePasswordMutation = useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: (data: ChangePasswordRequest) => profileApi.changePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const deleteAccountMutation = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: () => profileApi.deleteAccount(),
    onSuccess: () => {
      // Clear all data and redirect to login
      queryClient.clear();
      useAuthStore.getState().setTokens('', '');
      toast.success("Account deleted successfully");
      router.push(ROUTES.LOGIN);
    },
    onError: () => {
      toast.error("Failed to delete account");
    }
  })

  const updateSettingsMutation = useMutation({
    mutationKey: ['updateSettings'],
    mutationFn: (data: UpdateSettingsRequest) => profileApi.updateSettings(data),
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  })

  return {
    updateProfileMutation,
    updateAvatarMutation,
    deleteAvatarMutation,
    updatePasswordMutation,
    deleteAccountMutation,
    updateSettingsMutation
  }
}

export { useProfile }