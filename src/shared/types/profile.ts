interface UpdateUserRequest {
  firstName: string
  lastName: string
  email: string
}

interface UpdateAvatarRequest {
  avatar: File
}

export type {
  UpdateUserRequest,
  UpdateAvatarRequest
}