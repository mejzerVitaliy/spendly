interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  email?: string
}

interface UpdateAvatarRequest {
  avatar: File
}

interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export type {
  UpdateUserRequest,
  UpdateAvatarRequest,
  ChangePasswordRequest
}