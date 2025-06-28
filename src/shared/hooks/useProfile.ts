'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/shared/api/profile";
import { UpdateUserRequest } from "@/shared/types";

const useProfile = () => {
  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (data: UpdateUserRequest) => profileApi.updateProfile(data),
    onSuccess: () => {
      // Invalidate user data to refetch updated profile
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

  return {
    updateProfileMutation,
    updateAvatarMutation,
    deleteAvatarMutation
  }
}

export { useProfile }