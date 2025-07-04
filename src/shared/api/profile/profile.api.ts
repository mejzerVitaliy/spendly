import { api } from "@/shared/api";
import { UpdateUserRequest, ChangePasswordRequest } from "@/shared/types/profile";

const updateProfile = async (request: UpdateUserRequest) => {
  await api.put("/profile/update", request);
}

const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  await api.post("/profile/update-avatar", formData);
}

const deleteAvatar = async () => {
  await api.delete("/profile/delete-avatar");
}

const changePassword = async (request: ChangePasswordRequest) => {
  await api.put("/profile/update-password", request);
}

const deleteAccount = async () => {
  await api.delete("/profile/delete");
}

export const profileApi = {
  updateProfile,
  updateAvatar,
  deleteAvatar,
  changePassword,
  deleteAccount
}