import { api } from "@/shared/api";
import { UpdateUserRequest } from "@/shared/types";

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

export const profileApi = {
  updateProfile,
  updateAvatar,
  deleteAvatar
}